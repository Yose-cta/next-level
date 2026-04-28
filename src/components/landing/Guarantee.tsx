/**
 * Guarantee v3 — garantía POSITIVA, no de devolución.
 * En lugar de "te devolvemos el dinero" prometemos lo que SÍ te llevas:
 * claridad, recursos, comunidad y dirección.
 */
const PROMISES = [
  {
    icon: <IconClarity />,
    title: 'Claridad',
    body: 'Vas a salir sabiendo qué necesitas dejar de cargar tú y por dónde empezar.',
  },
  {
    icon: <IconResources />,
    title: 'Recursos aplicables',
    body: 'Te llevas herramientas concretas para empezar a aplicar la semana siguiente.',
  },
  {
    icon: <IconDirection />,
    title: 'Una dirección',
    body: 'Sales con criterios para ajustar tu negocio, tu imagen y tu comunicación.',
  },
  {
    icon: <IconCommunity />,
    title: 'Acompañamiento',
    body: 'Networking real con personas en tu mismo nivel y soporte post-evento.',
  },
] as const

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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-14 reveal">
          <h2 className="font-display text-display-lg text-white leading-[1.05]">
            <span data-editable="guar-h">
              No te prometemos magia.<br />
              <span className="italic text-electric">Te garantizamos lo que sí te llevas.</span>
            </span>
          </h2>

          <p
            className="mt-9 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto font-light"
            data-editable="guar-body"
          >
            No vas a salir con todo resuelto. Pero sí vas a salir con una mirada distinta
            sobre tu negocio, tu imagen y tu comunicación. Y eso importa, porque muchas
            veces no estás estancada porque te falte capacidad — estás estancada porque
            estás decidiendo desde el cansancio, mostrando menos de lo que vales y
            comunicando sin la fuerza que tu oferta necesita.
          </p>
        </div>

        {/* 4 garantías */}
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 border border-white/8 reveal">
          {PROMISES.map((p, i) => (
            <li
              key={i}
              className="bg-midnight p-7 sm:p-8 flex flex-col gap-4 hover:bg-midnight-2 transition-colors duration-500"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-md border border-electric/30 text-electric">
                {p.icon}
              </div>
              <h3
                className="font-display italic text-2xl text-white leading-tight"
                data-editable={`guar-promise-${i}-h`}
              >
                {p.title}
              </h3>
              <p
                className="text-sm sm:text-base text-white/70 leading-relaxed font-light"
                data-editable={`guar-promise-${i}-body`}
              >
                {p.body}
              </p>
            </li>
          ))}
        </ul>

        {/* Cierre operativo */}
        <div className="mt-12 text-center reveal">
          <p
            className="text-base text-white/65 font-light max-w-2xl mx-auto leading-relaxed"
            data-editable="guar-foot"
          >
            <span className="text-white">Compromiso operativo:</span> si no puedes asistir,
            puedes transferir tu cupo a otra persona avisando con al menos 48 horas de
            anticipación.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ============ Iconos ============ */
function IconClarity() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  )
}
function IconResources() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  )
}
function IconDirection() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2l4 8h-3v12h-2V10H8z" />
    </svg>
  )
}
function IconCommunity() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
