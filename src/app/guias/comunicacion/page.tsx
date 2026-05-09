'use client'

import { useState } from 'react'
import Link from 'next/link'

const BLOCKS = [
  { id: 'mentalidad', num: '01', title: 'Mentalidad de Speaker' },
  { id: 'no-verbal', num: '02', title: 'Lenguaje No Verbal' },
  { id: 'storytelling', num: '03', title: 'Storytelling y Persuasión' },
]

const FEARS = [
  'Miedo al juicio y la crítica',
  'Creencias limitantes sobre mis habilidades',
  'Experiencias negativas pasadas',
  'Miedo al fracaso o al rechazo',
  'No sentirme preparado/a',
  'Quedarme en blanco',
]

const EMOTIONS = [
  { name: 'Alegría', color: 'bg-yellow-400/20 border-yellow-400/40 text-yellow-300', technique: 'Sonrisa abierta, gestos amplios, tono elevado. Usa esta energía para abrir tu presentación.' },
  { name: 'Tristeza', color: 'bg-blue-400/20 border-blue-400/40 text-blue-300', technique: 'Voz grave y pausada, mirada directa. Perfecto para momentos de vulnerabilidad en tu historia.' },
  { name: 'Miedo', color: 'bg-purple-400/20 border-purple-400/40 text-purple-300', technique: 'Tensión controlada, pausas largas, volumen bajo. Úsalo para crear suspenso y anticipación.' },
  { name: 'Ira', color: 'bg-red-400/20 border-red-400/40 text-red-300', technique: 'Golpes vocales, gestos firmes, postura erguida. Ideal para denunciar un problema en tu pitch.' },
  { name: 'Sorpresa', color: 'bg-emerald-400/20 border-emerald-400/40 text-emerald-300', technique: 'Ojos abiertos, pausa + revelación, cambio de ritmo. Perfecto para el giro de tu historia.' },
  { name: 'Asco', color: 'bg-orange-400/20 border-orange-400/40 text-orange-300', technique: 'Expresión facial marcada, tono descendente. Úsalo para contrastar el "antes" en tu storytelling.' },
]

const VOICE_PARAMS = [
  { key: 'volumen', label: 'Volumen', low: 'Susurro', high: 'Proyectado', tip: 'Ajusta tu volumen para llegar a todos sin gritar, manteniendo la atención y la energía.' },
  { key: 'velocidad', label: 'Velocidad', low: 'Lento', high: 'Rápido', tip: 'Varía tu ritmo para enfatizar, crear suspenso y mantener la escucha activa.' },
  { key: 'tono', label: 'Tono', low: 'Grave', high: 'Agudo', tip: 'Modula tu tono para reflejar las emociones de tu mensaje y evitar la monotonía.' },
  { key: 'pausas', label: 'Pausas', low: 'Continuo', high: 'Dramáticas', tip: 'Las pausas estratégicas permiten procesar información, crear impacto y generar anticipación.' },
]

const QUIZ_QUESTIONS = [
  {
    q: '¿Qué es la glosofobia?',
    options: ['Miedo a los globos', 'Miedo a hablar en público', 'Miedo al escenario', 'Miedo a las multitudes'],
    correct: 1,
    explanation: 'La glosofobia es el miedo a hablar en público. Es una de las ansiedades más comunes y se origina en la preocupación por el juicio, el fracaso o el rechazo.',
  },
  {
    q: '¿Cuál es la fórmula del cambio de estado?',
    options: ['Mente + Cuerpo + Alma', 'Energía + Cuerpo + Disposición = Conexión', 'Práctica + Talento + Suerte', 'Confianza + Carisma + Conocimiento'],
    correct: 1,
    explanation: 'La fórmula es Energía + Cuerpo + Disposición = Conexión. Cuando alineas estos tres elementos, logras conectar genuinamente con tu audiencia.',
  },
  {
    q: 'Según la guía, ¿qué proyecta una postura erguida y abierta?',
    options: ['Arrogancia', 'Confianza y credibilidad', 'Nerviosismo controlado', 'Indiferencia'],
    correct: 1,
    explanation: 'Una postura erguida y abierta proyecta confianza y credibilidad. Tu cuerpo es una herramienta poderosa para reforzar tu mensaje.',
  },
  {
    q: '¿Para qué sirven las pausas estratégicas al comunicar?',
    options: ['Para recordar qué decir', 'Solo para respirar', 'Para procesar información, crear impacto y generar anticipación', 'Para llenar el silencio incómodo'],
    correct: 2,
    explanation: 'Las pausas estratégicas permiten a tu audiencia procesar información, crean impacto emocional y generan anticipación.',
  },
  {
    q: '¿Cuál es la estructura para contar una gran historia?',
    options: ['Inicio, nudo, desenlace', 'Contexto, Problema, Aprendizaje', 'Héroe, villano, resolución', 'Gancho, desarrollo, cierre'],
    correct: 1,
    explanation: 'La estructura es: Contexto (cuándo, dónde, quiénes) → Problema (qué desafío, qué emociones) → Aprendizaje (qué solución, qué se aprendió).',
  },
  {
    q: '¿Qué significa la P en la estructura P.I.B.A. del pitch?',
    options: ['Presentación', 'Propuesta', 'Problema', 'Perspectiva'],
    correct: 2,
    explanation: 'P = Problema. Identifica el dolor o la necesidad de tu audiencia. Es el punto de partida de un pitch irresistible.',
  },
  {
    q: '¿Qué debes conocer de tu audiencia ANTES de comunicar?',
    options: ['Solo su nombre', 'Sus problemas, deseos, conocimientos y valores', 'Su edad y género', 'Su nivel de ingresos'],
    correct: 1,
    explanation: 'Debes conocer sus problemas, deseos, conocimientos y valores. Esto te permite crear un mensaje que realmente conecte con ellos.',
  },
  {
    q: '¿Cuál es la diferencia entre una historia extraordinaria y una ordinaria para storytelling?',
    options: ['Las extraordinarias son inventadas', 'Ambas funcionan si tienen la estructura correcta', 'Solo las extraordinarias sirven para persuadir', 'Las ordinarias no generan conexión'],
    correct: 1,
    explanation: 'Tanto historias extraordinarias como ordinarias funcionan para storytelling. La clave está en la estructura (Contexto → Problema → Aprendizaje) y la conexión emocional que generas.',
  },
]

export default function ComunicacionGuide() {
  const [activeBlock, setActiveBlock] = useState<string | null>(null)
  const [fears, setFears] = useState<Set<string>>(new Set())
  const [belief, setBelief] = useState('')
  const [newBelief, setNewBelief] = useState('')
  const [checklist, setChecklist] = useState<Set<string>>(new Set())
  const [voiceValues, setVoiceValues] = useState<Record<string, number>>({ volumen: 50, velocidad: 50, tono: 50, pausas: 50 })
  const [activeEmotion, setActiveEmotion] = useState<number | null>(null)
  const [story, setStory] = useState({ contexto: '', problema: '', aprendizaje: '' })
  const [pitch, setPitch] = useState({ problema: '', implicacion: '', beneficio: '', accion: '' })
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const quizScore = Object.entries(quizAnswers).filter(
    ([i, a]) => QUIZ_QUESTIONS[Number(i)].correct === a
  ).length

  return (
    <div className="sec-dark">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-electric/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative text-center">
          <span className="eyebrow text-electric mb-3 block">Guía interactiva · Sebastián Villar</span>
          <h1 className="font-display italic text-display-lg mb-4">
            Domina tu Comunicación
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
            No solo leas. <span className="text-white font-medium">Practica cada herramienta</span> y construye tu pitch irresistible paso a paso.
          </p>

          {/* Road map */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {BLOCKS.map((block) => (
              <a
                key={block.id}
                href={`#${block.id}`}
                className="group flex items-center gap-3 bg-midnight-2 border border-white/10 hover:border-electric/40 rounded-xl px-5 py-3 transition-all"
              >
                <span className="font-mono text-xs text-electric">{block.num}</span>
                <span className="text-sm text-white/80 group-hover:text-white transition-colors">{block.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* BLOQUE 1: MENTALIDAD DE SPEAKER */}
      {/* ═══════════════════════════════════════════ */}
      <section id="mentalidad" className="py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <span className="eyebrow text-electric mb-2 block">Bloque 01</span>
            <h2 className="font-display italic text-display-md mb-3">
              Mentalidad de Speaker
            </h2>
            <p className="text-white/60">Desafía tus miedos y creencias limitantes.</p>
          </div>

          {/* Auto-diagnóstico */}
          <div className="bg-midnight-2 border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
            <h3 className="font-display italic text-xl mb-2">¿Qué te detiene?</h3>
            <p className="text-sm text-white/50 mb-6">Selecciona los miedos que reconoces en ti. No hay respuesta incorrecta.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {FEARS.map((fear) => (
                <button
                  key={fear}
                  onClick={() => {
                    const next = new Set(fears)
                    next.has(fear) ? next.delete(fear) : next.add(fear)
                    setFears(next)
                  }}
                  className={`text-left flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-sm ${
                    fears.has(fear)
                      ? 'bg-electric/10 border-electric/40 text-white'
                      : 'bg-midnight-3 border-white/10 text-white/60 hover:border-white/20'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    fears.has(fear) ? 'border-electric bg-electric' : 'border-white/30'
                  }`}>
                    {fears.has(fear) && <span className="text-midnight text-xs font-bold">✓</span>}
                  </span>
                  {fear}
                </button>
              ))}
            </div>
            {fears.size > 0 && (
              <div className="mt-6 bg-electric/5 border border-electric/20 rounded-xl p-4">
                <p className="text-sm text-electric font-medium mb-1">Identificaste {fears.size} miedo{fears.size > 1 ? 's' : ''}</p>
                <p className="text-sm text-white/60">
                  Reconocerlos es el primer paso. Ahora vamos a transformarlos en tu siguiente ejercicio.
                </p>
              </div>
            )}
          </div>

          {/* Ejercicio: Rompe cadenas */}
          <div className="bg-midnight-2 border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
            <h3 className="font-display italic text-xl mb-2">Rompe cadenas: Nueva identidad</h3>
            <p className="text-sm text-white/50 mb-2">
              Pensamientos → Emociones → Acciones. Cambia la narrativa interna.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8 mt-6">
              {[
                { label: 'Pensamientos', action: 'Redefine', color: 'text-blue-400' },
                { label: 'Emociones', action: 'Reinterpreta', color: 'text-purple-400' },
                { label: 'Acciones', action: 'Practica', color: 'text-emerald-400' },
              ].map((step) => (
                <div key={step.label} className="text-center bg-midnight-3 rounded-xl p-4">
                  <p className="text-sm text-white/50">{step.label}</p>
                  <p className={`font-display italic text-lg ${step.color}`}>{step.action}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Tu creencia limitante actual:</label>
                <input
                  type="text"
                  value={belief}
                  onChange={(e) => setBelief(e.target.value)}
                  placeholder='Ej: "No soy bueno hablando en público"'
                  className="w-full bg-midnight-3 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-electric/50 transition-colors"
                />
              </div>
              {belief && (
                <div className="flex items-center justify-center py-2">
                  <span className="text-electric text-2xl">↓</span>
                </div>
              )}
              {belief && (
                <div>
                  <label className="block text-sm text-electric mb-2">Reescríbela como fortaleza:</label>
                  <input
                    type="text"
                    value={newBelief}
                    onChange={(e) => setNewBelief(e.target.value)}
                    placeholder='Ej: "Cada vez que hablo, mejoro y conecto más"'
                    className="w-full bg-electric/5 border border-electric/30 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-electric/50 transition-colors"
                  />
                </div>
              )}
              {belief && newBelief && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mt-4">
                  <p className="text-emerald-400 text-sm font-medium">Tu nueva identidad comunicativa:</p>
                  <p className="text-white mt-1 font-display italic">&ldquo;{newBelief}&rdquo;</p>
                </div>
              )}
            </div>
          </div>

          {/* Callout: Cambio de estado */}
          <div className="bg-gradient-to-r from-electric/10 to-magenta/10 border border-electric/20 rounded-2xl p-6 sm:p-8">
            <h3 className="font-display italic text-xl mb-3">Cambio de Estado</h3>
            <div className="flex flex-wrap gap-3 items-center justify-center text-center">
              {['Energía', 'Cuerpo', 'Disposición'].map((item, i) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="bg-midnight/60 border border-white/10 rounded-xl px-5 py-3 font-medium">{item}</span>
                  {i < 2 && <span className="text-electric text-xl font-bold">+</span>}
                </div>
              ))}
              <span className="text-electric text-xl font-bold">=</span>
              <span className="bg-electric text-midnight font-bold rounded-xl px-5 py-3">Conexión</span>
            </div>
            <p className="text-sm text-white/50 text-center mt-4">
              Antes de subir al escenario, activa estas tres dimensiones para conectar con tu audiencia.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* BLOQUE 2: LENGUAJE NO VERBAL */}
      {/* ═══════════════════════════════════════════ */}
      <section id="no-verbal" className="py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <span className="eyebrow text-electric mb-2 block">Bloque 02</span>
            <h2 className="font-display italic text-display-md mb-3">
              Dominio del Lenguaje No Verbal
            </h2>
            <p className="text-white/60">La magia que habla sin palabras.</p>
          </div>

          {/* Checklist interactivo */}
          <div className="bg-midnight-2 border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
            <h3 className="font-display italic text-xl mb-2">Checklist de presencia</h3>
            <p className="text-sm text-white/50 mb-6">Marca cada elemento que dominas. Tu meta: completar los 4.</p>

            <div className="space-y-3">
              {[
                { key: 'postura', label: 'Postura y presencia', desc: 'Postura erguida y abierta que proyecta confianza y credibilidad.' },
                { key: 'ademanes', label: 'Ademanes y movimientos', desc: 'Gestos deliberados para enfatizar puntos, no para distraer.' },
                { key: 'expresiones', label: 'Expresiones faciales', desc: 'Expresiones congruentes con tu mensaje. Sonrisa genuina que crea conexión.' },
                { key: 'voz', label: 'Dominio de la voz', desc: 'Control de volumen, velocidad, tono y pausas estratégicas.' },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    const next = new Set(checklist)
                    next.has(item.key) ? next.delete(item.key) : next.add(item.key)
                    setChecklist(next)
                  }}
                  className={`w-full text-left flex items-start gap-4 px-5 py-4 rounded-xl border transition-all ${
                    checklist.has(item.key)
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-midnight-3 border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    checklist.has(item.key) ? 'border-emerald-400 bg-emerald-400' : 'border-white/30'
                  }`}>
                    {checklist.has(item.key) && <span className="text-midnight text-xs font-bold">✓</span>}
                  </span>
                  <div>
                    <p className={`font-medium ${checklist.has(item.key) ? 'text-emerald-300' : 'text-white'}`}>{item.label}</p>
                    <p className="text-sm text-white/50 mt-0.5">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Progress */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/50">Progreso</span>
                <span className="text-electric font-mono">{checklist.size}/4</span>
              </div>
              <div className="h-2 bg-midnight-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-electric to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${(checklist.size / 4) * 100}%` }}
                />
              </div>
              {checklist.size === 4 && (
                <p className="text-emerald-400 text-sm mt-3 text-center font-medium">
                  ¡Dominas los 4 pilares del lenguaje no verbal!
                </p>
              )}
            </div>
          </div>

          {/* La voz: sliders interactivos */}
          <div className="bg-midnight-2 border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
            <h3 className="font-display italic text-xl mb-2">La Voz: Tu instrumento de impacto</h3>
            <p className="text-sm text-white/50 mb-6">Ajusta cada parámetro y observa cómo cambia tu estilo vocal.</p>

            <div className="space-y-6">
              {VOICE_PARAMS.map((param) => (
                <div key={param.key}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm">{param.label}</span>
                    <span className="font-mono text-xs text-electric">{voiceValues[param.key]}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={voiceValues[param.key]}
                    onChange={(e) => setVoiceValues({ ...voiceValues, [param.key]: Number(e.target.value) })}
                    className="w-full h-2 bg-midnight-3 rounded-full appearance-none cursor-pointer accent-electric"
                  />
                  <div className="flex justify-between text-xs text-white/30 mt-1">
                    <span>{param.low}</span>
                    <span>{param.high}</span>
                  </div>
                  <p className="text-xs text-white/40 mt-2">{param.tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rueda de emociones */}
          <div className="bg-midnight-2 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h3 className="font-display italic text-xl mb-2">Dinámica: Emoción + Acción</h3>
            <p className="text-sm text-white/50 mb-6">Selecciona una emoción para ver la técnica corporal asociada.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {EMOTIONS.map((emotion, i) => (
                <button
                  key={emotion.name}
                  onClick={() => setActiveEmotion(activeEmotion === i ? null : i)}
                  className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                    activeEmotion === i
                      ? emotion.color
                      : 'bg-midnight-3 border-white/10 text-white/60 hover:border-white/20'
                  }`}
                >
                  {emotion.name}
                </button>
              ))}
            </div>

            {activeEmotion !== null && (
              <div className={`rounded-xl border p-5 transition-all ${EMOTIONS[activeEmotion].color}`}>
                <p className="font-medium mb-1">{EMOTIONS[activeEmotion].name}</p>
                <p className="text-sm opacity-80">{EMOTIONS[activeEmotion].technique}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* BLOQUE 3: STORYTELLING Y PERSUASIÓN */}
      {/* ═══════════════════════════════════════════ */}
      <section id="storytelling" className="py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <span className="eyebrow text-electric mb-2 block">Bloque 03</span>
            <h2 className="font-display italic text-display-md mb-3">
              Storytelling y Persuasión
            </h2>
            <p className="text-white/60">Conecta, impacta, convence.</p>
          </div>

          {/* Tres pilares del storytelling */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { title: 'Conexión', desc: 'Las historias crean puentes emocionales.' },
              { title: 'Claridad', desc: 'Hacen que conceptos complejos sean fáciles de entender.' },
              { title: 'Persuasión', desc: 'Influyen en las decisiones y acciones.' },
            ].map((pillar) => (
              <div key={pillar.title} className="bg-midnight-2 border border-white/10 rounded-2xl p-5 text-center">
                <h4 className="font-display italic text-lg text-electric mb-2">{pillar.title}</h4>
                <p className="text-sm text-white/60">{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* Constructor de historias */}
          <div className="bg-midnight-2 border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
            <h3 className="font-display italic text-xl mb-2">Construye tu historia</h3>
            <p className="text-sm text-white/50 mb-6">Estructura: Contexto → Problema → Aprendizaje</p>

            <div className="space-y-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">1</span>
                  Contexto
                </label>
                <p className="text-xs text-white/40 mb-2">¿Cuándo sucedió? ¿Dónde estabas? ¿Quiénes estaban?</p>
                <textarea
                  value={story.contexto}
                  onChange={(e) => setStory({ ...story, contexto: e.target.value })}
                  placeholder="Ej: Hace dos años, en mi primera presentación frente a 50 personas en un evento de networking..."
                  rows={3}
                  className="w-full bg-midnight-3 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                />
              </div>

              {story.contexto && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold">2</span>
                    Problema
                  </label>
                  <p className="text-xs text-white/40 mb-2">¿Qué problema existió? ¿Qué emociones e impacto generó?</p>
                  <textarea
                    value={story.problema}
                    onChange={(e) => setStory({ ...story, problema: e.target.value })}
                    placeholder="Ej: Me quedé en blanco a los 3 minutos. Sentí que todos me juzgaban y quise salir corriendo..."
                    rows={3}
                    className="w-full bg-midnight-3 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-red-500/50 transition-colors resize-none"
                  />
                </div>
              )}

              {story.problema && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">3</span>
                    Aprendizaje
                  </label>
                  <p className="text-xs text-white/40 mb-2">¿Qué solución se creó? ¿Qué aprendiste?</p>
                  <textarea
                    value={story.aprendizaje}
                    onChange={(e) => setStory({ ...story, aprendizaje: e.target.value })}
                    placeholder="Ej: Descubrí que preparar una estructura clara y practicar 3 veces me daba la confianza que necesitaba..."
                    rows={3}
                    className="w-full bg-midnight-3 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                  />
                </div>
              )}
            </div>

            {story.contexto && story.problema && story.aprendizaje && (
              <div className="mt-6 bg-electric/5 border border-electric/20 rounded-xl p-5">
                <p className="text-electric text-sm font-medium mb-3">Tu historia completa:</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p>{story.contexto}</p>
                  <p>{story.problema}</p>
                  <p>{story.aprendizaje}</p>
                </div>
              </div>
            )}
          </div>

          {/* Conoce a tu audiencia */}
          <div className="bg-gradient-to-r from-magenta/10 to-electric/10 border border-magenta/20 rounded-2xl p-6 sm:p-8 mb-8">
            <h3 className="font-display italic text-xl mb-4">Conoce a tu audiencia</h3>
            <p className="text-sm text-white/50 mb-6">Antes de comunicar, comprende profundamente a quién le hablas.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '?', label: 'Problemas', desc: '¿Qué desafíos enfrentan? ¿Cuáles son sus puntos de dolor?' },
                { icon: '★', label: 'Deseos', desc: '¿Qué aspiraciones y metas tienen? ¿Qué buscan lograr?' },
                { icon: '◈', label: 'Conocimientos', desc: '¿Qué nivel de información tienen sobre el tema?' },
                { icon: '♦', label: 'Valores', desc: '¿Qué principios rigen sus decisiones y comportamientos?' },
              ].map((item) => (
                <div key={item.label} className="bg-midnight/40 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-magenta">{item.icon}</span>
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  <p className="text-xs text-white/50">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pitch PIBA Builder */}
          <div className="bg-midnight-2 border border-electric/20 rounded-2xl p-6 sm:p-8 mb-8">
            <h3 className="font-display italic text-xl mb-2">Construye tu Pitch P.I.B.A.</h3>
            <p className="text-sm text-white/50 mb-6">Problema → Implicación → Beneficio → Acción</p>

            <div className="space-y-5">
              {[
                { key: 'problema' as const, letter: 'P', label: 'Problema', desc: 'Identifica el dolor o la necesidad de tu audiencia.', placeholder: 'Ej: "Muchos profesionales sienten que su mensaje no conecta y pierden oportunidades..."', color: 'text-red-400 bg-red-500/20' },
                { key: 'implicacion' as const, letter: 'I', label: 'Implicación', desc: 'Describe quién eres y qué función cumples para resolver el problema.', placeholder: 'Ej: "Como entrenador en comunicación, ayudo a profesionales a..."', color: 'text-blue-400 bg-blue-500/20' },
                { key: 'beneficio' as const, letter: 'B', label: 'Beneficio', desc: 'Presenta tu solución y cómo resuelve el problema.', placeholder: 'Ej: "Logran presentar sus ideas con claridad, impacto y confianza..."', color: 'text-emerald-400 bg-emerald-500/20' },
                { key: 'accion' as const, letter: 'A', label: 'Acción', desc: 'Guía a tu audiencia hacia el siguiente paso claro y sencillo.', placeholder: 'Ej: "Agenda una sesión gratuita de diagnóstico comunicacional..."', color: 'text-electric bg-electric/20' },
              ].map((step) => (
                <div key={step.key}>
                  <label className="flex items-center gap-2 text-sm font-medium mb-1">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${step.color}`}>{step.letter}</span>
                    {step.label}
                  </label>
                  <p className="text-xs text-white/40 mb-2 ml-9">{step.desc}</p>
                  <textarea
                    value={pitch[step.key]}
                    onChange={(e) => setPitch({ ...pitch, [step.key]: e.target.value })}
                    placeholder={step.placeholder}
                    rows={2}
                    className="w-full bg-midnight-3 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-electric/50 transition-colors resize-none"
                  />
                </div>
              ))}
            </div>

            {pitch.problema && pitch.implicacion && pitch.beneficio && pitch.accion && (
              <div className="mt-6 bg-electric/5 border border-electric/30 rounded-xl p-5">
                <p className="text-electric text-sm font-medium mb-3">Tu Pitch Irresistible:</p>
                <div className="space-y-3 text-sm">
                  <p className="text-white/90">{pitch.problema}</p>
                  <p className="text-white/90">{pitch.implicacion}</p>
                  <p className="text-white/90">{pitch.beneficio}</p>
                  <p className="text-white font-medium">{pitch.accion}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* QUIZ FINAL */}
      {/* ═══════════════════════════════════════════ */}
      <section id="quiz" className="py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <span className="eyebrow text-electric mb-2 block">Autoevaluación</span>
            <h2 className="font-display italic text-display-md mb-3">
              ¿Cuánto aprendiste?
            </h2>
            <p className="text-white/60">8 preguntas para verificar tu aprendizaje.</p>
          </div>

          {/* Progress bar */}
          <div className="bg-midnight-2 border border-white/10 rounded-xl p-4 mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/50">Respondidas</span>
              <span className="text-electric font-mono">{Object.keys(quizAnswers).length}/{QUIZ_QUESTIONS.length}</span>
            </div>
            <div className="h-2 bg-midnight-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-electric rounded-full transition-all duration-500"
                style={{ width: `${(Object.keys(quizAnswers).length / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {QUIZ_QUESTIONS.map((question, qi) => (
              <div
                key={qi}
                className={`bg-midnight-2 border rounded-2xl p-6 transition-all ${
                  quizSubmitted
                    ? quizAnswers[qi] === question.correct
                      ? 'border-emerald-500/40'
                      : quizAnswers[qi] !== undefined
                        ? 'border-red-500/40'
                        : 'border-white/10'
                    : 'border-white/10'
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-electric/20 text-electric flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {qi + 1}
                  </span>
                  <p className="font-medium pt-1">{question.q}</p>
                </div>

                <div className="space-y-2 ml-11">
                  {question.options.map((option, oi) => (
                    <button
                      key={oi}
                      onClick={() => !quizSubmitted && setQuizAnswers({ ...quizAnswers, [qi]: oi })}
                      disabled={quizSubmitted}
                      className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-all ${
                        quizSubmitted && oi === question.correct
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                          : quizSubmitted && quizAnswers[qi] === oi && oi !== question.correct
                            ? 'bg-red-500/10 border-red-500/40 text-red-300'
                            : quizAnswers[qi] === oi
                              ? 'bg-electric/10 border-electric/40 text-white'
                              : 'bg-midnight-3 border-white/10 text-white/60 hover:border-white/20'
                      } ${quizSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
                        quizAnswers[qi] === oi ? 'border-electric bg-electric text-midnight' : 'border-white/30'
                      } ${quizSubmitted && oi === question.correct ? 'border-emerald-400 bg-emerald-400 text-midnight' : ''}`}>
                        {quizSubmitted && oi === question.correct ? '✓' : quizAnswers[qi] === oi ? '●' : ''}
                      </span>
                      {option}
                    </button>
                  ))}
                </div>

                {quizSubmitted && quizAnswers[qi] !== undefined && (
                  <div className={`ml-11 mt-3 p-3 rounded-lg text-sm ${
                    quizAnswers[qi] === question.correct
                      ? 'bg-emerald-500/10 text-emerald-300'
                      : 'bg-red-500/10 text-red-300'
                  }`}>
                    {question.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Submit / Results */}
          {!quizSubmitted ? (
            <button
              onClick={() => setQuizSubmitted(true)}
              disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
              className="mt-8 w-full max-w-md mx-auto block bg-electric text-midnight font-bold py-4 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(246,207,47,0.3)] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Verificar respuestas
            </button>
          ) : (
            <div className="mt-8 bg-midnight-2 border border-electric/30 rounded-2xl p-8 text-center">
              <p className="text-electric font-mono text-sm mb-2">Tu resultado</p>
              <p className="font-display italic text-6xl text-white mb-2">
                {quizScore}/{QUIZ_QUESTIONS.length}
              </p>
              <p className="text-white/60">
                {quizScore === QUIZ_QUESTIONS.length
                  ? '¡Perfecto! Dominas la comunicación.'
                  : quizScore >= 6
                    ? '¡Muy bien! Tienes una base sólida.'
                    : quizScore >= 4
                      ? 'Buen inicio. Revisa los bloques donde fallaste.'
                      : 'Te recomendamos repasar la guía completa.'}
              </p>
              <button
                onClick={() => { setQuizAnswers({}); setQuizSubmitted(false) }}
                className="mt-4 text-sm text-electric underline hover:no-underline"
              >
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
            &ldquo;Comunica con presencia y expresa tu verdadera esencia&rdquo;
          </p>
          <p className="text-white/40 text-sm">Sebastián Villar — Entrenador en Comunicación · @sebavillarg</p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/guias"
              className="text-sm text-white/50 border border-white/10 rounded-xl px-6 py-3 hover:border-white/30 transition-colors"
            >
              ← Volver a guías
            </Link>
            <Link
              href="/guias/imagen"
              className="text-sm text-midnight bg-electric rounded-xl px-6 py-3 font-medium hover:shadow-[0_0_20px_rgba(246,207,47,0.3)] transition-all"
            >
              Siguiente: Tu Imagen Profesional →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
