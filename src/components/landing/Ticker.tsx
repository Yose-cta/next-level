const ITEMS = [
  '16 Mayo 2026',
  'Condell 1337 · Providencia',
  '14h a 21h · 6 horas presenciales',
  'Cupos limitados',
  'IA aplicada · Imagen · Comunicación',
  'Te vas con sistema operando',
] as const

export function Ticker() {
  return (
    <section
      className="marquee bg-electric text-noir py-4 border-y border-noir overflow-hidden no-print"
      aria-hidden="true"
    >
      <div className="marquee-track font-mono text-sm sm:text-base font-semibold uppercase tracking-[0.25em]">
        <Track />
        <Track />
      </div>
    </section>
  )
}

function Track() {
  return (
    <div className="flex items-center gap-12 pr-12 whitespace-nowrap">
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center gap-12">
          <span>{item}</span>
          <span aria-hidden>★</span>
        </span>
      ))}
    </div>
  )
}
