'use client'

import React, { useState } from 'react'

interface ModuleProps {
  data: Record<string, any>
  setField: (key: string, value: any) => void
}

const FEAR_TRIGGERS = [
  { id: 'juicio', label: 'Juicio y crítica', desc: 'Miedo a ser evaluado o ridiculizado por la audiencia.' },
  { id: 'creencias', label: 'Creencias limitantes', desc: '"No soy bueno hablando", "se me nota nervioso".' },
  { id: 'trauma', label: 'Experiencias pasadas', desc: 'Una mala exposición que dejó huella y se reactiva.' },
  { id: 'fracaso', label: 'Miedo al fracaso', desc: 'Quedar mal frente a otros, olvidar lo que ibas a decir.' },
  { id: 'rechazo', label: 'Miedo al rechazo', desc: 'Que tu mensaje (y tú) no resuene con la audiencia.' },
]

const VOICE_AXES = [
  { id: 'intensidad', label: 'INTENSIDAD', low: 'Susurro · íntimo', high: 'Volumen · urgencia', desc: 'Ajusta tu volumen para llegar sin gritar. Sube en clímax, baja para revelar.' },
  { id: 'tono', label: 'TONO', low: 'Grave · autoridad', high: 'Agudo · entusiasmo', desc: 'Modula el tono para reflejar la emoción del mensaje.' },
  { id: 'velocidad', label: 'VELOCIDAD', low: 'Lenta · gravedad', high: 'Rápida · pasión', desc: 'Varía tu ritmo. Ralentiza para enfatizar, acelera para construir energía.' },
]

const BODY_PILLARS = [
  { id: 'postura', title: 'Postura y presencia', rule: 'Erguida, abierta, ocupando tu espacio.', doText: 'Pies firmes, hombros atrás, pecho liberado.', avoid: 'Encogerse, balanceo, brazos cruzados.' },
  { id: 'ademanes', title: 'Ademanes y movimientos', rule: 'Gestos deliberados que enfatizan, no que distraen.', doText: 'Manos a la altura del pecho, palmas visibles.', avoid: 'Tocarte la cara, jugar con anillos, gesticular sin conexión.' },
  { id: 'rostro', title: 'Expresión facial y sonrisa', rule: 'Congruencia: lo que dices se ve en tu cara.', doText: 'Sonrisa genuina al saludar. Mirada que sostiene.', avoid: 'Cara neutra todo el rato, sonrisa de compromiso.' },
]

const EMOTIONS = [
  { id: 'alegria', label: 'Alegría', color: '#e6c845', sample: 'Voz arriba, sonrisa amplia, gestos abiertos, ritmo vivo.' },
  { id: 'tristeza', label: 'Tristeza', color: '#3b6fb0', sample: 'Voz baja, hombros caídos, ritmo lento, mirada interior.' },
  { id: 'miedo', label: 'Miedo', color: '#5e3b78', sample: 'Voz quebrada, pausas cortas, cuerpo retraído, ojos abiertos.' },
  { id: 'ira', label: 'Ira', color: '#c0392b', sample: 'Volumen alto, mandíbula tensa, pasos firmes, gestos cortantes.' },
  { id: 'asco', label: 'Asco', color: '#5a7a4f', sample: 'Pausa de rechazo, labio arrugado, retroceso del cuerpo.' },
  { id: 'sorpresa', label: 'Sorpresa', color: '#f3259a', sample: 'Inhalación audible, cejas arriba, manos al frente, voz ascendente.' },
]

const AUDIENCE_CARDS = [
  { id: 'problemas', label: 'Problemas', prompt: '¿Qué desafíos enfrentan? ¿Cuáles son sus puntos de dolor?' },
  { id: 'deseos', label: 'Deseos', prompt: '¿Qué aspiraciones tienen? ¿Qué quieren lograr?' },
  { id: 'conoc', label: 'Conocimientos', prompt: '¿Cuánto saben del tema? ¿Por dónde tienes que empezar?' },
  { id: 'valores', label: 'Valores', prompt: '¿Qué principios rigen sus decisiones?' },
]

function voiceReading(v: Record<string, number>) {
  const desc = []
  desc.push(v.intensidad < 35 ? 'volumen íntimo' : v.intensidad > 65 ? 'volumen elevado' : 'volumen medio')
  desc.push(v.tono < 35 ? 'tono grave' : v.tono > 65 ? 'tono agudo' : 'tono neutro')
  desc.push(v.velocidad < 35 ? 'ritmo pausado' : v.velocidad > 65 ? 'ritmo rápido' : 'ritmo medio')
  const isMonotone = Math.abs(v.intensidad - 50) < 10 && Math.abs(v.tono - 50) < 10 && Math.abs(v.velocidad - 50) < 10
  if (isMonotone) return 'Estás en zona neutra: la audiencia escucha pero no se mueve. Atrévete a variar.'
  return `Tu voz proyecta ${desc.join(', ')} — úsala para puntos donde quieras esa emoción específica.`
}

// ============================================================
// COM · 01 MENTALIDAD
// ============================================================
export function ModuleMindset({ data, setField }: ModuleProps) {
  const fears = data.fears || {}
  const newId = data.newIdentity || ['', '', '']
  const beliefs = data.beliefs || ['', '', '']
  const experiences = data.experiences || ['', '', '']
  const chainTable = data.chainTable || { pensamientosRestan: '', pensamientosMultiplican: '', emocionesRestan: '', emocionesMultiplican: '', accionesRestan: '', accionesMultiplican: '' }
  const toggle = (id: string) => setField('fears', (f: any) => ({ ...(f || {}), [id]: !f?.[id] }))
  const setLine = (i: number, v: string) => setField('newIdentity', (arr: string[]) => {
    const next = [...(arr || ['', '', ''])]; next[i] = v; return next
  })
  const setBelief = (i: number, v: string) => setField('beliefs', (arr: string[]) => {
    const next = [...(arr || ['', '', ''])]; next[i] = v; return next
  })
  const setExp = (i: number, v: string) => setField('experiences', (arr: string[]) => {
    const next = [...(arr || ['', '', ''])]; next[i] = v; return next
  })
  const setChain = (k: string, v: string) => setField('chainTable', (x: any) => ({ ...(x || chainTable), [k]: v }))

  const inputStyle = {
    width: '100%', padding: '10px 12px', borderRadius: 8,
    background: 'var(--hub-bone)', border: '1px solid var(--hub-hairline)',
    fontSize: 13, color: 'var(--hub-midnight)', outline: 'none', fontFamily: 'var(--sans)',
  }

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>
        El miedo a hablar en público —<em>glosofobia</em>— nace del juicio, el fracaso y el rechazo. Identifica qué te detiene y reescribe tu identidad como comunicador.
      </p>
      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-whisper)', marginBottom: 14 }}>· ¿QUÉ TE DETIENE?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FEAR_TRIGGERS.map(f => {
              const on = !!fears[f.id]
              return (
                <button key={f.id} onClick={() => toggle(f.id)} style={{
                  textAlign: 'left', padding: 18, borderRadius: 12, cursor: 'pointer', transition: 'all 0.18s',
                  background: on ? 'var(--hub-midnight)' : 'var(--hub-paper)', color: on ? 'var(--hub-paper)' : 'var(--hub-midnight)',
                  border: `1px solid ${on ? 'var(--hub-midnight)' : 'var(--hub-hairline)'}`,
                  display: 'flex', gap: 14, alignItems: 'flex-start', fontFamily: 'var(--sans)'
                }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                    background: on ? 'var(--hub-gold)' : 'transparent',
                    border: `1.5px solid ${on ? 'var(--hub-gold)' : 'var(--hub-hairline)'}`,
                    display: 'grid', placeItems: 'center', color: '#fff', fontSize: 13, fontWeight: 700, marginTop: 1
                  }}>{on ? '✓' : ''}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{f.label}</div>
                    <div style={{ fontSize: 12, opacity: 0.75, lineHeight: 1.4 }}>{f.desc}</div>
                  </div>
                </button>
              )
            })}
          </div>
          <div style={{ marginTop: 18, padding: '14px 16px', background: 'var(--hub-bone)', border: '1px solid var(--hub-hairline)', borderRadius: 10, fontSize: 12, color: 'var(--hub-smoke)', lineHeight: 1.55 }}>
            <strong style={{ color: 'var(--hub-midnight)' }}>Reconocer es el primer paso.</strong> No buscas eliminar el miedo, buscas atravesarlo con presencia.
          </div>

          {/* Creencias y Experiencias — from workbook */}
          <div className="hub-card" style={{ padding: 22, marginTop: 18 }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-gold)', marginBottom: 10 }}>· TUS CREENCIAS LIMITANTES</div>
            {[0, 1, 2].map(i => (
              <input key={i} value={beliefs[i] || ''} onChange={e => setBelief(i, e.target.value)}
                placeholder={['"No soy bueno hablando en público"', '"Se me nota el nervio"', '"No tengo nada interesante que decir"'][i]}
                style={{ ...inputStyle, marginBottom: 8 }} />
            ))}
          </div>
          <div className="hub-card" style={{ padding: 22, marginTop: 10 }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-gold)', marginBottom: 10 }}>· TUS EXPERIENCIAS PASADAS</div>
            {[0, 1, 2].map(i => (
              <input key={i} value={experiences[i] || ''} onChange={e => setExp(i, e.target.value)}
                placeholder={['Una presentación donde te quedaste en blanco...', 'Esa vez que sentiste que no conectaste...', 'El momento que te marcó como comunicador...'][i]}
                style={{ ...inputStyle, marginBottom: 8 }} />
            ))}
          </div>
        </div>
        <div>
          <div style={{ padding: '24px 26px', borderRadius: 14, background: 'var(--hub-midnight)', color: 'var(--hub-paper)', marginBottom: 18 }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-gold)', marginBottom: 10 }}>· ROMPE LA CADENA</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 500, lineHeight: 1.2, letterSpacing: '-0.01em', marginBottom: 18 }}>
              Tus pensamientos crean tu realidad.
            </div>
            {[
              { n: '01', word: 'PENSAMIENTOS', verb: 'Redefine', desc: 'Cambia la narrativa interna. De «tengo que estar perfecto» a «tengo algo valioso que entregar».' },
              { n: '02', word: 'EMOCIONES', verb: 'Reinterpreta', desc: 'Los nervios y la adrenalina son la misma energía que la emoción. Renómbralos.' },
              { n: '03', word: 'ACCIONES', verb: 'Practica', desc: 'Exposición progresiva. La confianza no se piensa, se practica.' },
            ].map((step, i, arr) => (
              <div key={step.n} style={{ display: 'flex', gap: 16, paddingBottom: i < arr.length - 1 ? 14 : 0, marginBottom: i < arr.length - 1 ? 14 : 0, borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, color: 'var(--hub-gold)', letterSpacing: '0.18em', width: 24, flexShrink: 0, paddingTop: 2 }}>{step.n}</div>
                <div>
                  <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.22em', opacity: 0.6 }}>{step.word}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontStyle: 'italic', color: 'var(--hub-gold)', marginBottom: 4 }}>{step.verb}</div>
                  <div style={{ fontSize: 12, opacity: 0.75, lineHeight: 1.5 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Que restan vs Que multiplican — from workbook */}
          <div className="hub-card" style={{ padding: 22, marginBottom: 18 }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-gold)', marginBottom: 14 }}>· QUE RESTAN vs QUE MULTIPLICAN</div>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: 8, fontSize: 12 }}>
              <div /><div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.18em', color: '#c0392b', textAlign: 'center' }}>RESTAN</div><div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.18em', color: 'var(--hub-gold)', textAlign: 'center' }}>MULTIPLICAN</div>
              {['pensamientos', 'emociones', 'acciones'].map(row => (
                <React.Fragment key={row}>
                  <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.18em', display: 'flex', alignItems: 'center' }}>{row.toUpperCase()}</div>
                  <input value={chainTable[`${row}Restan`] || ''} onChange={e => setChain(`${row}Restan`, e.target.value)} placeholder="Lo que te frena..." style={{ ...inputStyle, fontSize: 12 }} />
                  <input value={chainTable[`${row}Multiplican`] || ''} onChange={e => setChain(`${row}Multiplican`, e.target.value)} placeholder="Lo que te potencia..." style={{ ...inputStyle, fontSize: 12 }} />
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="hub-card" style={{ padding: 24, borderTop: '3px solid var(--hub-gold)' }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-gold)', marginBottom: 8 }}>· TU NUEVA IDENTIDAD COMO COMUNICADOR</div>
            <div style={{ fontSize: 13, color: 'var(--hub-smoke)', lineHeight: 1.5, marginBottom: 14 }}>Escribe tres declaraciones en presente. Empieza con <strong style={{ color: 'var(--hub-midnight)' }}>&ldquo;Yo soy…&rdquo;</strong>.</div>
            {[0, 1, 2].map(i => (
              <input key={i} value={newId[i] || ''} onChange={e => setLine(i, e.target.value)}
                placeholder={['Yo soy un comunicador presente y claro', 'Yo soy alguien que conecta con la audiencia', 'Yo soy capaz de transformar el nervio en energía'][i]}
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 10,
                  background: 'var(--hub-bone)', border: '1px solid var(--hub-hairline)',
                  fontFamily: 'var(--serif)', fontSize: 15, fontStyle: 'italic', color: 'var(--hub-midnight)',
                  marginBottom: 8, outline: 'none'
                }} />
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 28, padding: '18px 24px', background: 'var(--hub-paper)', border: '1px dashed var(--hub-hairline)', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
        <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-whisper)' }}>CAMBIO DE ESTADO</div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em' }}>
          ENERGÍA · CUERPO · DISPOSICIÓN <span style={{ color: 'var(--hub-gold)' }}>=</span> CONEXIÓN
        </div>
      </div>
    </div>
  )
}

// ============================================================
// COM · 02 NO VERBAL + VOZ
// ============================================================
export function ModuleNonverbal({ data, setField }: ModuleProps) {
  const v = data.voice || { intensidad: 50, tono: 50, velocidad: 50 }
  const setV = (k: string, val: number) => setField('voice', (x: any) => ({ ...(x || v), [k]: val }))
  const [emo, setEmo] = useState('alegria')
  const emo2 = EMOTIONS.find(e => e.id === emo)!
  const bodyNotes = data.bodyNotes || { postura: ['', ''], ademanes: ['', '', ''], rostro: ['', '', ''] }
  const setBodyNote = (pillar: string, i: number, v: string) => setField('bodyNotes', (x: any) => {
    const next = { ...(x || bodyNotes) }; next[pillar] = [...(next[pillar] || bodyNotes[pillar as keyof typeof bodyNotes])]; next[pillar][i] = v; return next
  })
  const pauseNotes = data.pauseNotes || ['', '', '']
  const setPauseNote = (i: number, v: string) => setField('pauseNotes', (arr: string[]) => {
    const next = [...(arr || ['', '', ''])]; next[i] = v; return next
  })

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>
        El cuerpo es la herramienta. La voz, el instrumento. <em>El 93% de tu mensaje no está en lo que dices</em>.
      </p>
      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {BODY_PILLARS.map(p => (
          <div key={p.id} className="hub-card" style={{ padding: 22, borderTop: '3px solid var(--hub-gold)' }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.24em', color: 'var(--hub-gold)' }}>· PILAR</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.15, marginTop: 6, marginBottom: 10 }}>{p.title}</div>
            <div style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--hub-smoke)', marginBottom: 14, lineHeight: 1.45 }}>{p.rule}</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.18em', color: 'var(--hub-gold)', fontWeight: 600, width: 38, flexShrink: 0, marginTop: 2 }}>HAZ</div>
              <div style={{ fontSize: 12, lineHeight: 1.5 }}>{p.doText}</div>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.18em', color: '#c0392b', fontWeight: 600, width: 38, flexShrink: 0, marginTop: 2 }}>EVITA</div>
              <div style={{ fontSize: 12, lineHeight: 1.5 }}>{p.avoid}</div>
            </div>
            <div style={{ marginTop: 14, borderTop: '1px solid var(--hub-hairline)', paddingTop: 12 }}>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.18em', color: 'var(--hub-whisper)', marginBottom: 8 }}>TUS NOTAS</div>
              {(bodyNotes[p.id] || []).map((_: string, i: number) => (
                <input key={i} value={bodyNotes[p.id]?.[i] || ''} onChange={e => setBodyNote(p.id, i, e.target.value)}
                  placeholder={`Nota ${i + 1}...`}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 6, background: 'var(--hub-bone)', border: '1px solid var(--hub-hairline)', fontSize: 12, outline: 'none', marginBottom: 6, fontFamily: 'var(--sans)', color: 'var(--hub-midnight)' }} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="hub-ornament" style={{ marginTop: 48, marginBottom: 18 }}>La voz · tu instrumento de impacto</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 28, alignItems: 'flex-start' }}>
        <div className="hub-card" style={{ padding: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {VOICE_AXES.map(ax => (
              <div key={ax.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                  <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', fontWeight: 600 }}>{ax.label}</div>
                  <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, color: 'var(--hub-whisper)' }}>{v[ax.id]}%</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--hub-whisper)', marginBottom: 6 }}>
                  <span>{ax.low}</span><span>{ax.high}</span>
                </div>
                <input type="range" min="0" max="100" value={v[ax.id]} onChange={e => setV(ax.id, +e.target.value)} className="hub-slider hub-slider-gold" />
                <div style={{ fontSize: 12, color: 'var(--hub-smoke)', lineHeight: 1.5, marginTop: 8 }}>{ax.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, padding: '16px 18px', borderRadius: 10, background: 'var(--hub-bone)', border: '1px solid var(--hub-hairline)' }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.24em', color: 'var(--hub-gold)', marginBottom: 6 }}>· LECTURA EN VIVO</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontStyle: 'italic', lineHeight: 1.4 }}>{voiceReading(v)}</div>
          </div>
        </div>
        <div className="hub-card" style={{ padding: 24, borderTop: '3px solid var(--hub-midnight)' }}>
          <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', fontWeight: 600, marginBottom: 14 }}>· LAS PAUSAS</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.15, marginBottom: 14 }}>
            No es lo que dices. Es lo que <em style={{ color: 'var(--hub-gold)' }}>callas</em>.
          </div>
          {[
            { t: 'Procesar', d: 'La audiencia necesita milisegundos para asentar lo que dijiste.' },
            { t: 'Impactar', d: 'El silencio antes de la palabra clave la triplica de peso.' },
            { t: 'Anticipar', d: 'Una pausa larga genera expectativa y devuelve la atención.' },
          ].map((b, i) => (
            <div key={b.t} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 6 }}>
                <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, color: 'var(--hub-gold)', letterSpacing: '0.16em', width: 74, flexShrink: 0, marginTop: 3 }}>· {b.t.toUpperCase()}</div>
                <div style={{ fontSize: 12, color: 'var(--hub-smoke)', lineHeight: 1.5 }}>{b.d}</div>
              </div>
              <input value={pauseNotes[i] || ''} onChange={e => setPauseNote(i, e.target.value)} placeholder="Tu nota sobre esta pausa..."
                style={{ width: '100%', padding: '7px 10px', borderRadius: 6, background: 'var(--hub-bone)', border: '1px solid var(--hub-hairline)', fontSize: 12, outline: 'none', fontFamily: 'var(--sans)', color: 'var(--hub-midnight)' }} />
            </div>
          ))}
        </div>
      </div>
      <div className="hub-ornament" style={{ marginTop: 48, marginBottom: 18 }}>Dinámica · Emoción + acción</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 8, marginBottom: 14 }}>
        {EMOTIONS.map(e => {
          const isActive = emo === e.id
          return (
            <button key={e.id} onClick={() => setEmo(e.id)} style={{
              padding: '14px 10px', borderRadius: 10, cursor: 'pointer', transition: 'all 0.18s',
              background: isActive ? e.color : 'var(--hub-paper)', color: isActive ? '#fff' : 'var(--hub-midnight)',
              border: `1px solid ${isActive ? e.color : 'var(--hub-hairline)'}`,
              fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 500, letterSpacing: '-0.01em'
            }}>{e.label}</button>
          )
        })}
      </div>
      <div style={{ padding: 24, borderRadius: 12, background: emo2.color, color: '#fff' }}>
        <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', opacity: 0.85, marginBottom: 8 }}>· LA CONEXIÓN ES UN MISTERIO</div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
          Para transmitir <em>{emo2.label.toLowerCase()}</em>: {emo2.sample}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// COM · 03 STORYTELLING
// ============================================================
export function ModuleStorytelling({ data, setField }: ModuleProps) {
  const s = data.story || { contexto: '', problema: '', aprendizaje: '' }
  const setS = (k: string, v: string) => setField('story', (x: any) => ({ ...(x || s), [k]: v }))
  const filled = !!(s.contexto && s.problema && s.aprendizaje)

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>
        Las historias no informan: <em>persuaden, conectan y se recuerdan</em>. La estructura más efectiva tiene 3 actos.
      </p>
      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
        {[
          { tag: 'CONEXIÓN', title: 'Crean puentes emocionales.', desc: 'La gente no compra datos. Compra el sentimiento que tu historia detona en ellos.', color: 'var(--hub-gold)' },
          { tag: 'CLARIDAD', title: 'Hacen lo complejo sencillo.', desc: 'Una historia bien contada explica lo que diez slides no logran.', color: 'var(--hub-magenta)' },
          { tag: 'PERSUASIÓN', title: 'Influyen en decisiones.', desc: 'Recordamos historias 22 veces más que datos sueltos.', color: 'var(--hub-midnight)' },
        ].map(w => (
          <div key={w.tag} className="hub-card" style={{ padding: 22, borderTop: `3px solid ${w.color}` }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.22em', color: w.color, fontWeight: 600 }}>· {w.tag}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.15, marginTop: 8, marginBottom: 8 }}>{w.title}</div>
            <div style={{ fontSize: 13, color: 'var(--hub-smoke)', lineHeight: 1.5 }}>{w.desc}</div>
          </div>
        ))}
      </div>
      <div className="hub-ornament" style={{ marginTop: 48, marginBottom: 18 }}>Estructura C · P · A</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { n: '01', tag: 'CONTEXTO', prompt: '¿Cuándo sucedió? ¿Dónde estabas?', placeholder: 'Era diciembre de 2022. Mi primera reunión con el directorio...', key: 'contexto' },
            { n: '02', tag: 'PROBLEMA', prompt: '¿Qué problema apareció? ¿Qué emociones generó?', placeholder: 'Cinco minutos antes de presentar, se me cayó la presentación...', key: 'problema' },
            { n: '03', tag: 'APRENDIZAJE', prompt: '¿Qué solución apareció? ¿Qué aprendiste?', placeholder: 'Decidí presentar de memoria. Salió mejor sin slides...', key: 'aprendizaje' },
          ].map(block => (
            <div key={block.n} className="hub-card" style={{ padding: 22 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 6 }}>
                <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--hub-gold)', fontWeight: 600 }}>{block.n}</div>
                <div style={{ fontFamily: 'var(--mono-font)', fontSize: 11, letterSpacing: '0.22em', fontWeight: 600 }}>{block.tag}</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--hub-whisper)', marginBottom: 10, fontStyle: 'italic' }}>{block.prompt}</div>
              <textarea value={s[block.key] || ''} onChange={e => setS(block.key, e.target.value)} rows={3} placeholder={block.placeholder}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--hub-hairline)', background: 'var(--hub-bone)', fontSize: 13, outline: 'none', resize: 'vertical', fontFamily: 'var(--sans)', lineHeight: 1.5, color: 'var(--hub-midnight)' }} />
            </div>
          ))}
        </div>
        <div style={{ position: 'sticky', top: 24 }}>
          <div style={{ padding: 28, borderRadius: 14, background: filled ? 'var(--hub-midnight)' : 'var(--hub-paper)', color: filled ? 'var(--hub-paper)' : 'var(--hub-midnight)', border: filled ? 'none' : '1px solid var(--hub-hairline)' }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-gold)', marginBottom: 10 }}>· TU HISTORIA · TRES ACTOS</div>
            {filled ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontFamily: 'var(--serif)', fontSize: 17, lineHeight: 1.55 }}>
                <p>{s.contexto}</p>
                <p style={{ fontStyle: 'italic', color: 'var(--hub-gold)' }}>{s.problema}</p>
                <p>{s.aprendizaje}</p>
              </div>
            ) : (
              <div style={{ fontSize: 14, color: 'var(--hub-smoke)', lineHeight: 1.6, fontStyle: 'italic' }}>
                Completa los tres actos a la izquierda y tu historia se compone aquí, lista para contar.
              </div>
            )}
          </div>
          <div style={{ marginTop: 14, padding: '16px 20px', background: 'var(--hub-bone)', borderRadius: 10, border: '1px solid var(--hub-hairline)' }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.24em', color: 'var(--hub-whisper)', marginBottom: 6 }}>EXTRAORDINARIO vs ORDINARIO</div>
            <div style={{ fontSize: 13, color: 'var(--hub-smoke)', lineHeight: 1.55 }}>Una buena historia no necesita ser épica. Lo extraordinario es el <strong style={{ color: 'var(--hub-midnight)' }}>aprendizaje específico</strong> que sacaste de algo ordinario.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// COM · 04 PIBA — Pitch Irresistible
// ============================================================
export function ModulePiba({ data, setField }: ModuleProps) {
  const aud = data.audience || {}
  const setAud = (k: string, v: string) => setField('audience', (x: any) => ({ ...(x || {}), [k]: v }))

  const piba = data.piba || { problema: '', implicacion: '', beneficio: '', accion: '' }
  const setPi = (k: string, v: string) => setField('piba', (x: any) => ({ ...(x || piba), [k]: v }))
  const filled = !!(piba.problema && piba.implicacion && piba.beneficio && piba.accion)

  const text = filled ? `${piba.problema} ${piba.implicacion} ${piba.beneficio} ${piba.accion}` : ''
  const wc = text.split(/\s+/).filter(Boolean).length

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>
        Antes de armar tu pitch, conoce a tu audiencia. Después aplica la estructura <em>P.I.B.A.</em> — la más efectiva para vender, presentar o convencer.
      </p>
      <div className="hub-ornament" style={{ marginTop: 32, marginBottom: 18 }}>· Conoce a tu audiencia</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 36 }}>
        {AUDIENCE_CARDS.map(a => (
          <div key={a.id} className="hub-card" style={{ padding: 18 }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-gold)', fontWeight: 600, marginBottom: 4 }}>· {a.label.toUpperCase()}</div>
            <div style={{ fontSize: 12, color: 'var(--hub-whisper)', marginBottom: 10, fontStyle: 'italic' }}>{a.prompt}</div>
            <textarea value={aud[a.id] || ''} onChange={e => setAud(a.id, e.target.value)} rows={2}
              placeholder="Una frase. La más concreta que puedas."
              style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid var(--hub-hairline)', background: 'var(--hub-bone)', fontSize: 13, outline: 'none', resize: 'vertical', fontFamily: 'var(--sans)', lineHeight: 1.5, color: 'var(--hub-midnight)' }} />
          </div>
        ))}
      </div>
      <div className="hub-ornament" style={{ marginBottom: 18 }}>· Estructura P.I.B.A.</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 28, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { letter: 'P', word: 'Problema', prompt: 'Identifica el dolor o necesidad.', placeholder: 'Muchos profesionales talentosos pierden oportunidades por una imagen que no acompaña su nivel...', key: 'problema' },
            { letter: 'I', word: 'Implicación', prompt: 'Quién eres y qué función cumples.', placeholder: 'Soy Sebastián Villar, entrenador en comunicación...', key: 'implicacion' },
            { letter: 'B', word: 'Beneficio', prompt: 'Tu solución y cómo resuelve el problema.', placeholder: 'En 8 sesiones rediseño la presencia comunicativa de líderes...', key: 'beneficio' },
            { letter: 'A', word: 'Acción', prompt: 'El siguiente paso, claro y sencillo.', placeholder: 'Te invito a una sesión de diagnóstico de 30 minutos esta semana.', key: 'accion' },
          ].map(block => (
            <div key={block.letter} className="hub-card" style={{ padding: 18, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 16, alignItems: 'flex-start' }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, background: 'var(--hub-midnight)', color: 'var(--hub-gold)',
                display: 'grid', placeItems: 'center', fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em'
              }}>{block.letter}</div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4, flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500, letterSpacing: '-0.01em' }}>{block.word}</div>
                  <div style={{ fontSize: 11, color: 'var(--hub-whisper)', fontStyle: 'italic', maxWidth: 280, textAlign: 'right' }}>{block.prompt}</div>
                </div>
                <textarea value={piba[block.key] || ''} onChange={e => setPi(block.key, e.target.value)} rows={2} placeholder={block.placeholder}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--hub-hairline)', background: 'var(--hub-bone)', fontSize: 13, outline: 'none', resize: 'vertical', fontFamily: 'var(--sans)', lineHeight: 1.5, color: 'var(--hub-midnight)' }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ position: 'sticky', top: 24 }}>
          <div style={{ padding: 28, borderRadius: 14, background: filled ? 'var(--hub-midnight)' : 'var(--hub-paper)', color: filled ? 'var(--hub-paper)' : 'var(--hub-midnight)', border: filled ? 'none' : '1px solid var(--hub-hairline)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-gold)' }}>· PITCH ENSAMBLADO</div>
              {filled && <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.16em', color: wc <= 70 ? 'var(--hub-gold)' : 'rgba(255,255,255,0.4)' }}>{wc} PALABRAS {wc <= 70 ? '✓' : '(largo)'}</div>}
            </div>
            {filled ? (
              <div style={{ fontFamily: 'var(--serif)', fontSize: 18, lineHeight: 1.5, fontWeight: 500 }}>{text}</div>
            ) : (
              <div style={{ fontSize: 14, color: 'var(--hub-smoke)', lineHeight: 1.6, fontStyle: 'italic' }}>Completa las 4 piezas P.I.B.A. y tu pitch se arma aquí.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// COM · 05 DESCARGA — Workbook completado
// ============================================================
export function ModuleDownload({ data }: ModuleProps) {
  const [copied, setCopied] = useState(false)

  function buildWorkbook() {
    const fears = data.fears || {}
    const beliefs = data.beliefs || ['', '', '']
    const experiences = data.experiences || ['', '', '']
    const chainTable = data.chainTable || {}
    const newId = data.newIdentity || ['', '', '']
    const bodyNotes = data.bodyNotes || { postura: ['', ''], ademanes: ['', '', ''], rostro: ['', '', ''] }
    const v = data.voice || { intensidad: 50, tono: 50, velocidad: 50 }
    const pauseNotes = data.pauseNotes || ['', '', '']
    const s = data.story || { contexto: '', problema: '', aprendizaje: '' }
    const aud = data.audience || {}
    const piba = data.piba || { problema: '', implicacion: '', beneficio: '', accion: '' }

    const selectedFears = FEAR_TRIGGERS.filter(f => fears[f.id]).map(f => f.label)

    const lines = [
      '═══════════════════════════════════════════════',
      '  DOMINA TU COMUNICACIÓN · NEXT LEVEL',
      '  Workbook completado',
      `  ${data.name ? `Nombre: ${data.name}` : ''}`,
      `  Fecha: ${new Date().toLocaleDateString('es-CL')}`,
      '═══════════════════════════════════════════════',
      '',
      '───────────────────────────────────────────────',
      '  BLOQUE 1: MENTALIDAD DEL COMUNICADOR',
      '───────────────────────────────────────────────',
      '',
      '¿Qué te detiene?',
      selectedFears.length ? selectedFears.map(f => `  ✓ ${f}`).join('\n') : '  (ninguno seleccionado)',
      '',
      'Tus creencias limitantes:',
      ...beliefs.map((b: string, i: number) => `  ${i + 1}. ${b || '—'}`),
      '',
      'Tus experiencias pasadas:',
      ...experiences.map((e: string, i: number) => `  ${i + 1}. ${e || '—'}`),
      '',
      'Que restan vs Que multiplican:',
      `  Pensamientos: ${chainTable.pensamientosRestan || '—'} → ${chainTable.pensamientosMultiplican || '—'}`,
      `  Emociones:    ${chainTable.emocionesRestan || '—'} → ${chainTable.emocionesMultiplican || '—'}`,
      `  Acciones:     ${chainTable.accionesRestan || '—'} → ${chainTable.accionesMultiplican || '—'}`,
      '',
      'Tu nueva identidad:',
      ...newId.map((n: string, i: number) => `  ${i + 1}. ${n || '—'}`),
      '',
      '───────────────────────────────────────────────',
      '  BLOQUE 2: LENGUAJE NO VERBAL Y VOZ',
      '───────────────────────────────────────────────',
      '',
      'Postura y presencia:',
      ...(bodyNotes.postura || []).map((n: string, i: number) => `  ${i + 1}. ${n || '—'}`),
      '',
      'Ademanes y movimientos:',
      ...(bodyNotes.ademanes || []).map((n: string, i: number) => `  ${i + 1}. ${n || '—'}`),
      '',
      'Expresión facial y sonrisa:',
      ...(bodyNotes.rostro || []).map((n: string, i: number) => `  ${i + 1}. ${n || '—'}`),
      '',
      'Tu configuración vocal:',
      `  Intensidad: ${v.intensidad}% ${v.intensidad < 35 ? '(íntimo)' : v.intensidad > 65 ? '(fuerte)' : '(medio)'}`,
      `  Tono:       ${v.tono}% ${v.tono < 35 ? '(grave)' : v.tono > 65 ? '(agudo)' : '(neutro)'}`,
      `  Velocidad:  ${v.velocidad}% ${v.velocidad < 35 ? '(pausado)' : v.velocidad > 65 ? '(rápido)' : '(medio)'}`,
      '',
      'Notas sobre pausas:',
      ...['Procesar', 'Impactar', 'Anticipar'].map((t, i) => `  ${t}: ${pauseNotes[i] || '—'}`),
      '',
      '───────────────────────────────────────────────',
      '  BLOQUE 3: STORYTELLING Y PERSUASIÓN',
      '───────────────────────────────────────────────',
      '',
      'Tu historia (C·P·A):',
      '',
      `  CONTEXTO:`,
      `  ${s.contexto || '—'}`,
      '',
      `  PROBLEMA:`,
      `  ${s.problema || '—'}`,
      '',
      `  APRENDIZAJE:`,
      `  ${s.aprendizaje || '—'}`,
      '',
      'Conoce a tu audiencia:',
      ...AUDIENCE_CARDS.map(a => `  ${a.label}: ${aud[a.id] || '—'}`),
      '',
      'Tu pitch P.I.B.A.:',
      '',
      `  [P] PROBLEMA:`,
      `  ${piba.problema || '—'}`,
      '',
      `  [I] IMPLICACIÓN:`,
      `  ${piba.implicacion || '—'}`,
      '',
      `  [B] BENEFICIO:`,
      `  ${piba.beneficio || '—'}`,
      '',
      `  [A] ACCIÓN:`,
      `  ${piba.accion || '—'}`,
      '',
      '═══════════════════════════════════════════════',
      '  "Comunica con presencia y expresa',
      '   tu verdadera esencia."',
      '  — Sebastián Villar',
      '═══════════════════════════════════════════════',
      '',
      '  NEXT LEVEL EXPERIENCE · 16 Mayo 2026',
      '  Providencia, Santiago',
    ]
    return lines.join('\n')
  }

  function downloadTxt() {
    const text = buildWorkbook()
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Workbook-Comunicacion-NextLevel-${data.name || 'asistente'}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  function copyAll() {
    navigator.clipboard.writeText(buildWorkbook()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const hasContent = !!(
    Object.values(data.fears || {}).some(Boolean) ||
    (data.newIdentity || []).some((s: string) => s) ||
    (data.story || {}).contexto ||
    (data.piba || {}).problema
  )

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>
        Todo lo que llenaste durante la clase se compila aquí. <em>Descárgalo o cópialo</em> para tener tu workbook personal.
      </p>

      {!hasContent && (
        <div className="hub-card" style={{ padding: 28, marginTop: 24, textAlign: 'center', borderStyle: 'dashed' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, marginBottom: 8 }}>Aún no hay contenido</div>
          <div style={{ fontSize: 14, color: 'var(--hub-smoke)' }}>Completa los módulos anteriores y vuelve aquí para descargar tu workbook.</div>
        </div>
      )}

      {hasContent && (
        <>
          <div style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button onClick={downloadTxt} className="hub-btn hub-btn-primary" style={{ background: 'var(--hub-gold)', fontSize: 15, padding: '16px 28px' }}>
              Descargar workbook .txt
            </button>
            <button onClick={copyAll} className="hub-btn hub-btn-ghost" style={{ fontSize: 15, padding: '16px 28px' }}>
              {copied ? '✓ Copiado' : 'Copiar al portapapeles'}
            </button>
          </div>

          <div style={{ marginTop: 32 }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-whisper)', marginBottom: 12 }}>· VISTA PREVIA</div>
            <pre style={{
              padding: 28, borderRadius: 14, background: 'var(--hub-midnight)', color: 'var(--hub-paper)',
              fontFamily: 'var(--mono-font)', fontSize: 12, lineHeight: 1.6, whiteSpace: 'pre-wrap',
              maxHeight: 500, overflowY: 'auto',
            }}>
              {buildWorkbook()}
            </pre>
          </div>
        </>
      )}

      <div style={{ marginTop: 48, padding: '28px 32px', borderRadius: 14, background: 'var(--hub-gold)', color: '#fff' }}>
        <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.32em', opacity: 0.85, marginBottom: 12 }}>· CIERRE NEXT LEVEL</div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 36, fontStyle: 'italic', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Comunica con presencia y expresa tu verdadera esencia.
        </div>
        <div style={{ fontFamily: 'var(--mono-font)', fontSize: 11, letterSpacing: '0.18em', marginTop: 14, opacity: 0.8 }}>SEBASTIÁN VILLAR · ENTRENADOR EN COMUNICACIÓN</div>
      </div>
    </div>
  )
}

export const COM_MODULES = {
  mindset: ModuleMindset,
  nonverbal: ModuleNonverbal,
  storytelling: ModuleStorytelling,
  piba: ModulePiba,
  download: ModuleDownload,
}
