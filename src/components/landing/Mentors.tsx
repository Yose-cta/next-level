import Image from 'next/image'

import { MENTORS, type Mentor } from '@/lib/constants'

/**
 * Mentors v2 — tres bloques editoriales, uno por experta.
 * Cada bloque incluye: módulo, lema, bio, qué se trabaja, qué se lleva,
 * y la sesión VIP 1:1 que cada mentor ofrece post-evento.
 *
 * Patrón: layout asimétrico que alterna foto/contenido (zigzag editorial)
 * para evitar la tipica grilla de 3 cards que se siente plana.
 */
export function Mentors() {
  return (
    <section id="mentores" className="sec-dark py-24 sm:py-36 relative overflow-hidden">
      <div className="absolute top-12 right-8 hidden lg:block number-decor">03</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 reveal">
          <h2 className="font-display text-display-lg text-white leading-[1.05]">
            <span data-editable="mentors-h">
              Tres expertos.<br />
              <span className="italic text-electric">Una experiencia diseñada para tu siguiente nivel.</span>
            </span>
          </h2>
          <p
            className="mt-7 text-lg text-white/70 leading-relaxed font-light"
            data-editable="mentors-body"
          >
            No vienes a escuchar tres charlas sueltas. Vienes a trabajar tres piezas
            que están conectadas: tu <span className="text-white">operación</span> (cómo se sostiene
            tu negocio), tu <span className="text-white">presencia</span> (cómo te perciben) y tu{' '}
            <span className="text-white">comunicación</span> (cómo explicas y vendes tu valor).
          </p>
          <p
            className="mt-5 text-base text-white/65 leading-relaxed font-light max-w-2xl mx-auto"
            data-editable="mentors-body-2"
          >
            Porque puedes tener una gran oferta, pero si tu operación es un caos, te vas a
            desgastar. Puedes saber mucho, pero si tu imagen no acompaña tu nivel, te pueden
            percibir por debajo de tu valor. Puedes ser excelente, pero si no sabes
            comunicarlo, el mercado no lo entiende completo.
          </p>
        </div>

        <div className="space-y-24 sm:space-y-32">
          {MENTORS.map((m, i) => (
            <MentorBlock key={m.id} mentor={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MentorBlock({ mentor, index }: { mentor: Mentor; index: number }) {
  const isOdd = index % 2 === 1
  const accentText = mentor.accent === 'electric'
    ? 'text-electric'
    : mentor.accent === 'magenta'
    ? 'text-magenta'
    : 'text-gold'
  const accentBorder = mentor.accent === 'electric'
    ? 'border-electric'
    : mentor.accent === 'magenta'
    ? 'border-magenta'
    : 'border-gold'

  return (
    <article className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-start reveal ${isOdd ? '' : ''}`}>
      {/* Foto + ficha */}
      <div className={`lg:col-span-5 ${isOdd ? 'lg:order-last' : ''}`}>
        <div className="relative">
          <div
            className={`aspect-square w-full overflow-hidden bg-noir-3 ${index % 2 === 0 ? 'clip-corner-tr' : 'clip-corner-bl'}`}
          >
            <Image
              src={`/mentors/${mentor.id}.png`}
              alt={`${mentor.name} — ${mentor.role}`}
              width={1080}
              height={1080}
              className="w-full h-full object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority={index === 0}
            />
          </div>

          {/* Etiqueta módulo */}
          <div className="absolute top-4 left-4 flex items-center gap-2 glass-dark px-3 py-1.5 z-10">
            <span className={`w-1 h-1 rounded-full bg-${mentor.accent}`} style={{
              backgroundColor: mentor.accent === 'electric' ? '#f6cf2f' : mentor.accent === 'magenta' ? '#f3259a' : '#b08d4a'
            }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/85">
              Bloque {mentor.moduleNumber}
            </span>
          </div>

          {/* Hora */}
          <div className={`absolute top-4 right-4 px-3 py-1.5 z-10 text-midnight font-semibold`}
            style={{
              backgroundColor: mentor.accent === 'electric' ? '#f6cf2f' : mentor.accent === 'magenta' ? '#f3259a' : '#b08d4a'
            }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              {mentor.moduleTime}
            </span>
          </div>

          {/* Tarjeta nombre flotante */}
          <div className="absolute -bottom-6 left-4 right-4 sm:left-6 sm:right-6 glass-dark px-5 py-4 z-10 shadow-medium">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-display italic text-2xl sm:text-3xl text-white leading-none" data-editable={`m${mentor.id}-name`}>
                  {mentor.name}
                </h3>
                <p className={`mt-2 text-[10px] uppercase tracking-[0.2em] font-medium ${accentText}`} data-editable={`m${mentor.id}-role`}>
                  {mentor.role}
                </p>
              </div>
              <MentorSeal id={mentor.id} />
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className={`lg:col-span-7 pt-10 lg:pt-2 ${isOdd ? '' : ''}`}>
        <div className="flex items-center gap-3 mb-4">
          <span className={`font-mono text-[10px] tracking-[0.25em] uppercase ${accentText}`}>
            Bloque {mentor.moduleNumber}
          </span>
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40">
            {mentor.tag}
          </span>
        </div>

        <h4 className="font-display text-display-md text-white leading-[1.1]" data-editable={`m${mentor.id}-title`}>
          {mentor.moduleTitle}
        </h4>
        <p className="mt-4 text-lg sm:text-xl text-white/75 leading-snug font-light" data-editable={`m${mentor.id}-subtitle`}>
          {mentor.moduleSubtitle}
        </p>

        <p className="mt-7 text-base text-white/65 leading-relaxed font-light max-w-2xl" data-editable={`m${mentor.id}-bio`}>
          {mentor.bio}
        </p>

        <blockquote className={`mt-8 pl-5 border-l ${accentBorder} max-w-xl`}>
          <p className={`font-display italic text-xl sm:text-2xl text-white leading-snug`} data-editable={`m${mentor.id}-lema`}>
            "{mentor.lema}"
          </p>
        </blockquote>

        {/* 2 columnas: Trabajan / Te llevas */}
        <div className="mt-10 grid sm:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <div className="eyebrow !text-white/55 mb-3 flex items-center gap-2">
              <span className={accentText}>·</span>
              <span>Vas a trabajar</span>
            </div>
            <ul className="space-y-2.5">
              {mentor.works.map((line, i) => (
                <li key={i} className="flex gap-3 text-sm sm:text-base text-white/80 leading-relaxed font-light">
                  <span className={`mt-1.5 shrink-0 w-1 h-1 rounded-full bg-current ${accentText}`} />
                  <span data-editable={`m${mentor.id}-work-${i}`}>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow !text-white/55 mb-3 flex items-center gap-2">
              <span className={accentText}>·</span>
              <span>Te llevas</span>
            </div>
            <ul className="space-y-2.5">
              {mentor.deliverables.map((line, i) => (
                <li key={i} className="flex gap-3 text-sm sm:text-base text-white leading-relaxed">
                  <span className={`mt-0.5 shrink-0 ${accentText}`} aria-hidden>✓</span>
                  <span data-editable={`m${mentor.id}-deliv-${i}`}>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pildora VIP */}
        <div className={`mt-10 inline-flex items-center gap-3 glass-dark rounded-full px-4 py-2 border-${mentor.accent}/30`}
          style={{
            borderColor: mentor.accent === 'electric'
              ? 'rgba(246, 207, 47, 0.35)'
              : mentor.accent === 'magenta'
              ? 'rgba(243, 37, 154, 0.35)'
              : 'rgba(176, 141, 74, 0.35)',
          }}
        >
          <span className={accentText}>★</span>
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/85">
            VIP · {mentor.vipSession.duration}
          </span>
          <span className="text-white/40 mx-1">·</span>
          <span className="text-xs sm:text-sm text-white/85" data-editable={`m${mentor.id}-vip`}>
            {mentor.vipSession.name}
          </span>
        </div>
      </div>
    </article>
  )
}

/* =================== Seals (decoración) =================== */

function MentorSeal({ id }: { id: string }) {
  if (id === 'yoselvia') {
    return (
      <span className="shrink-0 w-12 h-12 rounded-full border border-electric/50 flex items-center justify-center text-electric">
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden>
          <circle cx="16" cy="16" r="4" />
          <circle cx="16" cy="16" r="11" strokeDasharray="2 3" opacity="0.5" />
          <circle cx="16" cy="3" r="1.2" fill="currentColor" />
          <circle cx="29" cy="16" r="1.2" fill="currentColor" />
          <circle cx="16" cy="29" r="1.2" fill="currentColor" />
          <circle cx="3" cy="16" r="1.2" fill="currentColor" />
        </svg>
      </span>
    )
  }
  if (id === 'valentina') {
    return (
      <span className="shrink-0 w-12 h-12 rounded-full border border-magenta/50 flex items-center justify-center text-magenta">
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden>
          <circle cx="9" cy="16" r="6" fill="currentColor" opacity="0.85" />
          <circle cx="16" cy="11" r="6" fill="currentColor" opacity="0.55" />
          <circle cx="23" cy="16" r="6" fill="currentColor" opacity="0.3" />
        </svg>
      </span>
    )
  }
  return (
    <span className="shrink-0 w-12 h-12 rounded-full border border-gold/50 flex items-center justify-center text-gold">
      <svg width="24" height="24" viewBox="0 0 36 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
        <path d="M2 16h2M6 9v14M11 12v8M16 5v22M21 12v8M26 9v14M30 16h2M34 13v6" />
      </svg>
    </span>
  )
}
