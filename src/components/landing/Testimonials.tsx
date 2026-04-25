import { TESTIMONIALS } from '@/lib/constants'

export function Testimonials() {
  return (
    <section className="sec-light py-24 sm:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 reveal">
          <div className="flex items-center justify-center gap-4 mb-7">
            <div className="h-px w-8 bg-gold" />
            <div className="eyebrow">Edición anterior · Santiago 2025</div>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-display-lg text-ink">
            <span data-editable="test-h">
              Mira cómo se vivió{' '}
              <span className="italic text-magenta">y lo que dicen quienes ya pasaron.</span>
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
          {TESTIMONIALS.map((t, idx) => {
            const isRecap = idx === 1

            return (
              <article key={t.id} className="reveal flex flex-col">
                {isRecap && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px w-6 bg-magenta" />
                    <span className="eyebrow text-magenta">Cómo se vivió</span>
                    <div className="h-px flex-1 bg-magenta/30" />
                  </div>
                )}

                <div
                  data-video={`${t.id}-video`}
                  data-label={isRecap ? 'Video resumen del evento' : 'Conectar video Wistia'}
                  className={
                    isRecap
                      ? 'aspect-[4/5] w-full mb-6 border-2 border-magenta/50'
                      : 'aspect-[4/5] w-full mb-6 border border-ink/10'
                  }
                />

                <blockquote className="flex-1">
                  <p
                    className={
                      isRecap
                        ? 'font-display text-xl sm:text-2xl text-ink leading-snug'
                        : 'font-display italic text-xl sm:text-2xl text-ink leading-snug'
                    }
                    data-editable={`${t.id}-quote`}
                  >
                    {isRecap ? t.quote : `"${t.quote}"`}
                  </p>
                </blockquote>

                <footer
                  className={
                    isRecap
                      ? 'mt-6 pt-6 border-t border-magenta/40'
                      : 'mt-6 pt-6 border-t border-ink/15'
                  }
                >
                  <div
                    className="font-display italic text-2xl text-ink leading-none"
                    data-editable={`${t.id}-name`}
                  >
                    {t.name}
                  </div>
                  <div
                    className={
                      isRecap
                        ? 'text-sm text-magenta font-medium uppercase tracking-[0.2em] mt-2'
                        : 'text-sm text-ash font-medium uppercase tracking-[0.2em] mt-2'
                    }
                    data-editable={`${t.id}-role`}
                  >
                    {t.role}
                  </div>
                </footer>
              </article>
            )
          })}
        </div>

        <div className="mt-16 reveal">
          <div className="eyebrow text-center mb-5" data-editable="past-event-h">
            Fotos de la edición anterior
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                data-image={`past-${n}`}
                data-label={`Foto ${n}`}
                className="aspect-square w-full border border-ink/10"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
