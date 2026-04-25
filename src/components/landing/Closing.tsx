import Link from 'next/link'
import { WORKSHOP } from '@/lib/constants'

export function Closing() {
  return (
    <section className="sec-dark py-32 sm:py-44 relative overflow-hidden">
      <div className="absolute pointer-events-none w-[600px] h-[600px] rounded-full opacity-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: 'radial-gradient(circle, rgba(243, 37, 154, 0.4), transparent 70%)', filter: 'blur(120px)' }} aria-hidden />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal relative">
        <div className="flex items-center justify-center gap-4 mb-9">
          <div className="h-px w-8 bg-electric" />
          <div className="eyebrow">Sábado 16 de mayo · Santiago</div>
          <div className="h-px w-8 bg-electric" />
        </div>

        <h2 className="font-display text-display-xl text-white leading-[0.95]">
          <span data-editable="close-h-1">Next Level Experience</span>
          <span className="italic text-white/55 block text-display-md mt-3" data-editable="close-h-2">
            no es un evento.
          </span>
          <span className="italic text-electric block mt-2" data-editable="close-h-3">
            Es una decisión.
          </span>
        </h2>

        <p className="mt-10 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light" data-editable="close-body">
          Es dejar de postergar lo importante. Volver a liderar tu negocio. Hacerlo desde
          la claridad, la presencia y la acción.
        </p>

        <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-white/65" data-editable="close-detail">
          <span>{WORKSHOP.date.display}</span>
          <span className="text-electric">·</span>
          <span>14h — 21h</span>
          <span className="text-electric">·</span>
          <span>{WORKSHOP.venue.full}</span>
        </div>

        <div className="mt-12">
          <span data-magnetic="0.25" className="magnetic">
            <Link href="#tickets" className="inline-flex items-center gap-3 bg-electric text-midnight font-semibold px-10 py-5 rounded-full hover:bg-yellow-300 transition-colors duration-300 ease-apple text-base shadow-glow-electric">
              <span data-editable="close-cta">Quiero llevar mi negocio al siguiente nivel</span>
              <span aria-hidden>→</span>
            </Link>
          </span>
        </div>
      </div>
    </section>
  )
}
