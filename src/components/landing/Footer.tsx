export function Footer() {
  return (
    <footer className="border-t border-champagne/15 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="font-display text-2xl text-cream">
          <span data-editable="footer-logo">
            NEXT <em className="text-electric">Level.</em>
          </span>
        </div>
        <div
          className="text-sm text-mutedc font-mono uppercase tracking-widest text-center"
          data-editable="footer-meta"
        >
          Workshop presencial · Santiago de Chile · 2026
        </div>
        <div className="text-xs text-mutedc font-mono" data-editable="footer-copy">
          © 2026 Next Level Experience
        </div>
      </div>
    </footer>
  )
}
