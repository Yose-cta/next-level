'use client'

import { useState } from 'react'
import Link from 'next/link'

const MYTHS = [
  { myth: 'La imagen no importa, lo que importa es lo que sé hacer', reality: 'Tu imagen refuerza tu mensaje y credibilidad. Es tu carta de presentación antes de decir una palabra.' },
  { myth: 'Para verme profesional debo gastar mucho dinero', reality: 'No se trata de marcas caras, sino de estrategias inteligentes de combinación y color.' },
  { myth: 'Si me visto demasiado formal, perderé autenticidad', reality: 'La clave es adaptar la imagen sin perder tu esencia. Estrategia no es máscara.' },
]

const FIRST_IMPRESSION_ITEMS = [
  'Qué tan confiable es la persona',
  'Su nivel de autoconfianza',
  'El grado de profesionalismo',
  'La inteligencia y capacidad de liderazgo',
  'El nivel de riesgo o aventura que representa',
]

const ERRORS = [
  'Desconocer el dress code del contexto',
  'Accesorios excesivos',
  'Demasiado informal para la ocasión',
  'Ropa arrugada o descuidada',
  'Zapatos desgastados',
  'Vestir sin considerar el contexto',
]

const DRESS_CODES = [
  {
    id: 'formal',
    label: 'Profesional / Formal',
    projects: 'Autoridad, Alto nivel, Formalidad, Éxito',
    occasions: 'Bodas, galas, eventos corporativos, óperas, fiestas de año nuevo',
    tips: ['Camisa clara siempre, no oscura', 'Zapatos acordonados van con corbata', 'Zapatos lisos o mocasines se pueden llevar sin corbata'],
    color: 'border-electric/40 bg-electric/5',
  },
  {
    id: 'business',
    label: 'Business Casual',
    projects: 'Confianza, Trabajador/a, Confortable, Abierto/a',
    occasions: 'Reuniones de trabajo, conferencias, entrevistas, cenas de negocios, networking',
    tips: ['Colores como gris y beige son los más clásicos', 'Camisas de cuadros pequeños (no tipo leñador)', 'Mezcla estructura con comodidad'],
    color: 'border-magenta/40 bg-magenta/5',
  },
  {
    id: 'casual',
    label: 'Casual',
    projects: 'Amigable, Creativo/a, Informal, Relajado/a',
    occasions: 'Reunión con amigos, shopping, clases, salidas informales',
    tips: ['Jeans, camisetas, polerones, zapatillas', 'Ideal para fin de semana y ocasiones informales', 'Pierde la formalidad totalmente'],
    color: 'border-emerald-400/40 bg-emerald-400/5',
  },
]

const STYLE_COMBOS = [
  { label: 'Profesionalismo', style: 'Clásico', desc: 'Líneas rectas, colores neutros, prendas estructuradas. Transmite seriedad y competencia.', color: 'text-blue-400 border-blue-400/30 bg-blue-400/10' },
  { label: 'Cercanía', style: 'Romántico', desc: 'Tejidos suaves, tonos cálidos, formas fluidas. Transmite accesibilidad y empatía.', color: 'text-pink-400 border-pink-400/30 bg-pink-400/10' },
  { label: 'Autoridad', style: 'Dramático', desc: 'Contrastes fuertes, prendas statement, presencia imponente. Transmite poder y liderazgo.', color: 'text-red-400 border-red-400/30 bg-red-400/10' },
]

const COLOR_COMBOS = [
  { name: 'Sofisticación', colors: ['bg-neutral-900', 'bg-neutral-400', 'bg-stone-200'], hex: ['Negro', 'Gris', 'Beige'] },
  { name: 'Autoridad extrema', colors: ['bg-neutral-900', 'bg-blue-900', 'bg-neutral-200'], hex: ['Negro', 'Azul marino', 'Blanco'] },
  { name: 'Creatividad', colors: ['bg-purple-700', 'bg-neutral-900', 'bg-stone-200'], hex: ['Morado', 'Negro', 'Crema'] },
  { name: 'Confianza', colors: ['bg-blue-700', 'bg-neutral-200', 'bg-stone-400'], hex: ['Azul', 'Blanco', 'Gris claro'] },
  { name: 'Seguridad', colors: ['bg-stone-500', 'bg-blue-800', 'bg-neutral-200'], hex: ['Gris', 'Azul oscuro', 'Blanco'] },
]

const SEASONS = [
  { name: 'Verano', traits: 'Frío · Claro · Suave', desc: 'Tonos fríos y suaves. Pasteles, lavanda, rosa pálido, azul cielo. Bajo contraste.', gradient: 'from-blue-200/20 to-pink-200/20', border: 'border-blue-300/30', text: 'text-blue-300' },
  { name: 'Primavera', traits: 'Cálido · Claro · Brillante', desc: 'Tonos cálidos y luminosos. Coral, melocotón, dorado suave, verde claro. Energéticos.', gradient: 'from-yellow-200/20 to-green-200/20', border: 'border-yellow-300/30', text: 'text-yellow-300' },
  { name: 'Otoño', traits: 'Cálido · Profundo · Opaco', desc: 'Tonos cálidos y terrosos. Terracota, ocre, verde oliva, borgoña. Profundos y ricos.', gradient: 'from-orange-400/20 to-red-900/20', border: 'border-orange-400/30', text: 'text-orange-300' },
  { name: 'Invierno', traits: 'Frío · Profundo · Brillante', desc: 'Tonos fríos y vibrantes. Negro, blanco puro, rojo intenso, azul eléctrico. Alto contraste.', gradient: 'from-blue-800/20 to-purple-800/20', border: 'border-purple-400/30', text: 'text-purple-300' },
]

const COLOR_PSYCHOLOGY = [
  { name: 'Blanco', meaning: 'Pureza, paz, elegancia, minimalismo, calma', usage: 'Base versátil. Proyecta limpieza y sencillez.', bg: 'bg-white', text: 'text-neutral-900' },
  { name: 'Negro', meaning: 'Poder, elegancia, autoridad, fuerza, confianza', usage: 'Nunca pasa de moda. Empodera a quien lo elige.', bg: 'bg-neutral-900', text: 'text-white' },
  { name: 'Azul', meaning: 'Calma, confianza, tranquilidad, seguridad', usage: 'Intelecto y comunicación. Ideal para contextos profesionales.', bg: 'bg-blue-600', text: 'text-white' },
  { name: 'Morado', meaning: 'Creatividad, misterio, imaginación, innovación', usage: 'Dinamismo y arte. Estimula la creatividad.', bg: 'bg-purple-600', text: 'text-white' },
  { name: 'Rojo', meaning: 'Poder, decisión, valentía, fuerza, pasión', usage: 'Color poderoso. Energía, acción y urgencia.', bg: 'bg-red-600', text: 'text-white' },
  { name: 'Rosado', meaning: 'Feminidad, dulzura, delicadeza, ternura', usage: 'Calmante. Conecta con el lado amoroso y positivo.', bg: 'bg-pink-400', text: 'text-white' },
  { name: 'Amarillo', meaning: 'Alegría, optimismo, vitalidad, energía', usage: 'Esperanza y buen ánimo. Ayuda a sentirse optimista.', bg: 'bg-yellow-400', text: 'text-neutral-900' },
  { name: 'Verde', meaning: 'Frescura, vitalidad, equilibrio, prosperidad', usage: 'Naturaleza y crecimiento. Símbolo de sustentabilidad.', bg: 'bg-emerald-500', text: 'text-white' },
]

const QUIZ_QUESTIONS = [
  {
    q: '¿En cuántos segundos se forma una primera impresión?',
    options: ['30 segundos', '7 segundos', '1 minuto', '15 segundos'],
    correct: 1,
    explanation: 'Las primeras impresiones se forman en apenas 7 segundos. El efecto halo puede extenderse hasta 4 minutos.',
  },
  {
    q: '¿Qué es el efecto halo?',
    options: [
      'Un tipo de iluminación para fotos',
      'Atribuir cualidades positivas a alguien por una buena primera impresión',
      'Un error al combinar colores',
      'Una técnica de maquillaje',
    ],
    correct: 1,
    explanation: 'El efecto halo es cuando asumimos atributos positivos de alguien basándonos en una primera impresión favorable, en un período de 7 segundos a 4 minutos.',
  },
  {
    q: '¿Cuál es la fórmula Next Level para vestir con intención?',
    options: [
      'Marca + Precio + Tendencia',
      'Prenda base + Estructura + Detalle = Intención',
      'Color + Forma + Textura',
      'Moda + Comodidad + Precio',
    ],
    correct: 1,
    explanation: 'La fórmula es: Prenda base + Estructura + Detalle = Intención. Así vistes con propósito sin gastar de más.',
  },
  {
    q: '¿Cuáles son los 3 pilares de una imagen profesional?',
    options: [
      'Marca, precio, tendencia',
      'Prendas según rubro, cuidado personal, lenguaje corporal',
      'Color, forma, textura',
      'Maquillaje, peinado, accesorios',
    ],
    correct: 1,
    explanation: 'Los 3 pilares son: elegir prendas según rubro y mensaje, cuidado personal, y lenguaje corporal y actitud.',
  },
  {
    q: '¿Qué proyecta el color azul en el ámbito profesional?',
    options: ['Creatividad y rebeldía', 'Confianza, tranquilidad y seguridad', 'Poder y dominancia', 'Alegría y optimismo'],
    correct: 1,
    explanation: 'El azul se asocia con la calma, el intelecto y la comunicación. Proyecta confianza, tranquilidad y seguridad.',
  },
  {
    q: '¿Qué es la colorimetría?',
    options: [
      'Una técnica para pintar paredes',
      'Identificar los tonos que realzan tus características naturales',
      'Un tipo de maquillaje profesional',
      'La ciencia de crear telas de colores',
    ],
    correct: 1,
    explanation: 'La colorimetría identifica los tonos que realzan tus características naturales (piel, ojos, cabello) para mejorar tu apariencia.',
  },
  {
    q: '¿Cuál dress code es apropiado para una entrevista laboral?',
    options: ['Casual', 'Business Casual', 'Solo formal', 'Cualquiera'],
    correct: 1,
    explanation: 'Business Casual es ideal para entrevistas, conferencias y reuniones de negocios. Proyecta confianza sin rigidez.',
  },
  {
    q: '¿Qué transmite un estilo dramático?',
    options: ['Cercanía y empatía', 'Informalidad', 'Autoridad y poder', 'Creatividad artística'],
    correct: 2,
    explanation: 'El estilo dramático usa contrastes fuertes y prendas statement para transmitir poder, autoridad y liderazgo.',
  },
]

export default function ImagenGuide() {
  const [flippedMyths, setFlippedMyths] = useState<Set<number>>(new Set())
  const [activeDressCode, setActiveDressCode] = useState<string | null>(null)
  const [activeCombo, setActiveCombo] = useState<number | null>(null)
  const [activeSeason, setActiveSeason] = useState<number | null>(null)
  const [activeColor, setActiveColor] = useState<number | null>(null)
  const [errorChecks, setErrorChecks] = useState<Set<number>>(new Set())
  const [capsule, setCapsule] = useState({ base: '', estructura: '', detalle: '' })
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const quizScore = Object.entries(quizAnswers).filter(
    ([i, a]) => QUIZ_QUESTIONS[Number(i)].correct === a
  ).length

  return (
    <div className="sec-dark">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-magenta/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative text-center">
          <span className="eyebrow text-magenta mb-3 block">Guía interactiva · Valentina</span>
          <h1 className="font-display italic text-display-lg mb-4">
            Tu Imagen Profesional
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
            Tu imagen habla antes que tú. <span className="text-white font-medium">Aprende a controlar ese mensaje.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {[
              { id: 'impresiones', num: '01', title: 'Primeras Impresiones' },
              { id: 'vestimenta', num: '02', title: 'Código de Vestimenta' },
              { id: 'color', num: '03', title: 'Colorimetría y Color' },
            ].map((block) => (
              <a
                key={block.id}
                href={`#${block.id}`}
                className="group flex items-center gap-3 bg-midnight-2 border border-white/10 hover:border-magenta/40 rounded-xl px-5 py-3 transition-all"
              >
                <span className="font-mono text-xs text-magenta">{block.num}</span>
                <span className="text-sm text-white/80 group-hover:text-white transition-colors">{block.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* BLOQUE 1: PRIMERAS IMPRESIONES */}
      {/* ═══════════════════════════════════════════ */}
      <section id="impresiones" className="py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <span className="eyebrow text-magenta mb-2 block">Bloque 01</span>
            <h2 className="font-display italic text-display-md mb-3">Primeras Impresiones</h2>
            <p className="text-white/60">7 segundos. Eso es todo lo que tienes.</p>
          </div>

          {/* Flip cards: Mitos */}
          <div className="bg-midnight-2 border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
            <h3 className="font-display italic text-xl mb-2">Mitos sobre la imagen profesional</h3>
            <p className="text-sm text-white/50 mb-6">Haz click en cada mito para descubrir la realidad.</p>

            <div className="space-y-4">
              {MYTHS.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const next = new Set(flippedMyths)
                    next.has(i) ? next.delete(i) : next.add(i)
                    setFlippedMyths(next)
                  }}
                  className={`w-full text-left rounded-xl border p-5 transition-all ${
                    flippedMyths.has(i)
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-midnight-3 border-white/10 hover:border-magenta/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded flex-shrink-0 ${
                      flippedMyths.has(i) ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {flippedMyths.has(i) ? 'REALIDAD' : 'MITO'}
                    </span>
                    <div>
                      <p className={`text-sm font-medium ${flippedMyths.has(i) ? 'line-through text-white/40' : 'text-white'}`}>
                        &ldquo;{item.myth}&rdquo;
                      </p>
                      {flippedMyths.has(i) && (
                        <p className="text-sm text-emerald-300 mt-2">{item.reality}</p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Timer visual: 7 segundos + Efecto Halo/Horn */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-electric/10 to-transparent border border-electric/20 rounded-2xl p-6 text-center">
              <p className="font-display italic text-5xl text-electric mb-2">7</p>
              <p className="text-sm text-white/60 mb-1">segundos</p>
              <p className="text-xs text-white/40">El tiempo que toma formarse una primera impresión</p>
              <div className="mt-3 text-sm">
                <span className="inline-block bg-electric/10 text-electric px-3 py-1 rounded-full text-xs">Efecto Halo → hasta 4 min</span>
              </div>
            </div>
            <div className="bg-midnight-2 border border-white/10 rounded-2xl p-6">
              <h4 className="font-medium text-sm mb-3">¿Qué perciben de ti?</h4>
              <ul className="space-y-2">
                {FIRST_IMPRESSION_ITEMS.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-magenta flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3 Pilares */}
          <div className="bg-gradient-to-r from-magenta/10 to-electric/10 border border-magenta/20 rounded-2xl p-6 sm:p-8 mb-8">
            <h3 className="font-display italic text-xl mb-4">Los 3 pilares de tu imagen</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { title: 'Prendas', desc: 'Elegir según tu rubro y el mensaje que quieres transmitir' },
                { title: 'Cuidado personal', desc: 'Limpieza, olor, ajuste de prendas, estado de la ropa' },
                { title: 'Actitud', desc: 'Lenguaje corporal y actitud que complementa tu look' },
              ].map((pillar) => (
                <div key={pillar.title} className="bg-midnight/40 rounded-xl p-4 text-center">
                  <h4 className="font-medium text-magenta mb-1">{pillar.title}</h4>
                  <p className="text-xs text-white/50">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Errores comunes - checklist */}
          <div className="bg-midnight-2 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h3 className="font-display italic text-xl mb-2">Errores que restan profesionalismo</h3>
            <p className="text-sm text-white/50 mb-6">¿Reconoces alguno? Marca los que quieres corregir.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {ERRORS.map((error, i) => (
                <button
                  key={error}
                  onClick={() => {
                    const next = new Set(errorChecks)
                    next.has(i) ? next.delete(i) : next.add(i)
                    setErrorChecks(next)
                  }}
                  className={`text-left flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all ${
                    errorChecks.has(i)
                      ? 'bg-magenta/10 border-magenta/30 text-white'
                      : 'bg-midnight-3 border-white/10 text-white/60 hover:border-white/20'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                    errorChecks.has(i) ? 'border-magenta bg-magenta' : 'border-white/30'
                  }`}>
                    {errorChecks.has(i) && <span className="text-white text-xs font-bold">✓</span>}
                  </span>
                  {error}
                </button>
              ))}
            </div>
            {errorChecks.size > 0 && (
              <p className="text-sm text-magenta mt-4">
                Identificaste {errorChecks.size} área{errorChecks.size > 1 ? 's' : ''} de mejora. ¡Primer paso para corregirlo!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* BLOQUE 2: CÓDIGO DE VESTIMENTA */}
      {/* ═══════════════════════════════════════════ */}
      <section id="vestimenta" className="py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <span className="eyebrow text-magenta mb-2 block">Bloque 02</span>
            <h2 className="font-display italic text-display-md mb-3">Código de Vestimenta</h2>
            <p className="text-white/60">Cómo vestir según cada ocasión.</p>
          </div>

          {/* Selector de dress code */}
          <div className="bg-midnight-2 border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
            <h3 className="font-display italic text-xl mb-2">¿Qué ocasión tienes?</h3>
            <p className="text-sm text-white/50 mb-6">Selecciona el contexto para ver la recomendación.</p>

            <div className="flex flex-wrap gap-3 mb-6">
              {DRESS_CODES.map((dc) => (
                <button
                  key={dc.id}
                  onClick={() => setActiveDressCode(activeDressCode === dc.id ? null : dc.id)}
                  className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    activeDressCode === dc.id ? dc.color + ' text-white' : 'bg-midnight-3 border-white/10 text-white/60 hover:border-white/20'
                  }`}
                >
                  {dc.label}
                </button>
              ))}
            </div>

            {activeDressCode && (() => {
              const dc = DRESS_CODES.find((d) => d.id === activeDressCode)!
              return (
                <div className={`rounded-xl border p-5 ${dc.color}`}>
                  <p className="text-sm text-white/50 mb-1">Proyectas:</p>
                  <p className="font-medium mb-3">{dc.projects}</p>
                  <p className="text-sm text-white/50 mb-1">Ideal para:</p>
                  <p className="text-sm text-white/70 mb-4">{dc.occasions}</p>
                  <p className="text-sm text-white/50 mb-2">Tips clave:</p>
                  <ul className="space-y-1">
                    {dc.tips.map((tip) => (
                      <li key={tip} className="text-sm text-white/70 flex items-start gap-2">
                        <span className="text-magenta mt-1">→</span> {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })()}
          </div>

          {/* Combinaciones exitosas */}
          <div className="bg-midnight-2 border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
            <h3 className="font-display italic text-xl mb-2">¿Qué quieres transmitir?</h3>
            <p className="text-sm text-white/50 mb-6">Selecciona y descubre el estilo que lo logra.</p>

            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {STYLE_COMBOS.map((combo, i) => (
                <button
                  key={combo.label}
                  onClick={() => setActiveCombo(activeCombo === i ? null : i)}
                  className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all text-center ${
                    activeCombo === i ? combo.color : 'bg-midnight-3 border-white/10 text-white/60 hover:border-white/20'
                  }`}
                >
                  {combo.label}
                </button>
              ))}
            </div>

            {activeCombo !== null && (
              <div className={`rounded-xl border p-5 ${STYLE_COMBOS[activeCombo].color}`}>
                <p className="font-medium mb-1">Estilo {STYLE_COMBOS[activeCombo].style}</p>
                <p className="text-sm opacity-80">{STYLE_COMBOS[activeCombo].desc}</p>
              </div>
            )}
          </div>

          {/* Combinaciones de color profesional */}
          <div className="bg-midnight-2 border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
            <h3 className="font-display italic text-xl mb-6">Combinaciones profesionales de color</h3>
            <div className="space-y-4">
              {COLOR_COMBOS.map((combo) => (
                <div key={combo.name} className="flex items-center gap-4 bg-midnight-3 rounded-xl p-4">
                  <div className="flex gap-1 flex-shrink-0">
                    {combo.colors.map((color, i) => (
                      <div key={i} className={`w-8 h-8 rounded-lg ${color} border border-white/10`} title={combo.hex[i]} />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{combo.name}</p>
                    <p className="text-xs text-white/40">{combo.hex.join(' + ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Armario cápsula: Fórmula NL */}
          <div className="bg-gradient-to-r from-magenta/10 to-electric/10 border border-magenta/20 rounded-2xl p-6 sm:p-8">
            <h3 className="font-display italic text-xl mb-2">Tu Armario Cápsula</h3>
            <p className="text-sm text-white/50 mb-6">Fórmula Next Level: Prenda base + Estructura + Detalle = Intención</p>

            <div className="space-y-4">
              {[
                { key: 'base' as const, label: 'Prenda base (equilibrio)', placeholder: 'Ej: Camisa blanca, blusa neutra, pantalón recto' },
                { key: 'estructura' as const, label: 'Estructura (autoridad)', placeholder: 'Ej: Blazer, chaqueta estructurada, vestido formal' },
                { key: 'detalle' as const, label: 'Detalle (intención)', placeholder: 'Ej: Accesorio protagonista, zapato con personalidad, color de acento' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm text-white/60 mb-1">{field.label}</label>
                  <input
                    type="text"
                    value={capsule[field.key]}
                    onChange={(e) => setCapsule({ ...capsule, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full bg-midnight/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-magenta/50 transition-colors"
                  />
                </div>
              ))}
            </div>

            {capsule.base && capsule.estructura && capsule.detalle && (
              <div className="mt-6 bg-midnight/40 border border-magenta/30 rounded-xl p-5 text-center">
                <p className="text-magenta text-sm font-medium mb-2">Tu look con intención:</p>
                <p className="text-white">
                  {capsule.base} <span className="text-magenta mx-1">+</span> {capsule.estructura} <span className="text-magenta mx-1">+</span> {capsule.detalle}
                </p>
                <p className="text-electric text-sm mt-2 font-medium">= Intención</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* BLOQUE 3: COLORIMETRÍA Y COLOR */}
      {/* ═══════════════════════════════════════════ */}
      <section id="color" className="py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <span className="eyebrow text-magenta mb-2 block">Bloque 03</span>
            <h2 className="font-display italic text-display-md mb-3">Colorimetría y Color</h2>
            <p className="text-white/60">El poder del color en tu imagen.</p>
          </div>

          {/* Estaciones */}
          <div className="bg-midnight-2 border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
            <h3 className="font-display italic text-xl mb-2">¿Cuál es tu estación?</h3>
            <p className="text-sm text-white/50 mb-6">Explora cada estación para descubrir qué paleta realza tus rasgos naturales.</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {SEASONS.map((season, i) => (
                <button
                  key={season.name}
                  onClick={() => setActiveSeason(activeSeason === i ? null : i)}
                  className={`px-4 py-4 rounded-xl border text-center transition-all ${
                    activeSeason === i
                      ? `bg-gradient-to-b ${season.gradient} ${season.border} ${season.text}`
                      : 'bg-midnight-3 border-white/10 text-white/60 hover:border-white/20'
                  }`}
                >
                  <p className="font-medium text-sm">{season.name}</p>
                  <p className="text-[10px] mt-1 opacity-60">{season.traits}</p>
                </button>
              ))}
            </div>

            {activeSeason !== null && (
              <div className={`rounded-xl border p-5 bg-gradient-to-r ${SEASONS[activeSeason].gradient} ${SEASONS[activeSeason].border}`}>
                <p className={`font-medium mb-1 ${SEASONS[activeSeason].text}`}>{SEASONS[activeSeason].name}</p>
                <p className="text-xs text-white/50 mb-2">{SEASONS[activeSeason].traits}</p>
                <p className="text-sm text-white/70">{SEASONS[activeSeason].desc}</p>
              </div>
            )}
          </div>

          {/* Psicología del color */}
          <div className="bg-midnight-2 border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
            <h3 className="font-display italic text-xl mb-2">Psicología del Color</h3>
            <p className="text-sm text-white/50 mb-6">Click en un color para ver qué comunica.</p>

            <div className="flex flex-wrap gap-3 mb-6">
              {COLOR_PSYCHOLOGY.map((color, i) => (
                <button
                  key={color.name}
                  onClick={() => setActiveColor(activeColor === i ? null : i)}
                  className={`w-12 h-12 rounded-xl ${color.bg} border-2 transition-all ${
                    activeColor === i ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'
                  }`}
                  title={color.name}
                />
              ))}
            </div>

            {activeColor !== null && (
              <div className="bg-midnight-3 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-lg ${COLOR_PSYCHOLOGY[activeColor].bg}`} />
                  <h4 className="font-medium">{COLOR_PSYCHOLOGY[activeColor].name}</h4>
                </div>
                <p className="text-sm text-white/60 mb-2"><strong className="text-white/80">Transmite:</strong> {COLOR_PSYCHOLOGY[activeColor].meaning}</p>
                <p className="text-sm text-white/60"><strong className="text-white/80">Uso:</strong> {COLOR_PSYCHOLOGY[activeColor].usage}</p>
              </div>
            )}
          </div>

          {/* Paletas recomendadas */}
          <div className="bg-gradient-to-r from-magenta/10 to-electric/10 border border-magenta/20 rounded-2xl p-6 sm:p-8">
            <h3 className="font-display italic text-xl mb-4">Paletas profesionales recomendadas</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-white/50 font-medium">Base neutra</th>
                    <th className="text-left py-3 px-4 text-white/50 font-medium">Color de autoridad</th>
                    <th className="text-left py-3 px-4 text-white/50 font-medium">Uso recomendado</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Blanco, gris, beige', 'Azul marino', 'Reuniones, liderazgo, presentaciones'],
                    ['Negro, gris oscuro', 'Borgoña / verde profundo', 'Eventos, cargos directivos'],
                    ['Beige, camel', 'Azul medio', 'Contextos corporativos modernos'],
                  ].map(([base, authority, use], i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-3 px-4 text-white/70">{base}</td>
                      <td className="py-3 px-4 text-magenta">{authority}</td>
                      <td className="py-3 px-4 text-white/50">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* QUIZ FINAL */}
      {/* ═══════════════════════════════════════════ */}
      <section id="quiz" className="py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <span className="eyebrow text-magenta mb-2 block">Autoevaluación</span>
            <h2 className="font-display italic text-display-md mb-3">¿Cuánto aprendiste?</h2>
            <p className="text-white/60">8 preguntas sobre imagen profesional.</p>
          </div>

          <div className="bg-midnight-2 border border-white/10 rounded-xl p-4 mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/50">Respondidas</span>
              <span className="text-magenta font-mono">{Object.keys(quizAnswers).length}/{QUIZ_QUESTIONS.length}</span>
            </div>
            <div className="h-2 bg-midnight-3 rounded-full overflow-hidden">
              <div className="h-full bg-magenta rounded-full transition-all duration-500" style={{ width: `${(Object.keys(quizAnswers).length / QUIZ_QUESTIONS.length) * 100}%` }} />
            </div>
          </div>

          <div className="space-y-6">
            {QUIZ_QUESTIONS.map((question, qi) => (
              <div
                key={qi}
                className={`bg-midnight-2 border rounded-2xl p-6 transition-all ${
                  quizSubmitted
                    ? quizAnswers[qi] === question.correct ? 'border-emerald-500/40' : quizAnswers[qi] !== undefined ? 'border-red-500/40' : 'border-white/10'
                    : 'border-white/10'
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-magenta/20 text-magenta flex items-center justify-center text-sm font-bold flex-shrink-0">{qi + 1}</span>
                  <p className="font-medium pt-1">{question.q}</p>
                </div>
                <div className="space-y-2 ml-11">
                  {question.options.map((option, oi) => (
                    <button
                      key={oi}
                      onClick={() => !quizSubmitted && setQuizAnswers({ ...quizAnswers, [qi]: oi })}
                      disabled={quizSubmitted}
                      className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all ${
                        quizSubmitted && oi === question.correct ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                        : quizSubmitted && quizAnswers[qi] === oi && oi !== question.correct ? 'bg-red-500/10 border-red-500/40 text-red-300'
                        : quizAnswers[qi] === oi ? 'bg-magenta/10 border-magenta/40 text-white'
                        : 'bg-midnight-3 border-white/10 text-white/60 hover:border-white/20'
                      } ${quizSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
                        quizAnswers[qi] === oi ? 'border-magenta bg-magenta text-white' : 'border-white/30'
                      } ${quizSubmitted && oi === question.correct ? 'border-emerald-400 bg-emerald-400 text-midnight' : ''}`}>
                        {quizSubmitted && oi === question.correct ? '✓' : quizAnswers[qi] === oi ? '●' : ''}
                      </span>
                      {option}
                    </button>
                  ))}
                </div>
                {quizSubmitted && quizAnswers[qi] !== undefined && (
                  <div className={`ml-11 mt-3 p-3 rounded-lg text-sm ${
                    quizAnswers[qi] === question.correct ? 'bg-emerald-500/10 text-emerald-300' : 'bg-red-500/10 text-red-300'
                  }`}>
                    {question.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          {!quizSubmitted ? (
            <button
              onClick={() => setQuizSubmitted(true)}
              disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
              className="mt-8 w-full max-w-md mx-auto block bg-magenta text-white font-bold py-4 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(243,37,154,0.3)] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Verificar respuestas
            </button>
          ) : (
            <div className="mt-8 bg-midnight-2 border border-magenta/30 rounded-2xl p-8 text-center">
              <p className="text-magenta font-mono text-sm mb-2">Tu resultado</p>
              <p className="font-display italic text-6xl text-white mb-2">{quizScore}/{QUIZ_QUESTIONS.length}</p>
              <p className="text-white/60">
                {quizScore === QUIZ_QUESTIONS.length ? '¡Perfecto! Dominas tu imagen profesional.'
                  : quizScore >= 6 ? '¡Muy bien! Tienes una base sólida.'
                  : quizScore >= 4 ? 'Buen inicio. Revisa los bloques donde fallaste.'
                  : 'Te recomendamos repasar la guía completa.'}
              </p>
              <button onClick={() => { setQuizAnswers({}); setQuizSubmitted(false) }} className="mt-4 text-sm text-magenta underline hover:no-underline">
                Intentar de nuevo
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Cierre */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-display italic text-2xl sm:text-3xl text-white/80 mb-3">
            &ldquo;Tu imagen es tu carta de presentación. Proyecta tu mejor versión con estrategia y confianza&rdquo;
          </p>
          <p className="text-white/40 text-sm">Valentina — Asesora de Imagen · @valentina.asesoradeimagen</p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/guias/comunicacion" className="text-sm text-white/50 border border-white/10 rounded-xl px-6 py-3 hover:border-white/30 transition-colors">
              ← Comunicación
            </Link>
            <Link href="/guias" className="text-sm text-white/50 border border-white/10 rounded-xl px-6 py-3 hover:border-white/30 transition-colors">
              Todas las guías
            </Link>
            <Link href="/guias/ia" className="text-sm text-midnight bg-magenta rounded-xl px-6 py-3 font-medium hover:shadow-[0_0_20px_rgba(243,37,154,0.3)] transition-all">
              Siguiente: IA con Claude →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
