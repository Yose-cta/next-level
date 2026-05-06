import Link from 'next/link'

/**
 * Hook — sección de transición narrativa entre Mentors y Tickets.
 *   Reposiciona el problema desde "trabaja más" hacia "deja de cargarlo todo tú".
 *   Tono: directo, empático, sin culpa. 6 acciones concretas.
 */
const ACTIONS = [
  'qué señales está enviando tu negocio hoy',
  'qué necesitas ajustar en tu presencia profesional',
  'cómo comunicar tu valor con más claridad y seguridad',
  'qué parte de tu estructura está drenando tiempo y margen',
  'cómo usar IA con criterio, no como moda',
  'cómo hacer que tu valor sea más fácil de ver, entender y comprar',
] as const

export function Hook() {
  return (
    <section className="sec-light py-24 sm:py-36 relative overflow-hidden">
      <div className="absolute top-12 right-8 hidden lg:block number-decor">·</div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center reveal">
          <h2 className="font-display text-display-lg text-ink leading-[1.05]">
            <span data-editable="hook-h-1">Esto es Next Level Experience.</span><br />
            <span className="italic text-magenta" data-editable="hook-h-2">
              No vienes a una clase más.
            </span>
          </h2>

          <p
            className="mt-9 text-lg sm:text-xl text-charcoal max-w-2xl mx-auto leading-relaxed font-light"
            data-editable="hook-body"
          >
            Una experiencia presencial de 6 horas para mirar tu negocio desde tres
            frentes que están conectados: tu <em className="not-italic text-ink font-medium">presencia</em> (lo que
            proyectas antes de hablar), tu <em className="not-italic text-ink font-medium">comunicación</em> (cómo
            explicas, conectas y vendes tu valor) y tu <em className="not-italic text-ink font-medium">estructura</em> (cómo
            sostienes tu negocio sin que todo dependa de tu cabeza).
          </p>

          <p
            className="mt-6 text-lg sm:text-xl text-ink max-w-2xl mx-auto leading-relaxed font-medium"
            data-editable="hook-body-2"
          >
            Vienes a revisar qué señales está enviando tu negocio hoy y qué necesitas ajustar para que tu valor sea más claro, más creíble y más fácil de comprar:
          </p>
        </div>

        {/* Lista de acciones */}
        <ul className="mt-12 reveal reveal-delayed grid sm:grid-cols-2 gap-x-8 gap-y-4 max-w-3xl mx-auto">
          {ACTIONS.map((action, i) => (
            <li
              key={i}
              className="flex items-start gap-4 py-3 border-b border-ink/10 last:border-b-0"
              data-editable={`hook-action-${i + 1}`}
            >
              <span className="font-mono text-xs tracking-[0.2em] text-gold-dark mt-1.5 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-base sm:text-lg text-ink leading-relaxed font-light flex-1">
                {action}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="text-center mt-14 reveal">
          <span data-magnetic="0.2" className="magnetic">
            <Link
              href="#tickets"
              className="inline-flex items-center gap-3 bg-midnight text-white font-medium px-7 py-4 rounded-full hover:bg-magenta transition-colors duration-300 ease-apple text-sm sm:text-base"
            >
              <span data-editable="hook-cta">Reservar mi entrada</span>
              <span aria-hidden>→</span>
            </Link>
          </span>
        </div>
      </div>
    </section>
  )
}
