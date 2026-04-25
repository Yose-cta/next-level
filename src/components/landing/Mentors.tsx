import { MENTORS, type Mentor } from '@/lib/constants'

export function Mentors() {
  return (
    <section id="mentores" className="sec-dark py-24 sm:py-36 relative overflow-hidden">
      <div className="absolute top-12 right-8 hidden lg:block number-decor">03</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 reveal">
          <div className="flex items-center justify-center gap-4 mb-7">
            <div className="h-px w-8 bg-electric" />
            <div className="eyebrow">Quiénes te guían</div>
            <div className="h-px w-8 bg-electric" />
          </div>
          <h2 className="font-display text-display-lg text-white">
            <span data-editable="mentors-h">
              Tres expertos.<br />
              <span className="italic text-electric">Tres dominios.</span> Una experiencia.
            </span>
          </h2>
          <p className="mt-7 text-lg text-white/70 leading-relaxed font-light" data-editable="mentors-body">
            No vienen a hablar desde la teoría. Cada uno trae 90 minutos de implementación
            real sobre tu propio negocio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {MENTORS.map((m, i) => <MentorProfile key={m.id} mentor={m} index={i} />)}
        </div>
      </div>
    </section>
  )
}

function MentorEmblem({ id }: { id: string }) {
  if (id === 'yoselvia') return <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden><circle cx="16" cy="16" r="4" /><circle cx="16" cy="16" r="11" strokeDasharray="2 3" opacity="0.5" /><circle cx="16" cy="3" r="1.2" fill="currentColor" /><circle cx="29" cy="16" r="1.2" fill="currentColor" /><circle cx="16" cy="29" r="1.2" fill="currentColor" /><circle cx="3" cy="16" r="1.2" fill="currentColor" /></svg>
  if (id === 'valentina') return <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden><circle cx="9" cy="16" r="6" fill="currentColor" opacity="0.85" /><circle cx="16" cy="11" r="6" fill="currentColor" opacity="0.55" /><circle cx="23" cy="16" r="6" fill="currentColor" opacity="0.3" /></svg>
  return <svg width="36" height="32" viewBox="0 0 36 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden><path d="M2 16h2M6 9v14M11 12v8M16 5v22M21 12v8M26 9v14M30 16h2M34 13v6" /></svg>
}

function MentorProfile({ mentor, index }: { mentor: Mentor; index: number }) {
  const delayClass = ['', 'reveal-delayed', 'reveal-delayed-2'][index % 3]
  const clipClass = index % 2 === 0 ? 'clip-corner-tr' : 'clip-corner-bl'

  return (
    <article className={`reveal ${delayClass} group flex flex-col`}>
      <div className="relative">
        <div data-image={`mentor-${mentor.id}`} data-label={`${mentor.name} · sube su foto`} className={`aspect-[3/4] w-full transition-transform duration-700 ease-apple group-hover:scale-[1.01] ${clipClass}`} />

        <div className="absolute top-4 left-4 flex items-center gap-2 glass-dark px-3 py-1.5 z-10">
          <span className="w-1 h-1 rounded-full bg-electric" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/85">Módulo {mentor.moduleNumber}</span>
        </div>

        <div className="absolute top-4 right-4 bg-electric text-midnight px-3 py-1.5 z-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold">{mentor.moduleTime}</span>
        </div>

        <div className="absolute -bottom-5 -right-3 bg-midnight border border-white/15 w-14 h-14 rounded-full flex items-center justify-center text-electric z-10 shadow-medium">
          <MentorEmblem id={mentor.id} />
        </div>
      </div>

      <div className="pt-9">
        <h3 className="font-display italic text-3xl sm:text-4xl text-white leading-none" data-editable={`m${mentor.id}-name`}>
          {mentor.name}
        </h3>
        <p className="mt-2.5 text-xs uppercase tracking-[0.2em] text-electric font-medium" data-editable={`m${mentor.id}-role`}>
          {mentor.role}
        </p>

        <p className="mt-7 font-display italic text-xl leading-snug text-white border-l border-electric pl-5" data-editable={`m${mentor.id}-lema`}>
          "{mentor.lema}"
        </p>

        <p className="mt-6 text-base text-white/65 leading-relaxed font-light" data-editable={`m${mentor.id}-bio`}>
          {mentor.bio}
        </p>

        <div className="mt-6 pt-6 border-t border-white/10">
          <span className="eyebrow !text-white/50 block mb-2">Qué te enseña</span>
          <p className="text-base text-white leading-relaxed" data-editable={`m${mentor.id}-teaches`}>
            {mentor.teaches}
          </p>
        </div>
      </div>
    </article>
  )
}
