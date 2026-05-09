import Link from 'next/link'

export default function IAGuide() {
  return (
    <section className="sec-dark py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="eyebrow text-electric mb-3 block">Guía interactiva · Yoselvia Adam</span>
        <h1 className="font-display italic text-display-lg mb-4">
          IA Aplicada con Claude
        </h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
          Domina la inteligencia artificial como herramienta estratégica para tu negocio.
        </p>

        <div className="bg-midnight-2 border border-electric/20 rounded-2xl p-8 sm:p-12 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-electric/10 border border-electric/30 flex items-center justify-center mx-auto mb-6">
            <span className="text-electric text-2xl">◇</span>
          </div>
          <h2 className="font-display italic text-2xl mb-3">Próximamente</h2>
          <p className="text-white/50 text-sm mb-8">
            Esta guía estará disponible antes del evento. Incluirá ejercicios prácticos
            con Claude, prompting estratégico y automatización para tu negocio.
          </p>

          <div className="space-y-3 text-left">
            {[
              'Mentalidad IA: Tu cerebro vs la herramienta',
              'Claude en Acción: Prompting estratégico',
              'Automatiza tu Negocio: Workflows con IA',
            ].map((item, i) => (
              <div key={item} className="flex items-center gap-3 bg-midnight-3 border border-white/5 rounded-xl px-4 py-3">
                <span className="font-mono text-xs text-electric/50">0{i + 1}</span>
                <span className="text-sm text-white/40">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/guias"
            className="text-sm text-white/50 border border-white/10 rounded-xl px-6 py-3 hover:border-white/30 transition-colors"
          >
            ← Volver a guías
          </Link>
        </div>
      </div>
    </section>
  )
}
