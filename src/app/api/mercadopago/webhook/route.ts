import { NextRequest, NextResponse } from 'next/server'
import { buildConfirmacionEmail } from '@/emails/confirmacion-compra'
import { markEmailSent, upsertCompraFromPayment } from '@/lib/db'
import { getPayment, verifyWebhookSignature } from '@/lib/mercadopago'
import { sendEmail } from '@/lib/resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * MercadoPago webhook handler.
 *
 * Setup en MP dashboard:
 * - URL POST (modern):  https://nl.yosmentedigital.com/api/mercadopago/webhook
 *                       Verificación: HMAC-SHA256 vía MERCADOPAGO_WEBHOOK_SECRET
 *
 * - URL GET (IPN legacy): https://nl.yosmentedigital.com/api/mercadopago/webhook?key=<token>
 *                         MP no firma GETs, así que validamos un token compartido en URL.
 *                         Generar con: openssl rand -hex 32
 *                         Setear como MERCADOPAGO_IPN_KEY en .env.local + Vercel.
 *
 * Idempotente — MP reenvía hasta confirmación 200. Upsert por payment_id evita duplicados.
 * Email se envía una sola vez (flag email_enviado_at en BD).
 */

/**
 * Enmascara un email para logs: yoselvia@gmail.com → yo***@gmail.com.
 * Mantiene utilidad para debug sin exponer PII completa.
 */
function maskEmail(email: string | undefined | null): string {
  if (!email) return 'unknown'
  const [user, domain] = email.split('@')
  if (!user || !domain) return 'malformed'
  return `${user.slice(0, 2)}***@${domain}`
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>
    const eventType = (body.type ?? body.action) as string | undefined
    const data = body.data as { id?: string | number } | undefined
    const dataId = data?.id ? String(data.id) : undefined

    if (!eventType || !dataId) {
      return NextResponse.json({ ok: true })
    }

    // Verificación de firma — fail-closed en producción.
    const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET
    const isProd = process.env.NODE_ENV === 'production'

    if (!secret) {
      if (isProd) {
        console.error(
          '[webhook MP] CRITICAL: MERCADOPAGO_WEBHOOK_SECRET ausente en producción. Rechazando.'
        )
        return NextResponse.json({ error: 'webhook misconfigured' }, { status: 500 })
      }
      console.warn('[webhook MP] sin secret (modo dev) — saltando verificación')
    } else {
      const valid = await verifyWebhookSignature({
        signatureHeader: req.headers.get('x-signature'),
        requestId: req.headers.get('x-request-id'),
        dataId,
        secret,
      })
      if (!valid) {
        console.warn('[webhook MP] firma inválida', { dataId, eventType })
        return NextResponse.json({ error: 'invalid signature' }, { status: 401 })
      }
    }

    if (
      eventType !== 'payment' &&
      eventType !== 'payment.updated' &&
      eventType !== 'payment.created'
    ) {
      return NextResponse.json({ ok: true })
    }

    return await processPayment(dataId)
  } catch (e) {
    console.error('[webhook MP POST] error:', e)
    return NextResponse.json({ error: 'webhook failed' }, { status: 500 })
  }
}

/**
 * MP también envía GET con query params (IPN legacy). Como MP no firma GETs,
 * validamos un token compartido en la URL: ?key=<MERCADOPAGO_IPN_KEY>.
 *
 * Fail-closed en producción si la env var no está seteada.
 */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams
  const isProd = process.env.NODE_ENV === 'production'
  const ipnKey = process.env.MERCADOPAGO_IPN_KEY

  // Validar token compartido en URL
  if (!ipnKey) {
    if (isProd) {
      console.error('[webhook MP GET] CRITICAL: MERCADOPAGO_IPN_KEY ausente en producción')
      return NextResponse.json({ error: 'webhook misconfigured' }, { status: 500 })
    }
    console.warn('[webhook MP GET] sin IPN_KEY (modo dev) — saltando verificación')
  } else {
    const provided = sp.get('key')
    if (!provided || provided !== ipnKey) {
      console.warn('[webhook MP GET] key inválida o ausente')
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }
  }

  const id = sp.get('id') ?? sp.get('data.id')
  const topic = sp.get('topic') ?? sp.get('type')

  if (!id || topic !== 'payment') {
    return NextResponse.json({ ok: true })
  }

  try {
    return await processPayment(id)
  } catch (e) {
    console.error('[webhook MP GET] error:', e)
    return NextResponse.json({ error: 'webhook failed' }, { status: 500 })
  }
}

async function processPayment(paymentId: string) {
  const payment = await getPayment(paymentId)
  const isProd = process.env.NODE_ENV === 'production'

  // 🚨 GUARDIA CRÍTICA: rechaza pagos en modo prueba si estamos en producción.
  // Si llega aquí un payment con live_mode=false en prod, significa que la app
  // de MercadoPago está mal configurada (sandbox en vez de producción) y los
  // pagos están saliendo como falsos ($0 efectivo).
  if (isProd && payment.live_mode === false) {
    console.error('[webhook MP] CRITICAL: payment with live_mode=false in production', {
      id: payment.id,
      status: payment.status,
      transaction_amount: payment.transaction_amount,
    })
    return NextResponse.json(
      { error: 'sandbox payment rejected in production' },
      { status: 422 }
    )
  }

  // 🚨 GUARDIA SECUNDARIA: payments aprobados con monto $0 son sospechosos.
  // En producción real un ticket cuesta $67k o $147k. Si llega un approved
  // con monto < 100 CLP, lo flageamos pero NO lo bloqueamos (puede haber
  // cupones/descuentos legítimos en el futuro).
  if (isProd && payment.status === 'approved' && payment.transaction_amount < 100) {
    console.error('[webhook MP] WARN: approved payment with suspicious amount', {
      id: payment.id,
      transaction_amount: payment.transaction_amount,
      currency_id: payment.currency_id,
      live_mode: payment.live_mode,
    })
  }

  // Log mínimo + mask de PII. No exponemos email completo, montos, ni external_reference
  // (que puede contener datos sensibles del comprador).
  console.log('[webhook MP] payment processed', {
    id: payment.id,
    status: payment.status,
    live_mode: payment.live_mode,
    transaction_amount: payment.transaction_amount,
    payer_email: maskEmail(payment.payer?.email),
  })

  // 1. Upsert en Supabase (idempotente)
  const compra = await upsertCompraFromPayment(payment)
  if (!compra) {
    return NextResponse.json({ error: 'persist failed' }, { status: 500 })
  }

  // 2. Si está aprobado y no se envió email aún, enviarlo
  if (payment.status === 'approved' && !compra.email_enviado_at) {
    try {
      const { subject, html, text } = buildConfirmacionEmail({
        nombre: compra.comprador_nombre,
        ticketType: compra.ticket_type,
      })
      await sendEmail({
        to: compra.comprador_email,
        subject,
        html,
        text,
        tags: [
          { name: 'type', value: 'confirmacion-compra' },
          { name: 'ticket', value: compra.ticket_type },
        ],
      })
      await markEmailSent(compra.id)
      console.log('[webhook MP] email sent', { to: maskEmail(compra.comprador_email) })
    } catch (mailErr) {
      console.error('[webhook MP] email failed:', mailErr)
      // No reventamos el webhook — la compra ya está en BD, podemos reenviar manual
    }
  }

  // Respuesta opaca — solo confirma que procesamos.
  // No leakeamos compra_id, status, email_sent ni external_reference.
  return NextResponse.json({ ok: true })
}
