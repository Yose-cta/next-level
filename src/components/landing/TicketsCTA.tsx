import { CheckoutButton } from '@/components/tracking/CheckoutButton'
import { TICKETS } from '@/lib/constants'

const GENERAL = TICKETS.find((t) => t.id === 'general')!
const VIP = TICKETS.find((t) => t.id === 'vip')!

/**
 * CTA intermedio después de testimonios — segundo punto de conversión.
 * Muestra ambas opciones con precio y botón directo.
 */
export function TicketsCTA() {
  return (
    <section className="sec-dark py-20 sm:py-28 relative overflow-hidden">
      <div
        className="absolute pointer-events-none w-[500px] h-[500px] rounded-full opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(243, 37, 154, 0.4), transparent 70%)',
          filter: 'blur(100px)',
        }}
        aria-hidden
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative reveal">
        <h2 className="font-display text-display-md sm:text-display-lg text-white leading-[1.05]">
          <span data-editable="cta2-h">
            Ya viste lo que se trabaja.{' '}
            <span className="italic text-electric">Ahora elige cómo quieres vivirlo.</span>
          </span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-white/70 font-light max-w-xl mx-auto leading-relaxed">
          <span className="text-white">Entrada General</span> si quieres la experiencia completa.{' '}
          <span className="text-electric">Entrada VIP</span> si quieres aplicar lo aprendido a tu caso
          con 3 sesiones privadas después del evento.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <CheckoutButton
            ticket={GENERAL}
            className="inline-flex items-center justify-center gap-2.5 bg-white text-midnight font-semibold px-7 py-4 rounded-full hover:bg-electric transition-colors text-sm sm:text-base w-full sm:w-auto"
          >
            <span>Reservar General — $67.000</span>
            <span aria-hidden>→</span>
          </CheckoutButton>

          <CheckoutButton
            ticket={VIP}
            className="inline-flex items-center justify-center gap-2.5 bg-electric text-midnight font-semibold px-7 py-4 rounded-full hover:bg-yellow-300 transition-colors text-sm sm:text-base shadow-glow-electric w-full sm:w-auto"
          >
            <span>Reservar VIP — $147.000</span>
            <span aria-hidden>→</span>
          </CheckoutButton>
        </div>

        <p className="mt-5 text-xs text-white/40 font-mono uppercase tracking-[0.2em]">
          Pago seguro vía Mercado Pago · Cupos limitados
        </p>
      </div>
    </section>
  )
}
