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
  if (!externalRef) return 'general'
  // Match: 'vip-{timestamp}' (compra VIP real) o 'test-vip-{timestamp}' (compra VIP de test).
  if (/^(test-)?vip-/.test(externalRef)) return 'vip'
  return 'general'
}

/**
 * Upsert idempotente de compra basada en payment_id.
 * Llamado desde el webhook MP — corre múltiples veces sin duplicar.
 */
export async function upsertCompraFromPayment(
  payment: PaymentResponse
): Promise<CompraRow | null> {
  const supabase = createAdminClient()

  const ticketType = inferTicketType(payment.external_reference ?? undefined)
  const fullName = [payment.payer.first_name, payment.payer.last_name]
    .filter(Boolean)
    .join(' ')
    .trim()
  const phone = payment.payer.phone
    ? `${payment.payer.phone.area_code ?? ''}${payment.payer.phone.number ?? ''}`.trim()
    : null

  const row = {
    ticket_type: ticketType,
    comprador_email: payment.payer.email ?? 'unknown@unknown.com',
    comprador_nombre: fullName || null,
    comprador_telefono: phone,
    monto_unit: payment.transaction_amount,
    currency: payment.currency_id,
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
    console.error('[db] upsertCompra error:', error)
    return null
  }
  return data as CompraRow
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
