import Image from 'next/image'
import { BRAND } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="sec-dark border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <Image src={BRAND.logoSrc} alt={BRAND.logoAlt} width={32} height={32} className="rounded-sm" />
            <span className="font-display italic text-2xl text-white">Next Level Experience</span>
          </div>
          <div className="text-xs text-white/55 font-mono uppercase tracking-[0.2em] text-center" data-editable="footer-meta">
            Half-Day · Santiago de Chile · 2026
          </div>
          <div className="text-xs text-white/45 font-mono" data-editable="footer-copy">
            © 2026 Next Level Experience
          </div>
        </div>
      </div>
    </footer>
  )
}
