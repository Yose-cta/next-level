import Link from 'next/link'
import { WORKSHOP } from '@/lib/constants'

/**
 * Hero DARK midnight — versión que le gustó a Yoselvia.
 * Sobrio: solo magenta + electric (sin cyan/violet rainbow).
 */
export function Hero() {
  return (
    <section className="sec-dark relative min-h-[calc(100vh-3.5rem)] flex items-center pt-12 pb-16 sm:pt-16 overflow-hidden">
      {/* Solo 2 orbs sutiles — magenta + electric */}
      <div
        className="absolute pointer-events-none w-[480px] h-[480px] rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(243, 37, 154, 0.55), transparent 70%)',
          filter: 'blur(80px)',
          top: '-120px', left: '-100px',
          animation: 'orb-magenta 22s ease-in-out infinite',
        }}
        aria-hidden
      />
      <div
        className="absolute pointer-events-none w-[420px] h-[420px] rounded-full opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(246, 207, 47, 0.5), transparent 70%)',
          filter: 'blur(80px)',
          bottom: '-100px', right: '-80px',
          animation: 'orb-electric 26s ease-in-out infinite',
        }}
        aria-hidden
      />

      {/* Decorativo: número II gigante */}
      <div className="absolute top-10 right-12 number-decor pointer-events-none select-none hidden lg:block">
        II
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* LEFT */}
          <div className="lg:col-span-7 reveal relative z-10">
            <div className="inline-flex items-center gap-3 glass-dark rounded-full px-4 py-2 mb-8 sm:mb-10">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
              <span className="eyebrow !text-white/75" data-editable="hero-eyebrow">
                Next Level Experience · 2nd Edition · Half-Day
              </span>
            </div>

            <h1 className="font-display text-display-xl text-white">
              <span className="block" data-editable="hero-h1">Libera tu tiempo,</span>
              <span className="block italic text-magenta -mt-1" data-editable="hero-h2">
                piensa como líder.
              </span>
            </h1>

            <p
              className="font-display italic text-display-md text-white/85 mt-6 max-w-2xl leading-snug"
              data-editable="hero-h3"
            >
              Comunica y vende como alguien que ya está en su siguiente nivel.
            </p>

            <p
              className="mt-8 sm:mt-10 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed font-light"
              data-editable="hero-lead"
            >
              Half-Day Experience presencial. 3 mentores. IA con Claude, imagen y
              comunicación. Te llevas un sistema funcionando — no apuntes.
            </p>

            <div className="mt-9 flex flex-wrap gap-3 sm:gap-5 items-center">
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

            {/* 3 dominios */}
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              <Domain icon={<EmblemIA />} label="IA con Claude" />
              <Domain icon={<EmblemColor />} label="Imagen y Color" />
              <Domain icon={<EmblemVoice />} label="Comunicación" />
            </div>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs sm:text-sm text-white/70">
              <Detail icon={<IconCalendar />} label={WORKSHOP.date.display} />
              <Detail icon={<IconClock />} label="14h — 21h" />
              <Detail icon={<IconPin />} label={`${WORKSHOP.venue.address}, ${WORKSHOP.venue.district}`} />
              <Detail icon={<IconSpark />} label="Cupos limitados" emphasis />
            </div>
          </div>

          {/* RIGHT — circular photo with orbital rings + tech mockup */}
          <div className="lg:col-span-5 reveal reveal-delayed">
            <div className="relative w-full max-w-md mx-auto aspect-square">
              {/* Orbital rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="orbit-ring orbit-rotate" style={{ inset: '-8%' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-electric" />
                </div>
                <div className="orbit-ring orbit-rotate-reverse" style={{ inset: '4%', borderColor: 'rgba(255, 255, 255, 0.12)' }}>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-magenta" />
                </div>
                <div className="orbit-ring" style={{ inset: '14%', borderStyle: 'dashed', borderColor: 'rgba(246, 207, 47, 0.2)' }} />
              </div>

              {/* Photo circular */}
              <div
                data-image="hero-photo"
                data-label="Foto del equipo · sube tu imagen"
                className="photo-circle absolute inset-[20%]"
              />

              {/* Date marker */}
              <div className="absolute top-0 left-0 glass-dark rounded-md px-4 py-3 z-10 shadow-glow-magenta">
                <div className="font-display text-3xl text-electric leading-none italic">
                  {WORKSHOP.date.day}
                </div>
                <div className="eyebrow !text-white/70 mt-1">
                  {WORKSHOP.date.month} · {WORKSHOP.date.year}
                </div>
              </div>

              {/* Mini chat mockup tech */}
              <div className="absolute bottom-0 right-0 bg-midnight-2 border border-white/10 rounded-md p-3 max-w-[180px] z-10 shadow-medium">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/65">claude · activo</span>
                </div>
                <p className="text-[11px] leading-snug font-mono text-white/85">
                  &gt; Tu sistema operativo<br />
                  &nbsp;&nbsp;está listo para operar.
                </p>
              </div>

              {/* Cupos vertical */}
              <div className="absolute top-1/2 -right-2 sm:-right-4 -translate-y-1/2 bg-electric text-midnight px-3 py-1.5 rotate-90 origin-left z-10 shadow-glow-electric">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase font-semibold">
                  Cupos limitados
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-white/40 text-[10px] tracking-[0.3em] uppercase font-mono pointer-events-none">
        <span>Scroll</span>
        <span className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}

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
