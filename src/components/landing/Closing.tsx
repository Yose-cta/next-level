import Link from 'next/link'
import { WORKSHOP } from '@/lib/constants'

export function Closing() {
  return (
    <section className="sec-dark py-32 sm:py-44 relative overflow-hidden">
      <div
        className="absolute pointer-events-none w-[600px] h-[600px] rounded-full opacity-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(243, 37, 154, 0.4), transparent 70%)',
          filter: 'blur(120px)',
        }}
        aria-hidden
      />
      <div
        className="absolute pointer-events-none w-[400px] h-[400px] rounded-full opacity-20 top-0 right-0"
        style={{
          background: 'radial-gradient(circle, rgba(246, 207, 47, 0.5), transparent 70%)',
          filter: 'blur(100px)',
        }}
        aria-hidden
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal relative">
        <div className="flex items-center justify-center gap-4 mb-9">
          <div className="h-px w-8 bg-electric" />
          <div className="eyebrow">{WORKSHOP.date.display} · Santiago</div>
          <div className="h-px w-8 bg-electric" />
        </div>

        <h2 className="font-display text-display-xl text-white leading-[0.95]">
          <span data-editable="close-h-1" className="block">
            Tu siguiente nivel
          </span>
          <span
            className="italic text-white/55 block text-display-md mt-3"
            data-editable="close-h-2"
          >
            no empieza cuando trabajas más.
          </span>
          <span
            className="italic text-electric block mt-4"
            data-editable="close-h-3"
          >
            Empieza cuando dejas de cargarlo todo tú.
          </span>
        </h2>

        <p
          className="mt-12 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light"
          data-editable="close-body"
        >
          Cuando tu negocio deja de vivir solo en tu cabeza.
          <br />
          Cuando tu imagen refleja mejor tu valor.
          <br />
          Cuando comunicas con más seguridad.
          <br />
          Cuando vendes sin minimizarte.
          <br />
          <span className="text-electric">Cuando empiezas a dirigir con más intención y menos agotamiento.</span>
        </p>

        <div
          className="mt-10 inline-flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-white/65"
          data-editable="close-detail"
        >
          <span>{WORKSHOP.date.display}</span>
          <span className="text-electric">·</span>
          <span>14h — 21h</span>
          <span className="text-electric">·</span>
          <span>{WORKSHOP.venue.full}</span>
        </div>

        <div className="mt-12 flex flex-wrap gap-4 items-center justify-center">
          <span data-magnetic="0.25" className="magnetic">
            <Link
              href="#tickets"
              className="inline-flex items-center gap-3 bg-electric text-midnight font-semibold px-10 py-5 rounded-full hover:bg-yellow-300 transition-colors duration-300 ease-apple text-base shadow-glow-electric"
            >
              <span data-editable="close-cta">Reservar mi cupo</span>
              <span aria-hidden>→</span>
            </Link>
          </span>
          <span className="text-white/45 text-xs sm:text-sm font-mono uppercase tracking-[0.2em]">
            General $67.000 · VIP $147.000
          </span>
        </div>
      </div>
    </section>
  )
}
