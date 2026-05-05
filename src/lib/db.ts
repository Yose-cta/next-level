import { createAdminClient } from '@/lib/supabase/admin'
import type { PaymentResponse } from '@/lib/mercadopago'

export type CompraStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'refunded'
  | 'cancelled'
  | 'in_process'
  | 'charged_back'

export type TicketType = 'general' | 'vip'

export interface CompraRow {
  id: string
  ticket_type: TicketType
  comprador_email: string
  comprador_nombre: string | null
  comprador_telefono: string | null
  monto_unit: number | null
  currency: string | null
  payment_id: string | null
  preference_id: string | null
  external_reference: string | null
  status: CompraStatus
  raw_webhook: unknown
  email_enviado_at: string | null
  created_at: string
  updated_at: string
}

function inferTicketType(externalRef: string | undefined): TicketType {
  if (externalRef?.startsWith('vip-')) return 'vip'
  return 'general'
}

/**
 * Upsert idempotente de compra basada en payment_id.
 * Llamado desde el webhook MP — corre múltiples veces sin duplicar.
 *
 * DEFENSIVE: usa optional chaining en TODOS los accesos a payment.payer.*
 * Algunos métodos de pago en Chile no incluyen `payer` en el evento
 * `payment.created` — solo en `payment.updated`. Si crasheamos acá, el
 * webhook responde 500 y MP no entrega → cliente paga sin registro nuestro.
 */
export async function upsertCompraFromPayment(
  payment: PaymentResponse
): Promise<CompraRow | null> {
  try {
    const supabase = createAdminClient()

    // Acceso defensivo a payer (puede venir undefined en payment.created)
    const payer = payment.payer ?? {}
    const ticketType = inferTicketType(payment.external_reference ?? undefined)
    const fullName = [payer.first_name, payer.last_name]
      .filter(Boolean)
      .join(' ')
      .trim()
    const phone = payer.phone
      ? `${payer.phone.area_code ?? ''}${payer.phone.number ?? ''}`.trim() || null
      : null

    const row = {
      ticket_type: ticketType,
      comprador_email: payer.email ?? 'unknown@unknown.com',
      comprador_nombre: fullName || null,
      comprador_telefono: phone,
      monto_unit: payment.transaction_amount ?? null,
      currency: payment.currency_id ?? null,
      payment_id: String(payment.id),
      external_reference: payment.external_reference ?? null,
      status: payment.status,
      raw_webhook: payment as unknown as Record<string, unknown>,
    }

    const { data, error } = await supabase
      .from('compras')
      .upsert(row, { onConflict: 'payment_id' })
      .select('*')
      .single()

    if (error) {
      console.error('[db] upsertCompra error:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
        payment_id: payment.id,
      })
      return null
    }
    return data as CompraRow
  } catch (e) {
    // Catch defensive: cualquier error inesperado (acceso a propiedad,
    // serialización JSON, etc.) lo capturamos y logueamos sin crashear
    // el webhook entero. MP retry policy va a reintentar después.
    const msg = e instanceof Error ? e.message : 'unknown error'
    const stack = e instanceof Error ? e.stack : undefined
    console.error('[db] upsertCompra UNEXPECTED ERROR:', {
      message: msg,
      stack,
      payment_id: payment?.id,
      payer_present: !!payment?.payer,
      status: payment?.status,
    })
    return null
  }
}

/**
 * Marca el email como enviado (para no enviar duplicados).
 */
export async function markEmailSent(compraId: string): Promise<void> {
  const supabase = createAdminClient()
  await supabase
    .from('compras')
    .update({ email_enviado_at: new Date().toISOString() })
    .eq('id', compraId)
}
