'use client'

import type { ComponentProps, ReactNode } from 'react'

import { trackBeginCheckout } from '@/lib/analytics'
import type { Ticket } from '@/lib/constants'

type Props = Omit<ComponentProps<'a'>, 'href' | 'onClick'> & {
  ticket: Ticket
  children: ReactNode
}

/**
 * Reemplaza el `<a href="/api/checkout?ticket=xxx">` plano para que dispare
 * `begin_checkout` antes de redirigir. El href + redirect siguen funcionando
 * igual aunque GTM/Meta no estén cargados.
 */
export function CheckoutButton({ ticket, children, ...rest }: Props) {
  return (
    <a
      {...rest}
      href={`/api/checkout?ticket=${ticket.id}`}
      onClick={() => trackBeginCheckout(ticket)}
    >
      {children}
    </a>
  )
}
