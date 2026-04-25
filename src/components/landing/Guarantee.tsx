/**
 * Guarantee — garantía de los primeros 60 minutos.
 * Mensaje ético: el riesgo es nuestro, no del cliente.
 * Sin letras chicas, sin formularios.
 */
export function Guarantee() {
  return (
    <section className="sec-dark py-24 sm:py-36 relative overflow-hidden">
      <div
        className="absolute pointer-events-none w-[400px] h-[400px] rounded-full opacity-25 -bottom-20 left-1/2 -translate-x-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(246, 207, 47, 0.4), transparent 70%)',
          filter: 'blur(80px)',
        }}
        aria-hidden
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal relative">
        <div className="flex items-center justify-center gap-4 mb-7">
          <div className="h-px w-8 bg-electric" />
          <div className="eyebrow">La garantía</div>
          <div className="h-px w-8 bg-electric" />
        </div>

        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-2 border-electric text-electric font-display italic text-4xl mb-9 relative">
          60'
          <span className="absolute -top-2 -right-2 bg-magenta text-white px-2 py-0.5 rounded-full font-mono text-[8px] tracking-[0.2em] uppercase">
            min
          </span>
        </div>

        <h2 className="font-display text-display-lg text-white">
          <span data-editable="guar-h">
            Si en los primeros 60 minutos<br />
            <span className="italic text-electric">
              no sientes que esto va a cambiar tu negocio,
            </span>
            <br />
            te devolvemos el 100%.
          </span>
        </h2>

        <p
          className="mt-9 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto font-light"
          data-editable="guar-body"
        >
          Te quedas con todo lo que aplicaste hasta ese momento.{' '}
          <span className="text-white">Sin preguntas. Sin formularios.</span> El riesgo
          es nuestro, no tuyo — porque sabemos exactamente qué te vas a llevar.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-white/55 font-mono uppercase tracking-[0.2em]">
          <span className="flex items-center gap-2">
            <CheckShield />
            <span>Reembolso del 100%</span>
          </span>
          <span className="text-white/25">·</span>
          <span className="flex items-center gap-2">
            <CheckShield />
            <span>Sin trámites</span>
          </span>
          <span className="text-white/25">·</span>
          <span className="flex items-center gap-2">
            <CheckShield />
            <span>Te quedas con lo aplicado</span>
          </span>
        </div>
      </div>
    </section>
  )
}

function CheckShield() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="text-electric">
      <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}
