import { NextRequest, NextResponse } from 'next/server'
import { buildConfirmacionEmail } from '@/emails/confirmacion-compra'
import { createAdminClient } from '@/lib/supabase/admin'
import { getPayment } from '@/lib/mercadopago'
import { sendEmail } from '@/lib/resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Admin endpoint para diagnosticar y recuperar pagos perdidos.
 *
 * GET /api/admin/payment-recovery?key=<IPN_KEY>&id=<payment_id>
 *   → Devuelve el estado del pago en MP + en nuestra BD + diagnóstico.
 *
 * GET /api/admin/payment-recovery?key=<IPN_KEY>&id=<payment_id>&resend_to=<email>&name=<nombre>
 *   → Reenvía el email de confirmación al `email` especificado.
 *   → Opcionalmente con `&name=` para personalizar el saludo.
 *   → Si no se pasa `resend_to`, intenta usar el email guardado en BD.
 *   → Marca `email_enviado_at` después del envío exitoso.
 *
 * Auth: comparte el IPN_KEY con el webhook GET (más simple).
 */
export async function GET(req: NextRequest) {
  const ipnKey = process.env.MERCADOPAGO_IPN_KEY
  const provided = req.nextUrl.searchParams.get('key')
  if (!ipnKey || !provided || provided !== ipnKey) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const paymentId = req.nextUrl.searchParams.get('id')
  if (!paymentId) {
    return NextResponse.json({ error: 'id param required' }, { status: 400 })
  }

  const resendTo = req.nextUrl.searchParams.get('resend_to')
  const overrideName = req.nextUrl.searchParams.get('name')

  // 1. Estado en MercadoPago
  let mp: Record<string, unknown> = {}
  try {
    const payment = await getPayment(paymentId)
    mp = {
      id: payment.id,
      status: payment.status,
      status_detail: payment.status_detail,
      live_mode: payment.live_mode,
      transaction_amount: payment.transaction_amount,
      currency_id: payment.currency_id,
      external_reference: payment.external_reference,
      payer_email: payment.payer?.email ?? null,
      payer_first_name: payment.payer?.first_name ?? null,
      payer_last_name: payment.payer?.last_name ?? null,
      date_approved: payment.date_approved,
      date_created: payment.date_created,
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'unknown'
    return NextResponse.json(
      { error: 'failed to fetch payment from MP', detail: msg },
      { status: 502 }
    )
  }

  // 2. Estado en Supabase
  const supabase = createAdminClient()
  const { data: compra, error: compraError } = await supabase
    .from('compras')
    .select('*')
    .eq('payment_id', paymentId)
    .maybeSingle()

  if (compraError) {
    return NextResponse.json(
      { error: 'supabase query failed', detail: compraError.message, mp },
      { status: 503 }
    )
  }

  // 3. Si pidieron reenvío, mandamos el email
  if (resendTo) {
    if (!compra) {
      return NextResponse.json(
        { error: 'no compra in DB for this payment_id — retrigger webhook first', mp },
        { status: 404 }
      )
    }

    const targetEmail = resendTo
    const targetName = overrideName ?? compra.comprador_nombre ?? null
    const ticketType = compra.ticket_type as 'general' | 'vip'

    try {
      const { subject, html, text } = buildConfirmacionEmail({
        nombre: targetName,
        ticketType,
      })
      await sendEmail({
        to: targetEmail,
        subject,
        html,
        text,
        tags: [
          { name: 'type', value: 'manual-recovery' },
          { name: 'ticket', value: ticketType },
          { name: 'payment_id', value: paymentId },
        ],
      })

      // Actualizar BD: marcar email enviado + opcionalmente actualizar email guardado
      await supabase
        .from('compras')
        .update({
          comprador_email: targetEmail,
          comprador_nombre: targetName,
          email_enviado_at: new Date().toISOString(),
        })
        .eq('id', compra.id)

      return NextResponse.json({
        ok: true,
        action: 'email_resent',
        sent_to: targetEmail,
        name: targetName,
        ticket_type: ticketType,
        mp_status: mp.status,
      })
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'unknown'
      return NextResponse.json(
        {
          error: 'resend failed — check Resend dashboard / domain verification',
          detail: msg,
          mp,
          compra,
        },
        { status: 502 }
      )
    }
  }

  // 4. Solo diagnóstico (sin resend) — armar el reporte
  const diagnosis: string[] = []

  if (!compra) {
    diagnosis.push('❌ No existe row en Supabase para este payment_id')
    diagnosis.push('→ Reintentar webhook: /api/mercadopago/webhook?topic=payment&id=' + paymentId + '&key=...')
  } else {
    diagnosis.push('✅ Row existe en Supabase')

    if (compra.comprador_email === 'unknown@unknown.com') {
      diagnosis.push('⚠️ Email guardado es unknown@unknown.com (MP no envió el payer)')
      diagnosis.push('→ Reenviar manual con: &resend_to=email@real.com&name=Nombre Real')
    }

    if (compra.email_enviado_at) {
      diagnosis.push('📧 email_enviado_at YA está seteado: ' + compra.email_enviado_at)
      diagnosis.push('→ El email se intentó mandar. Si no llegó: revisa SPAM, o domain de Resend, o reenvía manual')
    } else {
      diagnosis.push('⚠️ email_enviado_at = null → el email NO se mandó')
      if (compra.status !== 'approved') {
        diagnosis.push('→ Status no es approved (' + compra.status + '), por eso no se mandó email')
      } else {
        diagnosis.push('→ Status approved pero no se mandó. Posibles causas: Resend falló, dominio no verificado')
      }
    }
  }

  if (mp.status !== 'approved') {
    diagnosis.push('⚠️ Pago en MP NO está approved — status=' + mp.status)
  }

  return NextResponse.json({
    payment_id: paymentId,
    mp,
    compra: compra
      ? {
          id: compra.id,
          ticket_type: compra.ticket_type,
          comprador_email: compra.comprador_email,
          comprador_nombre: compra.comprador_nombre,
          status: compra.status,
          email_enviado_at: compra.email_enviado_at,
          created_at: compra.created_at,
          updated_at: compra.updated_at,
        }
      : null,
    diagnosis,
  })
}
