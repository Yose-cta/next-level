interface Cost {
  id: string
  metric: string
  body: string
}

const COSTS: Cost[] = [
  {
    id: 'cost-1',
    metric: '60h+',
    body: 'Horas al mes en operativa que la IA ya puede hacer por vos.',
  },
  {
    id: 'cost-2',
    metric: '∅',
    body: 'Tu marca sigue invisible para el cliente que sí pagaría tu valor real.',
  },
  {
    id: 'cost-3',
    metric: '$$',
    body: 'Vendés desde la urgencia, no desde la autoridad. Cerrás barato.',
  },
  {
    id: 'cost-4',
    metric: '⌛',
    body: 'Tu energía se gasta en tareas que no construyen tu siguiente nivel.',
  },
]

export function CostOfInaction() {
  return (
    <section className="py-24 sm:py-32 bg-noir-2 border-b border-champagne/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto reveal">
          <div className="secnum mb-4">02 — EL COSTO DE NO ACTUAR</div>
          <h2 className="font-display text-4xl sm:text-5xl text-cream font-light">
            <span data-editable="cost-h">Cada mes que postergás, esto pasa:</span>
          </h2>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COSTS.map((c) => (
            <div
              key={c.id}
              className="reveal p-7 border border-champagne/15 bg-noir-3 hover:border-champagne/40 transition"
            >
              <div className="font-display text-5xl text-electric mb-4">{c.metric}</div>
              <p className="text-cream/80 leading-snug" data-editable={c.id}>
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
