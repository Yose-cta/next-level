import Link from 'next/link'

/**
 * Hook — sección de transición narrativa entre Mentors y Tickets.
 *   Reposiciona el problema desde "trabaja más" hacia "deja de cargarlo todo tú".
 *   Tono: directo, empático, sin culpa. 6 acciones concretas.
 */
const ACTIONS = [
  'soltar tareas que ya no deberían depender de ti',
  'usar IA como apoyo real, no como juguete ni como moda',
  'proyectar una imagen más alineada con tu valor',
  'comunicar lo que haces con más seguridad',
  'vender sin minimizarte',
  'tomar decisiones desde criterio, no desde agotamiento',
] as const

export function Hook() {
  return (
    <section className="sec-light py-24 sm:py-36 relative overflow-hidden">
      <div className="absolute top-12 right-8 hidden lg:block number-decor">·</div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center reveal">
          <h2 className="font-display text-display-lg text-ink leading-[1.05]">
            <span data-editable="hook-h-1">No necesitas hacer más.</span><br />
            <span className="italic text-magenta" data-editable="hook-h-2">
              Necesitas dejar de cargarlo todo tú.
            </span>
          </h2>

          <p
            className="mt-9 text-lg sm:text-xl text-charcoal max-w-2xl mx-auto leading-relaxed font-light"
            data-editable="hook-body"
          >
            Next Level Experience no es un evento para llenarte de teoría, frases bonitas
            o motivación que se queda en el salón. Es una experiencia práctica para mirar
            tres áreas que hoy pueden estar frenando tu crecimiento: cómo está funcionando
            tu negocio por dentro, cómo te estás mostrando hacia afuera, y cómo estás
            comunicando y vendiendo tu valor.
          </p>

          <p
            className="mt-6 text-lg sm:text-xl text-ink max-w-2xl mx-auto leading-relaxed font-medium"
            data-editable="hook-body-2"
          >
            Porque tu siguiente nivel no se sostiene solo con más esfuerzo. Se sostiene
            cuando empiezas a:
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
              <span data-editable="hook-cta">Quiero vivir esta experiencia</span>
              <span aria-hidden>→</span>
            </Link>
          </span>
        </div>
      </div>
    </section>
  )
}
