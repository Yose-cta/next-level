import { TICKETS } from '@/lib/constants'

export function Tickets() {
  return (
    <section id="tickets" className="py-24 sm:py-32 bg-noir-2 border-b border-champagne/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="secnum mb-4">06 — TU INVERSIÓN</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-cream font-light leading-[1.05]">
            <span data-editable="tickets-h">
              Dos formas de vivir <em className="text-electric not-italic">Next Level</em>.
            </span>
          </h2>
          <p className="mt-6 text-lg text-cream/70" data-editable="tickets-sub">
            Una para implementar. Otra para acelerar con sesión 1:1 online post-evento con
            Yoselvia.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {TICKETS.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>

        <p
          className="text-center mt-10 text-sm text-mutedc font-mono uppercase tracking-widest reveal"
          data-editable="tickets-foot"
        >
          Pago seguro vía Mercado Pago · Reserva en menos de 60 segundos · Cupos limitados
        </p>
      </div>
    </section>
  )
}

function TicketCard({ ticket }: { ticket: (typeof TICKETS)[number] }) {
  const isVip = ticket.id === 'vip'

  return (
    <div
      className={`relative p-8 sm:p-10 rounded-lg flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-editorial ${
        isVip
          ? 'border border-electric/40 bg-gradient-to-b from-electric/[0.07] to-noir-2/70'
          : 'border border-champagne/20 bg-gradient-to-b from-champagne/[0.04] to-noir-2/60 hover:border-champagne/40'
      }`}
    >
      {ticket.badge && (
        <div className="absolute top-0 right-6 bg-electric text-noir font-mono text-[10px] tracking-[0.2em] px-3.5 py-1.5 rounded-b font-bold">
          {ticket.badge}
        </div>
      )}

      <div
        className={`font-mono text-xs uppercase tracking-[0.3em] mb-4 ${
          isVip ? 'text-electric' : 'text-mutedc'
        }`}
        data-editable={`t${ticket.id}-tag`}
      >
        {ticket.tagline}
      </div>
      <h3 className="font-display text-3xl text-cream mb-2" data-editable={`t${ticket.id}-name`}>
        {ticket.name}
      </h3>
      <p className="text-cream/60 mb-6" data-editable={`t${ticket.id}-sub`}>
        {ticket.description}
      </p>

      <div className="flex items-baseline gap-3 mb-8">
        <span
          className={`font-display text-6xl ${isVip ? 'text-electric' : 'text-cream'}`}
          data-editable={`t${ticket.id}-price`}
        >
          {ticket.price.display}
        </span>
        <span className="text-cream/50 text-sm" data-editable={`t${ticket.id}-price-sub`}>
          {ticket.price.currency} · pago único
        </span>
      </div>

      <ul className="space-y-4 flex-1 mb-8">
        {ticket.features.map((f, i) => (
          <li key={i} className="flex gap-3 text-cream/85">
            <span className={isVip ? 'text-electric' : 'text-champagne'}>
              {isVip ? '★' : '✓'}
            </span>
            <span
              data-editable={`t${ticket.id}-${i + 1}`}
              dangerouslySetInnerHTML={{ __html: f }}
            />
          </li>
        ))}

        {'highlight' in ticket && ticket.highlight && (
          <li className="flex gap-3 text-cream/95 bg-electric/[0.07] p-4 rounded border border-electric/25">
            <span className="text-electric mt-0.5">★</span>
            <span>
              <strong className="block text-cream" data-editable={`t${ticket.id}-highlight-h`}>
                {ticket.highlight.title}
              </strong>
              <p
                className="text-cream/75 text-sm mt-1.5 leading-relaxed"
                data-editable={`t${ticket.id}-highlight-body`}
              >
                {ticket.highlight.body}
              </p>
            </span>
          </li>
        )}
      </ul>

      <CheckoutButton ticketId={ticket.id} isVip={isVip} cta={ticket.cta} />
    </div>
  )
}

function CheckoutButton({
  ticketId,
  isVip,
  cta,
}: {
  ticketId: string
  isVip: boolean
  cta: string
}) {
  // En FASE 4 esto se conecta a /api/checkout (MercadoPago).
  // Por ahora link funcional con scroll suave / placeholder.
  return (
    <a
      href={`/api/checkout?ticket=${ticketId}`}
      className={`block text-center font-semibold py-4 rounded-full transition ${
        isVip
          ? 'bg-electric text-noir hover:bg-yellow-300'
          : 'border border-champagne text-champagne hover:bg-champagne hover:text-noir'
      }`}
      data-editable={`t${ticketId}-cta`}
    >
      {cta} {isVip && <span aria-hidden>→</span>}
    </a>
  )
}
