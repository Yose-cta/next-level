import { TESTIMONIALS } from '@/lib/constants'

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32 border-b border-champagne/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <div className="secnum mb-4">07 — ELLOS YA DIERON EL SALTO</div>
          <h2 className="font-display text-4xl sm:text-5xl text-cream font-light">
            <span data-editable="test-h">
              Lo que dicen quienes ya pasaron por{' '}
              <em className="text-champagne">Next Level</em>.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t) => (
            <article key={t.id} className="reveal flex flex-col">
              <div
                data-video={`${t.id}-video`}
                data-label="Conectar video Wistia"
                className="aspect-[4/5] w-full rounded-sm mb-6"
              />
              <blockquote className="flex-1">
                <p
                  className="font-display italic text-xl text-cream/90 leading-snug"
                  data-editable={`${t.id}-quote`}
                >
                  "{t.quote}"
                </p>
              </blockquote>
              <footer className="mt-6 pt-6 border-t border-champagne/20">
                <div
                  className="font-display text-lg text-cream"
                  data-editable={`${t.id}-name`}
                >
                  {t.name}
                </div>
                <div
                  className="text-sm text-mutedc font-mono uppercase tracking-wider mt-1"
                  data-editable={`${t.id}-role`}
                >
                  {t.role}
                </div>
              </footer>
            </article>
          ))}
        </div>

        <div className="mt-16 reveal">
          <div
            className="font-mono text-xs uppercase tracking-[0.3em] text-mutedc mb-5 text-center"
            data-editable="past-event-h"
          >
            Fotos de la edición anterior
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                data-image={`past-${n}`}
                data-label={`Foto ${n}`}
                className="aspect-square w-full rounded-sm"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
