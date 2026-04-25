export function Mirror() {
  return (
    <section className="sec-light py-24 sm:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 reveal">
            <div className="flex items-center gap-4 mb-7">
              <div className="h-px w-10 bg-gold" />
              <div className="eyebrow">El espejo</div>
            </div>
            <h2 className="font-display text-display-lg text-ink">
              <span data-editable="mirror-h">
                Trabajas duro.{' '}
                <span className="italic text-magenta">Pero algo no encaja.</span>
              </span>
            </h2>

            <p className="mt-9 text-lg sm:text-xl text-charcoal leading-relaxed max-w-2xl font-light" data-editable="mirror-body">
              Tu mensaje no refleja lo que vales. Tu imagen no te representa. Y vender se
              siente como mendigar. Probaste cursos, reels y tips de Instagram. Y sigues en
              el mismo lugar — cargando un negocio que en realidad te carga a ti.
            </p>

            <blockquote className="mt-10 pl-6 border-l border-electric max-w-xl">
              <p className="font-display italic text-2xl sm:text-3xl text-ink leading-snug" data-editable="mirror-quote">
                "El problema no es que falte trabajo. Es que eres tú quien lo está cargando todo."
              </p>
            </blockquote>
          </div>

          <div className="lg:col-span-5 reveal reveal-delayed">
            <div data-image="mirror-photo" data-label="Foto editorial" className="aspect-[3/4] w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
