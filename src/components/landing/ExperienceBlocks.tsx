import Link from 'next/link'
import { EXPERIENCE_BLOCKS } from '@/lib/constants'

const ACCENT_MAP = {
  electric: {
    text: 'text-electric',
    border: 'border-electric/40',
    bg: 'bg-electric/5',
    chip: 'bg-electric/15 text-electric border-electric/40',
  },
  champagne: {
    text: 'text-champagne',
    border: 'border-champagne/40',
    bg: 'bg-champagne/5',
    chip: 'bg-champagne/15 text-champagne border-champagne/40',
  },
  blood: {
    text: 'text-red-400',
    border: 'border-blood/40',
    bg: 'bg-blood/5',
    chip: 'bg-blood/15 text-red-400 border-blood/40',
  },
} as const

export function ExperienceBlocks() {
  return (
    <section
      id="experiencia"
      className="py-24 sm:py-32 bg-noir-2 border-b border-champagne/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="secnum mb-4">04 — LO QUE TE LLEVÁS</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-cream font-light leading-[1.05]">
            <span data-editable="exp-h">
              3 bloques. <em className="text-electric not-italic">3 entregables tangibles.</em>
              <br />
              Te vas con sistema funcionando.
            </span>
          </h2>
          <p className="mt-6 text-lg text-cream/70" data-editable="exp-sub">
            Cada mentor te entrega algo concreto, aplicado a TU negocio en vivo. No teoría
            — implementación.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {EXPERIENCE_BLOCKS.map((block) => {
            const accent = ACCENT_MAP[block.accent]
            return (
              <article
                key={block.id}
                className={`reveal flex flex-col p-7 sm:p-8 rounded-sm bg-noir-3 border border-champagne/15 hover:border-champagne/40 transition group`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className={`secnum ${accent.text}`}>BLOQUE {block.moduleNumber}</span>
                  <span
                    className={`text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full border ${accent.chip}`}
                  >
                    {block.mentor}
                  </span>
                </div>

                <div
                  data-image={`${block.id}-photo`}
                  data-label={`Bloque ${block.moduleNumber} · imagen`}
                  className="aspect-[4/3] w-full rounded-sm mb-6"
                />

                <h3
                  className="font-display text-2xl sm:text-3xl text-cream leading-tight mb-6"
                  data-editable={`${block.id}-title`}
                >
                  {block.title}
                </h3>

                <div className="space-y-5 flex-1">
                  <Block label="QUÉ APRENDÉS" accent={accent.text}>
                    <p className="text-cream/80 leading-relaxed" data-editable={`${block.id}-learn`}>
                      {block.learn}
                    </p>
                  </Block>

                  <Block label="QUÉ TE LLEVÁS" accent={accent.text}>
                    <ul className="space-y-2">
                      {block.take.map((item, i) => (
                        <li key={i} className="flex gap-3 text-cream/85 text-sm leading-snug">
                          <span className={accent.text}>✓</span>
                          <span data-editable={`${block.id}-take-${i + 1}`}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Block>

                  <Block label="QUÉ CAMBIA" accent={accent.text}>
                    <p
                      className="font-display italic text-cream leading-snug text-lg"
                      data-editable={`${block.id}-change`}
                    >
                      {block.change}
                    </p>
                  </Block>
                </div>
              </article>
            )
          })}
        </div>

        <div className="text-center mt-16 reveal">
          <Link
            href="#tickets"
            className="inline-flex items-center gap-2 bg-electric text-noir font-semibold px-7 py-4 rounded-full hover:bg-yellow-300 transition"
          >
            Quiero llevarme estos resultados
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

function Block({
  label,
  accent,
  children,
}: {
  label: string
  accent: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div
        className={`font-mono text-[10px] uppercase tracking-[0.25em] mb-2 ${accent}`}
      >
        {label}
      </div>
      {children}
    </div>
  )
}
