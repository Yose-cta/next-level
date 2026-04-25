import Link from 'next/link'
import { MENTORS } from '@/lib/constants'

/**
 * VIPDetail — sección dedicada para detallar las 3 sesiones privadas
 * 1:1 online que vienen con la entrada VIP.
 *
 * Justificación: el copy VIP es lo que justifica los $80.000 extra.
 * Mostrarlo bien (qué disfrutas + qué te llevas en cada sesión) eleva
 * percepción de valor sin sentirse pesado.
 */
export function VIPDetail() {
  return (
    <section className="sec-light py-24 sm:py-36 relative overflow-hidden">
      <div className="absolute top-12 left-8 hidden lg:block number-decor">07</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 reveal">
          <div className="flex items-center justify-center gap-4 mb-7">
            <div className="h-px w-8 bg-gold" />
            <div className="eyebrow">Experiencia VIP · Post-evento</div>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-display-lg text-ink leading-[1.05]">
            <span data-editable="vip-h">
              3 horas privadas 1:1<br />
              <span className="italic text-magenta">para aterrizarlo todo a tu caso.</span>
            </span>
          </h2>
          <p
            className="mt-7 text-lg text-charcoal leading-relaxed font-light"
            data-editable="vip-body"
          >
            La experiencia VIP no termina cuando acaba el evento. Después tendrás
            una sesión online con cada experto para recibir una mirada
            personalizada sobre tu negocio, tu presencia y tu forma de comunicar.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-7">
          {MENTORS.map((m, i) => {
            const accentBorder = m.accent === 'electric'
              ? 'border-electric/40'
              : m.accent === 'magenta'
              ? 'border-magenta/40'
              : 'border-gold/40'
            const accentText = m.accent === 'electric'
              ? 'text-electric'
              : m.accent === 'magenta'
              ? 'text-magenta'
              : 'text-gold-dark'
            const accentDot = m.accent === 'electric'
              ? 'bg-electric'
              : m.accent === 'magenta'
              ? 'bg-magenta'
              : 'bg-gold'

            return (
              <article
                key={m.id}
                className={`reveal bg-paper border ${accentBorder} border-2 p-7 sm:p-8 flex flex-col relative ${
                  i % 2 === 0 ? 'clip-corner-tr' : 'clip-corner-bl'
                }`}
              >
                {/* Header: nombre + duración */}
                <header className="mb-5">
                  <div className={`flex items-center gap-2 ${accentText} mb-3`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${accentDot}`} />
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase font-medium">
                      Con {m.name.split(' ')[0]}
                    </span>
                  </div>
                  <h3
                    className="font-display text-2xl sm:text-3xl text-ink leading-tight"
                    data-editable={`vip-${m.id}-name`}
                  >
                    {m.vipSession.name}
                  </h3>
                  <div className="mt-3 inline-flex items-center gap-2 bg-bone border border-ink/10 px-3 py-1.5 rounded-full">
                    <ClockIcon />
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ash">
                      {m.vipSession.duration}
                    </span>
                  </div>
                </header>

                <div className="h-px bg-ink/10 my-2" />

                {/* Vas a disfrutar */}
                <div className="mt-5">
                  <div className="eyebrow text-ash mb-3">Vas a disfrutar de</div>
                  <ul className="space-y-2.5">
                    {m.vipSession.experience.map((line, j) => (
                      <li key={j} className="flex gap-3 text-sm text-charcoal leading-relaxed font-light">
                        <span className={`mt-1.5 shrink-0 w-1 h-1 rounded-full ${accentDot}`} />
                        <span data-editable={`vip-${m.id}-exp-${j}`}>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Te llevas */}
                <div className="mt-7 pt-5 border-t border-ink/10">
                  <div className="eyebrow text-ash mb-3">Te llevas</div>
                  <ul className="space-y-2.5">
                    {m.vipSession.takeaway.map((line, j) => (
                      <li key={j} className="flex gap-3 text-sm text-ink leading-relaxed">
                        <span className={`mt-0.5 shrink-0 ${accentText}`} aria-hidden>✓</span>
                        <span data-editable={`vip-${m.id}-take-${j}`}>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14 reveal">
          <span data-magnetic="0.2" className="magnetic">
            <Link
              href="/api/checkout?ticket=vip"
              className="inline-flex items-center gap-3 bg-magenta text-white font-semibold px-8 py-4 rounded-full hover:bg-ink transition-colors duration-300 ease-apple text-sm sm:text-base shadow-glow-magenta"
            >
              <span data-editable="vip-cta">Reservar Entrada VIP — $147.000</span>
              <span aria-hidden>→</span>
            </Link>
          </span>
          <p className="mt-4 text-xs text-ash font-mono uppercase tracking-[0.2em]">
            3 sesiones privadas 1:1 · post-evento · online
          </p>
        </div>
      </div>
    </section>
  )
}

function ClockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}
