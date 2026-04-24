export function Guarantee() {
  return (
    <section className="py-24 sm:py-32 bg-noir-2 border-b border-champagne/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
        <div className="secnum mb-4">08 — LA GARANTÍA</div>
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-electric text-electric font-display text-3xl mb-8">
          60'
        </div>
        <h2 className="font-display text-4xl sm:text-5xl text-cream font-light leading-[1.1]">
          <span data-editable="guar-h">
            Garantía de los <em className="text-electric not-italic">primeros 60 minutos</em>.
          </span>
        </h2>
        <p
          className="mt-8 text-lg text-cream/80 leading-relaxed max-w-2xl mx-auto"
          data-editable="guar-body"
        >
          Si en la primera hora no sentís que esto va a cambiar tu negocio, te devolvemos
          el 100% — y te quedás con todo lo que aplicaste hasta ese momento. Sin
          preguntas. Sin formularios. El riesgo es nuestro, no tuyo.
        </p>
      </div>
    </section>
  )
}
