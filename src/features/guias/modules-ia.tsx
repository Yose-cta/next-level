'use client'

import { useState, useMemo } from 'react'

/* ──────────────────────────────────────────────────────────────
   Types
   ────────────────────────────────────────────────────────────── */

interface ModuleProps {
  data: Record<string, any>
  setField: (key: string, value: any) => void
  onComplete: () => void
  goTo: (index: number) => void
}

/* shared styles */
const textareaBase: React.CSSProperties = {
  width: '100%', padding: '12px 14px', borderRadius: 8,
  border: '1px solid var(--hub-hairline)', background: 'var(--hub-bone)',
  fontSize: 14, fontFamily: 'var(--sans)', outline: 'none',
  resize: 'vertical', lineHeight: 1.5, color: 'var(--hub-midnight)',
}

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--hub-electric)', fontWeight: 600, marginBottom: 10 }}>
      {num} · {label}
    </div>
  )
}

function ScorePicker({ value, onChange, max = 5 }: { value: number; onChange: (v: number) => void; max?: number }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {Array.from({ length: max }, (_, i) => i + 1).map(n => (
        <button key={n} onClick={() => onChange(n)} style={{
          width: 36, height: 36, borderRadius: '50%', border: `1px solid ${value >= n ? 'var(--hub-midnight)' : 'var(--hub-hairline)'}`,
          background: value >= n ? 'var(--hub-midnight)' : 'transparent',
          color: value >= n ? 'var(--hub-paper)' : 'var(--hub-whisper)',
          fontFamily: 'var(--mono-font)', fontSize: 12, fontWeight: 600,
          cursor: 'pointer', transition: 'all 0.18s',
        }}>{n}</button>
      ))}
    </div>
  )
}

/* ============================================================
   01 · LA CADENA DEL RESULTADO
   ============================================================ */

const CHAIN_STEPS = [
  { key: 'creencia', label: 'Creencia', icon: '◇', color: '#f6cf2f' },
  { key: 'pensamiento', label: 'Pensamiento', icon: '◈', color: '#e8c427' },
  { key: 'emocion', label: 'Emoción', icon: '○', color: '#d4b020' },
  { key: 'accion', label: 'Acción', icon: '→', color: '#c09c1a' },
  { key: 'resultado', label: 'Resultado', icon: '◉', color: '#ac8814' },
]

const CHAIN_BRAKE = {
  creencia: '"Cobrar caro está mal. La gente no tiene plata."',
  pensamiento: '"Si subo el precio, nadie me va a comprar."',
  emocion: 'Miedo. Culpa. "¿Quién soy yo para cobrar eso?"',
  accion: 'No subes precios. Regalas tu tiempo. Descuentos que nadie pidió.',
  resultado: 'No generas lo que necesitas. Te frustras.',
}

const CHAIN_PUSH = {
  creencia: '"Mi trabajo transforma la vida de las personas."',
  pensamiento: '"Este precio refleja el valor real de lo que entrego."',
  emocion: 'Seguridad. Convicción. Tranquilidad.',
  accion: 'Comunicas con claridad. Vendes con confianza.',
  resultado: 'Clientes comprometidos y un negocio rentable.',
}

export function ModuleCadena({ data, setField, onComplete }: ModuleProps) {
  const chain = data.chain || { resultado: '', accion: '', emocion: '', pensamiento: '', creencia: '', nuevaCreencia: '' }
  const update = (k: string, v: string) => {
    const next = { ...chain, [k]: v }
    setField('chain', next)
    if (Object.values(next).filter(Boolean).length >= 3) onComplete()
  }

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>
        Todo resultado empieza con una creencia. Entiende la cadena y cambia el punto de partida.
      </p>

      {/* Chain diagram */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 32, flexWrap: 'wrap' }}>
        {CHAIN_STEPS.map((s, i) => (
          <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              padding: '12px 18px', borderRadius: 10, background: s.color, color: '#0a0820',
              fontFamily: 'var(--mono-font)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', textAlign: 'center', minWidth: 100,
            }}>
              <div style={{ fontSize: 18, marginBottom: 2 }}>{s.icon}</div>
              {s.label}
            </div>
            {i < CHAIN_STEPS.length - 1 && (
              <span style={{ color: 'var(--hub-whisper)', fontFamily: 'var(--mono-font)', fontSize: 16 }}>→</span>
            )}
          </div>
        ))}
      </div>

      {/* Two examples side by side */}
      <div className="hub-ornament" style={{ marginTop: 40, marginBottom: 14 }}>Misma persona, distinta creencia</div>
      <div className="hub-grid-2">
        {/* Brake chain */}
        <div className="hub-card" style={{ borderTop: '3px solid var(--hub-magenta)' }}>
          <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--hub-magenta)', marginBottom: 14 }}>
            LA CADENA QUE TE FRENA
          </div>
          {CHAIN_STEPS.map(s => (
            <div key={s.key} style={{ padding: '8px 0', borderBottom: '1px solid var(--hub-hairline)', fontSize: 13, lineHeight: 1.5 }}>
              <span style={{ fontFamily: 'var(--mono-font)', fontSize: 9, color: 'var(--hub-whisper)', letterSpacing: '0.16em', marginRight: 8 }}>
                {s.label.toUpperCase()}
              </span>
              <span style={{ color: 'var(--hub-smoke)', fontStyle: 'italic' }}>
                {CHAIN_BRAKE[s.key as keyof typeof CHAIN_BRAKE]}
              </span>
            </div>
          ))}
        </div>
        {/* Push chain */}
        <div className="hub-card" style={{ borderTop: '3px solid var(--hub-electric)' }}>
          <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--hub-electric)', marginBottom: 14 }}>
            LA CADENA QUE TE IMPULSA
          </div>
          {CHAIN_STEPS.map(s => (
            <div key={s.key} style={{ padding: '8px 0', borderBottom: '1px solid var(--hub-hairline)', fontSize: 13, lineHeight: 1.5 }}>
              <span style={{ fontFamily: 'var(--mono-font)', fontSize: 9, color: 'var(--hub-whisper)', letterSpacing: '0.16em', marginRight: 8 }}>
                {s.label.toUpperCase()}
              </span>
              <span style={{ color: 'var(--hub-smoke)' }}>
                {CHAIN_PUSH[s.key as keyof typeof CHAIN_PUSH]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Exercise: your chain */}
      <div className="hub-ornament" style={{ marginTop: 40, marginBottom: 14 }}>Tu cadena actual</div>
      <div className="hub-card" style={{ padding: 28 }}>
        <p style={{ fontSize: 13, color: 'var(--hub-smoke)', marginBottom: 20, lineHeight: 1.5 }}>
          Piensa en un resultado de tu negocio que no te gusta. Recorre la cadena hacia atrás.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { key: 'resultado', label: '¿Cuál es el resultado que no te gusta?', ph: 'Ej: No genero lo suficiente para vivir tranquila' },
            { key: 'accion', label: '¿Qué acción o inacción lo generó?', ph: 'Ej: Cobro menos de lo que vale mi trabajo' },
            { key: 'emocion', label: '¿Qué emoción sentías?', ph: 'Ej: Miedo a que me digan que no' },
            { key: 'pensamiento', label: '¿Qué pensamiento alimentaba esa emoción?', ph: 'Ej: "Si cobro más, pierdo clientes"' },
            { key: 'creencia', label: '¿Cuál es la creencia raíz?', ph: 'Ej: "No merezco ganar bien"' },
          ].map(f => (
            <div key={f.key}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--hub-midnight)', display: 'block', marginBottom: 4 }}>
                {f.label}
              </label>
              <textarea value={chain[f.key] || ''} onChange={e => update(f.key, e.target.value)}
                placeholder={f.ph} rows={1} style={textareaBase} />
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, padding: 20, background: 'rgba(246,207,47,0.08)', borderRadius: 10, border: '1px solid rgba(246,207,47,0.3)' }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--hub-midnight)', display: 'block', marginBottom: 6 }}>
            La pregunta más importante: ¿Cuál es la nueva creencia que necesitas instalar?
          </label>
          <textarea value={chain.nuevaCreencia || ''} onChange={e => update('nuevaCreencia', e.target.value)}
            placeholder='Ej: "Mi trabajo transforma vidas y merece ser bien compensado"'
            rows={2} style={{ ...textareaBase, background: 'white', border: '1px solid rgba(246,207,47,0.4)' }} />
        </div>
      </div>

      <div style={{ marginTop: 24, padding: 16, background: 'var(--hub-midnight)', borderRadius: 10, textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 18, fontStyle: 'italic', color: 'var(--hub-paper)', margin: 0, lineHeight: 1.4 }}>
          &ldquo;La estrategia sin mentalidad es un plan que no se ejecuta.&rdquo;
        </p>
      </div>
    </div>
  )
}

/* ============================================================
   02 · LAS 4 ÁREAS DEL NEGOCIO
   ============================================================ */

const AREAS = [
  {
    key: 'marketing', label: 'Marketing', icon: '◎', color: '#f6cf2f',
    desc: 'Atrae. Que la gente sepa que existes y quiera saber más.',
    question: '¿Tengo un flujo constante de personas interesadas?',
  },
  {
    key: 'ventas', label: 'Ventas', icon: '◈', color: '#f3259a',
    desc: 'Convierte. Que esa persona que te encontró, te compre.',
    question: '¿Convierto interesados en clientes de forma predecible?',
  },
  {
    key: 'entrega', label: 'Entrega', icon: '◉', color: '#b08d4a',
    desc: 'Cumple. Darle al cliente exactamente lo que le prometiste — o más.',
    question: '¿Mi cliente recibe exactamente lo que le prometí?',
  },
  {
    key: 'operaciones', label: 'Operaciones', icon: '⚙', color: '#0a0820',
    desc: 'Sostiene. Que todo funcione sin que tú estés en cada paso.',
    question: '¿Mi negocio puede funcionar un día sin mí?',
  },
]

export function ModuleAreas({ data, setField, onComplete }: ModuleProps) {
  const scores = data.areasScore || { marketing: 0, ventas: 0, entrega: 0, operaciones: 0 }
  const accion = data.areaAccion || ''

  const updateScore = (area: string, val: number) => {
    const next = { ...scores, [area]: val }
    setField('areasScore', next)
    if (Object.values(next).every(v => (v as number) > 0)) onComplete()
  }

  const weakest = Object.entries(scores)
    .filter(([, v]) => (v as number) > 0)
    .sort(([, a], [, b]) => (a as number) - (b as number))[0]

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>
        Un negocio tiene 4 áreas fundamentales. Si estás empezando, esto es el mapa. Si ya tienes negocio, esto es el espejo.
      </p>

      {/* Flow diagram */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 32, flexWrap: 'wrap' }}>
        {AREAS.map((a, i) => (
          <div key={a.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              padding: '14px 22px', borderRadius: 12, background: a.color,
              color: a.key === 'operaciones' ? '#fff' : '#0a0820',
              fontFamily: 'var(--mono-font)', fontSize: 12, fontWeight: 700,
              letterSpacing: '0.08em', textAlign: 'center',
            }}>
              <div style={{ fontSize: 20, marginBottom: 2 }}>{a.icon}</div>
              {a.label}
            </div>
            {i < AREAS.length - 1 && (
              <span style={{ color: 'var(--hub-whisper)', fontFamily: 'var(--mono-font)', fontSize: 16 }}>→</span>
            )}
          </div>
        ))}
      </div>

      {/* Conversaciones */}
      <div className="hub-ornament" style={{ marginTop: 40, marginBottom: 14 }}>Las áreas conversan entre sí</div>
      <div className="hub-grid-2">
        <div className="hub-card" style={{ padding: 20 }}>
          <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--hub-electric)', marginBottom: 8 }}>MARKETING ↔ VENTAS</div>
          <p style={{ fontSize: 13, color: 'var(--hub-smoke)', lineHeight: 1.5, margin: 0 }}>
            Lo que atraes tiene que ser lo mismo que vendes. Si prometes una cosa y vendes otra, el prospecto se confunde. Y cuando alguien se confunde, no compra.
          </p>
        </div>
        <div className="hub-card" style={{ padding: 20 }}>
          <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--hub-magenta)', marginBottom: 8 }}>VENTAS ↔ ENTREGA</div>
          <p style={{ fontSize: 13, color: 'var(--hub-smoke)', lineHeight: 1.5, margin: 0 }}>
            Lo que prometes tiene que ser lo que entregas. Si vendes acompañamiento personalizado pero entregas videos grabados, el cliente se siente estafado.
          </p>
        </div>
      </div>

      {/* Operaciones spotlight */}
      <div className="hub-card" style={{ marginTop: 14, padding: 24, background: 'var(--hub-midnight)', color: 'var(--hub-paper)', border: 'none' }}>
        <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-electric)', marginBottom: 10 }}>OPERACIONES — LA COLUMNA VERTEBRAL</div>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, margin: 0 }}>
          Sin operaciones, TÚ eres el negocio. Si te enfermas, todo para. Si te vas de vacaciones, el negocio se detiene. Eso no es un negocio — es un empleo disfrazado. Con operaciones, el negocio funciona contigo o sin ti.
        </p>
      </div>

      {/* Scoring */}
      <div className="hub-ornament" style={{ marginTop: 40, marginBottom: 14 }}>Diagnóstico rápido</div>
      <p style={{ fontSize: 13, color: 'var(--hub-smoke)', marginBottom: 20 }}>
        Puntúa cada área del 1 al 5. Donde 1 es &ldquo;no existe&rdquo; y 5 es &ldquo;funciona perfecto sin mí&rdquo;.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {AREAS.map(a => (
          <div key={a.key} className="hub-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{a.label}</div>
              <div style={{ fontSize: 12, color: 'var(--hub-smoke)', marginTop: 2 }}>{a.question}</div>
            </div>
            <ScorePicker value={scores[a.key] || 0} onChange={v => updateScore(a.key, v)} />
          </div>
        ))}
      </div>

      {/* Weakest area */}
      {weakest && (
        <div style={{ marginTop: 20, padding: 20, background: 'rgba(246,207,47,0.08)', borderRadius: 10, border: '1px solid rgba(246,207,47,0.3)' }}>
          <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--hub-electric)', marginBottom: 6 }}>
            TU ÁREA MÁS DÉBIL
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--serif)' }}>
            {AREAS.find(a => a.key === weakest[0])?.label} — puntaje {weakest[1] as number}/5
          </div>
          <div style={{ marginTop: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>
              Una acción concreta para mejorarla esta semana:
            </label>
            <textarea value={accion} onChange={e => setField('areaAccion', e.target.value)}
              placeholder="Ej: Crear mi primera plantilla de propuesta para no improvisar cada vez"
              rows={2} style={textareaBase} />
          </div>
        </div>
      )}
    </div>
  )
}

/* ============================================================
   03 · LAS 5 FUGAS INVISIBLES
   ============================================================ */

const FUGAS = [
  {
    key: 'scopeCreep', label: 'Scope Creep', icon: '⊕',
    subtitle: '"¿Me puedes agregar esto rápido?"',
    desc: 'El alcance que crece sin cobrar. No se siente como un problema porque cada pedido individual se siente pequeño. Esa es la trampa — no es un golpe grande, es un sangrado lento.',
    ejemplo: 'El contrato era 10 fotos editadas. Terminó entregando 25 fotos + un video + retoque extra. 8 horas gratis.',
    costo: '$6,000/año',
  },
  {
    key: 'retrabajo', label: 'Retrabajo', icon: '↻',
    subtitle: '"No era exactamente lo que tenía en mente..."',
    desc: 'Hacer las cosas más de una vez. El promedio saludable es 1-2 rondas. El promedio real: 3-5 rondas. Sin moodboard previo ni límite de revisiones.',
    ejemplo: 'Cada ronda extra son 2-4 horas de edición no cobrada.',
    costo: '$4,500/año',
  },
  {
    key: 'tiempo', label: 'Tiempo no facturable', icon: '⏱',
    subtitle: '"Trabajé 40 horas pero solo facturé 18"',
    desc: 'La fuga más silenciosa. Solo el 40-50% del tiempo en un negocio de servicios genera valor directo. El resto: DMs, cotizaciones, admin, perseguir datos.',
    ejemplo: '6 propuestas/mes × 2 horas cada una = 12 horas solo en propuestas. Cierra 2 de 6.',
    costo: '$7,200/año',
  },
  {
    key: 'herramientas', label: 'Herramientas sin ROI', icon: '💳',
    subtitle: '"Pago 10 herramientas y uso 4"',
    desc: 'Cada dólar en una herramienta que no usas es margen perdido. Apps duplicadas, versiones pro que pueden ser gratis, suscripciones abandonadas.',
    ejemplo: 'Pagaba $130/mes en herramientas. Realmente necesitaba $70/mes.',
    costo: '$720/año',
  },
  {
    key: 'sops', label: 'Sin SOPs', icon: '📋',
    subtitle: '"Cada sesión se siente como la primera vez"',
    desc: 'Sin procesos documentados, reinventas la rueda cada vez. No puedes delegar. La calidad es inconsistente. Solo tú lo puedes hacer porque vive en tu cabeza.',
    ejemplo: 'Perdía 4-6 horas semanales en "recordar cómo lo hice la vez pasada".',
    costo: '$4,160/año',
  },
]

export function ModuleFugas({ data, setField, onComplete }: ModuleProps) {
  const scores = data.fugasScore || { scopeCreep: 0, retrabajo: 0, tiempo: 0, herramientas: 0, sops: 0 }

  const updateScore = (fuga: string, val: number) => {
    const next = { ...scores, [fuga]: val }
    setField('fugasScore', next)
    if (Object.values(next).every(v => (v as number) > 0)) onComplete()
  }

  const totalAnswered = Object.values(scores).filter(v => (v as number) > 0).length

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>
        Una fuga no siempre es un gasto. A veces es tiempo perdido, un cliente que se fue, o dinero que dejas de ganar.
      </p>
      <div style={{ marginTop: 8, padding: '12px 16px', background: 'var(--hub-midnight)', borderRadius: 10, display: 'inline-block' }}>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 15, fontStyle: 'italic', color: 'var(--hub-electric)', margin: 0 }}>
          &ldquo;Tus márgenes no se definen en tu precio — se protegen en tu operación.&rdquo;
        </p>
      </div>

      {/* Fuga cards with scoring */}
      <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {FUGAS.map((f, i) => (
          <div key={f.key} className="hub-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 20 }}>{f.icon}</span>
                  <span style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--hub-electric)' }}>
                    FUGA #{i + 1}
                  </span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 2px', fontFamily: 'var(--serif)' }}>{f.label}</h3>
                <p style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--hub-smoke)', margin: '0 0 8px' }}>{f.subtitle}</p>
                <p style={{ fontSize: 13, color: 'var(--hub-smoke)', lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
                <div style={{ marginTop: 10, padding: '8px 12px', background: 'var(--hub-bone)', borderRadius: 8, fontSize: 12, color: 'var(--hub-smoke)' }}>
                  <span style={{ fontFamily: 'var(--mono-font)', fontSize: 9, color: 'var(--hub-whisper)', letterSpacing: '0.16em' }}>EJEMPLO: </span>
                  {f.ejemplo}
                </div>
              </div>
              <div style={{ textAlign: 'center', minWidth: 180 }}>
                <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--hub-whisper)', marginBottom: 6 }}>
                  ¿TE PASA?
                </div>
                <ScorePicker value={scores[f.key] || 0} onChange={v => updateScore(f.key, v)} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontFamily: 'var(--mono-font)', fontSize: 8, color: 'var(--hub-whisper)', letterSpacing: '0.14em' }}>
                  <span>NUNCA</span><span>SIEMPRE</span>
                </div>
                <div style={{ marginTop: 10, fontFamily: 'var(--mono-font)', fontSize: 11, color: 'var(--hub-magenta)', fontWeight: 600 }}>
                  {f.costo}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      {totalAnswered === 5 && (
        <div style={{ marginTop: 24, padding: 24, background: 'var(--hub-midnight)', borderRadius: 14, color: 'var(--hub-paper)', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-electric)', marginBottom: 8 }}>
            COSTO TOTAL ESTIMADO (REFERENCIA)
          </div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 48, fontWeight: 500, letterSpacing: '-0.03em' }}>
            $22,580<span style={{ fontSize: 20, color: 'rgba(255,255,255,0.5)' }}>/año</span>
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 8 }}>
            Este es el costo estimado de Camila. Tu número puede ser mayor o menor.
            <br />Lo importante: <strong style={{ color: 'var(--hub-electric)' }}>no necesitas más clientes — necesitas menos fugas.</strong>
          </p>
        </div>
      )}
    </div>
  )
}

/* ============================================================
   04 · LA MATRIZ DE LIBERACIÓN
   ============================================================ */

const MATRIZ_STEPS = [
  {
    key: 'eliminar', label: 'Eliminar', num: '01', color: '#f6cf2f',
    desc: '¿Esto realmente necesita existir? El 20-30% de las tareas operativas se pueden eliminar sin afectar calidad.',
    ejemplo: 'Reuniones de status → mensaje de 2 líneas.',
  },
  {
    key: 'optimizar', label: 'Optimizar', num: '02', color: '#e8c427',
    desc: 'Lo que sí necesita existir, ¿cómo lo haces mejor o más rápido? ANTES de automatizar — si automatizas algo roto, el desorden corre más rápido.',
    ejemplo: 'Propuesta de 8 páginas → plantilla de 3. De 3 horas a 45 min.',
  },
  {
    key: 'automatizar', label: 'Automatizar', num: '03', color: '#d4b020',
    desc: 'Si ya está optimizado, es repetitivo y sigue reglas claras: piloto automático. Agendamiento, emails, onboarding.',
    ejemplo: 'Agendar por DM → Calendly + email automático.',
  },
  {
    key: 'delegar', label: 'Delegar', num: '04', color: '#c09c1a',
    desc: 'Lo que queda, ¿necesitas ser TÚ? Si tu hora vale $50 y haces una tarea de $15/hr, pierdes $35 cada vez. También puedes delegar a la IA.',
    ejemplo: 'Edición básica → asistente virtual.',
  },
]

const CAMILA_TABLE = [
  { accion: 'Eliminó', que: 'Llamada previa → formulario de 5 preguntas', resultado: '+5 hrs/mes' },
  { accion: 'Optimizó', que: 'Cotización personalizada → 3 paquetes fijos', resultado: '+8 hrs/mes' },
  { accion: 'Automatizó', que: 'Agendar por DM → Calendly + email auto', resultado: '+10 hrs/mes' },
  { accion: 'Delegó', que: 'Edición básica → asistente virtual', resultado: '+9 hrs/mes' },
]

export function ModuleMatriz({ data, setField, onComplete }: ModuleProps) {
  const fugasScore = data.fugasScore || {}
  const matrizFuga = data.matrizFuga || ''
  const matrizAccion = data.matrizAccion || ''
  const matrizPlan = data.matrizPlan || ''

  const topFuga = useMemo(() => {
    const entries = Object.entries(fugasScore).filter(([, v]) => (v as number) > 0)
    if (entries.length === 0) return null
    entries.sort(([, a], [, b]) => (b as number) - (a as number))
    return entries[0][0]
  }, [fugasScore])

  const update = (field: string, val: string) => {
    setField(field, val)
    if (matrizFuga && matrizAccion && val) onComplete()
  }

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>
        No optimices lo que deberías eliminar. No automatices lo que no has optimizado. El orden importa.
      </p>

      {/* 4 steps */}
      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        {MATRIZ_STEPS.map(s => (
          <div key={s.key} className="hub-card" style={{ padding: 18, borderTop: `3px solid ${s.color}` }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.2em', color: s.color, fontWeight: 600 }}>{s.num}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 500, marginTop: 4, lineHeight: 1.15 }}>{s.label}</div>
            <p style={{ fontSize: 12, color: 'var(--hub-smoke)', lineHeight: 1.5, marginTop: 8 }}>{s.desc}</p>
            <div style={{ marginTop: 8, padding: '6px 10px', background: 'var(--hub-bone)', borderRadius: 6, fontSize: 11, color: 'var(--hub-smoke)', fontStyle: 'italic' }}>
              {s.ejemplo}
            </div>
          </div>
        ))}
      </div>

      {/* Camila's result */}
      <div className="hub-ornament" style={{ marginTop: 40, marginBottom: 14 }}>El resultado de Camila</div>
      <div className="hub-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--hub-midnight)', color: 'var(--hub-paper)' }}>
              {['Acción', 'Qué hizo', 'Resultado'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.18em' }}>{h.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CAMILA_TABLE.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--hub-hairline)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--hub-electric)' }}>{r.accion}</td>
                <td style={{ padding: '10px 14px', color: 'var(--hub-smoke)' }}>{r.que}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--mono-font)', fontSize: 12, fontWeight: 600 }}>{r.resultado}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: '12px 14px', background: 'rgba(246,207,47,0.08)', textAlign: 'center', fontSize: 14, fontWeight: 600 }}>
          Total: <span style={{ color: 'var(--hub-electric)' }}>+32 horas/mes recuperadas</span> · Margen de 30% → 52%
        </div>
      </div>

      {/* Your turn */}
      <div className="hub-ornament" style={{ marginTop: 40, marginBottom: 14 }}>Tu turno</div>
      <div className="hub-card" style={{ padding: 24 }}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
            Tu fuga #1 {topFuga && <span style={{ fontWeight: 400, color: 'var(--hub-smoke)' }}>(detectada: {FUGAS.find(f => f.key === topFuga)?.label})</span>}
          </label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {FUGAS.map(f => (
              <button key={f.key} onClick={() => update('matrizFuga', f.key)} style={{
                padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.18s', fontFamily: 'var(--sans)',
                background: matrizFuga === f.key ? 'var(--hub-midnight)' : 'transparent',
                color: matrizFuga === f.key ? 'var(--hub-paper)' : 'var(--hub-midnight)',
                border: `1px solid ${matrizFuga === f.key ? 'var(--hub-midnight)' : 'var(--hub-hairline)'}`,
              }}>{f.label}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>¿Qué acción de la Matriz le aplicas?</label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {MATRIZ_STEPS.map(s => (
              <button key={s.key} onClick={() => update('matrizAccion', s.key)} style={{
                padding: '10px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.18s', fontFamily: 'var(--sans)',
                background: matrizAccion === s.key ? s.color : 'transparent',
                color: matrizAccion === s.key ? '#0a0820' : 'var(--hub-midnight)',
                border: `1px solid ${matrizAccion === s.key ? s.color : 'var(--hub-hairline)'}`,
              }}>{s.label}</button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>
            ¿Qué haces específicamente?
          </label>
          <textarea value={matrizPlan} onChange={e => update('matrizPlan', e.target.value)}
            placeholder="Ej: Crear 3 paquetes con precio fijo en vez de cotizar cada vez desde cero"
            rows={2} style={textareaBase} />
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   05 · TU CEREBRO VS LA IA
   ============================================================ */

const SESGOS = [
  {
    key: 'control', label: 'Sesgo de Control', icon: '🎛',
    frase: '"Prefiero hacerlo yo porque así sé que queda bien."',
    desc: 'Suena responsable. Pero lo que realmente dice es: no confío en nada que no controle al 100%. Y eso te mantiene haciendo todo tú.',
  },
  {
    key: 'confirmacion', label: 'Sesgo de Confirmación', icon: '🪞',
    frase: '"Le pregunto a la IA pero solo acepto lo que ya pensaba."',
    desc: 'Usas la IA como un espejo que te valide, no como un pensador que te desafíe. Te pierdes las mejores ideas — las que no se te hubieran ocurrido.',
  },
  {
    key: 'impostor', label: 'Impostor Tecnológico', icon: '🚫',
    frase: '"Esto es para gente técnica. Yo no sé de tecnología."',
    desc: 'El más dañino. Te auto-excluyes de una herramienta diseñada para CONVERSAR. No necesitas programar. Necesitas saber pedir — y eso ya lo haces todos los días.',
  },
  {
    key: 'esfuerzo', label: 'Sesgo de Esfuerzo', icon: '⚖',
    frase: '"Si no me costó, no vale."',
    desc: 'Si Claude te resuelve en 2 minutos algo que te tomaría 3 horas, tu cerebro dice: "Fue muy fácil, seguro está mal." Confundes sufrimiento con valor.',
  },
]

export function ModuleSesgos({ data, setField, onComplete }: ModuleProps) {
  const checks = data.sesgosCheck || { control: false, confirmacion: false, impostor: false, esfuerzo: false }
  const principal = data.sesgoPrincipal || ''
  const costo = data.sesgoCosto || ''

  const toggleSesgo = (key: string) => {
    const next = { ...checks, [key]: !checks[key] }
    setField('sesgosCheck', next)
    if (Object.values(next).some(Boolean)) onComplete()
  }

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>
        En muchos casos, el humano es el lastre. No porque sea tonto — sino porque tiene sesgos. Estos son los 4 que te van a impedir usar la IA bien.
      </p>

      {/* Medical study reference */}
      <div className="hub-card" style={{ marginTop: 28, padding: 24, background: 'var(--hub-midnight)', color: 'var(--hub-paper)', border: 'none' }}>
        <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-electric)', marginBottom: 12 }}>
          EL DATO INCÓMODO
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, textAlign: 'center' }}>
          {[
            { label: 'Médico solo', pct: 50, bar: 'rgba(255,255,255,0.2)' },
            { label: '+ Internet', pct: 58, bar: 'rgba(255,255,255,0.3)' },
            { label: '+ IA', pct: 72, bar: 'rgba(246,207,47,0.5)' },
            { label: 'IA sola', pct: 84, bar: 'var(--hub-electric)' },
          ].map(d => (
            <div key={d.label}>
              <div style={{ height: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: 6 }}>
                <div style={{ width: 32, height: `${d.pct}%`, background: d.bar, borderRadius: '4px 4px 0 0', transition: 'height 0.6s ease' }} />
              </div>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 18, fontWeight: 700 }}>{d.pct}%</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{d.label}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 14, textAlign: 'center', lineHeight: 1.5 }}>
          La IA sola acierta más que el médico con la IA. El humano, con sus sesgos, a veces es el lastre de su propia herramienta.
        </p>
      </div>

      {/* 4 bias cards */}
      <div className="hub-ornament" style={{ marginTop: 40, marginBottom: 14 }}>Los 4 sesgos</div>
      <div className="hub-grid-2">
        {SESGOS.map(s => {
          const checked = checks[s.key]
          return (
            <button key={s.key} onClick={() => toggleSesgo(s.key)}
              className="hub-card" style={{
                padding: 22, textAlign: 'left', cursor: 'pointer',
                border: `1.5px solid ${checked ? 'var(--hub-electric)' : 'var(--hub-hairline)'}`,
                background: checked ? 'rgba(246,207,47,0.04)' : 'var(--hub-paper)',
                transition: 'all 0.2s',
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 24 }}>{s.icon}</span>
                <div style={{
                  width: 22, height: 22, borderRadius: 4,
                  border: `2px solid ${checked ? 'var(--hub-electric)' : 'var(--hub-hairline)'}`,
                  background: checked ? 'var(--hub-electric)' : 'transparent',
                  display: 'grid', placeItems: 'center', color: '#0a0820', fontSize: 14, fontWeight: 700,
                  transition: 'all 0.18s',
                }}>
                  {checked && '✓'}
                </div>
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500, lineHeight: 1.2 }}>{s.label}</div>
              <p style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--hub-magenta)', margin: '6px 0 8px', lineHeight: 1.4 }}>
                {s.frase}
              </p>
              <p style={{ fontSize: 12, color: 'var(--hub-smoke)', lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
            </button>
          )
        })}
      </div>

      {/* Your bias */}
      <div className="hub-card" style={{ marginTop: 20, padding: 20 }}>
        <div className="hub-grid-2">
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>¿Cuál es tu sesgo principal?</label>
            <textarea value={principal} onChange={e => setField('sesgoPrincipal', e.target.value)}
              placeholder="Ej: El sesgo de control — necesito soltar" rows={2} style={textareaBase} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>¿Qué te está costando?</label>
            <textarea value={costo} onChange={e => setField('sesgoCosto', e.target.value)}
              placeholder="Ej: 10 horas a la semana haciendo cosas que podría delegar" rows={2} style={textareaBase} />
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, padding: 16, background: 'var(--hub-midnight)', borderRadius: 10, textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 16, fontStyle: 'italic', color: 'var(--hub-paper)', margin: 0, lineHeight: 1.4 }}>
          &ldquo;No se trata de perder control. Se trata de tener mayor control con menos esfuerzo.&rdquo;
        </p>
      </div>
    </div>
  )
}

/* ============================================================
   06 · CLAUDE EN ACCIÓN
   ============================================================ */

const CLAUDE_FORMS = [
  { key: 'chat', label: 'Chat', icon: '💬', cuando: 'Consultas rápidas, brainstorming, resolver una duda.' },
  { key: 'proyectos', label: 'Proyectos', icon: '📁', cuando: 'Trabajar en un área de tu negocio con contexto persistente.' },
  { key: 'cowork', label: 'Cowork', icon: '🤝', cuando: 'Sesiones largas de trabajo colaborativo.' },
  { key: 'conexiones', label: 'Conexiones', icon: '🔗', cuando: 'Que Claude use tus archivos y datos reales.' },
  { key: 'code', label: 'Claude Code', icon: '⚡', cuando: 'Automatizar y construir sistemas (avanzado).' },
]

const DEMOS = [
  {
    title: 'SOP de Onboarding',
    fuga: 'Fuga #5 · Sin SOPs',
    accion: 'Optimizar + Automatizar',
    resultado: 'Proceso paso a paso que cualquier persona puede seguir. Ahorra 4 hrs/semana.',
  },
  {
    title: 'Auditoría de herramientas',
    fuga: 'Fuga #4 · Herramientas sin ROI',
    accion: 'Eliminar',
    resultado: 'Claude analiza cada herramienta y te dice cuáles eliminar, cuáles tienen versión gratis.',
  },
  {
    title: 'Política de revisiones',
    fuga: 'Fuga #2 · Retrabajo',
    accion: 'Optimizar',
    resultado: 'Política clara + brief inicial + formato de entrega con opciones. De 5 rondas a 2.',
  },
]

export function ModuleClaude({ data, setField, onComplete }: ModuleProps) {
  const [activeDemo, setActiveDemo] = useState(0)

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>
        Claude no es un chatbot genérico. Es un asistente que piensa, analiza y se adapta a ti. Tiene 5 formas de trabajar.
      </p>

      {/* 5 forms */}
      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
        {CLAUDE_FORMS.map(f => (
          <div key={f.key} className="hub-card" style={{ padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{f.icon}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 500, marginBottom: 4 }}>{f.label}</div>
            <div style={{ fontSize: 11, color: 'var(--hub-smoke)', lineHeight: 1.4 }}>{f.cuando}</div>
          </div>
        ))}
      </div>

      {/* Summary table */}
      <div className="hub-card" style={{ marginTop: 20, padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--hub-midnight)', color: 'var(--hub-paper)' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.18em' }}>NECESITAS...</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.18em' }}>USA...</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Una respuesta rápida', 'Chat'],
              ['Trabajar en un área de tu negocio', 'Proyecto'],
              ['Una sesión larga de trabajo', 'Cowork'],
              ['Que Claude use tus archivos reales', 'Conexiones'],
              ['Automatizar y construir sistemas', 'Claude Code'],
            ].map(([need, use], i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--hub-hairline)' }}>
                <td style={{ padding: '10px 14px', color: 'var(--hub-smoke)' }}>{need}</td>
                <td style={{ padding: '10px 14px', fontWeight: 600 }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Demos preview */}
      <div className="hub-ornament" style={{ marginTop: 40, marginBottom: 14 }}>Claude aplicado a tus fugas</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {DEMOS.map((d, i) => (
          <button key={i} onClick={() => { setActiveDemo(i); onComplete() }} style={{
            flex: 1, minWidth: 160, padding: '10px 14px', borderRadius: 10, fontSize: 12, fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.18s', fontFamily: 'var(--sans)',
            background: activeDemo === i ? 'var(--hub-midnight)' : 'transparent',
            color: activeDemo === i ? 'var(--hub-paper)' : 'var(--hub-midnight)',
            border: `1px solid ${activeDemo === i ? 'var(--hub-midnight)' : 'var(--hub-hairline)'}`,
          }}>Demo {i + 1}: {d.title}</button>
        ))}
      </div>
      <div className="hub-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
          <span className="hub-pill">{DEMOS[activeDemo].fuga}</span>
          <span className="hub-pill" style={{ background: 'rgba(246,207,47,0.15)', color: 'var(--hub-midnight)' }}>{DEMOS[activeDemo].accion}</span>
        </div>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 500, margin: '0 0 8px' }}>{DEMOS[activeDemo].title}</h3>
        <p style={{ fontSize: 14, color: 'var(--hub-smoke)', lineHeight: 1.6, margin: 0 }}>{DEMOS[activeDemo].resultado}</p>
      </div>

      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <a href="https://claude.ai" target="_blank" rel="noopener noreferrer"
          className="hub-btn" style={{ background: 'var(--hub-electric)', color: '#0a0820', fontSize: 14, padding: '14px 28px', textDecoration: 'none' }}>
          Abrir claude.ai →
        </a>
        <p style={{ fontSize: 12, color: 'var(--hub-whisper)', marginTop: 8 }}>Es gratis para empezar</p>
      </div>
    </div>
  )
}

/* ============================================================
   07 · KIT ANTI-FUGAS
   ============================================================ */

interface KitQuestion {
  id: string
  fuga: string
  question: string
  options: { label: string; score: number }[]
}

const KIT_QUESTIONS: KitQuestion[] = [
  {
    id: 'sc1', fuga: 'Scope Creep',
    question: '¿Con qué frecuencia entregas más de lo pactado sin cobrar extra?',
    options: [
      { label: 'Nunca — tengo alcance claro', score: 1 },
      { label: 'Rara vez', score: 2 },
      { label: 'A veces me pasa', score: 3 },
      { label: 'Frecuentemente', score: 4 },
      { label: 'Siempre — no sé decir que no', score: 5 },
    ],
  },
  {
    id: 'sc2', fuga: 'Scope Creep',
    question: '¿Tienes un documento que defina qué incluye y qué NO incluye tu servicio?',
    options: [
      { label: 'Sí, firmado por el cliente', score: 1 },
      { label: 'Sí pero informal', score: 3 },
      { label: 'No tengo nada escrito', score: 5 },
    ],
  },
  {
    id: 'rt1', fuga: 'Retrabajo',
    question: '¿Cuántas rondas de revisión tienes en promedio por proyecto?',
    options: [
      { label: '1-2 rondas', score: 1 },
      { label: '3-4 rondas', score: 3 },
      { label: '5 o más', score: 5 },
    ],
  },
  {
    id: 'rt2', fuga: 'Retrabajo',
    question: '¿Alineas expectativas con brief o moodboard ANTES de empezar?',
    options: [
      { label: 'Siempre', score: 1 },
      { label: 'A veces', score: 3 },
      { label: 'Nunca — empiezo directo', score: 5 },
    ],
  },
  {
    id: 'tf1', fuga: 'Tiempo no facturable',
    question: '¿Qué porcentaje de tu semana genera ingreso directo?',
    options: [
      { label: 'Más del 70%', score: 1 },
      { label: '50-70%', score: 2 },
      { label: '30-50%', score: 4 },
      { label: 'Menos del 30%', score: 5 },
    ],
  },
  {
    id: 'tf2', fuga: 'Tiempo no facturable',
    question: '¿Armas cotizaciones/propuestas desde cero cada vez?',
    options: [
      { label: 'No, tengo plantillas', score: 1 },
      { label: 'A veces reutilizo algo', score: 3 },
      { label: 'Sí, siempre desde cero', score: 5 },
    ],
  },
  {
    id: 'hr1', fuga: 'Herramientas',
    question: '¿Cuántas herramientas/apps pagas mensualmente?',
    options: [
      { label: '1-3', score: 1 },
      { label: '4-7', score: 3 },
      { label: '8 o más', score: 5 },
    ],
  },
  {
    id: 'hr2', fuga: 'Herramientas',
    question: '¿Auditas tus suscripciones al menos cada 3 meses?',
    options: [
      { label: 'Sí, regularmente', score: 1 },
      { label: 'Lo he hecho una vez', score: 3 },
      { label: 'Nunca', score: 5 },
    ],
  },
  {
    id: 'sp1', fuga: 'SOPs',
    question: '¿Alguien podría hacer tu trabajo principal con tus instrucciones escritas?',
    options: [
      { label: 'Sí, está documentado', score: 1 },
      { label: 'Parcialmente', score: 3 },
      { label: 'Imposible — vive en mi cabeza', score: 5 },
    ],
  },
  {
    id: 'sp2', fuga: 'SOPs',
    question: '¿Cada proyecto lo preparas distinto o sigues un proceso estandarizado?',
    options: [
      { label: 'Proceso claro y repetible', score: 1 },
      { label: 'Medio improvisado', score: 3 },
      { label: 'Cada vez desde cero', score: 5 },
    ],
  },
]

const FUGA_COST_MAP: Record<string, { low: number; mid: number; high: number }> = {
  'Scope Creep': { low: 500, mid: 3000, high: 6000 },
  'Retrabajo': { low: 400, mid: 2200, high: 4500 },
  'Tiempo no facturable': { low: 600, mid: 3600, high: 7200 },
  'Herramientas': { low: 100, mid: 400, high: 720 },
  'SOPs': { low: 400, mid: 2000, high: 4160 },
}

const FUGA_ACTIONS: Record<string, string> = {
  'Scope Creep': 'Optimizar → Crea un documento de alcance claro que defina qué incluye y qué NO incluye tu servicio.',
  'Retrabajo': 'Optimizar → Crea un brief/formulario de expectativas y limita las rondas de revisión en tu contrato.',
  'Tiempo no facturable': 'Automatizar → Crea plantillas para propuestas y automatiza el agendamiento de llamadas.',
  'Herramientas': 'Eliminar → Audita cada herramienta: ¿la uso? ¿impacta mi ingreso? Si no, elimínala.',
  'SOPs': 'Optimizar → Documenta tu proceso principal paso a paso. Un checklist simple vale más que nada.',
}

export function ModuleKit({ data, setField, onComplete }: ModuleProps) {
  const answers = data.kitAnswers || {} as Record<string, number>
  const [copied, setCopied] = useState(false)

  const setAnswer = (id: string, score: number) => {
    const next = { ...answers, [id]: score }
    setField('kitAnswers', next)
    if (Object.keys(next).length === KIT_QUESTIONS.length) onComplete()
  }

  const answered = Object.keys(answers).length
  const progress = Math.round(100 * answered / KIT_QUESTIONS.length)
  const isComplete = answered === KIT_QUESTIONS.length

  // Calculate per-fuga scores
  const fugaScores = useMemo(() => {
    const groups: Record<string, number[]> = {}
    KIT_QUESTIONS.forEach(q => {
      if (answers[q.id] !== undefined) {
        if (!groups[q.fuga]) groups[q.fuga] = []
        groups[q.fuga].push(answers[q.id])
      }
    })
    return Object.entries(groups).map(([fuga, scores]) => {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length
      const costMap = FUGA_COST_MAP[fuga]
      const cost = avg <= 2 ? costMap.low : avg <= 3.5 ? costMap.mid : costMap.high
      const level = avg <= 2 ? 'Bajo control' : avg <= 3.5 ? 'Riesgo moderado' : 'Fuga activa'
      const color = avg <= 2 ? '#22c55e' : avg <= 3.5 ? '#f6cf2f' : '#f3259a'
      return { fuga, avg, cost, level, color }
    }).sort((a, b) => b.avg - a.avg)
  }, [answers])

  const totalCost = fugaScores.reduce((a, b) => a + b.cost, 0)
  const topFuga = fugaScores[0]

  // Generate prompt
  const kitPrompt = useMemo(() => {
    if (!isComplete || !topFuga) return ''
    const action = FUGA_ACTIONS[topFuga.fuga] || ''
    return `Soy profesional independiente y mi fuga de dinero principal es: ${topFuga.fuga}.

Mi situación: ${topFuga.level} (puntaje ${topFuga.avg.toFixed(1)}/5).
Costo estimado: ~$${topFuga.cost.toLocaleString()}/año.

Acción recomendada: ${action}

Ayúdame a crear un proceso paso a paso que pueda implementar esta semana para tapar esta fuga. Que sea simple, concreto y que cualquier persona pueda seguirlo.`
  }, [isComplete, topFuga])

  const copyPrompt = async () => {
    if (!kitPrompt) return
    try {
      await navigator.clipboard.writeText(kitPrompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* ignore */ }
  }

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>
        10 preguntas. Tu diagnóstico personalizado. Un plan de acción para tapar tu fuga #1 con Claude.
      </p>

      {/* Progress */}
      <div style={{ marginTop: 24, marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--hub-whisper)' }}>
            DIAGNÓSTICO
          </span>
          <span style={{ fontFamily: 'var(--mono-font)', fontSize: 10, fontWeight: 700 }}>{answered}/{KIT_QUESTIONS.length}</span>
        </div>
        <div style={{ height: 4, background: 'var(--hub-shell)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'var(--hub-electric)', borderRadius: 2, transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {/* Questions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {KIT_QUESTIONS.map((q, i) => (
          <div key={q.id} className="hub-card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--hub-electric)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="hub-pill" style={{ fontSize: 9, padding: '3px 8px' }}>{q.fuga}</span>
            </div>
            <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 12px', lineHeight: 1.4 }}>{q.question}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {q.options.map(o => (
                <button key={o.label} onClick={() => setAnswer(q.id, o.score)} style={{
                  padding: '8px 14px', borderRadius: 999, fontSize: 12, cursor: 'pointer',
                  transition: 'all 0.18s', fontFamily: 'var(--sans)', fontWeight: 500,
                  background: answers[q.id] === o.score ? 'var(--hub-midnight)' : 'transparent',
                  color: answers[q.id] === o.score ? 'var(--hub-paper)' : 'var(--hub-midnight)',
                  border: `1px solid ${answers[q.id] === o.score ? 'var(--hub-midnight)' : 'var(--hub-hairline)'}`,
                }}>{o.label}</button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      {isComplete && (
        <div style={{ marginTop: 40 }}>
          <div className="hub-ornament" style={{ marginBottom: 14 }}>Tu diagnóstico</div>

          {/* Per-fuga results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {fugaScores.map((f, i) => (
              <div key={f.fuga} className="hub-card" style={{
                padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 14, borderLeft: `4px solid ${f.color}`, flexWrap: 'wrap',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 200 }}>
                  {i === 0 && <span style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.16em', color: 'var(--hub-magenta)', fontWeight: 700 }}>#1</span>}
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{f.fuga}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--mono-font)', fontSize: 12, color: f.color, fontWeight: 600 }}>{f.level}</span>
                  <span style={{ fontFamily: 'var(--mono-font)', fontSize: 12 }}>{f.avg.toFixed(1)}/5</span>
                  <span style={{ fontFamily: 'var(--mono-font)', fontSize: 14, fontWeight: 700, color: 'var(--hub-magenta)' }}>
                    ~${f.cost.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={{ marginTop: 20, padding: 24, background: 'var(--hub-midnight)', borderRadius: 14, color: 'var(--hub-paper)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-electric)', marginBottom: 8 }}>
              TU COSTO ESTIMADO ANUAL EN FUGAS
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 48, fontWeight: 500, letterSpacing: '-0.03em' }}>
              ${totalCost.toLocaleString()}<span style={{ fontSize: 20, color: 'rgba(255,255,255,0.5)' }}>/año</span>
            </div>
          </div>

          {/* Action plan + prompt */}
          {topFuga && (
            <div style={{ marginTop: 24 }}>
              <div className="hub-ornament" style={{ marginBottom: 14 }}>Tu plan de acción</div>
              <div className="hub-card" style={{ padding: 24, borderTop: '3px solid var(--hub-electric)' }}>
                <SectionLabel num="01" label="TU FUGA PRINCIPAL" />
                <div style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 500, marginBottom: 6 }}>{topFuga.fuga}</div>
                <p style={{ fontSize: 14, color: 'var(--hub-smoke)', margin: '0 0 16px' }}>
                  {FUGA_ACTIONS[topFuga.fuga]}
                </p>

                <SectionLabel num="02" label="TU PROMPT PARA CLAUDE" />
                <div style={{ padding: 18, background: 'var(--hub-midnight)', borderRadius: 10, color: 'var(--hub-paper)', marginBottom: 14 }}>
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--mono-font)', fontSize: 12, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', margin: 0 }}>
                    {kitPrompt}
                  </pre>
                </div>
                <button onClick={copyPrompt}
                  className="hub-btn" style={{
                    background: copied ? '#22c55e' : 'var(--hub-electric)',
                    color: '#0a0820', width: '100%', justifyContent: 'center', fontSize: 14,
                  }}>
                  {copied ? '✓ Copiado' : 'Copiar prompt → pegar en claude.ai'}
                </button>
              </div>
            </div>
          )}

          <div style={{ marginTop: 24, padding: 16, background: 'var(--hub-midnight)', borderRadius: 10, textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 16, fontStyle: 'italic', color: 'var(--hub-paper)', margin: 0, lineHeight: 1.4 }}>
              &ldquo;Tu tarea: hoy, cuando llegues a tu casa, abre Claude y usa este prompt. No mañana. Hoy.&rdquo;
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

/* ============================================================
   EXPORT MAP
   ============================================================ */

export const IA_MODULES: Record<string, React.ComponentType<ModuleProps>> = {
  cadena: ModuleCadena,
  areas: ModuleAreas,
  fugas: ModuleFugas,
  matriz: ModuleMatriz,
  sesgos: ModuleSesgos,
  claude: ModuleClaude,
  kit: ModuleKit,
}
