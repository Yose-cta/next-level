import Link from 'next/link'
import { Countdown } from '@/components/Countdown'
import { WORKSHOP } from '@/lib/constants'

export function Hero() {
  return (
    <section className="relative pt-12 sm:pt-20 pb-20 sm:pb-32 overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,210,63,.08), transparent 70%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(236,72,153,.06), transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12 sm:mb-16 reveal">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-champagne/80">
            <span data-editable="hero-eyebrow">{WORKSHOP.tagline}</span>
          </div>
          <div className="hidden sm:block font-mono text-xs uppercase tracking-[0.3em] text-mutedc">
            <span data-editable="hero-edition">{WORKSHOP.edition}</span>
          </div>
        </div>

        <div className="reveal">
          <div className="font-display font-light text-[15vw] sm:text-[10vw] lg:text-[8.5vw] leading-[0.85] tracking-tightest">
            <span className="block text-cream" data-editable="hero-word-1">
              NEXT
            </span>
            <span className="block text-electric italic" data-editable="hero-word-2">
              Level.
            </span>
          </div>
        </div>

        <div className="mt-10 sm:mt-14 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7 reveal">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.15] text-cream font-light">
              <span data-editable="hero-headline">
                Libera tu tiempo. Pensá como líder. Vendé como alguien que ya está en su
                siguiente nivel.
              </span>
            </h1>
            <p
              className="mt-8 text-lg text-cream/75 max-w-2xl leading-relaxed"
              data-editable="hero-lead"
            >
              6 horas presenciales. 3 mentores. Una experiencia aplicada de IA, imagen y
              comunicación. Te vas con un sistema funcionando — no con apuntes.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <Link
                href="#tickets"
                className="pulse-cta inline-flex items-center gap-2 bg-electric text-noir font-semibold px-7 py-4 rounded-full hover:bg-yellow-300 transition"
              >
                <span data-editable="hero-cta-1">Reservar mi cupo</span>
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="#experiencia"
                className="inline-flex items-center gap-2 text-cream/80 hover:text-electric transition font-medium px-5 py-3"
              >
                <span data-editable="hero-cta-2">Ver el programa</span>
                <span aria-hidden>↓</span>
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
              <Trust num="6h" label="Presenciales" idNum="trust-1-num" idLabel="trust-1-label" />
              <Trust
                num="3"
                label="Mentores en vivo"
                idNum="trust-2-num"
                idLabel="trust-2-label"
              />
              <Trust
                num="∞"
                label="Cupos limitados"
                idNum="trust-3-num"
                idLabel="trust-3-label"
              />
              <Trust
                num="100%"
                label="Aplicado en vivo"
                idNum="trust-4-num"
                idLabel="trust-4-label"
              />
            </div>
          </div>

          <div className="lg:col-span-5 reveal">
            <div
              data-image="hero-photo"
              data-label="Foto del workshop · sube una imagen"
              className="aspect-[4/5] w-full rounded-sm shadow-editorial"
            />
            <div className="mt-6">
              <Countdown targetIso={WORKSHOP.date.iso} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Trust({
  num,
  label,
  idNum,
  idLabel,
}: {
  num: string
  label: string
  idNum: string
  idLabel: string
}) {
  return (
    <div>
      <div className="font-display text-3xl text-champagne" data-editable={idNum}>
        {num}
      </div>
      <div className="text-xs uppercase tracking-wider text-mutedc mt-1" data-editable={idLabel}>
        {label}
      </div>
    </div>
  )
}
