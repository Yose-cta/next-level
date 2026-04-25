import Link from 'next/link'
import { PILLARS, WORKSHOP } from '@/lib/constants'

/**
 * Hero v2 — sin círculo. Composición editorial split:
 *   Izquierda: titular reposicionado + CTAs + chips de detalle.
 *   Derecha: "Experience Pass" — panel glass vertical con la info clave
 *           (fecha, los 3 bloques del programa, venue, cupos).
 *
 * Mantiene la atmósfera: midnight + 2 orbs sutiles (magenta + electric),
 * número decorativo "II" y la barra "scroll" en desktop.
 */
export function Hero() {
  return (
    <section className="sec-dark relative min-h-[calc(100vh-3.5rem)] flex items-center pt-12 pb-20 sm:pt-16 overflow-hidden">
      {/* Orbs ambient */}
      <div
        className="absolute pointer-events-none w-[520px] h-[520px] rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(243, 37, 154, 0.55), transparent 70%)',
          filter: 'blur(90px)',
          top: '-140px', left: '-120px',
          animation: 'orb-magenta 22s ease-in-out infinite',
        }}
        aria-hidden
      />
      <div
        className="absolute pointer-events-none w-[440px] h-[440px] rounded-full opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(246, 207, 47, 0.5), transparent 70%)',
          filter: 'blur(90px)',
          bottom: '-120px', right: '-100px',
          animation: 'orb-electric 26s ease-in-out infinite',
        }}
        aria-hidden
      />

      {/* Decorativo: número II gigante */}
      <div className="absolute top-10 right-12 number-decor pointer-events-none select-none hidden lg:block">
        II
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT — Copy */}
          <div className="lg:col-span-7 reveal relative z-10">
            <div className="inline-flex items-center gap-3 glass-dark rounded-full px-4 py-2 mb-8 sm:mb-10">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
              <span className="eyebrow !text-white/75" data-editable="hero-eyebrow">
                Next Level Experience · 2nd Edition · {WORKSHOP.duration}
              </span>
            </div>

            <h1 className="font-display text-display-xl text-white leading-[0.98]">
              <span className="block" data-editable="hero-h1">Deja de cargarlo</span>
              <span className="block italic text-magenta -mt-1" data-editable="hero-h2">
                todo tú.
              </span>
              <span
                className="block text-white/85 italic mt-3 text-display-md leading-tight"
                data-editable="hero-h3"
              >
                Empieza a dirigir, proyectar y vender desde tu siguiente nivel.
              </span>
            </h1>

            <p
              className="mt-9 sm:mt-11 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed font-light"
              data-editable="hero-lead"
            >
              Una experiencia presencial de <span className="text-white">6 horas</span> para
              emprendedores que trabajan duro pero sienten que siguen demasiado dentro
              del día a día. Tres expertos en vivo. Tres áreas que cambian cómo se sostiene,
              se percibe y se vende tu negocio.
            </p>

            <div className="mt-10 flex flex-wrap gap-3 sm:gap-5 items-center">
              <span data-magnetic="0.25" className="magnetic">
                <Link
                  href="#tickets"
                  className="inline-flex items-center gap-3 bg-electric text-midnight font-semibold px-7 py-4 rounded-full hover:bg-yellow-300 transition-colors duration-300 ease-apple text-sm sm:text-base shadow-glow-electric"
                >
                  <span data-editable="hero-cta-1">Reservar mi cupo</span>
                  <span aria-hidden>→</span>
                </Link>
              </span>
              <Link
                href="#programa"
                className="inline-flex items-center gap-2 text-white/70 hover:text-electric transition font-medium px-3 py-3 ulink text-sm"
              >
                <span data-editable="hero-cta-2">Ver el programa</span>
                <span aria-hidden>↓</span>
              </Link>
            </div>

            {/* 3 dominios — chips con icono */}
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              <Domain icon={<EmblemIA />} label="IA con Claude" />
              <Domain icon={<EmblemColor />} label="Imagen y presencia" />
              <Domain icon={<EmblemVoice />} label="Comunicación y ventas" />
            </div>

            {/* Detalles operativos */}
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs sm:text-sm text-white/70">
              <Detail icon={<IconCalendar />} label={WORKSHOP.date.display} />
              <Detail icon={<IconClock />} label="14h — 21h" />
              <Detail icon={<IconPin />} label={`${WORKSHOP.venue.address}, ${WORKSHOP.venue.district}`} />
              <Detail icon={<IconSpark />} label="Cupos limitados" emphasis />
            </div>
          </div>

          {/* RIGHT — Experience Pass (editorial vertical card) */}
          <div className="lg:col-span-5 reveal reveal-delayed">
            <div className="relative">
              {/* Glow sutil detrás del pass */}
              <div
                className="absolute inset-0 -z-0 opacity-50"
                style={{
                  background: 'radial-gradient(closest-side, rgba(246, 207, 47, 0.18), transparent 70%)',
                  filter: 'blur(40px)',
                }}
                aria-hidden
              />

              <article className="relative glass-dark rounded-md overflow-hidden border-white/10">
                {/* Header del pass */}
                <header className="relative flex items-stretch">
                  {/* Banda izquierda: marca + edición */}
                  <div className="flex flex-col justify-between p-5 sm:p-6 border-r border-white/10 min-w-[110px] bg-midnight-2/60">
                    <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/55">
                      Experience<br />Pass
                    </div>
                    <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-electric mt-6">
                      2nd Ed.
                    </div>
                  </div>

                  {/* Fecha grande */}
                  <div className="flex-1 p-5 sm:p-6 flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/50 mb-1">
                        Sábado
                      </div>
                      <div className="flex items-baseline gap-2">
                        <div className="font-display italic text-6xl sm:text-7xl text-electric leading-none">
                          {WORKSHOP.date.day}
                        </div>
                        <div>
                          <div className="font-mono text-xs tracking-[0.25em] uppercase text-white/85 leading-none">
                            {WORKSHOP.date.month}
                          </div>
                          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/55 mt-1 leading-none">
                            {WORKSHOP.date.year}
                          </div>
                        </div>
                      </div>
                      <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/55 mt-3">
                        14h — 21h
                      </div>
                    </div>

                    <div className="hidden sm:flex flex-col items-center gap-2 opacity-60">
                      <div className="w-px h-12 bg-gradient-to-b from-electric/60 to-transparent" />
                      <span className="font-mono text-[8px] tracking-[0.3em] text-white/45 uppercase">CL</span>
                    </div>
                  </div>
                </header>

                {/* Línea de troquelado */}
                <div className="relative h-px">
                  <div className="absolute inset-x-6 h-px dashed-edge text-white/25" />
                  <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-midnight border border-white/10" aria-hidden />
                  <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-midnight border border-white/10" aria-hidden />
                </div>

                {/* Programa: 3 pilares */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px w-6 bg-electric" />
                    <span className="eyebrow !text-white/65">El programa</span>
                  </div>

                  <ul className="space-y-1">
                    {PILLARS.map((p, i) => (
                      <li
                        key={p.n}
                        className="group flex items-center gap-4 py-3.5 border-t border-white/8 first:border-t-0"
                      >
                        <span className="font-mono text-[10px] tracking-[0.25em] text-white/40">
                          {p.n}
                        </span>
                        <PillarEmblem index={i} />
                        <div className="flex-1 min-w-0">
                          <div className="font-display italic text-xl sm:text-2xl text-white leading-tight">
                            {p.name}
                          </div>
                          <div className="text-[11px] sm:text-xs text-white/55 mt-0.5 truncate">
                            {p.headline}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer del pass */}
                <footer className="border-t border-white/10 p-5 sm:p-6 flex items-center justify-between gap-4 bg-midnight-2/40">
                  <div className="flex items-center gap-2 text-white/65 text-xs">
                    <IconPin />
                    <span data-editable="pass-venue">{WORKSHOP.venue.address}, {WORKSHOP.venue.district}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-electric text-midnight px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-midnight animate-pulse" />
                    <span className="font-mono text-[9px] tracking-[0.25em] uppercase font-semibold">
                      Cupos limitados
                    </span>
                  </div>
                </footer>
              </article>

              {/* Sello angular esquina superior derecha del pass */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-10">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-magenta/95 text-white flex flex-col items-center justify-center shadow-glow-magenta rotate-[8deg]">
                  <span className="font-mono text-[8px] tracking-[0.25em] uppercase opacity-80">
                    Half
                  </span>
                  <span className="font-display italic text-2xl leading-none mt-0.5">Day</span>
                  <span className="font-mono text-[8px] tracking-[0.25em] uppercase opacity-80 mt-0.5">
                    6 horas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-white/40 text-[10px] tracking-[0.3em] uppercase font-mono pointer-events-none">
        <span>Scroll</span>
        <span className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}

/* =================== Sub-components =================== */

function Domain({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs sm:text-sm text-white font-medium">
      <span className="text-electric" aria-hidden>{icon}</span>
      <span>{label}</span>
    </span>
  )
}

function Detail({ icon, label, emphasis }: { icon: React.ReactNode; label: string; emphasis?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 ${emphasis ? 'text-electric font-medium' : ''}`}>
      <span aria-hidden className="opacity-70">{icon}</span>
      <span>{label}</span>
    </span>
  )
}

function PillarEmblem({ index }: { index: number }) {
  const accent = ['text-electric', 'text-magenta', 'text-gold'][index] ?? 'text-electric'
  const icon = [<EmblemIA key="ia" />, <EmblemColor key="c" />, <EmblemVoice key="v" />][index]
  return (
    <span
      className={`shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-midnight ${accent}`}
      aria-hidden
    >
      {icon}
    </span>
  )
}

/* =================== Icons / emblems =================== */

function EmblemIA() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="9" strokeDasharray="3 3" opacity="0.4" /><circle cx="12" cy="3" r="1" fill="currentColor" /><circle cx="21" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="21" r="1" fill="currentColor" /><circle cx="3" cy="12" r="1" fill="currentColor" /></svg>
}
function EmblemColor() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden><circle cx="6" cy="12" r="4" fill="currentColor" opacity="0.85" /><circle cx="12" cy="9" r="4" fill="currentColor" opacity="0.55" /><circle cx="18" cy="12" r="4" fill="currentColor" opacity="0.3" /></svg>
}
function EmblemVoice() {
  return <svg width="20" height="18" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden><path d="M2 9h2M5 5v8M8 7v4M11 3v12M14 7v4M17 5v8M20 9h2" /></svg>
}
function IconCalendar() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
}
function IconClock() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
}
function IconPin() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13Z" /><circle cx="12" cy="9" r="2.5" /></svg>
}
function IconSpark() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" /></svg>
}
