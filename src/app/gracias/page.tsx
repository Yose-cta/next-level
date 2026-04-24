import type { Metadata } from 'next'
import Link from 'next/link'
import { CONTACT, TICKETS, WORKSHOP } from '@/lib/constants'
import { whatsappUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Gracias por reservar · Next Level',
  description:
    'Tu cupo está reservado. Acá tenés todos los datos del workshop y un botón directo a WhatsApp.',
  robots: { index: false, follow: false },
}

interface PageProps {
  searchParams: Promise<{ ticket?: string; status?: string }>
}

export default async function GraciasPage({ searchParams }: PageProps) {
  const params = await searchParams
  const ticketId = params.ticket ?? 'general'
  const ticket = TICKETS.find((t) => t.id === ticketId) ?? TICKETS[0]
  const isPending = params.status === 'pending'
  const isVip = ticket.id === 'vip'

  const waUrl = whatsappUrl(
    CONTACT.whatsapp.number,
    `Hola Yoselvia! Acabo de reservar mi cupo ${ticket.name} para Next Level Workshop del 16 de mayo.`
  )

  return (
    <main className="min-h-screen flex items-center justify-center py-16 px-4 sm:px-6">
      <div
        className="absolute inset-0 -z-10 opacity-50 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,210,63,.08), transparent 70%)',
        }}
      />

      <div className="max-w-2xl w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-electric text-electric font-display text-4xl mb-8">
          ✓
        </div>

        <div className="font-mono text-xs uppercase tracking-[0.3em] text-champagne mb-4">
          {isPending ? 'Pago en proceso' : 'Cupo reservado'}
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-cream font-light leading-[1.05]">
          {isPending ? (
            <>
              Estamos confirmando
              <br />
              <em className="text-electric not-italic">tu pago.</em>
            </>
          ) : (
            <>
              Nos vemos
              <br />
              <em className="text-electric not-italic">el 16 de mayo.</em>
            </>
          )}
        </h1>

        <p className="mt-8 text-lg text-cream/80 leading-relaxed max-w-xl mx-auto">
          {isPending
            ? 'Cuando confirmemos el pago, te llega un email con todos los detalles. Si tenés dudas, escribinos directo por WhatsApp.'
            : `Confirmamos tu ${ticket.name}. En minutos vas a recibir un email con el comprobante y los detalles del workshop. Guardá la fecha.`}
        </p>

        <div className="mt-12 grid sm:grid-cols-3 gap-4 text-left bg-noir-2 border border-champagne/15 rounded-sm p-6">
          <Detail label="Fecha" value={WORKSHOP.date.display} />
          <Detail label="Horario" value="14h a 21h" />
          <Detail label="Lugar" value={WORKSHOP.venue.full} />
        </div>

        {isVip && !isPending && (
          <div className="mt-6 bg-electric/10 border border-electric/30 rounded-sm p-6 text-left">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-electric mb-2">
              Tu Activo VIP
            </div>
            <p className="text-cream leading-relaxed">
              Después del workshop, agendamos tu sesión 1:1 online con Yoselvia. Te
              vamos a contactar por WhatsApp para coordinar fecha y hora.
            </p>
          </div>
        )}

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-whatsapp text-white font-semibold px-7 py-4 rounded-full hover:opacity-90 transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            <span>Escribirme por WhatsApp</span>
          </a>
          <a
            href="/api/calendar"
            className="inline-flex items-center justify-center gap-2 border border-champagne text-champagne font-semibold px-7 py-4 rounded-full hover:bg-champagne hover:text-noir transition"
          >
            <span aria-hidden>📅</span>
            <span>Agregar al calendario</span>
          </a>
        </div>

        <Link
          href="/"
          className="mt-10 inline-block text-mutedc hover:text-electric transition text-sm font-mono uppercase tracking-widest"
        >
          ← Volver al inicio
        </Link>
      </div>
    </main>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-mutedc mb-1.5">
        {label}
      </div>
      <div className="text-cream font-display text-lg leading-tight">{value}</div>
    </div>
  )
}
