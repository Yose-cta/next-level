export function Guarantee() {
  return (
    <section className="sec-dark py-24 sm:py-36 relative overflow-hidden">
      <div className="absolute pointer-events-none w-[400px] h-[400px] rounded-full opacity-25 -bottom-20 left-1/2 -translate-x-1/2" style={{ background: 'radial-gradient(circle, rgba(246, 207, 47, 0.4), transparent 70%)', filter: 'blur(80px)' }} aria-hidden />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal relative">
        <div className="flex items-center justify-center gap-4 mb-7">
          <div className="h-px w-8 bg-electric" />
          <div className="eyebrow">La garantía</div>
          <div className="h-px w-8 bg-electric" />
        </div>
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-2 border-electric text-electric font-display italic text-4xl mb-9">
          60'
        </div>
        <h2 className="font-display text-display-lg text-white">
          <span data-editable="guar-h">
            Garantía de los <span className="italic text-electric">primeros 60 minutos.</span>
          </span>
        </h2>
        <p className="mt-9 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto font-light" data-editable="guar-body">
          Si en la primera hora no sientes que esto va a cambiar tu negocio, te devolvemos
          el 100% — y te quedas con todo lo que aplicaste hasta ese momento. Sin
          preguntas. Sin formularios. El riesgo es nuestro, no tuyo.
        </p>
      </div>
    </section>
  )
}
