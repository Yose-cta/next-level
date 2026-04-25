import { TICKETS } from '@/lib/constants'

export function Tickets() {
  const visible = TICKETS.filter((t) => !t.hidden)

  return (
    <section id="tickets" className="sec-dark py-24 sm:py-36 relative overflow-hidden">
      {/* Sutil orb magenta */}
      <div className="absolute pointer-events-none w-[500px] h-[500px] rounded-full opacity-25 top-0 right-0" style={{ background: 'radial-gradient(circle, rgba(243, 37, 154, 0.5), transparent 70%)', filter: 'blur(100px)' }} aria-hidden />
      <div className="absolute top-12 right-8 hidden lg:block number-decor">06</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-14 reveal">
          <div className="flex items-center justify-center gap-4 mb-7">
            <div className="h-px w-8 bg-electric" />
            <div className="eyebrow">Tu inversión</div>
            <div className="h-px w-8 bg-electric" />
          </div>
          <h2 className="font-display text-display-lg text-white">
            <span data-editable="tickets-h">
              Dos formas de vivir<br />
              <span className="italic text-electric">Next Level Experience.</span>
            </span>
          </h2>
          <p className="mt-7 text-lg text-white/70 font-light" data-editable="tickets-sub">
            Una para implementar. Otra para acelerar con sesión 1:1 online post-evento.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {visible.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)}
        </div>

        <p className="text-center mt-10 text-xs sm:text-sm text-white/45 font-mono uppercase tracking-[0.2em] reveal" data-editable="tickets-foot">
          Pago seguro vía Mercado Pago Chile · Reserva en 60 segundos
        </p>
      </div>
    </section>
  )
}

function TicketCard({ ticket }: { ticket: (typeof TICKETS)[number] }) {
  const isVip = ticket.id === 'vip'

  return (
    <div className="relative group reveal">
      <div className={`ticket-shape relative p-8 sm:p-10 flex flex-col transition-all duration-500 ease-apple group-hover:-translate-y-1 ${isVip ? 'bg-gradient-to-br from-electric/15 via-magenta/5 to-midnight-2 border border-electric/30' : 'bg-midnight-2 border border-white/15'}`}>
        {ticket.badge && (
          <div className="absolute top-0 right-12 bg-electric text-midnight font-semibold uppercase text-[10px] tracking-[0.2em] px-3.5 py-1.5 z-10">
            {ticket.badge}
          </div>
        )}

        <div className={`eyebrow mb-3 ${isVip ? '!text-electric' : ''}`} data-editable={`t${ticket.id}-tag`}>
          {ticket.tagline}
        </div>
        <h3 className="font-display italic text-4xl sm:text-5xl text-white leading-none mb-4" data-editable={`t${ticket.id}-name`}>
          {ticket.name}
        </h3>
        <p className="text-white/70 mb-7 text-sm sm:text-base leading-relaxed font-light" data-editable={`t${ticket.id}-sub`}>
          {ticket.description}
        </p>

        <div className="flex items-center gap-3 mb-7 text-white/30">
          <div className="flex-1 dashed-edge h-px" />
          <span className="text-[9px] tracking-[0.3em] uppercase font-mono">No transferible</span>
          <div className="flex-1 dashed-edge h-px" />
        </div>

        <div className="flex items-baseline gap-3 mb-9 pb-9 border-b border-white/15">
          <span className={`font-display text-6xl sm:text-7xl leading-none italic ${isVip ? 'text-electric' : 'text-white'}`} data-editable={`t${ticket.id}-price`}>
            {ticket.price.display}
          </span>
          <span className="text-sm text-white/45" data-editable={`t${ticket.id}-price-sub`}>
            {ticket.price.currency} · pago único
          </span>
        </div>

        <ul className="space-y-3.5 flex-1 mb-9">
          {ticket.features.map((f, i) => (
            <li key={i} className="flex gap-3 text-sm sm:text-base leading-relaxed font-light text-white/85">
              <span className={`mt-0.5 shrink-0 ${isVip ? 'text-electric' : 'text-white/60'}`}>
                {isVip ? '★' : '✓'}
              </span>
              <span data-editable={`t${ticket.id}-${i + 1}`} dangerouslySetInnerHTML={{ __html: f }} />
            </li>
          ))}

          {'highlight' in ticket && ticket.highlight && (
            <li className="flex gap-3 bg-electric/[0.08] p-4 border border-electric/30 mt-2">
              <span className="text-electric mt-0.5 shrink-0">★</span>
              <span>
                <strong className="block text-white text-sm sm:text-base font-semibold" data-editable={`t${ticket.id}-highlight-h`}>
                  {ticket.highlight.title}
                </strong>
                <p className="text-white/70 text-sm mt-1.5 leading-relaxed font-light" data-editable={`t${ticket.id}-highlight-body`}>
                  {ticket.highlight.body}
                </p>
              </span>
            </li>
          )}
        </ul>

        <span data-magnetic="0.2" className="magnetic block">
          <a href={`/api/checkout?ticket=${ticket.id}`} className={`block text-center font-medium py-5 rounded-full transition-colors duration-300 text-sm sm:text-base ${isVip ? 'bg-electric text-midnight hover:bg-yellow-300' : 'bg-white text-midnight hover:bg-electric'}`} data-editable={`t${ticket.id}-cta`}>
            {ticket.cta} {isVip && <span aria-hidden>→</span>}
          </a>
        </span>
      </div>
    </div>
  )
}
