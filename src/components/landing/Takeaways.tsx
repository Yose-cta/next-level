import Link from 'next/link'
import { TAKEAWAYS } from '@/lib/constants'

export function Takeaways() {
  return (
    <section id="programa" className="sec-light py-24 sm:py-36 relative overflow-hidden">
      <div className="absolute top-12 left-8 hidden lg:block number-decor">04</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 sm:mb-20 reveal">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-7">
              <div className="h-px w-8 bg-gold" />
              <div className="eyebrow">Tus resultados tangibles</div>
            </div>
            <h2 className="font-display text-display-lg text-ink">
              <span data-editable="take-h">
                6 entregables.<br />
                <span className="italic text-magenta">Cero teoría.</span>
              </span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p className="text-lg text-charcoal leading-relaxed font-light" data-editable="take-body">
              No sales con apuntes. Sales con cosas <em className="text-ink not-italic font-medium">hechas</em>:
              tu sistema operativo IA funcionando, tu paleta de color, tu pitch refinado, tu
              plan de los próximos 90 días. Implementación pura, en vivo, con tres expertos
              guiándote paso a paso.
            </p>
          </div>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TAKEAWAYS.map((t, i) => {
            const clip = i % 3 === 0 ? 'clip-corner-tr' : i % 3 === 1 ? '' : 'clip-corner-bl'
            return (
              <li key={t.n} className={`reveal group bg-paper p-8 sm:p-10 flex flex-col gap-5 hover:bg-bone-dark transition-colors duration-500 ease-apple border border-ink/10 relative ${clip}`}>
                <div className="flex items-center justify-between">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-electric/40 group-hover:border-electric transition-colors duration-500" />
                    <div className="absolute inset-2 rounded-full border border-ink/8 group-hover:border-electric/40 transition-colors duration-700" />
                    <span className="font-display italic text-2xl text-ink relative z-10" data-editable={`take-${t.n}-num`}>
                      {t.n}
                    </span>
                  </div>
                  <span className="w-8 h-px bg-ink/15 group-hover:bg-magenta group-hover:w-16 transition-all duration-500 ease-apple" />
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-ink leading-tight pt-2" data-editable={`take-${t.n}-title`}>
                  {t.title}
                </h3>
                <p className="text-base text-charcoal leading-relaxed font-light" data-editable={`take-${t.n}-body`}>
                  {t.body}
                </p>
              </li>
            )
          })}
        </ul>

        <div className="text-center mt-14 reveal">
          <span data-magnetic="0.2" className="magnetic">
            <Link href="#tickets" className="inline-flex items-center gap-3 bg-midnight text-white font-medium px-7 py-4 rounded-full hover:bg-magenta transition-colors duration-300 ease-apple text-sm sm:text-base">
              <span data-editable="take-cta">Quiero llevarme estos resultados</span>
              <span aria-hidden>→</span>
            </Link>
          </span>
        </div>
      </div>
    </section>
  )
}
