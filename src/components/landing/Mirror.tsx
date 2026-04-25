/**
 * Mirror — el espejo. Sección que valida la realidad del lector.
 * Tono: directo, humano, sin culpa. Coherente con el copy:
 *   "Estás trabajando mucho, pero sigues demasiado dentro de todo."
 */
export function Mirror() {
  return (
    <section className="sec-light py-24 sm:py-36 relative overflow-hidden">
      <div className="absolute top-12 left-8 hidden lg:block number-decor">01</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 reveal">
            <div className="flex items-center gap-4 mb-7">
              <div className="h-px w-10 bg-gold" />
              <div className="eyebrow">El espejo</div>
            </div>
            <h2 className="font-display text-display-lg text-ink leading-[1.05]">
              <span data-editable="mirror-h">
                Estás trabajando mucho,{' '}
                <span className="italic text-magenta">
                  pero sigues demasiado dentro de todo.
                </span>
              </span>
            </h2>

            <p
              className="mt-9 text-lg sm:text-xl text-charcoal leading-relaxed max-w-2xl font-light"
              data-editable="mirror-body"
            >
              Respondes mensajes. Haces seguimiento. Corriges detalles. Explicas lo
              mismo una y otra vez. Improvisas procesos. Apagas fuegos. Y encima
              tienes que mostrarte, vender y comunicar tu valor.
            </p>

            <p
              className="mt-6 text-lg sm:text-xl text-charcoal leading-relaxed max-w-2xl font-light"
              data-editable="mirror-body-2"
            >
              No es que te falte talento.{' '}
              <span className="text-ink font-medium">
                Es que tu negocio todavía depende demasiado de ti.
              </span>
            </p>

            <blockquote className="mt-12 pl-6 border-l-2 border-electric max-w-xl">
              <p
                className="font-display italic text-2xl sm:text-3xl text-ink leading-snug"
                data-editable="mirror-quote"
              >
                "Mientras tú sigas siendo quien lo sostiene todo, tu crecimiento
                tendrá el mismo techo de siempre: tu tiempo, tu energía, tu claridad."
              </p>
            </blockquote>
          </div>

          {/* Lista de "loops" del día a día */}
          <div className="lg:col-span-5 reveal reveal-delayed">
            <div className="bg-paper border border-ink/10 p-7 sm:p-9 clip-corner-tr relative">
              <div className="absolute -top-3 left-7 bg-bone px-3 py-1 border border-ink/15">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ash">
                  El loop diario
                </span>
              </div>

              <ul className="space-y-3.5 mt-2">
                {LOOPS.map((loop) => (
                  <li
                    key={loop}
                    className="flex items-start gap-3 text-charcoal text-sm sm:text-base leading-relaxed font-light"
                  >
                    <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-magenta" />
                    <span>{loop}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 pt-6 border-t border-ink/10">
                <div className="flex items-baseline gap-3">
                  <span className="font-display italic text-4xl text-magenta leading-none">∞</span>
                  <p className="text-sm text-ash font-light">
                    Y mañana, exactamente lo mismo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const LOOPS = [
  'Respondes mensajes que podrías delegar.',
  'Haces seguimiento manualmente.',
  'Corriges los mismos detalles cada semana.',
  'Explicas tu oferta una y otra vez.',
  'Improvisas procesos que viven en tu cabeza.',
  'Apagas fuegos antes de poder pensar.',
  'Y encima tienes que mostrarte, vender y comunicar tu valor.',
] as const
