/**
 * Analytics — wrappers para disparar eventos de conversión a través de:
 *   - GTM (window.dataLayer) → consume GA4 y cualquier tag configurado en GTM.
 *   - Meta Pixel (window.fbq) → directamente en el píxel cuando esté activo.
 *
 * Si GTM o Meta no están cargados (env vars vacías), los eventos se ignoran
 * silenciosamente. Cero impacto sobre el flujo de checkout.
 */

import type { Ticket } from './constants'

// ---- Tipos globales (no chocan con otras libs que extiendan Window) ----------
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    fbq?: (
      command: 'track' | 'trackCustom' | 'init',
      eventName: string,
      params?: Record<string, unknown>
    ) => void
  }
}

// ---- Helpers internos --------------------------------------------------------
function pushDataLayer(payload: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  // Patrón estándar GTM: inicializar el array si aún no existe.
  // Esto asegura que los eventos se cuelan aunque GTM cargue después.
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push(payload)
}

function buildItem(ticket: Ticket) {
  return {
    item_id: ticket.id,
    item_name: ticket.name,
    price: ticket.price.amount,
    quantity: 1,
    item_category: 'tickets',
  }
}

// ---- Eventos públicos --------------------------------------------------------

/**
 * Click en "Reservar mi cupo" / "Quiero el VIP".
 * GA4: begin_checkout · Meta Pixel: InitiateCheckout
 */
export function trackBeginCheckout(ticket: Ticket) {
  pushDataLayer({
    event: 'begin_checkout',
    ecommerce: {
      currency: ticket.price.currency,
      value: ticket.price.amount,
      items: [buildItem(ticket)],
    },
  })

  if (typeof window !== 'undefined') {
    window.fbq?.('track', 'InitiateCheckout', {
      content_ids: [ticket.id],
      content_name: ticket.name,
      content_type: 'product',
      value: ticket.price.amount,
      currency: ticket.price.currency,
    })
  }
}

/**
 * Pago aprobado (llegada a /gracias sin status=pending).
 * Incluye dedupe por sessionStorage para evitar doble disparo si refresca.
 *
 * GA4: purchase · Meta Pixel: Purchase
 */
export function trackPurchase(ticket: Ticket) {
  if (typeof window === 'undefined') return

  // Dedupe en sesión. Si ya disparamos para este ticket, salir.
  const dedupeKey = `nl_purchase_fired_${ticket.id}`
  try {
    if (sessionStorage.getItem(dedupeKey) === '1') return
    sessionStorage.setItem(dedupeKey, '1')
  } catch {
    // sessionStorage puede fallar en incognito o tracking strict.
    // Si falla, igual disparamos — preferimos doble que cero.
  }

  // ID sintético. Mejora futura: pasar payment_id real desde el back_url de MP.
  const transactionId = `${ticket.id}-${Date.now()}`

  pushDataLayer({
    event: 'purchase',
    ecommerce: {
      transaction_id: transactionId,
      currency: ticket.price.currency,
      value: ticket.price.amount,
      items: [buildItem(ticket)],
    },
  })

  window.fbq?.('track', 'Purchase', {
    content_ids: [ticket.id],
    content_name: ticket.name,
    content_type: 'product',
    value: ticket.price.amount,
    currency: ticket.price.currency,
  })
}
