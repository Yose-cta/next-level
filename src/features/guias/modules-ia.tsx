'use client'

import { useState } from 'react'

interface ModuleProps {
  data: Record<string, any>
  setField: (key: string, value: any) => void
}

const ROLES = [
  { id: 'asesor', label: 'Asesor de imagen', text: 'un asesor de imagen profesional' },
  { id: 'editor', label: 'Editor profesional', text: 'un editor profesional con tono ejecutivo' },
  { id: 'mentor', label: 'Mentor de carrera', text: 'un mentor de carrera empático y directo' },
  { id: 'copy', label: 'Copywriter', text: 'un copywriter persuasivo' },
]

const FORMATOS = [
  { id: 'lista', label: 'Lista corta', text: 'una lista numerada de máximo 5 puntos' },
  { id: 'parr', label: 'Párrafo breve', text: 'un párrafo breve de 3-4 oraciones' },
  { id: 'opciones', label: '3 opciones', text: '3 versiones distintas para que yo elija' },
  { id: 'tabla', label: 'Tabla comparativa', text: 'una tabla comparativa con pros y contras' },
]

const USE_CASES = [
  { id: 'email', cat: 'COMUNICACIÓN', icon: '✉', title: 'Redactar correos difíciles', sample: 'Reescribe este correo en un tono asertivo pero cordial: "Hola..."' },
  { id: 'pitch', cat: 'VENTAS', icon: '◈', title: 'Refinar tu pitch', sample: 'Mejora este pitch de 1 minuto. Hazlo más concreto y con un cierre poderoso.' },
  { id: 'cv', cat: 'CARRERA', icon: '◐', title: 'Optimizar tu CV', sample: 'Reescribe estas 3 viñetas de mi CV con verbos de acción y resultados medibles.' },
  { id: 'idea', cat: 'CREATIVIDAD', icon: '✦', title: 'Lluvia de ideas', sample: 'Dame 10 títulos creativos para mi taller de imagen profesional.' },
  { id: 'sum', cat: 'PRODUCTIVIDAD', icon: '≡', title: 'Resumir reuniones', sample: 'Resume esta transcripción en 5 puntos clave y 3 acciones a tomar.' },
  { id: 'social', cat: 'CONTENIDO', icon: '◯', title: 'Posts para redes', sample: 'Convierte este artículo en un carrusel de 7 slides para Instagram.' },
  { id: 'preg', cat: 'PREPARACIÓN', icon: '?', title: 'Anticipar preguntas', sample: '¿Qué 5 preguntas haría un entrevistador exigente en una posición de gerente?' },
  { id: 'trad', cat: 'COMUNICACIÓN', icon: '⇄', title: 'Traducir con tono', sample: 'Traduce este mensaje al inglés profesional, conservando cercanía.' },
]

const STARTERS = [
  '3 títulos para un taller de imagen profesional dirigido a abogadas.',
  'Reescribe este mensaje de WhatsApp para que suene más profesional: "hola te paso el presu xfa avisame"',
  'Resume en 3 puntos qué transmite el color magenta en una marca personal.',
  'Dame 5 preguntas potentes para una entrevista a un cliente nuevo.',
]

// ============================================================
// IA · 01 INTRO
// ============================================================
export function ModuleAiIntro({ data, setField }: ModuleProps) {
  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>
        No reemplaza tu trabajo — multiplica tu tiempo. Esto es lo que cambia cuando sumas a <em>Claude</em> a tu día.
      </p>
      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 28, alignItems: 'flex-start' }}>
        <div>
          <div className="hub-card" style={{ padding: 32, borderTop: '3px solid var(--hub-electric)' }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-whisper)' }}>QUÉ ES CLAUDE</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 34, fontWeight: 500, letterSpacing: '-0.02em', marginTop: 10, lineHeight: 1.05 }}>
              Un asistente que <em style={{ color: '#c69200', fontStyle: 'italic' }}>piensa contigo</em>, no por ti.
            </div>
            <div style={{ fontSize: 14, color: 'var(--hub-smoke)', marginTop: 18, lineHeight: 1.6 }}>
              Claude es una IA conversacional. Le hablas como a una persona, le pides lo que necesitas, y te devuelve una primera versión que tú revisas, ajustas y haces tuya.
            </div>
            <div style={{ marginTop: 22, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Redacta', 'Resume', 'Traduce', 'Compara', 'Estructura', 'Reescribe'].map(t => (
                <span key={t} style={{ padding: '6px 12px', borderRadius: 999, background: 'var(--hub-bone)', border: '1px solid var(--hub-hairline)', fontSize: 11, fontFamily: 'var(--mono-font)', letterSpacing: '0.12em', color: 'var(--hub-smoke)' }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            {[{ num: '10×', label: 'Más rápido al redactar' }, { num: '0', label: 'Bloqueos creativos' }, { num: '24/7', label: 'Disponible' }].map(s => (
              <div key={s.num} className="hub-card" style={{ padding: '18px 20px' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 42, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: 12, color: 'var(--hub-smoke)', marginTop: 6, lineHeight: 1.3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hub-card" style={{ padding: 28, background: 'var(--hub-midnight)', color: 'var(--hub-paper)', borderRadius: 14, border: 'none' }}>
          <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.32em', color: 'var(--hub-electric)', marginBottom: 18 }}>· ANTES · DESPUÉS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { before: '40 min escribiendo un correo formal.', after: '4 min. Claude propone, tú ajustas y firmas.' },
              { before: 'Página en blanco. Cero ideas para tu reel.', after: 'Tres opciones de guión en 30 segundos.' },
              { before: 'Resumen mediocre de una reunión de 1h.', after: 'Pegas la transcripción → resumen claro y accionable.' },
              { before: 'Cierras la propuesta sin saber el tono.', after: 'Pides 3 versiones (formal · cercana · breve).' },
            ].map((ba, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'center', fontSize: 13, lineHeight: 1.4 }}>
                <div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 8, color: 'rgba(255,255,255,0.6)', textDecoration: 'line-through', textDecorationColor: 'rgba(255,255,255,0.3)' }}>{ba.before}</div>
                <div style={{ color: 'var(--hub-electric)', fontFamily: 'var(--mono-font)', fontSize: 12 }}>→</div>
                <div style={{ padding: '10px 12px', background: 'rgba(246,207,47,0.1)', borderRadius: 8, border: '1px solid rgba(246,207,47,0.3)' }}>{ba.after}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hub-ornament" style={{ marginTop: 48, marginBottom: 14 }}>Tres principios para usarla bien</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        {[
          { num: '01', title: 'Da contexto', body: 'Cuanto más sabe Claude de ti, tu rol y tu audiencia, mejor responde.' },
          { num: '02', title: 'Itera, no aceptes', body: 'La primera respuesta es un borrador. Pídele variaciones, ajustes, otro tono.' },
          { num: '03', title: 'Tú decides', body: 'Claude propone — tú revisas y firmas. La última palabra siempre es tuya.' },
        ].map(p => (
          <div key={p.num} className="hub-card" style={{ padding: 22 }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-electric)', fontWeight: 600 }}>{p.num}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em', marginTop: 6, lineHeight: 1.15 }}>{p.title}</div>
            <div style={{ fontSize: 13, color: 'var(--hub-smoke)', marginTop: 8, lineHeight: 1.5 }}>{p.body}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// IA · 02 ANATOMÍA DEL PROMPT
// ============================================================
export function ModuleAiPrompt({ data, setField }: ModuleProps) {
  const p = data.prompt || { rol: 'asesor', contexto: '', tarea: '', formato: 'opciones', tono: 50 }
  const setP = (k: string, v: any) => setField('prompt', (x: any) => ({ ...(x || p), [k]: v }))

  const rol = ROLES.find(r => r.id === p.rol)!
  const fmt = FORMATOS.find(f => f.id === p.formato)!
  const tonoLabel = p.tono < 33 ? 'cercano y amigable' : p.tono < 66 ? 'profesional y claro' : 'ejecutivo y directo'

  const fullPrompt = `Actúa como ${rol.text}. \n\nContexto: ${p.contexto || '(describe tu situación)'}.\n\nTarea: ${p.tarea || '(qué necesitas)'}.\n\nResponde en ${fmt.text}, con un tono ${tonoLabel}.`

  const chipStyle = (sel: boolean): React.CSSProperties => ({
    padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.18s',
    background: sel ? 'var(--hub-midnight)' : 'transparent',
    color: sel ? 'var(--hub-paper)' : 'var(--hub-midnight)',
    border: `1px solid ${sel ? 'var(--hub-midnight)' : 'var(--hub-hairline)'}`,
    fontFamily: 'var(--sans)',
  })

  const textareaStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid var(--hub-hairline)',
    background: 'var(--hub-bone)', fontSize: 14, fontFamily: 'var(--sans)', outline: 'none', resize: 'vertical', lineHeight: 1.5,
    color: 'var(--hub-midnight)',
  }

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>
        Un buen prompt tiene 4 capas: <em>rol</em>, <em>contexto</em>, <em>tarea</em> y <em>formato</em>. Arma el tuyo.
      </p>
      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'flex-start' }}>
        <div className="hub-card" style={{ padding: 24 }}>
          <PromptField label="01 · ROL" sub="¿Quién quieres que sea Claude?">
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {ROLES.map(r => (
                <button key={r.id} onClick={() => setP('rol', r.id)} style={chipStyle(p.rol === r.id)}>{r.label}</button>
              ))}
            </div>
          </PromptField>
          <PromptField label="02 · CONTEXTO" sub="Tu situación, audiencia, restricciones.">
            <textarea value={p.contexto} onChange={e => setP('contexto', e.target.value)} rows={2}
              placeholder="Soy asesora de imagen y mi cliente es una abogada de 35 años que..."
              style={textareaStyle} />
          </PromptField>
          <PromptField label="03 · TAREA" sub="Qué quieres que haga.">
            <textarea value={p.tarea} onChange={e => setP('tarea', e.target.value)} rows={2}
              placeholder="Sugiere 3 looks para una primera reunión con un cliente corporativo."
              style={textareaStyle} />
          </PromptField>
          <PromptField label="04 · FORMATO" sub="Cómo quieres recibir la respuesta.">
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {FORMATOS.map(f => (
                <button key={f.id} onClick={() => setP('formato', f.id)} style={chipStyle(p.formato === f.id)}>{f.label}</button>
              ))}
            </div>
          </PromptField>
          <PromptField label="05 · TONO" sub={tonoLabel}>
            <input type="range" min="0" max="100" value={p.tono} onChange={e => setP('tono', +e.target.value)} className="hub-slider hub-slider-electric" />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono-font)', fontSize: 9, color: 'var(--hub-whisper)', marginTop: 6, letterSpacing: '0.16em' }}>
              <span>CERCANO</span><span>EJECUTIVO</span>
            </div>
          </PromptField>
        </div>
        <div style={{ position: 'sticky', top: 24 }}>
          <div style={{ padding: 24, borderRadius: 14, background: 'var(--hub-midnight)', color: 'var(--hub-paper)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-electric)' }}>· TU PROMPT ENSAMBLADO</div>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.16em' }}>{fullPrompt.length} CHARS</div>
            </div>
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--mono-font)', fontSize: 12, lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', margin: 0 }}>{fullPrompt}</pre>
            <div style={{ marginTop: 18, padding: '14px 22px', borderRadius: 999, background: 'var(--hub-electric)', color: 'var(--hub-midnight)', border: 'none', fontWeight: 700, fontSize: 13, letterSpacing: '0.04em', textAlign: 'center', opacity: 0.6 }}>
              Copia este prompt y pégalo en claude.ai →
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PromptField({ label, sub, children }: { label: string; sub: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--hub-electric)', fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 11, color: 'var(--hub-whisper)', fontStyle: 'italic' }}>{sub}</div>
      </div>
      {children}
    </div>
  )
}

// ============================================================
// IA · 03 CASOS DE USO
// ============================================================
export function ModuleAiUseCases({ data, setField }: ModuleProps) {
  const [open, setOpen] = useState(USE_CASES[0].id)
  const current = USE_CASES.find(u => u.id === open)!

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>
        Ocho formas en que un profesional usa la IA cada semana. Toca una para ver el prompt.
      </p>
      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 10 }}>
        {USE_CASES.map(uc => {
          const isActive = open === uc.id
          return (
            <button key={uc.id} onClick={() => setOpen(uc.id)} style={{
              padding: 18, borderRadius: 12, textAlign: 'left', cursor: 'pointer', transition: 'all 0.18s',
              background: isActive ? 'var(--hub-midnight)' : 'var(--hub-paper)',
              color: isActive ? 'var(--hub-paper)' : 'var(--hub-midnight)',
              border: `1px solid ${isActive ? 'var(--hub-midnight)' : 'var(--hub-hairline)'}`,
              display: 'flex', flexDirection: 'column', gap: 8, minHeight: 110, fontFamily: 'var(--sans)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 24, color: isActive ? 'var(--hub-electric)' : 'var(--hub-whisper)', lineHeight: 1 }}>{uc.icon}</span>
                <span style={{ fontFamily: 'var(--mono-font)', fontSize: 8, letterSpacing: '0.2em', opacity: 0.6 }}>{uc.cat}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3, marginTop: 'auto' }}>{uc.title}</div>
            </button>
          )
        })}
      </div>
      <div style={{ marginTop: 24, padding: 28, borderRadius: 14, background: 'var(--hub-paper)', border: '1px solid var(--hub-hairline)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-electric)' }}>{current.cat} · CASO</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 500, letterSpacing: '-0.01em', marginTop: 6 }}>{current.title}</div>
            <div style={{ marginTop: 14, padding: '14px 16px', background: 'var(--hub-bone)', borderRadius: 10, border: '1px solid var(--hub-hairline)', fontFamily: 'var(--mono-font)', fontSize: 12, lineHeight: 1.55, color: 'var(--hub-smoke)' }}>
              <span style={{ color: 'var(--hub-electric)' }}>$ </span>{current.sample}
            </div>
          </div>
          <div style={{ flex: 1.2, minWidth: 300, background: 'var(--hub-midnight)', color: 'var(--hub-paper)', borderRadius: 10, padding: 18, minHeight: 180 }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-electric)', marginBottom: 10 }}>CÓMO USARLO</div>
            <div style={{ fontSize: 13, lineHeight: 1.55, whiteSpace: 'pre-wrap', color: 'rgba(255,255,255,0.8)' }}>
              Copia el prompt de arriba, pégalo en claude.ai, y ajusta los detalles a tu caso real. Claude te dará una primera versión que puedes iterar hasta que quede perfecto.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// IA · 04 PLAYGROUND
// ============================================================
export function ModuleAiPlayground({ data, setField }: ModuleProps) {
  const [q, setQ] = useState('')

  const textareaStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid var(--hub-hairline)',
    background: 'var(--hub-bone)', fontSize: 15, fontFamily: 'var(--sans)', outline: 'none', resize: 'vertical', lineHeight: 1.5,
    minHeight: 140, color: 'var(--hub-midnight)',
  }

  const copyPrompt = async () => {
    if (!q.trim()) return
    try { await navigator.clipboard.writeText(q) } catch {}
  }

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>
        Tu turno. Escribe lo que quieras o usa una de las plantillas — luego cópialo y pégalo en <em>claude.ai</em>.
      </p>
      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, alignItems: 'flex-start' }}>
        <div>
          <div className="hub-card" style={{ padding: 24 }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-whisper)', marginBottom: 8 }}>TU PROMPT</div>
            <textarea value={q} onChange={e => setQ(e.target.value)} placeholder="Escribe lo que necesitas... (ej: dame 3 ideas para un correo de seguimiento a un cliente que no respondió)" style={textareaStyle} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, flexWrap: 'wrap', gap: 10 }}>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, color: 'var(--hub-whisper)', letterSpacing: '0.18em' }}>{q.length} CARACTERES</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setQ('')} className="hub-btn hub-btn-ghost">Limpiar</button>
                <button onClick={copyPrompt} className="hub-btn" style={{ background: 'var(--hub-electric)', color: 'var(--hub-midnight)' }}>
                  Copiar prompt →
                </button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-whisper)', marginBottom: 10 }}>· PLANTILLAS PARA EMPEZAR</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {STARTERS.map((s, i) => (
                <button key={i} onClick={() => setQ(s)} className="hub-card" style={{ padding: 14, textAlign: 'left', fontSize: 12, lineHeight: 1.5, color: 'var(--hub-smoke)', cursor: 'pointer' }}>
                  <span style={{ color: 'var(--hub-electric)', fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.16em', display: 'block', marginBottom: 4 }}>{`0${i + 1}`}</span>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ padding: 24, borderRadius: 14, background: 'var(--hub-midnight)', color: 'var(--hub-paper)', minHeight: 380, position: 'sticky', top: 24 }}>
          <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.32em', color: 'var(--hub-electric)', marginBottom: 14 }}>· CÓMO USAR TU PROMPT</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--hub-electric)', marginBottom: 8 }}>PASO 1</div>
              <div>Escribe o elige un prompt a la izquierda.</div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--hub-electric)', marginBottom: 8 }}>PASO 2</div>
              <div>Haz clic en &ldquo;Copiar prompt&rdquo;.</div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--hub-electric)', marginBottom: 8 }}>PASO 3</div>
              <div>Abre <strong style={{ color: 'var(--hub-electric)' }}>claude.ai</strong> y pega tu prompt.</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--hub-electric)', marginBottom: 8 }}>PASO 4</div>
              <div>Lee la respuesta como un borrador. Itera hasta que quede perfecto.</div>
            </div>
          </div>
          <div style={{ marginTop: 24, padding: '14px 16px', background: 'rgba(246,207,47,0.1)', borderRadius: 10, border: '1px solid rgba(246,207,47,0.3)' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 16, fontStyle: 'italic', lineHeight: 1.4 }}>
              &ldquo;La primera respuesta es siempre un borrador. La magia está en la iteración.&rdquo;
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const IA_MODULES = {
  aiIntro: ModuleAiIntro,
  aiPrompt: ModuleAiPrompt,
  aiUseCases: ModuleAiUseCases,
  aiPlayground: ModuleAiPlayground,
}
