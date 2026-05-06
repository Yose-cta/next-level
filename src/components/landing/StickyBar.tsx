import Image from 'next/image'
import Link from 'next/link'
import { BRAND } from '@/lib/constants'

export function StickyBar() {
  return (
    <header className="sticky top-0 z-40 glass-dark no-print h-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Next Level Experience home">
          <Image src={BRAND.logoSrc} alt={BRAND.logoAlt} width={32} height={32} className="rounded-sm" />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display italic text-xl text-white group-hover:text-electric transition-colors">
              Next Level Experience
            </span>
            <span className="font-mono text-[9px] tracking-[0.3em] text-white/45 uppercase mt-1">
              2nd Edition · Half-Day
            </span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-2 font-mono uppercase tracking-[0.2em] text-white/55 text-[10px]">
          <span className="inline-block w-1 h-1 rounded-full bg-electric" />
          <span data-editable="topbar-text">Sábado 16 de mayo · Providencia · Entrada General 2x1</span>
        </div>
        <Link
          href="#tickets"
          className="bg-electric text-midnight font-semibold px-4 sm:px-5 py-2 rounded-full hover:bg-yellow-300 transition text-xs sm:text-sm"
        >
          Reservar →
        </Link>
      </div>
    </header>
  )
}
