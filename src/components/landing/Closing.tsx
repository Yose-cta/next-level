import Link from 'next/link'
import { WORKSHOP } from '@/lib/constants'

export function Closing() {
  return (
    <section className="py-32 sm:py-40 relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,210,63,.08), transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
        <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl text-cream font-light leading-[0.95]">
          <span data-editable="close-h-1">Next Level no es un evento.</span>
          <br />
          <span className="text-electric italic" data-editable="close-h-2">
            Es una decisión.
          </span>
        </h2>

        <p
          className="mt-10 text-xl text-cream/80 max-w-3xl mx-auto leading-relaxed"
          data-editable="close-body"
        >
          Es dejar de postergar lo importante. Volver a liderar tu negocio. Hacerlo desde
          la claridad, la presencia y la acción.
        </p>

        <div
          className="mt-12 font-mono text-sm uppercase tracking-[0.25em] text-champagne"
          data-editable="close-detail"
        >
          {WORKSHOP.date.display} · 14h a 21h · {WORKSHOP.venue.full} · Cupos limitados
        </div>

        <div className="mt-12">
          <Link
            href="#tickets"
            className="pulse-cta inline-flex items-center gap-3 bg-electric text-noir font-semibold px-10 py-5 rounded-full text-lg hover:bg-yellow-300 transition"
          >
            <span data-editable="close-cta">
              Quiero llevar mi negocio al siguiente nivel
            </span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
