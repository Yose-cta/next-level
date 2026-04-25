const ITEMS = [
  '16 Mayo 2026',
  'Condell 1337 · Providencia',
  '14h a 21h · Half-Day',
  'Cupos Limitados',
  'IA con Claude',
  'Imagen y Color',
  'Comunicación y Ventas',
  'Te llevas un sistema operando',
] as const

export function Ticker() {
  return (
    <section
      className="marquee bg-electric text-midnight py-4 border-y border-midnight/20 overflow-hidden no-print"
      aria-hidden="true"
    >
      <div className="marquee-track font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.3em]">
        <Track />
        <Track />
      </div>
    </section>
  )
}

function Track() {
  return (
    <div className="flex items-center gap-10 pr-10 whitespace-nowrap shrink-0">
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center gap-10">
          <span>{item}</span>
          <span aria-hidden className="text-midnight/40">★</span>
        </span>
      ))}
    </div>
  )
}
