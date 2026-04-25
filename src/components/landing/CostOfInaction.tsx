import type { ReactNode } from 'react'

interface Cost { id: string; metric: string; body: string; icon: ReactNode }

const COSTS: Cost[] = [
  { id: 'cost-1', metric: '60h+', body: 'Horas al mes en operativa que la IA con Claude ya puede hacer por ti.', icon: <IconHourglass /> },
  { id: 'cost-2', metric: '∅',    body: 'Tu marca sigue invisible para el cliente que sí pagaría tu valor real.', icon: <IconEyeOff /> },
  { id: 'cost-3', metric: '$$',   body: 'Vendes desde la urgencia, no desde la autoridad. Cierras barato.',      icon: <IconTrendDown /> },
  { id: 'cost-4', metric: 'low',  body: 'Tu energía se gasta en tareas que no construyen tu siguiente nivel.',   icon: <IconBatteryLow /> },
]

export function CostOfInaction() {
  return (
    <section className="sec-shell py-24 sm:py-36 relative overflow-hidden">
      <div className="absolute top-12 left-8 hidden lg:block number-decor">02</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto reveal">
          <div className="flex items-center justify-center gap-4 mb-7">
            <div className="h-px w-8 bg-gold" />
            <div className="eyebrow">El costo de no actuar</div>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-display-lg text-ink">
            <span data-editable="cost-h">
              Cada mes que postergas, <span className="italic text-magenta">esto pasa.</span>
            </span>
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COSTS.map((c, i) => {
            const clip = i % 2 === 0 ? 'clip-corner-tr' : 'clip-corner-bl'
            return (
              <article key={c.id} className={`reveal group relative bg-bone hover:bg-paper transition-colors duration-500 ease-apple ${clip} border border-ink/10`}>
                <div className="p-8 sm:p-10 flex flex-col h-full">
                  <div className="relative mb-7 inline-flex items-center justify-center w-14 h-14">
                    <svg className="absolute inset-0 w-full h-full text-electric/30 group-hover:text-electric transition-colors duration-700" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
                      <path d="M 28,2 A 26,26 0 0 1 54,28" strokeLinecap="round" />
                    </svg>
                    <div className="text-gold-dark">{c.icon}</div>
                  </div>
                  <div className="font-display italic text-5xl text-ink mb-3 leading-none">{c.metric}</div>
                  <p className="text-base text-charcoal leading-relaxed font-light" data-editable={c.id}>
                    {c.body}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function IconHourglass() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M6 2h12M6 22h12" /><path d="M7 2v4a5 5 0 0 0 10 0V2M17 22v-4a5 5 0 0 0-10 0v4" /></svg> }
function IconEyeOff() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c5 0 9 3.5 10 7-.43 1.41-1.36 3.04-2.7 4.46" /><path d="M6.61 6.61C4.06 8.13 2.46 10.4 2 12c1 3.5 5 7 10 7 1.45 0 2.83-.23 4.09-.66" /><path d="M2 2l20 20" /></svg> }
function IconTrendDown() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 17l-8.5-8.5-5 5L2 7" /><path d="M16 17h6v-6" /></svg> }
function IconBatteryLow() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="7" width="16" height="10" rx="2" /><path d="M22 11v2" /><line x1="6" y1="11" x2="6" y2="13" /></svg> }
