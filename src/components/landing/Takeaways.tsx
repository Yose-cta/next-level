import Link from 'next/link'
import { TAKEAWAYS } from '@/lib/constants'

/**
 * Takeaways — qué te llevas de las 6 horas.
 * Tono ético: prometemos claridad, recursos y dirección. No "todo resuelto".
 */
export function Takeaways() {
  return (
    <section
      id="programa"
      className="sec-light py-24 sm:py-36 relative overflow-hidden"
    >
      <div className="absolute top-12 left-8 hidden lg:block number-decor">04</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header centrado: eyebrow + headline + body — todo en columna, sin gap visual */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20 reveal">
          <h2 className="font-display text-display-lg text-ink">
            <span data-editable="take-h">
              Lo que vas a lograr en Next Level{' '}
              <span className="italic text-magenta">no es "aprender más".</span>
            </span>
          </h2>
          <p
            className="mt-7 text-lg text-charcoal leading-relaxed font-light max-w-2xl mx-auto"
            data-editable="take-body"
          >
            No te vamos a prometer transformaciones mágicas. Pero sí vas a salir con{' '}
            <em className="text-ink not-italic font-medium">
              más precisión, más criterio y más dirección
            </em>{' '}
            para que tu negocio se perciba, se comunique y se sostenga al nivel
            de lo que realmente vales.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TAKEAWAYS.map((t, i) => {
            const clip = i % 3 === 0 ? 'clip-corner-tr' : i % 3 === 1 ? '' : 'clip-corner-bl'
            return (
              <li
                key={t.n}
                className={`reveal group bg-paper p-8 sm:p-10 flex flex-col gap-5 hover:bg-bone-dark transition-colors duration-500 ease-apple border border-ink/10 relative ${clip}`}
              >
                <div className="flex items-center justify-between">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-electric/40 group-hover:border-electric transition-colors duration-500" />
                    <div className="absolute inset-2 rounded-full border border-ink/8 group-hover:border-electric/40 transition-colors duration-700" />
                    <span
                      className="font-display italic text-2xl text-ink relative z-10"
                      data-editable={`take-${t.n}-num`}
                    >
                      {t.n}
                    </span>
                  </div>
                  <span className="w-8 h-px bg-ink/15 group-hover:bg-magenta group-hover:w-16 transition-all duration-500 ease-apple" />
                </div>

                <h3
                  className="font-display text-2xl sm:text-3xl text-ink leading-tight pt-2"
                  data-editable={`take-${t.n}-title`}
                >
                  {t.title}
                </h3>
                <p
                  className="text-base text-charcoal leading-relaxed font-light"
                  data-editable={`take-${t.n}-body`}
                >
                  {t.body}
                </p>
              </li>
            )
          })}
        </ul>

        <p
          className="text-center mt-12 text-base text-charcoal/80 font-light max-w-2xl mx-auto leading-relaxed italic reveal"
          data-editable="take-cierre"
        >
          El objetivo no es que parezcas más profesional. Es que tu negocio sea
          más fácil de entender, confiar y comprar.
        </p>

        <div className="text-center mt-10 reveal">
          <span data-magnetic="0.2" className="magnetic">
            <Link
              href="#tickets"
              className="inline-flex items-center gap-3 bg-midnight text-white font-medium px-7 py-4 rounded-full hover:bg-magenta transition-colors duration-300 ease-apple text-sm sm:text-base"
            >
              <span data-editable="take-cta">Reservar mi entrada</span>
              <span aria-hidden>→</span>
            </Link>
          </span>
        </div>
      </div>
    </section>
  )
}
