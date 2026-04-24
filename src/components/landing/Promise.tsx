const PROMISES = [
  { num: '01', body: 'Tu mensaje de marca claro en <em class="text-champagne">3 niveles de voz</em>' },
  { num: '02', body: 'Tu equipo IA de <em class="text-champagne">5 agentes operando</em> tu negocio (Operación Inteligente)' },
  { num: '03', body: 'Imagen visual <em class="text-champagne">coherente con tu identidad</em>' },
  { num: '04', body: 'Estrategia de comunicación y ventas <em class="text-champagne">estructurada</em>' },
  { num: '05', body: 'Protocolo de presencia que <em class="text-champagne">proyecta autoridad</em>' },
  { num: '06', body: 'Energía renovada para <em class="text-champagne">liderar tu siguiente nivel</em>' },
] as const

export function PromiseSection() {
  return (
    <section className="py-24 sm:py-32 border-b border-champagne/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 reveal">
          <div className="lg:col-span-5">
            <div className="secnum mb-4">03 — LA PROMESA</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-cream font-light leading-[1.05]">
              <span data-editable="promise-h">
                En <em className="text-electric not-italic">6 horas</em> vas a salir con:
              </span>
            </h2>
            <div className="flourish-line my-8 max-w-xs" />
            <p className="text-cream/70 text-lg" data-editable="promise-sub">
              Todo se implementa en tiempo real. No te llevás teoría — te llevás sistema
              funcionando.
            </p>
          </div>

          <div className="lg:col-span-7">
            <ul className="space-y-5">
              {PROMISES.map((p, i) => (
                <li key={p.num} className="flex gap-5 items-start group">
                  <span className="font-mono text-champagne text-sm mt-1.5 shrink-0">
                    {p.num}
                  </span>
                  <div
                    className={`flex-1 ${
                      i < PROMISES.length - 1 ? 'border-b border-champagne/10 pb-5' : 'pb-2'
                    } group-hover:border-champagne/40 transition`}
                  >
                    <p
                      className="text-xl text-cream leading-snug"
                      data-editable={`promise-${i + 1}`}
                      dangerouslySetInnerHTML={{ __html: p.body }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
