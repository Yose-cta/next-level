import Image from 'next/image'
import Link from 'next/link'

import { WORKSHOP } from '@/lib/constants'

/**
 * Hero v4 — composición editorial.
 *   Izquierda: titular + lead + CTAs + chips de detalle.
 *   Derecha:   FOTO editable grande + datos clave (fecha + venue + cupos) abajo.
 *
 * Sin círculo, sin Experience Pass, sin scroll indicator.
 * Solo copy editorial + foto del equipo (que la cliente sube con Cmd+E).
 */
export function Hero() {
  return (
    <section className="sec-dark relative min-h-[calc(100vh-3.5rem)] flex items-center pt-12 pb-20 sm:pt-16 overflow-hidden">
      {/* Orbs ambient sutiles */}
      <div
        className="absolute pointer-events-none w-[520px] h-[520px] rounded-full opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(243, 37, 154, 0.55), transparent 70%)',
          filter: 'blur(100px)',
          top: '-160px',
          left: '-120px',
          animation: 'orb-magenta 22s ease-in-out infinite',
        }}
        aria-hidden
      />
      <div
        className="absolute pointer-events-none w-[440px] h-[440px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(246, 207, 47, 0.5), transparent 70%)',
          filter: 'blur(100px)',
          bottom: '-140px',
          right: '-100px',
          animation: 'orb-electric 26s ease-in-out infinite',
        }}
        aria-hidden
      />

      {/* Decorativo: número II gigante translúcido */}
      <div className="absolute top-10 right-12 number-decor pointer-events-none select-none hidden lg:block">
        II
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT — Copy editorial */}
          <div className="lg:col-span-7 reveal relative z-10">
            <div className="inline-flex items-center gap-3 glass-dark rounded-full px-4 py-2 mb-8">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
              <span className="eyebrow !text-white/75" data-editable="hero-eyebrow">
                Next Level Experience · 2nd Edition · Half-Day
              </span>
            </div>

            <h1 className="font-display text-display-xl text-white leading-[0.98]">
              <span className="block" data-editable="hero-h1">Deja de cargarlo</span>
              <span className="block italic text-magenta -mt-1" data-editable="hero-h2">
                todo tú.
              </span>
            </h1>

            <p
              className="font-display italic text-display-md text-white/85 mt-5 max-w-2xl leading-snug"
              data-editable="hero-h3"
            >
              Empieza a dirigir, proyectar y vender desde tu siguiente nivel.
            </p>

            <p
              className="mt-8 sm:mt-10 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed font-light"
              data-editable="hero-lead"
            >
              Una experiencia presencial de <span className="text-white">6 horas</span> para
              emprendedores y emprendedoras que trabajan duro pero sienten que siguen
              demasiado dentro del día a día. Tres expertos en vivo. Tres áreas que cambian
              cómo se sostiene, se percibe y se vende tu negocio.
            </p>

            <div className="mt-10 flex flex-wrap gap-3 sm:gap-5 items-center">
              <span data-magnetic="0.25" className="magnetic">
                <Link
                  href="#tickets"
                  className="inline-flex items-center gap-3 bg-electric text-midnight font-semibold px-7 py-4 rounded-full hover:bg-yellow-300 transition-colors duration-300 ease-apple text-sm sm:text-base shadow-glow-electric"
                >
                  <span data-editable="hero-cta-1">Reserva tu lugar</span>
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

            {/* Detalles operativos */}
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs sm:text-sm text-white/70">
              <Detail icon={<IconCalendar />} label={WORKSHOP.date.display} />
              <Detail icon={<IconClock />} label="14h — 21h" />
              <Detail icon={<IconPin />} label={`${WORKSHOP.venue.address}, ${WORKSHOP.venue.district}`} />
              <Detail icon={<IconSpark />} label="Cupos limitados" emphasis />
            </div>
          </div>

          {/* RIGHT — Foto editable grande + sello fecha */}
          <div className="lg:col-span-5 reveal reveal-delayed">
            <div className="relative">
              {/* Glow sutil detrás */}
              <div
                className="absolute inset-0 -z-0 opacity-40"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(246, 207, 47, 0.15), transparent 70%)',
                  filter: 'blur(40px)',
                }}
                aria-hidden
              />

              {/* FOTO Hero — equipo Next Level */}
              <div className="aspect-square w-full rounded-md border border-white/10 shadow-medium relative overflow-hidden bg-noir-3">
                <Image
                  src="/hero.png"
                  alt="Equipo Next Level — Yoselvia, Sebastián y Valentina"
                  width={1080}
                  height={1080}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>

              {/* Sello fecha flotante top-left */}
              <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 glass-dark px-5 py-4 z-10 shadow-glow-magenta">
                <div className="font-display italic text-4xl sm:text-5xl text-electric leading-none">
                  {WORKSHOP.date.day}
                </div>
                <div className="eyebrow !text-white/70 mt-1.5">
                  {WORKSHOP.date.month} · {WORKSHOP.date.year}
                </div>
              </div>

              {/* Cupos pill flotante bottom-right */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 bg-electric text-midnight px-4 py-2.5 z-10 shadow-glow-electric">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-midnight animate-pulse" />
                  Cupos limitados
                </span>
              </div>
            </div>

            {/* Datos compactos abajo */}
            <div className="mt-8 grid grid-cols-2 gap-4 text-white/70">
              <div>
                <div className="eyebrow !text-white/45 mb-1">Cuándo</div>
                <div className="font-display italic text-xl text-white">
                  {WORKSHOP.date.display}
                </div>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/55 mt-1">
                  14h — 21h · Half-Day
                </div>
              </div>
              <div>
                <div className="eyebrow !text-white/45 mb-1">Dónde</div>
                <div className="font-display italic text-xl text-white">
                  {WORKSHOP.venue.address}
                </div>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/55 mt-1">
                  {WORKSHOP.venue.district}, {WORKSHOP.venue.city}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Detail({
  icon,
  label,
  emphasis,
}: {
  icon: React.ReactNode
  label: string
  emphasis?: boolean
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${emphasis ? 'text-electric font-medium' : ''}`}>
      <span aria-hidden className="opacity-70">
        {icon}
      </span>
      <span>{label}</span>
    </span>
  )
}

function IconCalendar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  )
}
function IconClock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}
function IconPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}
function IconSpark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  )
}
