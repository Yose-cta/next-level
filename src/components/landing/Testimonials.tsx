import Image from 'next/image'

import { TESTIMONIALS } from '@/lib/constants'

export function Testimonials() {
  return (
    <section className="sec-light py-24 sm:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 reveal">
          <h2 className="font-display text-display-lg text-ink">
            <span data-editable="test-h">
              Así se vive Next Level:{' '}
              <span className="italic text-magenta">
                experiencias reales de quienes ya estuvieron.
              </span>
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
                    <span className="eyebrow text-magenta whitespace-nowrap">
                      Cómo se vivió Next Level Experience
                    </span>
                    <div className="h-px flex-1 bg-magenta/30" />
                  </div>
                )}

                <div
                  className={
                    isRecap
                      ? 'aspect-[4/5] w-full mb-6 border-2 border-magenta/50 overflow-hidden bg-ink/5'
                      : 'aspect-[4/5] w-full mb-6 border border-ink/10 overflow-hidden bg-ink/5'
                  }
                >
                  <iframe
                    src={`https://fast.wistia.net/embed/iframe/${t.wistiaId}?videoFoam=true`}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    className="w-full h-full block border-0"
                    title={t.name}
                  />
                </div>

                {!isRecap && (
                  <>
                    <blockquote className="flex-1">
                      <p
                        className="font-display italic text-xl sm:text-2xl text-ink leading-snug"
                        data-editable={`${t.id}-quote`}
                      >
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </blockquote>

                    <footer className="mt-6 pt-6 border-t border-ink/15">
                      <div
                        className="font-display italic text-2xl text-ink leading-none"
                        data-editable={`${t.id}-name`}
                      >
                        {t.name}
                      </div>
                      <div
                        className="text-sm text-ash font-medium uppercase tracking-[0.2em] mt-2"
                        data-editable={`${t.id}-role`}
                      >
                        {t.role}
                      </div>
                    </footer>
                  </>
                )}
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
                className="aspect-square w-full overflow-hidden border border-ink/10 bg-ink/5"
              >
                <Image
                  src={`/past-event/${n}.jpg`}
                  alt={`Edición anterior · foto ${n}`}
                  width={960}
                  height={1280}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
