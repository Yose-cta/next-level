import Link from 'next/link'

const GUIDES = [
  {
    slug: 'comunicacion',
    number: '01',
    title: 'Domina tu Comunicación',
    mentor: 'Sebastián Villar',
    handle: '@sebavillarg',
    description: 'Mentalidad de speaker, lenguaje no verbal, storytelling y tu pitch irresistible.',
    blocks: ['Mentalidad de Speaker', 'Lenguaje No Verbal', 'Storytelling y Persuasión'],
    accent: 'electric' as const,
    ready: true,
  },
  {
    slug: 'imagen',
    number: '02',
    title: 'Tu Imagen Profesional',
    mentor: 'Valentina',
    handle: '@valentina.asesoradeimagen',
    description: 'Primeras impresiones, código de vestimenta, colorimetría y psicología del color.',
    blocks: ['Primeras Impresiones', 'Código de Vestimenta', 'Colorimetría y Color'],
    accent: 'magenta' as const,
    ready: true,
  },
  {
    slug: 'ia',
    number: '03',
    title: 'IA Aplicada con Claude',
    mentor: 'Yoselvia Adam',
    handle: '@yosmentedigital',
    description: 'Domina la inteligencia artificial como herramienta estratégica para tu negocio.',
    blocks: ['Mentalidad IA', 'Claude en Acción', 'Automatiza tu Negocio'],
    accent: 'electric' as const,
    ready: false,
  },
] as const

export default function GuiasHub() {
  return (
    <section className="sec-dark py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="eyebrow text-electric mb-4 block">Material del evento</span>
          <h1 className="font-display italic text-display-lg mb-4">
            Guías Interactivas
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            No leas teoría. <span className="text-white">Practica, responde y construye</span> tus
            herramientas en tiempo real.
          </p>
        </div>

        {/* Guide cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {GUIDES.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-white/30 mt-16">
          Next Level Experience · 16 Mayo 2026 · Providencia, Santiago
        </p>
      </div>
    </section>
  )
}

function GuideCard({ guide }: { guide: (typeof GUIDES)[number] }) {
  const accentText = guide.accent === 'magenta' ? 'text-magenta' : 'text-electric'
  const accentBorder = guide.accent === 'magenta' ? 'border-magenta/30' : 'border-electric/30'
  const accentGlow = guide.accent === 'magenta' ? 'group-hover:border-magenta/50' : 'group-hover:border-electric/50'
  const accentBg = guide.accent === 'magenta' ? 'bg-magenta/10' : 'bg-electric/10'

  const cardClasses = `group relative flex flex-col bg-midnight-2 border ${accentBorder} ${accentGlow} rounded-2xl p-7 sm:p-8 transition-all duration-300 ${guide.ready ? 'cursor-pointer hover:-translate-y-1' : 'opacity-60'} reveal`

  const inner = (
    <>
      <span className={`font-display text-6xl font-bold ${accentText} opacity-15 absolute top-4 right-6`}>
        {guide.number}
      </span>

      {!guide.ready && (
        <span className="absolute top-4 left-6 eyebrow text-white/40 bg-white/5 px-3 py-1 rounded-full text-[10px]">
          Próximamente
        </span>
      )}

      <div className="mt-6">
        <h2 className="font-display italic text-2xl sm:text-3xl mb-2">{guide.title}</h2>
        <p className="text-sm text-white/40 mb-4">
          {guide.mentor} · {guide.handle}
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-6">{guide.description}</p>
      </div>

      <div className="mt-auto space-y-2">
        {guide.blocks.map((block, i) => (
          <div key={block} className={`flex items-center gap-3 text-sm ${accentBg} rounded-lg px-3 py-2`}>
            <span className={`font-mono text-xs ${accentText}`}>0{i + 1}</span>
            <span className="text-white/80">{block}</span>
          </div>
        ))}
      </div>

      {guide.ready && (
        <div className={`mt-6 text-center ${accentText} text-sm font-medium`}>
          Comenzar guía →
        </div>
      )}
    </>
  )

  if (guide.ready) {
    return <Link href={`/guias/${guide.slug}`} className={cardClasses}>{inner}</Link>
  }

  return <div className={cardClasses}>{inner}</div>
}
