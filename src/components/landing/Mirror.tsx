/**
 * Mirror — el espejo. Sección que valida la realidad del lector.
 * Tono: directo, humano, sin culpa.
 *
 * Visual: lado derecho ahora muestra un LOOP CIRCULAR (no lista plana).
 * Es la metáfora visual del ciclo infinito en el que vive el emprendedor.
 */
export function Mirror() {
  return (
    <section className="sec-light py-24 sm:py-36 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* IZQUIERDA — Headline + body + quote */}
          <div className="lg:col-span-6 reveal">
            <h2 className="font-display text-display-lg text-ink leading-[1.05]">
              <span data-editable="mirror-h">
                Estás trabajando mucho,{' '}
                <span className="italic text-magenta">
                  pero sigues demasiado dentro de todo.
                </span>
              </span>
            </h2>

            <p
              className="mt-9 text-lg sm:text-xl text-charcoal leading-relaxed max-w-2xl font-light"
              data-editable="mirror-body"
            >
              Respondes mensajes. Haces seguimiento. Corriges detalles. Explicas lo
              mismo una y otra vez. Improvisas procesos. Apagas fuegos. Y encima
              tienes que mostrarte, vender y comunicar tu valor.
            </p>

            <p
              className="mt-6 text-lg sm:text-xl text-charcoal leading-relaxed max-w-2xl font-light"
              data-editable="mirror-body-2"
            >
              No es que te falte talento.{' '}
              <span className="text-ink font-medium">
                Es que tu negocio todavía depende demasiado de ti.
              </span>
            </p>

            <blockquote className="mt-12 pl-6 border-l-2 border-electric max-w-xl">
              <p
                className="font-display italic text-2xl sm:text-3xl text-ink leading-snug"
                data-editable="mirror-quote"
              >
                "Mientras tú sigas siendo quien lo sostiene todo, tu crecimiento
                tendrá el mismo techo de siempre: tu tiempo, tu energía, tu claridad."
              </p>
            </blockquote>
          </div>

          {/* DERECHA — Loop circular visual */}
          <div className="lg:col-span-6 reveal reveal-delayed">
            <LoopVisual />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
 * LOOP VISUAL — ciclo circular del día a día del emprendedor.
 * Desktop: círculo con 7 nodos posicionados con CSS transform.
 * Mobile:  lista vertical compacta con conectores.
 * ============================================================ */

const LOOPS = [
  { icon: <IconMessage />, short: 'Responder', text: 'mensajes que podrías delegar' },
  { icon: <IconRefresh />, short: 'Seguimiento', text: 'manual y repetitivo' },
  { icon: <IconEdit />, short: 'Corregir', text: 'los mismos detalles cada semana' },
  { icon: <IconSpeak />, short: 'Explicar', text: 'tu oferta una y otra vez' },
  { icon: <IconLightning />, short: 'Improvisar', text: 'procesos que viven en tu cabeza' },
  { icon: <IconFlame />, short: 'Apagar fuegos', text: 'antes de poder pensar' },
  { icon: <IconValue />, short: 'Mostrar valor', text: 'mientras tienes que vender' },
] as const

function LoopVisual() {
  return (
    <div className="relative">
      {/* Desktop: círculo (md+) */}
      <div className="hidden md:block relative aspect-square w-full max-w-[480px] mx-auto">
        {/* SVG dashed ring */}
        <svg viewBox="0 0 480 480" className="absolute inset-0 w-full h-full" aria-hidden>
          <circle
            cx="240"
            cy="240"
            r="200"
            fill="none"
            stroke="rgba(176, 141, 74, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          {/* Pequeñas flechas indicando dirección horaria */}
          {Array.from({ length: 7 }).map((_, i) => {
            const angle = (i / 7) * 360 + 25.7
            return (
              <g key={i} transform={`rotate(${angle} 240 240)`}>
                <path
                  d="M 235 38 L 245 42 L 240 50 Z"
                  fill="rgba(243, 37, 154, 0.6)"
                />
              </g>
            )
          })}
        </svg>

        {/* 7 nodos posicionados */}
        {LOOPS.map((loop, i) => {
          const angle = (i / LOOPS.length) * 360 - 90 // start from top
          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 group"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-200px) rotate(${-angle}deg)`,
              }}
            >
              <div className="bg-bone border border-ink/15 hover:border-magenta/50 hover:shadow-medium transition-all duration-300 px-3 py-2.5 w-[120px] text-center group-hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-magenta/10 text-magenta mb-1.5 mx-auto">
                  {loop.icon}
                </div>
                <div className="text-[11px] font-semibold text-ink leading-tight">
                  {loop.short}
                </div>
              </div>
            </div>
          )
        })}

        {/* Centro: ∞ + cierre */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-32">
          <div className="font-display italic text-7xl text-magenta leading-none">∞</div>
          <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-ash mt-3">
            El loop diario
          </div>
          <div className="text-[10px] text-ash/80 italic mt-1.5 leading-snug">
            Y mañana,<br />exactamente lo mismo.
          </div>
        </div>
      </div>

      {/* Mobile: lista vertical compacta */}
      <div className="md:hidden bg-paper border border-ink/10 p-6 clip-corner-tr">
        <div className="flex items-center gap-3 mb-5 pb-5 border-b border-ink/10">
          <span className="font-display italic text-4xl text-magenta leading-none">∞</span>
          <div>
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-ash">
              El loop diario
            </div>
            <div className="text-xs text-ash italic mt-0.5">
              Y mañana, exactamente lo mismo.
            </div>
          </div>
        </div>

        <ol className="space-y-0">
          {LOOPS.map((loop, i) => (
            <li key={i} className="relative">
              <div className="flex items-start gap-3 py-3">
                <span className="shrink-0 w-9 h-9 rounded-full bg-magenta/10 border border-magenta/30 text-magenta flex items-center justify-center">
                  {loop.icon}
                </span>
                <div className="flex-1 pt-1.5">
                  <span className="text-sm font-semibold text-ink">{loop.short}</span>
                  <span className="text-sm text-charcoal font-light"> — {loop.text}</span>
                </div>
              </div>
              {i < LOOPS.length - 1 && (
                <div className="ml-[18px] h-3 w-px bg-magenta/30" aria-hidden />
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

/* ============ Iconos del loop ============ */
function IconMessage() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
function IconRefresh() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M23 4v6h-6M1 20v-6h6" />
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
    </svg>
  )
}
function IconEdit() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z" />
    </svg>
  )
}
function IconSpeak() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 6h18M3 12h18M3 18h12" />
    </svg>
  )
}
function IconLightning() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}
function IconFlame() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  )
}
function IconValue() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}
