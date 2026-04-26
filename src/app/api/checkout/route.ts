import { NextRequest, NextResponse } from 'next/server'
import { CONTACT, TICKETS, WORKSHOP } from '@/lib/constants'
import { createPreference } from '@/lib/mercadopago'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const VALID_TICKETS = ['general', 'vip'] as const
type ValidTicket = (typeof VALID_TICKETS)[number]

function isValidTicket(v: string): v is ValidTicket {
  return (VALID_TICKETS as readonly string[]).includes(v)
}

// Cookie para debounce de double-click (mismo browser)
const DEBOUNCE_COOKIE = 'nl_checkout_at'
const DEBOUNCE_MS = 3_000 // 3 segundos entre checkouts del mismo browser

export async function GET(req: NextRequest) {
  try {
    // 1. Debounce por cookie — evita double-click del usuario legítimo
    const lastCheckoutCookie = req.cookies.get(DEBOUNCE_COOKIE)?.value
    if (lastCheckoutCookie) {
      const lastTs = parseInt(lastCheckoutCookie, 10)
      if (!isNaN(lastTs) && Date.now() - lastTs < DEBOUNCE_MS) {
        return NextResponse.json(
          { error: 'Espera un momento antes de reintentar' },
          { status: 429, headers: { 'Retry-After': '3' } }
        )
      }
    }

    // 2. Rate limit por IP — defensa contra bots simples (in-memory, ver lib/rate-limit.ts)
    const ip = getClientIp(req.headers)
    const rl = checkRateLimit({
      key: `checkout:${ip}`,
      windowMs: 60_000, // 1 minuto
      max: 10, // 10 checkouts por IP por minuto
    })
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Intenta más tarde.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
            'X-RateLimit-Remaining': '0',
          },
        }
      )
    }

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

    const response = NextResponse.redirect(redirectUrl, 303)
    // Setea cookie de debounce — bloquea reintentos rápidos del mismo browser
    response.cookies.set(DEBOUNCE_COOKIE, String(Date.now()), {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 10, // 10 segundos — solo necesitamos debounce corto
      path: '/api/checkout',
    })
    return response
  } catch (e) {
    console.error('[checkout] error:', e)
    const message = e instanceof Error ? e.message : 'Error desconocido'
    return NextResponse.json(
      { error: 'No se pudo iniciar el checkout', detail: message },
      { status: 500 }
    )
  }
}
