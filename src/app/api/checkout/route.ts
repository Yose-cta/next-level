import { NextRequest, NextResponse } from 'next/server'
import { CONTACT, TICKETS, WORKSHOP } from '@/lib/constants'
import { createPreference } from '@/lib/mercadopago'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const VALID_TICKETS = ['general', 'vip', 'test', 'test-vip'] as const
type ValidTicket = (typeof VALID_TICKETS)[number]

function isValidTicket(v: string): v is ValidTicket {
  return (VALID_TICKETS as readonly string[]).includes(v)
}

export async function GET(req: NextRequest) {
  try {
    const ticketId = req.nextUrl.searchParams.get('ticket') ?? ''
    if (!isValidTicket(ticketId)) {
      return NextResponse.json({ error: 'Ticket inválido' }, { status: 400 })
    }

    const ticket = TICKETS.find((t) => t.id === ticketId)
    if (!ticket) {
      return NextResponse.json({ error: 'Ticket no encontrado' }, { status: 404 })
    }

    const origin = req.nextUrl.origin
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? origin

    const pref = await createPreference({
      items: [
        {
          id: ticket.id,
          title: `Next Level Experience · ${ticket.name}`,
          description: `${WORKSHOP.date.display} · ${WORKSHOP.venue.full}`,
          quantity: 1,
          currency_id: 'CLP',
          unit_price: ticket.price.amount,
          category_id: 'tickets',
        },
      ],
      external_reference: `${ticket.id}-${Date.now()}`,
      notification_url: `${siteUrl}/api/mercadopago/webhook`,
      back_urls: {
        success: `${siteUrl}/gracias?ticket=${ticket.id}`,
        failure: `${siteUrl}/?error=payment-failed`,
        pending: `${siteUrl}/gracias?ticket=${ticket.id}&status=pending`,
      },
      auto_return: 'approved',
      statement_descriptor: 'NEXTLEVEL',
      metadata: {
        ticket_id: ticket.id,
        workshop_date: WORKSHOP.date.iso,
        whatsapp: CONTACT.whatsapp.display,
      },
    })

    // Redirige al checkout de MercadoPago.
    // En producción usá init_point. En sandbox usá sandbox_init_point.
    const isProd = process.env.NODE_ENV === 'production'
    const redirectUrl = isProd ? pref.init_point : pref.sandbox_init_point ?? pref.init_point

    return NextResponse.redirect(redirectUrl, 303)
  } catch (e) {
    console.error('[checkout] error:', e)
    const message = e instanceof Error ? e.message : 'Error desconocido'
    return NextResponse.json(
      { error: 'No se pudo iniciar el checkout', detail: message },
      { status: 500 }
    )
  }
}
