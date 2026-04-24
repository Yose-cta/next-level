import Link from 'next/link'

export function StickyBar() {
  return (
    <div className="sticky top-0 z-40 bg-noir/90 backdrop-blur-md border-b border-champagne/15 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-3 font-mono uppercase tracking-wider text-mutedc">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
          <span data-editable="topbar-text">
            Sábado 16 de Mayo · 14h a 21h · Santiago · Cupos limitados
          </span>
        </div>
        <Link
          href="#tickets"
          className="hidden sm:inline-block bg-electric text-noir font-semibold px-4 py-1.5 rounded-full hover:bg-yellow-300 transition"
        >
          Reservar →
        </Link>
      </div>
    </div>
  )
}
