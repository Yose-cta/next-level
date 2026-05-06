import { CheckoutButton } from '@/components/tracking/CheckoutButton'
import { MENTORS, TICKETS } from '@/lib/constants'

const VIP_TICKET = TICKETS.find((t) => t.id === 'vip')!

/**
 * VIPDetail — sección compacta que explica la diferencia VIP.
 * Aparece DESPUÉS de Mentors para que el usuario ya conozca
 * a los 3 expertos antes de entender por qué la VIP vale más.
 */
export function VIPDetail() {
  return (
    <section className="sec-light py-24 sm:py-36 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 reveal">
          <div className="flex items-center justify-center gap-4 mb-7">
            <div className="h-px w-8 bg-gold" />
            <div className="eyebrow">¿General o VIP?</div>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-display-lg text-ink leading-[1.05]">
            <span data-editable="vip-h">
              La General te da la experiencia.<br />
              <span className="italic text-magenta">La VIP te da dirección aplicada.</span>
            </span>
          </h2>
          <p
            className="mt-7 text-lg text-charcoal leading-relaxed font-light"
            data-editable="vip-body"
          >
            La <span className="font-medium text-ink">Entrada General</span> es para ti si quieres vivir la experiencia completa
            y llevarte claridad. La <span className="font-medium text-ink">Entrada VIP</span> es para ti si además
            quieres que revisemos tu caso después del evento con una mirada personalizada
            en IA y estructura, imagen y presencia, y comunicación y ventas.
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
                {/* Header */}
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
                </header>

                {/* Descripción compacta */}
                <p className="text-sm text-charcoal leading-relaxed font-light mb-5">
                  {m.id === 'yoselvia' &&
                    'Detectas fugas de tiempo, energía y dinero, y defines qué soltar, simplificar, automatizar o delegar primero.'}
                  {m.id === 'valentina' &&
                    'Revisas qué comunica tu imagen hoy y qué ajustes pueden ayudarte a proyectar más autoridad, coherencia y seguridad.'}
                  {m.id === 'sebastian' &&
                    'Ajustas cómo explicas tu oferta, cómo comunicas tu valor y cómo sostienes conversaciones comerciales con más seguridad.'}
                </p>

                {/* Te llevas */}
                <div className="mt-auto pt-5 border-t border-ink/10">
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
            <CheckoutButton
              ticket={VIP_TICKET}
              className="inline-flex items-center gap-3 bg-magenta text-white font-semibold px-8 py-4 rounded-full hover:bg-ink transition-colors duration-300 ease-apple text-sm sm:text-base shadow-glow-magenta"
            >
              <span data-editable="vip-cta">Reservar Entrada VIP — $147.000</span>
              <span aria-hidden>→</span>
            </CheckoutButton>
          </span>
          <p className="mt-4 text-xs text-ash font-mono uppercase tracking-[0.2em]">
            3 sesiones privadas 1:1 · post-evento · online
          </p>
        </div>
      </div>
    </section>
  )
}
