import Link from 'next/link'
import { PARA_TI_SI, NO_ES_PARA_TI } from '@/lib/constants'

/**
 * ParaTiSi — autodiagnóstico. Lista de señales que ayudan al lector
 * a reconocerse. Si marca 3+, esta experiencia es para él/ella.
 *
 * Diseño: 2 columnas con checkmarks editoriales. Ritmo de lectura corto.
 */
export function ParaTiSi() {
  return (
    <section className="sec-dark py-24 sm:py-36 relative overflow-hidden">
      <div className="absolute pointer-events-none w-[420px] h-[420px] rounded-full opacity-20 -top-32 -left-24"
        style={{
          background: 'radial-gradient(circle, rgba(243, 37, 154, 0.55), transparent 70%)',
          filter: 'blur(100px)',
        }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Columna izquierda — título + remate */}
          <div className="lg:col-span-5 reveal lg:sticky lg:top-24 self-start">
            <div className="flex items-center gap-4 mb-7">
              <div className="h-px w-10 bg-electric" />
              <div className="eyebrow">Esto es para ti si...</div>
            </div>

            <h2 className="font-display text-display-lg text-white leading-[1.05]">
              <span data-editable="paratisi-h">
                Next Level Experience<br />
                <span className="italic text-electric">
                  es para ti si…
                </span>
              </span>
            </h2>

            <p
              className="mt-8 text-lg text-white/70 leading-relaxed font-light max-w-md"
              data-editable="paratisi-body"
            >
              Si te reconoces en <span className="text-white">tres o más</span> de estas
              señales, esta experiencia está diseñada exactamente para tu momento.
            </p>

            <div className="mt-9">
              <span data-magnetic="0.2" className="magnetic">
                <Link
                  href="#tickets"
                  className="inline-flex items-center gap-3 bg-white text-midnight font-medium px-6 py-3.5 rounded-full hover:bg-electric transition-colors duration-300 ease-apple text-sm sm:text-base"
                >
                  <span data-editable="paratisi-cta">Sí, quiero reservar mi cupo</span>
                  <span aria-hidden>→</span>
                </Link>
              </span>
            </div>
          </div>

          {/* Columna derecha — checklist editorial */}
          <div className="lg:col-span-7 reveal reveal-delayed">
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
              {PARA_TI_SI.map((line, i) => (
                <li
                  key={i}
                  className="group flex items-start gap-4 py-4 border-t border-white/10 first:border-t-0 sm:[&:nth-child(2)]:border-t-0"
                  data-editable={`paratisi-${i + 1}`}
                >
                  <span className="shrink-0 mt-0.5 w-7 h-7 rounded-full bg-electric/15 border border-electric/40 flex items-center justify-center group-hover:bg-electric group-hover:text-midnight transition-colors duration-300 text-electric">
                    <CheckIcon />
                  </span>
                  <span className="text-base sm:text-lg text-white/85 leading-relaxed font-light">
                    {line}
                  </span>
                </li>
              ))}
            </ul>

            {/* No es para ti */}
            <div className="mt-12 pt-10 border-t border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/45">
                  No es para ti si…
                </span>
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                {NO_ES_PARA_TI.map((line, i) => (
                  <li
                    key={`no-${i}`}
                    className="flex items-start gap-4 py-3"
                  >
                    <span className="shrink-0 mt-0.5 w-7 h-7 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/40">
                      <XIcon />
                    </span>
                    <span className="text-base sm:text-lg text-white/50 leading-relaxed font-light">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12l5 5L20 7" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}
