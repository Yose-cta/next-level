'use client'

import { useState, useCallback } from 'react'
import { IMAGEN_MODULES } from './modules-imagen'
import { IA_MODULES } from './modules-ia'
import { COM_MODULES } from './modules-com'
import './hub.css'

// ---- Module map ----
const MODULE_MAP: Record<string, React.ComponentType<ModuleProps>> = {
  ...IA_MODULES,
  ...IMAGEN_MODULES,
  ...COM_MODULES,
}

// ---- Types ----
interface ModuleEntry {
  key: string
  label: string
  title: string
  eyebrow: string
}

interface Block {
  id: string
  num: string
  expert: string
  topic: string
  accent: string
  accentRgb: string
  quote: string
  modules: ModuleEntry[]
}

export interface HubData {
  name: string
  myths: Record<number, boolean>
  haloRead: boolean
  dressMatches: Record<string, string>
  fitting: { blazer: string; shirt: string; pants: string; shoes: string; accent: string | null }
  style: string | null
  styleAnswers: Record<number, number>
  season: string | null
  seasonAnswers: Record<number, number>
  skinTone: number
  psychSeen: string[]
  combine: { a: string | null; b: string | null }
  capsule: string[]
  action: string
  prompt: { rol: string; contexto: string; tarea: string; formato: string; tono: number }
  fears: Record<string, boolean>
  beliefs: string[]
  experiences: string[]
  chainTable: Record<string, string>
  newIdentity: string[]
  voice: { intensidad: number; tono: number; velocidad: number }
  bodyNotes: Record<string, string[]>
  pauseNotes: string[]
  bodyPillar: number
  emotion: string | null
  story: { contexto: string; problema: string; aprendizaje: string }
  audience: Record<string, string>
  piba: { problema: string; implicacion: string; beneficio: string; accion: string }
}

export interface ModuleProps {
  data: HubData
  setField: (key: string, value: unknown) => void
  onComplete: () => void
  goTo: (index: number) => void
}

// ---- Block definitions ----
const BLOCKS: Block[] = [
  {
    id: 'ia', num: '01',
    expert: 'Yoselvia Adam', topic: 'IA Aplicada · Claude',
    accent: 'var(--hub-electric)', accentRgb: '246,207,47',
    quote: '“La IA no te reemplaza — te libera tiempo para pensar mejor.”',
    modules: [
      { key: 'aiIntro', label: '¿Qué es Claude?', title: 'Tu copiloto invisible', eyebrow: '01 / Apertura' },
      { key: 'aiPrompt', label: 'Anatomía del prompt', title: 'Cómo hablarle a la IA', eyebrow: '02 / Prompt' },
      { key: 'aiUseCases', label: 'Casos de uso', title: 'Tu semana con Claude', eyebrow: '03 / Aplicación' },
      { key: 'aiPlayground', label: 'Playground', title: 'Pruébala ahora', eyebrow: '04 / Práctica' },
    ]
  },
  {
    id: 'imagen', num: '02',
    expert: 'Valentina Silva', topic: 'Imagen · Color · Presencia',
    accent: 'var(--hub-magenta)', accentRgb: '243,37,154',
    quote: '“Tu imagen habla antes que tú.”',
    modules: [
      { key: 'intro', label: 'Bienvenida', title: 'Tu imagen habla antes que tú', eyebrow: '01 / Apertura' },
      { key: 'myths', label: 'Mitos vs Realidad', title: 'Lo que crees vs lo que es', eyebrow: '02 / Diagnóstico' },
      { key: 'halo', label: 'Halo & Horn', title: '7 segundos. 4 minutos.', eyebrow: '03 / Primera impresión' },
      { key: 'dressCode', label: 'Dress Code', title: 'Vestir según la ocasión', eyebrow: '04 / Códigos' },
      { key: 'fitting', label: 'Tu Outfit', title: 'Arma tu look ideal', eyebrow: '05 / Outfit' },
      { key: 'style', label: 'Tu Estilo', title: 'Clásico, Romántico, Dramático', eyebrow: '06 / Estilo' },
      { key: 'season', label: 'Colorimetría', title: 'Encuentra tu estación', eyebrow: '07 / Color' },
      { key: 'psych', label: 'Psicología del Color', title: 'Cada color comunica algo', eyebrow: '08 / Color' },
      { key: 'combine', label: 'Combina y Comunica', title: 'El poder de la combinación', eyebrow: '09 / Color' },
      { key: 'ficha', label: 'Tu Ficha Next Level', title: 'Tu carta de presentación', eyebrow: '10 / Cierre' },
    ]
  },
  {
    id: 'com', num: '03',
    expert: 'Sebastián Villar', topic: 'Comunicación y Ventas',
    accent: 'var(--hub-gold)', accentRgb: '176,141,74',
    quote: '“Comunica con presencia y expresa tu verdadera esencia.”',
    modules: [
      { key: 'mindset', label: 'Mentalidad de Speaker', title: 'Mentalidad del Speaker', eyebrow: '01 / Bloque 1' },
      { key: 'nonverbal', label: 'No verbal y voz', title: 'Tu cuerpo · Tu instrumento', eyebrow: '02 / Bloque 2' },
      { key: 'storytelling', label: 'Storytelling C·P·A', title: 'Conecta · impacta · convence', eyebrow: '03 / Bloque 3' },
      { key: 'piba', label: 'Pitch P.I.B.A.', title: 'Tu pitch irresistible', eyebrow: '04 / Pitch' },
      { key: 'download', label: 'Descargar Workbook', title: 'Tu workbook completado', eyebrow: '05 / Cierre' },
    ]
  },
]

const INITIAL_DATA: HubData = {
  name: '',
  myths: {}, haloRead: false, dressMatches: {},
  fitting: { blazer: 'midnight', shirt: 'white', pants: 'midnight', shoes: 'black', accent: null },
  style: null, styleAnswers: {},
  season: null, seasonAnswers: {}, skinTone: 2,
  psychSeen: [], combine: { a: null, b: null }, capsule: [], action: '',
  prompt: { rol: 'asesor', contexto: '', tarea: '', formato: 'opciones', tono: 50 },
  fears: {},
  beliefs: ['', '', ''],
  experiences: ['', '', ''],
  chainTable: {},
  newIdentity: ['', '', ''],
  voice: { intensidad: 50, tono: 50, velocidad: 50 },
  bodyNotes: { postura: ['', ''], ademanes: ['', '', ''], rostro: ['', '', ''] },
  pauseNotes: ['', '', ''],
  bodyPillar: 0,
  emotion: null,
  story: { contexto: '', problema: '', aprendizaje: '' },
  audience: {},
  piba: { problema: '', implicacion: '', beneficio: '', accion: '' },
}

function renderTitle(t: string) {
  const words = t.split(' ')
  if (words.length < 2) return t
  const last = words.slice(-2).join(' ')
  const first = words.slice(0, -2).join(' ')
  return <>{first} <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic' }}>{last}</em></>
}

// ---- Sidebar ----
function Sidebar({
  block, blocks, active, done, progress, onJump, onSwitch, blockProgressFor, mobileOpen, setMobileOpen,
}: {
  block: Block
  blocks: Block[]
  active: number
  done: Set<number>
  progress: number
  onJump: (i: number) => void
  onSwitch: (id: string) => void
  blockProgressFor: (b: Block) => number
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
}) {
  return (
    <aside className="hub-sidebar">
      {/* Brand */}
      <div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 400, letterSpacing: '-0.02em' }}>
          <span style={{ color: block.accent }}>Next</span> <span style={{ opacity: 0.3 }}>·</span> Level
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.15, marginTop: 4 }}>
          Hub<br />de la <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic' }}>clase</em>.
        </div>
        <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--hub-whisper)', marginTop: 8, textTransform: 'uppercase' }}>
          3 bloques · 3 expertos · 17 módulos
        </div>
      </div>

      {/* Mobile toggle */}
      <button className="hub-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? '✕ Cerrar' : '☰ Navegar módulos'}
      </button>

      <div style={{ display: mobileOpen ? 'flex' : undefined, flexDirection: 'column', gap: 24 }}
        className={mobileOpen ? '' : 'hub-sidebar-collapse'}>

        {/* Block switcher */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.24em', color: 'var(--hub-whisper)', marginBottom: 2, textTransform: 'uppercase' }}>
            EXPERTOS
          </div>
          {blocks.map(b => {
            const isCurrent = b.id === block.id
            const pct = blockProgressFor(b)
            return (
              <button key={b.id} onClick={() => { onSwitch(b.id); setMobileOpen(false) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10,
                  background: isCurrent ? 'var(--hub-midnight)' : 'transparent',
                  color: isCurrent ? 'var(--hub-paper)' : 'var(--hub-midnight)',
                  border: `1px solid ${isCurrent ? 'var(--hub-midnight)' : 'var(--hub-hairline)'}`,
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.18s', fontFamily: 'var(--sans)',
                }}>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%', background: b.accent, color: '#fff',
                  display: 'grid', placeItems: 'center', fontFamily: 'var(--mono-font)',
                  fontSize: 10, fontWeight: 600, flexShrink: 0,
                }}>{b.num}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {b.expert.split(' ')[0]}
                  </div>
                  <div style={{ fontSize: 10, opacity: 0.65, letterSpacing: '0.04em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {b.topic}
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.12em', opacity: 0.6 }}>
                  {pct}%
                </div>
              </button>
            )
          })}
        </div>

        {/* Progress bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hub-whisper)' }}>
              {block.expert.split(' ')[0]} · Avance
            </span>
            <span style={{ fontFamily: 'var(--mono-font)', fontSize: 10, fontWeight: 700, color: 'var(--hub-midnight)' }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div style={{ height: 3, background: 'var(--hub-shell)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: block.accent, borderRadius: 2, transition: 'width 0.4s ease' }} />
          </div>
        </div>

        {/* Module nav */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {block.modules.map((m, i) => {
            const isCurrent = active === i
            const isDone = done.has(i)
            return (
              <button key={m.key} onClick={() => { onJump(i); setMobileOpen(false) }}
                className={`hub-nav-item ${isCurrent ? 'active' : ''}`}>
                <span style={{
                  width: 24, height: 24, borderRadius: '50%',
                  display: 'grid', placeItems: 'center',
                  fontSize: 10, fontWeight: 600, fontFamily: 'var(--mono-font)',
                  background: isCurrent || isDone ? block.accent : 'transparent',
                  color: isCurrent || isDone ? '#fff' : 'var(--hub-whisper)',
                  border: isCurrent || isDone ? 'none' : '1px solid var(--hub-hairline)',
                  transition: 'all 0.18s', flexShrink: 0,
                }}>
                  {isDone ? '✓' : String(i + 1).padStart(2, '0')}
                </span>
                <span>{m.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 'auto', fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.14em', color: 'var(--hub-whisper)', lineHeight: 1.6, textTransform: 'uppercase' }}>
        Imagen · Comunicación · IA<br />
        Hub de apoyo · 15 días
      </div>
    </aside>
  )
}

// ---- Next bar ----
function NextBar({ active, block, onNext, onPrev }: {
  active: number; block: Block; onNext: () => void; onPrev: () => void
}) {
  const last = active === block.modules.length - 1
  return (
    <div className="hub-next-bar">
      {active > 0 ? (
        <button className="hub-btn hub-btn-ghost" onClick={onPrev}>
          <span className="hub-arrow" style={{ transform: 'rotate(180deg)' }}>→</span>
          Anterior
        </button>
      ) : <div />}
      <button className="hub-btn hub-btn-primary" onClick={onNext}
        style={last ? { background: block.accent, color: '#fff' } : undefined}>
        {last ? 'Ir al siguiente bloque' : 'Siguiente módulo'}
        <span className="hub-arrow">→</span>
      </button>
    </div>
  )
}

// ---- Main Hub Component ----
export default function HubClient() {
  const [blockId, setBlockId] = useState('ia')
  const [active, setActive] = useState(0)
  const [done, setDone] = useState<Record<string, Set<number>>>({
    ia: new Set(), imagen: new Set(), com: new Set(),
  })
  const [data, setData] = useState<HubData>(INITIAL_DATA)
  const [mobileOpen, setMobileOpen] = useState(false)

  const setField = useCallback((k: string, v: unknown) => {
    setData(d => ({ ...d, [k]: typeof v === 'function' ? (v as (prev: unknown) => unknown)(d[k as keyof HubData]) : v }))
  }, [])

  const block = BLOCKS.find(b => b.id === blockId)!
  const M = block.modules[active]
  const ModuleComponent = MODULE_MAP[M.key]

  const markDone = useCallback((i: number) => {
    setDone(d => {
      const next = { ...d, [blockId]: new Set(d[blockId]) }
      next[blockId].add(i)
      return next
    })
  }, [blockId])

  const goTo = useCallback((i: number) => {
    if (active >= 0) markDone(active)
    setActive(i)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [active, markDone])

  const switchBlock = useCallback((id: string) => {
    if (id === blockId) return
    markDone(active)
    setBlockId(id)
    setActive(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [blockId, active, markDone])

  const next = useCallback(() => {
    const total = block.modules.length
    if (active < total - 1) {
      goTo(active + 1)
    } else {
      const idx = BLOCKS.findIndex(b => b.id === blockId)
      if (idx < BLOCKS.length - 1) {
        markDone(active)
        switchBlock(BLOCKS[idx + 1].id)
      }
    }
  }, [active, block.modules.length, blockId, goTo, markDone, switchBlock])

  const prev = useCallback(() => {
    goTo(Math.max(0, active - 1))
  }, [active, goTo])

  const blockProgress = Math.round(100 * done[blockId].size / Math.max(1, block.modules.length - 1))
  const blockProgressFor = useCallback((b: Block) => {
    return Math.round(100 * done[b.id].size / Math.max(1, b.modules.length - 1))
  }, [done])

  return (
    <div className="hub-root">
      <div className="hub-layout">
        <Sidebar
          block={block} blocks={BLOCKS}
          active={active} done={done[blockId]}
          progress={blockProgress}
          onJump={goTo} onSwitch={switchBlock}
          blockProgressFor={blockProgressFor}
          mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}
        />

        <main className="hub-main">
          <div className="hub-module" key={`${blockId}-${active}`}>
            {/* Module header */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
              <div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: 'var(--hub-whisper)', marginBottom: 8,
                }}>
                  <span style={{ display: 'inline-block', width: 24, height: 1, background: block.accent }} />
                  Bloque {block.num} · {block.expert} · {M.eyebrow}
                </div>
                <h1 style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.15, margin: 0 }}>
                  {renderTitle(M.title)}
                </h1>
              </div>
              <div className="hub-pill">
                Paso {active + 1} de {block.modules.length}
              </div>
            </header>

            {/* Module content */}
            {ModuleComponent && (
              <ModuleComponent
                data={data}
                setField={setField}
                onComplete={() => markDone(active)}
                goTo={goTo}
              />
            )}

            <NextBar active={active} block={block} onNext={next} onPrev={prev} />
          </div>
        </main>
      </div>

      {/* Mobile sidebar collapse styles */}
      <style>{`
        @media (min-width: 981px) {
          .hub-sidebar-collapse { display: flex !important; flex-direction: column; gap: 24px; }
        }
        @media (max-width: 980px) {
          .hub-sidebar-collapse { display: none !important; }
        }
      `}</style>
    </div>
  )
}
