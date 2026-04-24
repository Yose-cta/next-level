import { MENTORS, type Mentor } from '@/lib/constants'

const ACCENT_MAP = {
  electric: { text: 'text-electric', border: 'border-electric', italicCierre: 'text-electric' },
  champagne: { text: 'text-champagne', border: 'border-champagne', italicCierre: 'text-champagne' },
  blood: { text: 'text-red-400', border: 'border-blood', italicCierre: 'text-red-400' },
} as const

export function Mentors() {
  return (
    <section id="mentores" className="py-24 sm:py-32 border-b border-champagne/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 mb-16 reveal">
          <div className="lg:col-span-5">
            <div className="secnum mb-4">05 — LOS TRES MENTORES</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-cream font-light leading-[1.05]">
              <span data-editable="mentors-h">
                Una experiencia. <em className="text-champagne">Tres mentes.</em> Cero teoría.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-lg text-cream/75 leading-relaxed" data-editable="mentors-body">
              No te van a hablar desde la teoría. Te van a guiar EN VIVO mientras aplicás
              cada paso a tu propio negocio. Cada mentor trae 90 minutos de implementación
              real — no de slides.
            </p>
          </div>
        </div>

        {MENTORS.map((mentor, i) => (
          <MentorCard key={mentor.id} mentor={mentor} reverse={i % 2 === 1} isLast={i === MENTORS.length - 1} />
        ))}
      </div>
    </section>
  )
}

function MentorCard({
  mentor,
  reverse,
  isLast,
}: {
  mentor: Mentor
  reverse: boolean
  isLast: boolean
}) {
  const accent = ACCENT_MAP[mentor.accent]

  return (
    <article
      className={`grid lg:grid-cols-12 gap-10 lg:gap-14 ${isLast ? '' : 'mb-24'} reveal items-start`}
    >
      <div className={`lg:col-span-5 ${reverse ? 'lg:order-2 order-1' : ''}`}>
        <div
          data-image={`mentor-${mentor.id}`}
          data-label={`${mentor.name} · sube tu foto`}
          className="aspect-[3/4] w-full rounded-sm"
        />
        <div className="mt-4 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-mutedc">
          <span>Módulo {mentor.moduleNumber}</span>
          <span>{mentor.moduleTime}</span>
        </div>
      </div>

      <div className={`lg:col-span-7 ${reverse ? 'lg:order-1 order-2' : ''}`}>
        <div
          className={`font-mono text-xs tracking-[0.3em] uppercase mb-3 ${accent.text}`}
          data-editable={`m${mentor.id}-tag`}
        >
          {mentor.tag}
        </div>
        <h3
          className="font-display text-3xl sm:text-4xl lg:text-5xl text-cream font-light leading-[1.05]"
          data-editable={`m${mentor.id}-name`}
        >
          {mentor.name}
        </h3>
        <p
          className="font-display italic text-xl text-champagne mt-3"
          data-editable={`m${mentor.id}-role`}
        >
          {mentor.role}
        </p>

        <p
          className={`mt-8 text-2xl font-display italic text-cream/90 leading-snug border-l-2 pl-6 ${accent.border}`}
          data-editable={`m${mentor.id}-lema`}
        >
          "{mentor.lema}"
        </p>

        <p
          className="mt-8 text-lg text-cream/80 leading-relaxed"
          data-editable={`m${mentor.id}-body`}
        >
          {mentor.body}
        </p>

        <div className="mt-10 border-t border-champagne/20 pt-8">
          <div
            className="font-mono text-xs uppercase tracking-[0.25em] text-champagne mb-5"
            data-editable={`m${mentor.id}-deliverables-h`}
          >
            Vas a salir con
          </div>
          <ul className="space-y-3">
            {mentor.deliverables.map((d, i) => (
              <li key={i} className="flex gap-4 text-cream/85">
                <span className={`${accent.text} mt-1`}>✓</span>
                <span data-editable={`m${mentor.id}-d${i + 1}`}>{d}</span>
              </li>
            ))}
          </ul>
          <p
            className={`mt-8 font-display italic text-xl ${accent.italicCierre}`}
            data-editable={`m${mentor.id}-cierre`}
          >
            {mentor.cierre}
          </p>
        </div>
      </div>
    </article>
  )
}
