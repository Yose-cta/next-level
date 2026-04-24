export function Mirror() {
  return (
    <section className="py-24 sm:py-32 border-b border-champagne/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4 reveal">
            <div className="secnum mb-4">01 — EL ESPEJO</div>
            <h2 className="font-display text-4xl sm:text-5xl text-cream font-light leading-[1.05]">
              <span data-editable="mirror-h">
                Trabajás duro.
                <br />
                <em className="text-champagne">Sos buena en lo tuyo.</em>
                <br />
                Pero algo no encaja.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 reveal">
            <p className="text-lg text-cream/80 leading-relaxed dropcap" data-editable="mirror-body">
              Tu mensaje no refleja lo que valés. Tu imagen no te representa. Y vender se
              siente como mendigar. Probaste cursos, reels y tips de Instagram. Y seguís en
              el mismo lugar — cargando un negocio que en realidad te carga a vos.
            </p>

            <blockquote className="mt-10 pl-6 border-l-2 border-electric">
              <p
                className="font-display italic text-2xl text-cream leading-snug"
                data-editable="mirror-quote"
              >
                "El problema no es que falte trabajo. El problema es que sos vos quien lo
                está cargando todo."
              </p>
            </blockquote>
          </div>

          <div className="lg:col-span-3 reveal">
            <div
              data-image="mirror-photo"
              data-label="Foto editorial · trabajando hasta tarde"
              className="aspect-[3/4] w-full rounded-sm"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
