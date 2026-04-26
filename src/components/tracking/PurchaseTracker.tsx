'use client'

import { useEffect } from 'react'

import { trackPurchase } from '@/lib/analytics'
import type { Ticket } from '@/lib/constants'

interface Props {
  ticket: Ticket
}

/**
 * Dispara el evento `purchase` cuando se monta. Solo renderizar en /gracias
 * cuando el pago está confirmado (status !== 'pending').
 *
 * Incluye dedupe por sessionStorage en `trackPurchase` — refrescar la página
 * NO vuelve a disparar.
 */
export function PurchaseTracker({ ticket }: Props) {
  useEffect(() => {
    trackPurchase(ticket)
  }, [ticket])

  return null
}
