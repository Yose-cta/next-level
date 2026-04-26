import { NextRequest, NextResponse } from 'next/server'
import { buildConfirmacionEmail } from '@/emails/confirmacion-compra'
import { markEmailSent, upsertCompraFromPayment } from '@/lib/db'
import { getPayment, verifyWebhookSignature } from '@/lib/mercadopago'
import { sendEmail } from '@/lib/resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * MercadoPago webhook handler.
 * Setup en MP dashboard:
 * - URL: https://nl.yosmentedigital.com/api/mercadopago/webhook
 * - Eventos: Pagos
 *
 * Idempotente — MP reenvía hasta confirmación 200. El upsert por payment_id evita duplicados.
 * El email solo se envía una vez (chequea email_enviado_at).
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>
    const eventType = (body.type ?? body.action) as string | undefined
    const data = body.data as { id?: string | number } | undefined
    const dataId = data?.id ? String(data.id) : undefined

    if (!eventType || !dataId) {
      return NextResponse.json({ ok: true, ignored: 'missing fields' })
    }

    // Verificación de firma — fail-closed en producción.
    // Si por error la env var se borra, NO procesamos el webhook (mejor perder
    // un evento real que aceptar uno falso que marque pagos como aprobados).
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
      return NextResponse.json({ ok: true, ignored: eventType })
    }

    return await processPayment(dataId)
  } catch (e) {
    console.error('[webhook MP POST] error:', e)
    const message = e instanceof Error ? e.message : 'unknown'
    return NextResponse.json({ error: 'webhook failed', detail: message }, { status: 500 })
  }
}

/**
 * MP también envía GET con query params en lugar de POST con body.
 */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams
  const id = sp.get('id') ?? sp.get('data.id')
  const topic = sp.get('topic') ?? sp.get('type')

  if (!id || topic !== 'payment') {
    return NextResponse.json({ ok: true, ignored: 'not-payment' })
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

  console.log('[webhook MP] payment received', {
    id: payment.id,
    status: payment.status,
    external_reference: payment.external_reference,
    amount: payment.transaction_amount,
    payer_email: payment.payer.email,
  })

  // 1. Upsert en Supabase (idempotente)
  const compra = await upsertCompraFromPayment(payment)
  if (!compra) {
    return NextResponse.json(
      { error: 'failed to persist compra', payment_id: payment.id },
      { status: 500 }
    )
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
      console.log('[webhook MP] email sent', {
        to: compra.comprador_email,
        compra: compra.id,
      })
    } catch (mailErr) {
      console.error('[webhook MP] email failed (compra guardada):', mailErr)
      // No reventamos el webhook — la compra ya está en BD, podemos reenviar email manual
    }
  }

  return NextResponse.json({
    ok: true,
    received: payment.id,
    status: payment.status,
    compra_id: compra.id,
    email_sent: payment.status === 'approved',
  })
}
