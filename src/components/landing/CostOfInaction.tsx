import { COSTS } from '@/lib/constants'

/**
 * CostOfInaction v2 — 4 fugas (tiempo, claridad, autoridad, dinero).
 * Tono: ético — no usamos miedo manipulador; mostramos consecuencias reales
 * y verificables del status quo.
 */
export function CostOfInaction() {
  return (
    <section className="sec-shell py-24 sm:py-36 relative overflow-hidden">
      <div className="absolute top-12 right-8 hidden lg:block number-decor">02</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto reveal">
          <div className="flex items-center justify-center gap-4 mb-7">
            <div className="h-px w-8 bg-gold" />
            <div className="eyebrow">Lo que te está costando</div>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-display-lg text-ink">
            <span data-editable="cost-h">
              Cargarlo todo tú no es gratis.<br />
              <span className="italic text-magenta">Te está costando algo.</span>
            </span>
          </h2>
          <p
            className="mt-7 text-lg text-charcoal leading-relaxed font-light max-w-2xl mx-auto"
            data-editable="cost-sub"
          >
            Puede que hoy no lo veas como una pérdida. Pero cada tarea repetida y
            cada venta que comunicas con poca seguridad te está costando algo
            concreto.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COSTS.map((c, i) => {
            const clip = i % 2 === 0 ? 'clip-corner-tr' : 'clip-corner-bl'
            const accents = ['text-magenta', 'text-gold-dark', 'text-magenta', 'text-gold-dark']
            return (
              <article
                key={c.id}
                className={`reveal group relative bg-bone hover:bg-paper transition-colors duration-500 ease-apple ${clip} border border-ink/10`}
              >
                <div className="p-8 sm:p-9 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-7">
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ash">
                      0{i + 1} · Fuga
                    </span>
                    <span className={`text-3xl ${accents[i]} leading-none`} aria-hidden>
                      —
                    </span>
                  </div>

                  <div className="font-display italic text-4xl sm:text-5xl text-ink mb-4 leading-none">
                    {c.metric}
                  </div>

                  <div className="h-px w-12 bg-ink/15 mb-5 group-hover:bg-magenta group-hover:w-20 transition-all duration-500 ease-apple" />

                  <p
                    className="text-base text-charcoal leading-relaxed font-light"
                    data-editable={c.id}
                  >
                    {c.body}
                  </p>
                </div>
              </article>
            )
          })}
        </div>

        {/* Pregunta de cierre */}
        <div className="mt-16 text-center reveal max-w-3xl mx-auto">
          <p className="font-display italic text-2xl sm:text-3xl text-ink leading-snug">
            <span data-editable="cost-question">
              La pregunta no es si trabajas duro.<br />
              <span className="text-magenta">
                Es cuánto más puedes crecer si sigues cargándolo todo tú.
              </span>
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
