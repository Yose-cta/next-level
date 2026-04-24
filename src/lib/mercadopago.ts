/**
 * MercadoPago wrapper minimal — usa fetch directo a la API REST.
 * Cero dependencias externas. Server-side only (usa ACCESS_TOKEN).
 */

const MP_BASE = 'https://api.mercadopago.com'

export interface MpItem {
  id: string
  title: string
  description?: string
  quantity: number
  currency_id: 'CLP' | 'USD' | 'ARS' | 'BRL'
  unit_price: number
  category_id?: string
}

export interface CreatePreferenceArgs {
  items: MpItem[]
  external_reference?: string
  notification_url?: string
  back_urls?: {
    success?: string
    failure?: string
    pending?: string
  }
  auto_return?: 'approved' | 'all'
  statement_descriptor?: string
  payer?: {
    name?: string
    email?: string
    phone?: { area_code?: string; number?: string }
  }
  metadata?: Record<string, string | number>
}

export interface PreferenceResponse {
  id: string
  init_point: string
  sandbox_init_point: string
  date_created: string
}

export interface PaymentResponse {
  id: number
  status: 'approved' | 'pending' | 'in_process' | 'rejected' | 'refunded' | 'cancelled' | 'charged_back'
  status_detail: string
  external_reference?: string
  transaction_amount: number
  currency_id: string
  payer: {
    id?: string
    email?: string
    first_name?: string
    last_name?: string
    phone?: { area_code?: string; number?: string }
  }
  metadata: Record<string, unknown>
  date_approved: string | null
  date_created: string
}

function getToken() {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN
  if (!token) throw new Error('MERCADOPAGO_ACCESS_TOKEN no configurado en .env.local')
  return token
}

export async function createPreference(args: CreatePreferenceArgs): Promise<PreferenceResponse> {
  const r = await fetch(`${MP_BASE}/checkout/preferences`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(args),
  })
  if (!r.ok) {
    const text = await r.text()
    throw new Error(`MercadoPago create preference failed (${r.status}): ${text}`)
  }
  return r.json() as Promise<PreferenceResponse>
}

export async function getPayment(paymentId: string | number): Promise<PaymentResponse> {
  const r = await fetch(`${MP_BASE}/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  if (!r.ok) throw new Error(`MercadoPago get payment failed (${r.status})`)
  return r.json() as Promise<PaymentResponse>
}

/**
 * Webhook signature verification (HMAC-SHA256).
 * MercadoPago envía header `x-signature` con: ts=...,v1=...
 */
export async function verifyWebhookSignature(args: {
  signatureHeader: string | null
  requestId: string | null
  dataId: string
  secret: string
}): Promise<boolean> {
  const { signatureHeader, requestId, dataId, secret } = args
  if (!signatureHeader || !secret) return false

  const parts = signatureHeader.split(',').reduce<Record<string, string>>((acc, p) => {
    const [k, v] = p.trim().split('=')
    if (k && v) acc[k] = v
    return acc
  }, {})

  const ts = parts.ts
  const sig = parts.v1
  if (!ts || !sig) return false

  const manifest = `id:${dataId};request-id:${requestId ?? ''};ts:${ts};`
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sigBuf = await crypto.subtle.sign('HMAC', key, enc.encode(manifest))
  const computed = Array.from(new Uint8Array(sigBuf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return computed === sig
}
