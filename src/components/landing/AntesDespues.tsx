import { SHIFTS } from '@/lib/constants'

/**
 * AntesDespues — tabla comparativa visual.
 * Antes: tono apagado, deslucido. Después: claridad, color, dirección.
 * Diseño: dos columnas separadas por una línea narrativa "→ NEXT LEVEL ←".
 */
export function AntesDespues() {
  return (
    <section className="sec-shell py-24 sm:py-36 relative overflow-hidden">
      <div className="absolute top-12 right-8 hidden lg:block number-decor">05</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 reveal">
          <div className="flex items-center justify-center gap-4 mb-7">
            <div className="h-px w-8 bg-gold" />
            <div className="eyebrow">El cambio</div>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-display-lg text-ink leading-[1.05]">
            <span data-editable="shifts-h">
              No vas a salir igual<br />
              <span className="italic text-magenta">a como llegaste.</span>
            </span>
          </h2>
        </div>

        <div className="reveal">
          {/* Headers de columnas */}
          <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-x-8 mb-6 items-center">
            <div className="text-right">
              <div className="eyebrow text-ash">Antes</div>
            </div>
            <div className="px-6 py-2 bg-midnight text-white text-[10px] font-mono uppercase tracking-[0.3em] rounded-full">
              Next Level
            </div>
            <div className="text-left">
              <div className="eyebrow text-magenta">Después</div>
            </div>
          </div>

          {/* Filas */}
          <ol className="divide-y divide-ink/10 border-y border-ink/15 bg-bone">
            {SHIFTS.map((s, i) => (
              <li
                key={i}
                className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-x-8 gap-y-2 py-6 sm:py-7 px-4 sm:px-8 items-center hover:bg-paper transition-colors duration-300"
              >
                {/* Antes */}
                <div className="md:text-right">
                  <span className="md:hidden eyebrow text-ash block mb-2">Antes</span>
                  <p
                    className="text-base sm:text-lg text-charcoal/85 leading-snug font-light line-through decoration-ash/40"
                    data-editable={`shift-${i}-before`}
                  >
                    {s.before}
                  </p>
                </div>

                {/* Flecha */}
                <div className="hidden md:flex items-center justify-center text-magenta opacity-60 group-hover:opacity-100">
                  <ArrowRight />
                </div>

                {/* Después */}
                <div>
                  <span className="md:hidden eyebrow text-magenta block mb-2 mt-3">Después</span>
                  <p
                    className="text-base sm:text-lg text-ink leading-snug font-medium"
                    data-editable={`shift-${i}-after`}
                  >
                    {s.after}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p
            className="mt-10 text-center text-base sm:text-lg text-charcoal max-w-2xl mx-auto leading-relaxed font-light"
            data-editable="shifts-foot"
          >
            <em className="not-italic font-medium text-ink">
              No es una clase de IA. No es una clase de imagen. No es una clase de comunicación.
            </em>{' '}
            Es una experiencia para entender cómo esas tres cosas impactan en una sola
            pregunta: ¿por qué alguien debería confiar, elegir y pagar por lo que haces?
          </p>
        </div>
      </div>
    </section>
  )
}

function ArrowRight() {
  return (
    <svg width="32" height="14" viewBox="0 0 32 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden>
      <path d="M0 7h28" />
      <path d="M22 1l6 6-6 6" />
    </svg>
  )
}
