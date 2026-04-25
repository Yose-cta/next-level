import Image from 'next/image'
import { BRAND, TICKETS } from '@/lib/constants'

export function Footer() {
  const testTicket = TICKETS.find((t) => t.id === 'test')

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

        {testTicket && (
          <div className="mt-10 pt-6 border-t border-white/8 flex justify-center">
            <a
              href="/api/checkout?ticket=test"
              className="text-[11px] uppercase tracking-[0.25em] text-white/35 hover:text-electric transition flex items-center gap-2"
              title="Solo para validar el flujo de pago end-to-end"
            >
              <span aria-hidden>·</span>
              <span>Probar el sistema · Pago de prueba {testTicket.price.display}</span>
              <span aria-hidden>·</span>
            </a>
          </div>
        )}
      </div>
    </footer>
  )
}
