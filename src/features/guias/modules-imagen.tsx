'use client'

import { useState, useMemo, useEffect } from 'react'

// ---- Types ----
interface ModuleProps {
  data: Record<string, any>
  setField: (key: string, value: any) => void
  goTo?: (index: number) => void
}

// ---- SVG Garments ----
function GarmentBlazer({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 160" width="100%" height="100%">
      <path d="M30 30 L20 50 L20 150 L50 150 L50 60 L60 70 L70 60 L70 150 L100 150 L100 50 L90 30 L70 25 L60 40 L50 25 Z" fill={color} stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
      <path d="M60 40 L60 150" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5"/>
      <circle cx="55" cy="80" r="1.2" fill="rgba(0,0,0,0.3)"/>
      <circle cx="55" cy="100" r="1.2" fill="rgba(0,0,0,0.3)"/>
    </svg>
  )
}
function GarmentShirt({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 160" width="100%" height="100%">
      <path d="M35 35 L25 55 L25 150 L95 150 L95 55 L85 35 L70 30 L60 45 L50 30 Z" fill={color} stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
      <path d="M50 30 L60 50 L70 30" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="0.7"/>
    </svg>
  )
}
function GarmentPants({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 160" width="100%" height="100%">
      <path d="M30 10 L90 10 L92 50 L78 150 L62 150 L60 70 L58 150 L42 150 L28 50 Z" fill={color} stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
    </svg>
  )
}
function GarmentShoes({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 160 80" width="100%" height="100%">
      <ellipse cx="40" cy="55" rx="34" ry="14" fill={color} stroke="rgba(0,0,0,0.2)" strokeWidth="1"/>
      <ellipse cx="120" cy="55" rx="34" ry="14" fill={color} stroke="rgba(0,0,0,0.2)" strokeWidth="1"/>
      <path d="M14 50 Q20 30 50 32 Q70 35 74 55" fill={color} stroke="rgba(0,0,0,0.2)" strokeWidth="1"/>
      <path d="M94 50 Q100 30 130 32 Q150 35 154 55" fill={color} stroke="rgba(0,0,0,0.2)" strokeWidth="1"/>
    </svg>
  )
}

// ---- Data constants ----
const MYTHS = [
  { id: 'm1', myth: "La imagen no importa, lo que importa es lo que sé hacer.", reality: "Tu imagen refuerza tu mensaje y tu credibilidad. Antes de demostrar lo que sabes, ya están leyendo cómo te ves." },
  { id: 'm2', myth: "Para verme profesional debo gastar mucho dinero.", reality: "No se trata de marcas caras, sino de estrategia. Tres prendas combinables bien elegidas pesan más que diez impulsivas." },
  { id: 'm3', myth: "Si me visto demasiado formal, perderé autenticidad.", reality: "La clave es adaptar la imagen sin perder tu esencia. Vestir con intención es expresar quién eres, no esconderlo." },
]

const DRESS_CODES = [
  { id: 'formal', name: 'Profesional / Formal', tag: 'Autoridad', color: 'var(--hub-midnight)', mood: ['Bodas','Galas','Ópera','Eventos corporativos','Año nuevo'], proyecta: ['Autoridad','Alto nivel','Formalidad','Éxito'] },
  { id: 'business', name: 'Business Casual', tag: 'Confianza', color: 'var(--hub-magenta)', mood: ['Reuniones','Conferencias','Entrevistas','Networking'], proyecta: ['Confianza','Trabajador','Confortable','Apertura'] },
  { id: 'casual', name: 'Casual', tag: 'Cercanía', color: 'var(--hub-gold)', mood: ['Amigos','Shopping','Clases','Salida informal'], proyecta: ['Amigable','Creativo','Informal','Relajado'] },
]

const SITUATIONS = [
  { id: 's1', text: 'Entrevista de trabajo en una consultora', answer: 'business' },
  { id: 's2', text: 'Boda formal de un compañero', answer: 'formal' },
  { id: 's3', text: 'Ir de compras un sábado', answer: 'casual' },
  { id: 's4', text: 'Cena de negocios con un cliente nuevo', answer: 'business' },
  { id: 's5', text: 'Gala anual de la empresa', answer: 'formal' },
  { id: 's6', text: 'Clase de cocina con amigos', answer: 'casual' },
]

const FITTING_PARTS = [
  { key: 'blazer', label: 'Blazer', options: [
    { id: 'midnight', name: 'Azul marino', color: '#1c2b4a' },
    { id: 'black', name: 'Negro', color: '#15151a' },
    { id: 'camel', name: 'Camel', color: '#b08d4a' },
    { id: 'grey', name: 'Gris', color: '#9a9690' },
    { id: 'burgundy', name: 'Borgoña', color: '#6c1d2b' },
    { id: 'cream', name: 'Crema', color: '#ece4d3' },
  ]},
  { key: 'shirt', label: 'Camisa', options: [
    { id: 'white', name: 'Blanco', color: '#fafaf6' },
    { id: 'cream', name: 'Crema', color: '#ece4d3' },
    { id: 'skyblue', name: 'Celeste', color: '#9bb8d6' },
    { id: 'lightgrey', name: 'Gris claro', color: '#cfccc4' },
    { id: 'pink', name: 'Rosado', color: '#e9a7c1' },
  ]},
  { key: 'pants', label: 'Pantalón', options: [
    { id: 'midnight', name: 'Marino', color: '#1c2b4a' },
    { id: 'black', name: 'Negro', color: '#15151a' },
    { id: 'grey', name: 'Gris', color: '#9a9690' },
    { id: 'beige', name: 'Beige', color: '#d8c8a8' },
    { id: 'camel', name: 'Camel', color: '#b08d4a' },
  ]},
  { key: 'shoes', label: 'Zapato', options: [
    { id: 'black', name: 'Negro', color: '#15151a' },
    { id: 'midnight', name: 'Marino', color: '#1c2b4a' },
    { id: 'camel', name: 'Camel', color: '#b08d4a' },
    { id: 'burgundy', name: 'Borgoña', color: '#6c1d2b' },
    { id: 'white', name: 'Blanco', color: '#fafaf6' },
  ]},
]

const OCCASIONS = [
  { id: 'meeting', label: 'Reunión importante', icon: '⌗',
    blazerOk: ['midnight','black','grey'], shirtOk: ['white','skyblue','lightgrey'], pantsOk: ['midnight','black','grey'], shoesOk: ['black','midnight','burgundy'] },
  { id: 'casual', label: 'Día laboral flexible', icon: '◇',
    blazerOk: ['camel','grey','cream'], shirtOk: ['white','cream','pink','skyblue'], pantsOk: ['beige','grey','camel'], shoesOk: ['camel','black','burgundy'] },
  { id: 'event', label: 'Evento o presentación', icon: '✦',
    blazerOk: ['burgundy','black','midnight'], shirtOk: ['white','cream'], pantsOk: ['black','midnight'], shoesOk: ['black','burgundy'] },
]

const STYLE_QUIZ = [
  { id: 'q1', q: 'Tu prenda favorita es...', opts: [
    { label: 'Una camisa blanca impecable', v: 'classic' },
    { label: 'Un vestido fluido o blusa con vuelo', v: 'romantic' },
    { label: 'Un blazer estructurado', v: 'dramatic' },
  ]},
  { id: 'q2', q: 'Eliges accesorios que sean...', opts: [
    { label: 'Discretos y atemporales', v: 'classic' },
    { label: 'Suaves y delicados (perlas, pañuelos)', v: 'romantic' },
    { label: 'Geométricos y de impacto', v: 'dramatic' },
  ]},
  { id: 'q3', q: 'Te sientes mejor con líneas...', opts: [
    { label: 'Limpias y simétricas', v: 'classic' },
    { label: 'Curvas y suaves', v: 'romantic' },
    { label: 'Marcadas y angulares', v: 'dramatic' },
  ]},
  { id: 'q4', q: 'En una reunión importante quieres transmitir...', opts: [
    { label: 'Profesionalismo', v: 'classic' },
    { label: 'Cercanía', v: 'romantic' },
    { label: 'Autoridad', v: 'dramatic' },
  ]},
]

const STYLES: Record<string, { label: string; tag: string; emoji: string; desc: string; palette: string[] }> = {
  classic: { label: 'Clásico', tag: 'PROFESIONALISMO', emoji: '◯', desc: 'Líneas limpias, paleta neutra, prendas atemporales. Tu imagen comunica orden y confiabilidad.', palette: ['#1c2b4a','#fafaf6','#9a9690','#15151a'] },
  romantic: { label: 'Romántico', tag: 'CERCANÍA', emoji: '◌', desc: 'Texturas suaves, telas fluidas, paleta cálida. Tu imagen invita a la conversación.', palette: ['#e9a7c1','#ece4d3','#d8c8a8','#9bb8d6'] },
  dramatic: { label: 'Dramático', tag: 'AUTORIDAD', emoji: '◆', desc: 'Estructura marcada, contrastes fuertes, paleta profunda. Tu imagen entra primero en la sala.', palette: ['#15151a','#6c1d2b','#fafaf6','#1c2b4a'] },
}

const SEASON_QUIZ = [
  { id: 'q1', q: 'Tu tono de piel se acerca más a...', opts: [{ label: 'Rosado o porcelana', v: 'cool' }, { label: 'Dorado o melocotón', v: 'warm' }] },
  { id: 'q2', q: 'Las venas de tu muñeca se ven...', opts: [{ label: 'Azules / violetas', v: 'cool' }, { label: 'Verdosas', v: 'warm' }] },
  { id: 'q3', q: 'El contraste entre tu piel, ojos y pelo es...', opts: [{ label: 'Alto y marcado', v: 'deep' }, { label: 'Suave y armónico', v: 'light' }] },
  { id: 'q4', q: 'Te ves mejor con joyería de...', opts: [{ label: 'Plata', v: 'cool' }, { label: 'Oro', v: 'warm' }] },
]

const SEASONS: Record<string, { label: string; tag: string; desc: string; palette: string[]; avoid: string[] }> = {
  spring: { label: 'Primavera', tag: 'CÁLIDA · CLARA · BRILLANTE', desc: 'Tu colorido es luminoso y vibrante. Los tonos cálidos y limpios te encienden.', palette: ['#f3c560','#f08259','#90c5a3','#f5a3c0','#fce4d4','#62a9d8'], avoid: ['Negro absoluto','Grises fríos opacos'] },
  summer: { label: 'Verano', tag: 'FRÍA · CLARA · SUAVE', desc: 'Tu colorido es sereno y desaturado. Los tonos fríos y suaves armonizan contigo.', palette: ['#a3b9d8','#c8b8d4','#e5b9c5','#b8d3c2','#d8d8d8','#5d6d8e'], avoid: ['Naranjas saturados','Marrones cálidos profundos'] },
  autumn: { label: 'Otoño', tag: 'CÁLIDA · PROFUNDA · OPACA', desc: 'Tu colorido es terroso y especiado. Los tonos cálidos profundos te dan presencia.', palette: ['#9a5a3b','#b08d4a','#5e6b3b','#8c2c1f','#cf9f4f','#3a4a2c'], avoid: ['Pasteles fríos','Negro plano'] },
  winter: { label: 'Invierno', tag: 'FRÍA · PROFUNDA · BRILLANTE', desc: 'Tu colorido es contrastado y nítido. Los tonos fríos y saturados te potencian.', palette: ['#0a0820','#fafaf6','#c0392b','#3b6fb0','#5e3b78','#f3259a'], avoid: ['Beiges cálidos','Marrones apagados'] },
}

const SKIN_TONES = [
  { label: 'I', base: '#f5dcc3', hi: '#fbeadc', sh: '#d9b08e' },
  { label: 'II', base: '#ebc8a1', hi: '#f4d9b9', sh: '#c79972' },
  { label: 'III', base: '#d4a373', hi: '#e2b88a', sh: '#a87a4d' },
  { label: 'IV', base: '#b07d4f', hi: '#c4946a', sh: '#7e5430' },
  { label: 'V', base: '#8b5a35', hi: '#a07142', sh: '#5e3a1f' },
  { label: 'VI', base: '#5e3a20', hi: '#774d2e', sh: '#3a2110' },
  { label: 'VII', base: '#3d2410', hi: '#54341c', sh: '#1f1208' },
]

function deriveSeason(answers: Record<string, string>) {
  const tone = [answers.q1, answers.q2, answers.q4].filter(Boolean)
  const warmCount = tone.filter(t => t === 'warm').length
  const isWarm = warmCount >= 2
  const isDeep = answers.q3 === 'deep'
  if (isWarm && !isDeep) return 'spring'
  if (isWarm && isDeep) return 'autumn'
  if (!isWarm && !isDeep) return 'summer'
  return 'winter'
}

const COLOR_PSYCH = [
  { id: 'white', name: 'Blanco', hex: '#fafaf6', text: '#0a0820', proyecta: 'Pureza · Minimalismo · Calma', notes: 'Asociado con la pureza y la limpieza. Transmite paz, tranquilidad y sencillez.' },
  { id: 'black', name: 'Negro', hex: '#15151a', text: '#fafaf6', proyecta: 'Poder · Elegancia · Autoridad', notes: 'Color neutro por naturaleza, nunca pasa de moda. Habla de experiencia y sofisticación.' },
  { id: 'blue', name: 'Azul', hex: '#3b6fb0', text: '#fafaf6', proyecta: 'Confianza · Tranquilidad · Seguridad', notes: 'Evoca calma y serenidad. Color clave en entornos profesionales.' },
  { id: 'purple', name: 'Morado', hex: '#5e3b78', text: '#fafaf6', proyecta: 'Creatividad · Dinamismo · Misterio', notes: 'Estimula la creatividad y la imaginación.' },
  { id: 'red', name: 'Rojo', hex: '#c0392b', text: '#fafaf6', proyecta: 'Poder · Decisión · Valentía', notes: 'Color poderoso, apasionado, urgente. Llama la atención.' },
  { id: 'pink', name: 'Rosado', hex: '#e9a7c1', text: '#0a0820', proyecta: 'Feminidad · Dulzura · Delicadeza', notes: 'Ligado a lo femenino, al amor y la ternura. Calmante.' },
  { id: 'yellow', name: 'Amarillo', hex: '#e6c845', text: '#0a0820', proyecta: 'Alegría · Optimismo · Vitalidad', notes: 'Simboliza la esperanza, la felicidad y el buen ánimo.' },
  { id: 'green', name: 'Verde', hex: '#5a7a4f', text: '#fafaf6', proyecta: 'Frescura · Equilibrio · Vitalidad', notes: 'Asociado a la naturaleza, la tranquilidad y el equilibrio.' },
]

const COMBINE_RECIPES = [
  { ids: ['black','white'], message: 'SOFISTICACIÓN', desc: 'El contraste clásico. Ningún ruido, todo intención.', tone: '#0a0820' },
  { ids: ['black','red'], message: 'AUTORIDAD EXTREMA', desc: 'Poder sin disculpas. Pide la palabra al entrar.', tone: '#c0392b' },
  { ids: ['purple','yellow'], message: 'CREATIVIDAD', desc: 'La combinación que invita a romper moldes.', tone: '#5e3b78' },
  { ids: ['blue','white'], message: 'CONFIANZA', desc: 'La fórmula de los líderes que escuchan.', tone: '#3b6fb0' },
  { ids: ['green','white'], message: 'SEGURIDAD', desc: 'Estabilidad y claridad. Generas calma alrededor.', tone: '#5a7a4f' },
  { ids: ['black','pink'], message: 'PRESENCIA SUAVE', desc: 'Autoridad con cercanía. Una mezcla poco obvia.', tone: '#e9a7c1' },
  { ids: ['blue','black'], message: 'PROFESIONALISMO', desc: 'Seriedad sin frialdad extrema. Reuniones decisivas.', tone: '#1c2b4a' },
  { ids: ['red','white'], message: 'ENERGÍA', desc: 'Visible y directa. Para captar la atención.', tone: '#c0392b' },
  { ids: ['green','yellow'], message: 'FRESCURA', desc: 'Optimismo natural. Para presentaciones cercanas.', tone: '#5a7a4f' },
]

const CAPSULE_ITEMS = [
  { id: 'blazer', name: 'Blazer estructurado', group: 'Estructura', icon: '▮' },
  { id: 'pants', name: 'Pantalón de vestir recto', group: 'Estructura', icon: '║' },
  { id: 'dress', name: 'Vestido o traje', group: 'Estructura', icon: '▯' },
  { id: 'shirt', name: 'Camisa clara', group: 'Base', icon: '◰' },
  { id: 'blouse', name: 'Blusa o camisa neutra', group: 'Base', icon: '◳' },
  { id: 'sweater', name: 'Tejido fino o sweater pulido', group: 'Base', icon: '◱' },
  { id: 'shoesFormal', name: 'Zapato cerrado o formal', group: 'Cierre', icon: '◣' },
  { id: 'shoesAlt', name: 'Zapato alternativo', group: 'Cierre', icon: '◢' },
  { id: 'accent', name: 'Accesorio protagonista', group: 'Cierre', icon: '✦' },
]

// ============================================================
// MODULE 0 · INTRO
// ============================================================
export function ModuleIntro({ data, setField }: ModuleProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'start' }}>
      <div>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 24, lineHeight: 1.4, fontStyle: 'italic', color: 'var(--hub-midnight)', marginBottom: 32, maxWidth: 520 }}>
          Antes de hablar, tu presencia ya está comunicando algo sobre tu rol, tu seguridad y tu nivel profesional.
        </p>
        <div style={{ marginBottom: 28 }}>
          <label style={{ display: 'block', fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--hub-whisper)', marginBottom: 10 }}>
            Comencemos · ¿Cómo te llamas?
          </label>
          <input
            value={data.name || ''}
            onChange={e => setField('name', e.target.value)}
            placeholder="Tu nombre"
            style={{ width: '100%', maxWidth: 380, padding: '14px 18px', borderRadius: 10, border: '1px solid var(--hub-hairline)', background: 'var(--hub-paper)', fontSize: 16, fontWeight: 500, outline: 'none', fontFamily: 'var(--sans)' }}
          />
        </div>
        <p style={{ fontSize: 15, color: 'var(--hub-smoke)', lineHeight: 1.6, maxWidth: 520, marginBottom: 24 }}>
          A lo largo de esta clase vas a explorar tu propia imagen profesional con herramientas interactivas. Probarás looks, descubrirás tu estación de color y armarás tu ficha personal Next Level. <strong style={{ color: 'var(--hub-midnight)' }}>Nada que aprendas se queda solo en teoría: lo aplicas aquí mismo.</strong>
        </p>
        <div className="hub-ornament" style={{ marginTop: 36 }}>Tres expertos · Tres miradas</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: 20 }}>
          <ExpertCard color="var(--hub-electric)" num="01" name="Yoselvia Adam" topic="IA Aplicada · Claude" />
          <ExpertCard color="var(--hub-magenta)" num="02" name="Valentina Silva" topic="Imagen · Color · Presencia" active />
          <ExpertCard color="var(--hub-gold)" num="03" name="Sebastián Villar" topic="Comunicación y Ventas" />
        </div>
      </div>
      <div style={{ position: 'relative', aspectRatio: '3/4', background: 'var(--hub-magenta)', borderRadius: 18, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 32, color: 'var(--hub-paper)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(243,37,154,0.3) 0%, rgba(10,8,32,0.7) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', marginBottom: 18 }}>· Hub de la clase</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 48, lineHeight: 0.92, fontWeight: 500, letterSpacing: '-0.02em' }}>
            NEXT<br /><em style={{ fontStyle: 'italic' }}>LEVEL</em>
          </div>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 13, marginBottom: 6, color: 'rgba(255,255,255,0.85)' }}>Bloque de imagen · con</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 30, fontWeight: 500, letterSpacing: '-0.01em' }}>Valentina Silva</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.04em' }}>Asesora de Imagen &amp; Color</div>
        </div>
      </div>
    </div>
  )
}

function ExpertCard({ color, num, name, topic, active }: { color: string; num: string; name: string; topic: string; active?: boolean }) {
  return (
    <div className="hub-card" style={{ padding: 18, background: active ? 'var(--hub-midnight)' : 'var(--hub-paper)', color: active ? 'var(--hub-paper)' : 'var(--hub-midnight)', border: active ? 'none' : undefined, borderRadius: 12, position: 'relative', overflow: 'hidden' }}>
      <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.2em', color }}>{`BLOQUE ${num}`}</div>
      <div style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 500, marginTop: 10, letterSpacing: '-0.01em', lineHeight: 1.1 }}>{name}</div>
      <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4, letterSpacing: '0.01em' }}>{topic}</div>
      <div style={{ position: 'absolute', right: -10, bottom: -10, width: 44, height: 44, borderRadius: '50%', background: color, opacity: active ? 1 : 0.85 }} />
    </div>
  )
}

// ============================================================
// MODULE 1 · MITOS VS REALIDAD
// ============================================================
export function ModuleMyths({ data, setField }: ModuleProps) {
  const flipped = data.myths || {}
  const flip = (id: string) => setField('myths', (m: Record<string, boolean>) => ({ ...m, [id]: !m[id] }))
  const allFlipped = MYTHS.every(m => flipped[m.id])

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>Toca cada tarjeta para descubrir la realidad detrás del mito.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 18, marginTop: 32 }}>
        {MYTHS.map((m, i) => (
          <div key={m.id} className={`hub-flip-card ${flipped[m.id] ? 'flipped' : ''}`} onClick={() => flip(m.id)}>
            <div className="hub-flip-inner">
              <div className="hub-flip-front">
                <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-whisper)' }}>{`MITO 0${i + 1}`}</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 24, lineHeight: 1.2, fontStyle: 'italic', marginTop: 14 }}>&ldquo;{m.myth}&rdquo;</div>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--hub-magenta)', fontSize: 12, fontWeight: 600 }}>
                  <span>Tocar para revelar</span><span>↻</span>
                </div>
              </div>
              <div className="hub-flip-back">
                <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-magenta)' }}>REALIDAD</div>
                <div style={{ fontSize: 16, lineHeight: 1.5, marginTop: 14 }}>{m.reality}</div>
                <div style={{ marginTop: 'auto', fontSize: 11, opacity: 0.6 }}>↻ Voltear de nuevo</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {allFlipped && (
        <div style={{ marginTop: 32, padding: '20px 24px', background: 'var(--hub-magenta-soft)', borderRadius: 12, borderLeft: '3px solid var(--hub-magenta)', display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ fontSize: 24 }}>✦</div>
          <div>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-magenta-deep)', marginBottom: 4 }}>RECUERDA</div>
            <div style={{ fontSize: 15, lineHeight: 1.5 }}>La imagen correcta puede abrir puertas <em style={{ color: 'var(--hub-magenta-deep)' }}>antes</em> de que digas una sola palabra.</div>
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================
// MODULE 2 · HALO & HORN
// ============================================================
export function ModuleHalo({ data, setField }: ModuleProps) {
  const [seconds, setSeconds] = useState(7)

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>
        Mueve el reloj. Observa cómo cambia la percepción según los <em>7 segundos</em> iniciales y los <em>4 minutos</em> siguientes.
      </p>
      <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 36, alignItems: 'start' }}>
        <div className="hub-card" style={{ padding: 36 }}>
          <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-whisper)', marginBottom: 6 }}>TIEMPO TRANSCURRIDO</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 24 }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 84, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1 }}>{seconds}</div>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 14, color: 'var(--hub-smoke)' }}>
              {seconds === 1 ? 'segundo' : seconds < 60 ? 'segundos' : Math.floor(seconds / 60) === 1 ? 'minuto' : 'minutos'}
            </div>
          </div>
          <input type="range" min="3" max="240" value={seconds} onChange={e => setSeconds(+e.target.value)} className="hub-slider" />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono-font)', fontSize: 10, color: 'var(--hub-whisper)', marginTop: 8, letterSpacing: '0.16em' }}>
            <span>3s · INSTANTÁNEO</span>
            <span>4 MIN · CONSOLIDADO</span>
          </div>
          <div style={{ marginTop: 32, padding: 20, background: 'var(--hub-bone)', borderRadius: 10, border: '1px solid var(--hub-hairline)' }}>
            <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--hub-smoke)' }}>
              {seconds <= 7 && "En los primeros 7 segundos formamos una idea de quién es la otra persona. La zona superior del cuerpo concentra la mirada."}
              {seconds > 7 && seconds <= 60 && "Estamos consolidando atributos: confianza, autoconfianza, profesionalismo, capacidad de liderazgo."}
              {seconds > 60 && "Hasta los 4 minutos seguimos atribuyendo destrezas o juicios basados en esa primera lectura visual."}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <EffectCard label="EFECTO HALO" tag="Atribuciones positivas" isPositive attributes={["Confiable", "Profesional", "Líder", "Seguro de sí mismo", "Capaz"]} />
          <EffectCard label="EFECTO HORN" tag="Atribuciones negativas" isPositive={false} attributes={["Descuidado", "Poco preparado", "Inseguro", "Improvisado", "Riesgoso"]} />
        </div>
      </div>
    </div>
  )
}

function EffectCard({ label, tag, isPositive, attributes }: { label: string; tag: string; isPositive: boolean; attributes: string[] }) {
  return (
    <div className="hub-card" style={{ padding: 22, borderLeft: `3px solid ${isPositive ? 'var(--hub-magenta)' : 'var(--hub-midnight)'}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
        <div style={{ fontFamily: 'var(--mono-font)', fontSize: 11, letterSpacing: '0.24em', fontWeight: 600, color: isPositive ? 'var(--hub-magenta)' : 'var(--hub-midnight)' }}>{label}</div>
        <div style={{ fontSize: 10, fontFamily: 'var(--mono-font)', color: 'var(--hub-whisper)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>{tag}</div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {attributes.map(a => (
          <span key={a} style={{ padding: '5px 10px', borderRadius: 999, background: isPositive ? 'var(--hub-magenta-soft)' : 'var(--hub-shell)', color: isPositive ? 'var(--hub-magenta-deep)' : 'var(--hub-midnight)', fontSize: 11, fontWeight: 500 }}>{a}</span>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// MODULE 3 · DRESS CODE
// ============================================================
export function ModuleDressCode({ data, setField }: ModuleProps) {
  const matches = data.dressMatches || {}
  const setMatch = (sid: string, cid: string) => setField('dressMatches', (m: Record<string, string>) => ({ ...m, [sid]: cid }))
  const correct = SITUATIONS.filter(s => matches[s.id] === s.answer).length
  const answered = SITUATIONS.filter(s => matches[s.id]).length

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>Cada ocasión pide un código distinto. Asigna el dress code correcto a cada situación.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: 32 }}>
        {DRESS_CODES.map(c => (
          <div key={c.id} className="hub-card" style={{ padding: 22, borderTop: `3px solid ${c.color}`, borderRadius: 12 }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.24em', color: c.color, fontWeight: 600 }}>{c.tag.toUpperCase()}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em', marginTop: 6, marginBottom: 14, lineHeight: 1.1 }}>{c.name}</div>
            <div style={{ fontSize: 11, fontFamily: 'var(--mono-font)', color: 'var(--hub-whisper)', letterSpacing: '0.16em', marginBottom: 6 }}>PROYECTA</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
              {c.proyecta.map(p => <span key={p} style={{ fontSize: 11, padding: '3px 8px', background: 'var(--hub-shell)', borderRadius: 999 }}>{p}</span>)}
            </div>
            <div style={{ fontSize: 12, color: 'var(--hub-smoke)', lineHeight: 1.5 }}>
              <strong>Ocasiones:</strong> {c.mood.join(' · ')}
            </div>
          </div>
        ))}
      </div>
      <div className="hub-ornament" style={{ marginTop: 48, marginBottom: 20 }}>Ahora practica</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
        {SITUATIONS.map(s => {
          const sel = matches[s.id]
          const isRight = sel === s.answer
          return (
            <div key={s.id} className="hub-card" style={{ padding: 18, borderRadius: 12, background: sel ? (isRight ? 'var(--hub-magenta-soft)' : 'var(--hub-shell)') : 'var(--hub-paper)' }}>
              <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.4, marginBottom: 12 }}>{s.text}</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {DRESS_CODES.map(c => (
                  <button key={c.id} onClick={() => setMatch(s.id, c.id)} style={{
                    padding: '7px 12px', borderRadius: 999, fontSize: 11, fontWeight: 600,
                    background: sel === c.id ? c.color : 'transparent', color: sel === c.id ? '#fff' : 'var(--hub-smoke)',
                    border: sel === c.id ? 'none' : '1px solid var(--hub-hairline)', cursor: 'pointer', transition: 'all 0.18s', fontFamily: 'var(--sans)'
                  }}>{c.tag}</button>
                ))}
              </div>
              {sel && (
                <div style={{ marginTop: 10, fontSize: 11, fontFamily: 'var(--mono-font)', letterSpacing: '0.12em', color: isRight ? 'var(--hub-magenta-deep)' : 'var(--hub-smoke)' }}>
                  {isRight ? '✓ CORRECTO' : `→ Ideal: ${DRESS_CODES.find(c => c.id === s.answer)?.tag}`}
                </div>
              )}
            </div>
          )
        })}
      </div>
      {answered > 0 && (
        <div style={{ marginTop: 24, padding: '14px 20px', background: 'var(--hub-paper)', borderRadius: 10, border: '1px solid var(--hub-hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 13, color: 'var(--hub-smoke)' }}>Aciertos</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 500, color: 'var(--hub-magenta)' }}>{correct} <span style={{ color: 'var(--hub-whisper)', fontSize: 16 }}>/ {SITUATIONS.length}</span></div>
        </div>
      )}
    </div>
  )
}

// ============================================================
// MODULE 4 · PROBADOR DE LOOKS
// ============================================================
export function ModuleFitting({ data, setField }: ModuleProps) {
  const [occasion, setOccasion] = useState('meeting')
  const look = data.fitting || { blazer: 'midnight', shirt: 'white', pants: 'midnight', shoes: 'black' }
  const setPart = (key: string, id: string) => setField('fitting', (f: Record<string, string>) => ({ ...f, [key]: id }))

  const occ = OCCASIONS.find(o => o.id === occasion)!
  let score = 0
  if (occ.blazerOk.includes(look.blazer)) score++
  if (occ.shirtOk.includes(look.shirt)) score++
  if (occ.pantsOk.includes(look.pants)) score++
  if (occ.shoesOk.includes(look.shoes)) score++

  const colorOf = (key: string) => FITTING_PARTS.find(p => p.key === key)!.options.find(o => o.id === look[key])!.color

  const verdicts = [
    { min: 0, max: 1, label: 'Mensaje confuso', tone: '#9a9690', desc: 'Las prendas no conversan con la ocasión.' },
    { min: 2, max: 2, label: 'Casi ahí', tone: 'var(--hub-gold)', desc: 'Vas bien, pero un cambio te llevaría al siguiente nivel.' },
    { min: 3, max: 3, label: 'Coherente', tone: 'var(--hub-magenta)', desc: 'Tu look comunica con intención.' },
    { min: 4, max: 4, label: 'Next Level', tone: 'var(--hub-magenta-deep)', desc: 'Autoridad y coherencia. Mensaje claro.' },
  ]
  const v = verdicts.find(x => score >= x.min && score <= x.max)!

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>
        Combina las prendas y observa cómo cambia tu mensaje según la <em>ocasión</em>.
      </p>
      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 32, alignItems: 'flex-start' }}>
        <div className="hub-card" style={{ padding: 24, position: 'sticky', top: 24 }}>
          <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-whisper)', marginBottom: 14 }}>TU LOOK</div>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1.4', background: 'linear-gradient(180deg, var(--hub-bone) 0%, var(--hub-shell) 100%)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '8%', left: '18%', width: '64%', height: '42%' }}><GarmentBlazer color={colorOf('blazer')} /></div>
            <div style={{ position: 'absolute', top: '10%', left: '30%', width: '40%', height: '34%', zIndex: 0 }}><GarmentShirt color={colorOf('shirt')} /></div>
            <div style={{ position: 'absolute', top: '42%', left: '30%', width: '40%', height: '42%' }}><GarmentPants color={colorOf('pants')} /></div>
            <div style={{ position: 'absolute', top: '82%', left: '18%', width: '64%', height: '14%' }}><GarmentShoes color={colorOf('shoes')} /></div>
          </div>
          <div style={{ marginTop: 16, padding: '14px 16px', borderRadius: 10, background: v.tone, color: '#fff' }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.24em', opacity: 0.85 }}>{`VEREDICTO · ${score}/4`}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em', marginTop: 2 }}>{v.label}</div>
            <div style={{ fontSize: 12, opacity: 0.9, marginTop: 4, lineHeight: 1.4 }}>{v.desc}</div>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
            {OCCASIONS.map(o => (
              <button key={o.id} onClick={() => setOccasion(o.id)} style={{
                padding: '10px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                background: occasion === o.id ? 'var(--hub-midnight)' : 'var(--hub-paper)',
                color: occasion === o.id ? 'var(--hub-paper)' : 'var(--hub-midnight)',
                border: `1px solid ${occasion === o.id ? 'var(--hub-midnight)' : 'var(--hub-hairline)'}`,
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--sans)'
              }}>
                <span style={{ color: occasion === o.id ? 'var(--hub-magenta)' : 'var(--hub-smoke)' }}>{o.icon}</span>
                {o.label}
              </button>
            ))}
          </div>
          {FITTING_PARTS.map(part => (
            <div key={part.key} style={{ marginBottom: 18 }}>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--hub-whisper)', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                <span>{part.label.toUpperCase()}</span>
                <span style={{ color: 'var(--hub-midnight)' }}>{part.options.find(o => o.id === look[part.key])?.name}</span>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {part.options.map(o => (
                  <button key={o.id} onClick={() => setPart(part.key, o.id)} title={o.name} style={{
                    width: 36, height: 36, borderRadius: '50%', background: o.color,
                    border: look[part.key] === o.id ? '2px solid var(--hub-magenta)' : '1px solid var(--hub-hairline)',
                    boxShadow: look[part.key] === o.id ? '0 0 0 3px var(--hub-magenta-soft)' : 'none',
                    cursor: 'pointer', padding: 0, transition: 'all 0.18s'
                  }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// MODULE 5 · TU ESTILO
// ============================================================
export function ModuleStyle({ data, setField }: ModuleProps) {
  const ans = data.styleAnswers || {}
  const allAnswered = STYLE_QUIZ.every(q => ans[q.id])

  const result = useMemo(() => {
    if (!allAnswered) return null
    const tally: Record<string, number> = { classic: 0, romantic: 0, dramatic: 0 }
    Object.values(ans).forEach((v: any) => { if (tally[v] !== undefined) tally[v]++ })
    return Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0]
  }, [ans, allAnswered])

  useEffect(() => { if (result && data.style !== result) setField('style', result) }, [result])

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>Cuatro preguntas rápidas. Tu respuesta dominante define tu estilo.</p>
      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
        {STYLE_QUIZ.map((q, i) => (
          <div key={q.id} className="hub-card" style={{ padding: 22, borderRadius: 12 }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-whisper)', marginBottom: 8 }}>{`0${i + 1}`}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500, lineHeight: 1.25, marginBottom: 14 }}>{q.q}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {q.opts.map(opt => {
                const sel = ans[q.id] === opt.v
                return (
                  <button key={opt.label} onClick={() => setField('styleAnswers', (a: Record<string, string>) => ({ ...a, [q.id]: opt.v }))} style={{
                    padding: '10px 14px', borderRadius: 8, textAlign: 'left', fontSize: 13, fontWeight: sel ? 600 : 500,
                    background: sel ? 'var(--hub-midnight)' : 'transparent', color: sel ? 'var(--hub-paper)' : 'var(--hub-midnight)',
                    border: `1px solid ${sel ? 'var(--hub-midnight)' : 'var(--hub-hairline)'}`,
                    cursor: 'pointer', transition: 'all 0.18s', display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--sans)'
                  }}>
                    <span style={{ width: 14, height: 14, borderRadius: '50%', border: `1px solid ${sel ? 'var(--hub-magenta)' : 'var(--hub-hairline)'}`, background: sel ? 'var(--hub-magenta)' : 'transparent', display: 'inline-block', flexShrink: 0 }} />
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      {result && STYLES[result] && (
        <div style={{ marginTop: 32, padding: 32, borderRadius: 14, background: 'var(--hub-midnight)', color: 'var(--hub-paper)', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 32, alignItems: 'center' }}>
          <div style={{ fontSize: 80, lineHeight: 1, color: 'var(--hub-magenta)' }}>{STYLES[result].emoji}</div>
          <div>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.32em', color: 'var(--hub-magenta)', marginBottom: 8 }}>{`TU ESTILO TRANSMITE · ${STYLES[result].tag}`}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 48, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1 }}>Estilo <em style={{ color: 'var(--hub-magenta)', fontStyle: 'italic' }}>{STYLES[result].label}</em></div>
            <div style={{ fontSize: 14, opacity: 0.75, marginTop: 10, lineHeight: 1.5, maxWidth: 520 }}>{STYLES[result].desc}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>PALETA</div>
            {STYLES[result].palette.map((c, i) => (
              <div key={i} style={{ width: 36, height: 36, borderRadius: 8, background: c, border: '1px solid rgba(255,255,255,0.1)' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================
// MODULE 6 · COLORIMETRÍA
// ============================================================
export function ModuleSeason({ data, setField }: ModuleProps) {
  const ans = data.seasonAnswers || {}
  const all = SEASON_QUIZ.every(q => ans[q.id])
  const season = all ? deriveSeason(ans) : null

  useEffect(() => { if (season && data.season !== season) setField('season', season) }, [season])

  const [preview, setPreview] = useState('spring')
  const active = season || preview
  const seasonData = SEASONS[active]
  const skinIdx = data.skinTone ?? 2
  const skin = SKIN_TONES[skinIdx]

  const drapeNotes: Record<string, string> = {
    spring: 'El rostro se enciende — los rasgos ganan luz y juventud.',
    summer: 'La piel se ve serena y descansada — sin esfuerzo, armónica.',
    autumn: 'La piel toma calidez y profundidad — terrosa, sólida.',
    winter: 'Los rasgos ganan nitidez — el contraste resalta las facciones.',
  }

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>
        La colorimetría revela qué tonos realzan tu piel, ojos y cabello. Ajusta el tono, responde el quiz o explora las estaciones.
      </p>
      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 32, alignItems: 'flex-start' }}>
        <div>
          {SEASON_QUIZ.map((q, i) => (
            <div key={q.id} style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--hub-whisper)', marginBottom: 8 }}>{`0${i + 1} · PREGUNTA`}</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500, marginBottom: 10 }}>{q.q}</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {q.opts.map(opt => {
                  const sel = ans[q.id] === opt.v
                  return (
                    <button key={opt.label} onClick={() => setField('seasonAnswers', (a: Record<string, string>) => ({ ...a, [q.id]: opt.v }))} style={{
                      padding: '10px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                      background: sel ? 'var(--hub-magenta)' : 'var(--hub-paper)', color: sel ? '#fff' : 'var(--hub-midnight)',
                      border: `1px solid ${sel ? 'var(--hub-magenta)' : 'var(--hub-hairline)'}`,
                      cursor: 'pointer', transition: 'all 0.18s', fontFamily: 'var(--sans)'
                    }}>{opt.label}</button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="hub-card" style={{ padding: 0, overflow: 'hidden', position: 'sticky', top: 24 }}>
          {!season && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: '1px solid var(--hub-hairline)' }}>
              {Object.entries(SEASONS).map(([k, s]) => (
                <button key={k} onClick={() => setPreview(k)} style={{
                  padding: '10px 8px', fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.18em',
                  background: preview === k ? 'var(--hub-midnight)' : 'transparent',
                  color: preview === k ? 'var(--hub-paper)' : 'var(--hub-smoke)',
                  border: 'none', borderRight: '1px solid var(--hub-hairline)', cursor: 'pointer', transition: 'all 0.18s'
                }}>{s.label.toUpperCase()}</button>
              ))}
            </div>
          )}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', background: `linear-gradient(135deg, ${seasonData.palette[0]} 0%, ${seasonData.palette[1]} 50%, ${seasonData.palette[2]} 100%)`, transition: 'background 0.5s ease', overflow: 'hidden' }}>
            <svg viewBox="0 0 200 220" style={{ position: 'absolute', top: '14%', left: '50%', transform: 'translateX(-50%)', width: '48%', height: 'auto' }}>
              <defs>
                <radialGradient id={`face-${active}-${skinIdx}`} cx="50%" cy="42%" r="62%">
                  <stop offset="0%" stopColor={skin.hi} />
                  <stop offset="60%" stopColor={skin.base} />
                  <stop offset="100%" stopColor={skin.sh} />
                </radialGradient>
              </defs>
              <ellipse cx="100" cy="105" rx="50" ry="64" fill={`url(#face-${active}-${skinIdx})`} />
              <path d="M72 102 Q80 94 88 102" fill="none" stroke="#2a1810" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M112 102 Q120 94 128 102" fill="none" stroke="#2a1810" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M70 86 Q80 81 90 87" stroke={skin.sh} strokeWidth="2.6" fill="none" strokeLinecap="round" />
              <path d="M110 87 Q120 81 130 86" stroke={skin.sh} strokeWidth="2.6" fill="none" strokeLinecap="round" />
              <path d="M100 112 L95 134 Q100 138 105 134" fill="none" stroke={skin.sh} strokeWidth="1.5" strokeLinecap="round" />
              <path d="M76 144 Q100 174 124 144 Q100 158 76 144 Z" fill="#5a1a1a" stroke={skin.sh} strokeWidth="2.4" strokeLinejoin="round" />
              <path d="M82 150 Q100 158 118 150" fill="#fafaf6" stroke="none" />
              <ellipse cx="66" cy="132" rx="9" ry="5" fill="#e9a7c1" opacity="0.65" />
              <ellipse cx="134" cy="132" rx="9" ry="5" fill="#e9a7c1" opacity="0.65" />
            </svg>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', display: 'flex' }}>
              {seasonData.palette.slice(0, 3).map((c, i) => (
                <div key={i} style={{ flex: 1, background: c, clipPath: i === 0 ? 'polygon(0 30%, 100% 0%, 100% 100%, 0 100%)' : i === 1 ? 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)' : 'polygon(0 0%, 100% 30%, 100% 100%, 0 100%)' }} />
              ))}
            </div>
            <div style={{ position: 'absolute', top: 14, left: 14, padding: '4px 10px', borderRadius: 999, background: 'rgba(10,8,32,0.8)', color: 'var(--hub-paper)', fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.18em' }}>
              {`${seasonData.label.toUpperCase()} · ${seasonData.tag}`}
            </div>
          </div>
          <div style={{ padding: '14px 20px', borderTop: '1px solid var(--hub-hairline)', background: 'var(--hub-paper)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--hub-whisper)' }}>TU TONO DE PIEL</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {SKIN_TONES.map((t, i) => (
                  <div key={i} style={{ width: 14, height: 14, borderRadius: 3, background: t.base, border: i === skinIdx ? '2px solid var(--hub-magenta)' : '1px solid var(--hub-hairline)', transition: 'all 0.18s' }} />
                ))}
              </div>
            </div>
            <input type="range" min={0} max={SKIN_TONES.length - 1} step={1} value={skinIdx}
              onChange={e => setField('skinTone', parseInt(e.target.value))}
              className="hub-slider" style={{ accentColor: 'var(--hub-magenta)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.16em', color: 'var(--hub-whisper)', marginTop: 4 }}>
              <span>← MÁS CLARA</span><span>MÁS OSCURA →</span>
            </div>
          </div>
          <div style={{ padding: '18px 20px', borderTop: '1px solid var(--hub-hairline)' }}>
            {!season && (
              <div style={{ fontSize: 13, color: 'var(--hub-smoke)', lineHeight: 1.5, fontStyle: 'italic' }}>
                {drapeNotes[active]}
                <div style={{ marginTop: 8, fontStyle: 'normal', fontSize: 11, color: 'var(--hub-whisper)' }}>Cambia la pestaña para ver cómo cada paleta cambia la lectura del rostro.</div>
              </div>
            )}
            {season && (
              <div>
                <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-magenta)', marginBottom: 6 }}>TU ESTACIÓN</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1 }}>{seasonData.label}</div>
                <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--hub-smoke)', marginTop: 4 }}>{seasonData.tag}</div>
                <div style={{ marginTop: 14, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {seasonData.palette.map((c, i) => (
                    <div key={i} style={{ width: 32, height: 32, borderRadius: 6, background: c, border: '1px solid var(--hub-hairline)' }} />
                  ))}
                </div>
                <div style={{ marginTop: 12, fontSize: 11, color: 'var(--hub-whisper)' }}>
                  <strong style={{ color: 'var(--hub-midnight)' }}>Evita:</strong> {seasonData.avoid.join(' · ')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// MODULE 7 · PSICOLOGÍA DEL COLOR
// ============================================================
export function ModulePsych({ data, setField }: ModuleProps) {
  const [open, setOpen] = useState<string | null>(null)
  const psychSeen = data.psychSeen instanceof Set ? data.psychSeen : new Set(data.psychSeen || [])

  const handleOpen = (id: string) => {
    setOpen(o => o === id ? null : id)
    setField('psychSeen', (s: Set<string> | string[]) => {
      const n = new Set(s instanceof Set ? s : (s || []))
      n.add(id)
      return Array.from(n)
    })
  }

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>Cada color comunica algo antes de que abras la boca. Toca uno para entender qué proyecta.</p>
      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14 }}>
        {COLOR_PSYCH.map(c => (
          <button key={c.id} onClick={() => handleOpen(c.id)} style={{
            position: 'relative', aspectRatio: '1/1.1', borderRadius: 14,
            background: c.hex, color: c.text, cursor: 'pointer', border: '1px solid var(--hub-hairline)',
            padding: 18, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            transform: open === c.id ? 'scale(1.02)' : 'scale(1)',
            boxShadow: open === c.id ? '0 12px 32px rgba(10,8,32,0.18)' : 'none',
            transition: 'all 0.3s cubic-bezier(.2,.7,.2,1)', fontFamily: 'var(--sans)'
          }}>
            <div>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.24em', opacity: 0.7 }}>{c.hex.toUpperCase()}</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 500, letterSpacing: '-0.01em', marginTop: 4 }}>{c.name}</div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', lineHeight: 1.4, opacity: 0.85 }}>{c.proyecta}</div>
            {(Array.isArray(data.psychSeen) ? data.psychSeen : []).includes(c.id) && (
              <div style={{ position: 'absolute', top: 10, right: 10, width: 14, height: 14, borderRadius: '50%', background: 'var(--hub-magenta)' }} />
            )}
          </button>
        ))}
      </div>
      {open && (() => {
        const c = COLOR_PSYCH.find(x => x.id === open)!
        return (
          <div style={{ marginTop: 24, padding: '24px 28px', borderRadius: 12, background: 'var(--hub-paper)', border: '1px solid var(--hub-hairline)', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24, alignItems: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: 12, background: c.hex, border: '1px solid var(--hub-hairline)' }} />
            <div>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-magenta)', marginBottom: 4 }}>PROYECTA</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 500, marginBottom: 8 }}>{c.proyecta}</div>
              <div style={{ fontSize: 14, color: 'var(--hub-smoke)', lineHeight: 1.55 }}>{c.notes}</div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}

// ============================================================
// MODULE 8 · COMBINA Y COMUNICA
// ============================================================
export function ModuleCombine({ data, setField }: ModuleProps) {
  const combine = data.combine || { a: null, b: null }
  const set = (slot: 'a' | 'b', id: string) => setField('combine', (c: any) => ({ ...c, [slot]: id }))
  const recipe = combine.a && combine.b ? COMBINE_RECIPES.find(r => r.ids.includes(combine.a) && r.ids.includes(combine.b)) : null
  const aColor = combine.a ? COLOR_PSYCH.find(c => c.id === combine.a) : null
  const bColor = combine.b ? COLOR_PSYCH.find(c => c.id === combine.b) : null

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>Selecciona dos colores. Tu combinación define el mensaje que proyectas.</p>
      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <ColorSlot label="COLOR PRIMARIO" sub="Base del look" selected={aColor} onPick={id => set('a', id)} />
        <ColorSlot label="COLOR SECUNDARIO" sub="Acento o complemento" selected={bColor} onPick={id => set('b', id)} />
      </div>
      <div style={{ marginTop: 32, padding: 36, borderRadius: 14, background: recipe ? recipe.tone : 'var(--hub-paper)', border: '1px solid var(--hub-hairline)', color: recipe ? '#fff' : 'var(--hub-midnight)', display: 'flex', alignItems: 'center', gap: 32, minHeight: 160, position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 0, flexShrink: 0 }}>
          <div style={{ width: 80, height: 120, borderRadius: '8px 0 0 8px', background: aColor ? aColor.hex : 'var(--hub-shell)', border: '1px solid rgba(255,255,255,0.1)' }} />
          <div style={{ width: 80, height: 120, borderRadius: '0 8px 8px 0', background: bColor ? bColor.hex : 'var(--hub-shell)', border: '1px solid rgba(255,255,255,0.1)' }} />
        </div>
        <div style={{ flex: 1 }}>
          {!recipe && !combine.a && !combine.b && (
            <div>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 11, letterSpacing: '0.24em', color: 'var(--hub-whisper)' }}>SELECCIONA DOS COLORES</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 500, marginTop: 8, letterSpacing: '-0.02em' }}>Esperando tu combinación...</div>
            </div>
          )}
          {combine.a && combine.b && !recipe && (
            <div>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 11, letterSpacing: '0.24em', color: 'var(--hub-whisper)' }}>COMBINACIÓN LIBRE</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 500, marginTop: 8, letterSpacing: '-0.02em' }}>Mezcla personal</div>
            </div>
          )}
          {recipe && (
            <div>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 11, letterSpacing: '0.32em', opacity: 0.8 }}>TU COMBINACIÓN COMUNICA</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 48, fontWeight: 600, marginTop: 6, letterSpacing: '-0.02em', lineHeight: 1 }}>{recipe.message}</div>
              <div style={{ fontSize: 14, opacity: 0.9, marginTop: 10, maxWidth: 480, lineHeight: 1.5 }}>{recipe.desc}</div>
            </div>
          )}
        </div>
      </div>
      <div className="hub-ornament" style={{ marginTop: 36, marginBottom: 14 }}>Fórmulas con significado</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 10 }}>
        {COMBINE_RECIPES.slice(0, 5).map(r => (
          <div key={r.message} className="hub-card" onClick={() => { set('a', r.ids[0]); set('b', r.ids[1]) }} style={{ padding: 14, cursor: 'pointer', borderRadius: 10 }}>
            <div style={{ display: 'flex', gap: 0, marginBottom: 10 }}>
              <div style={{ flex: 1, height: 36, borderRadius: '6px 0 0 6px', background: COLOR_PSYCH.find(c => c.id === r.ids[0])!.hex }} />
              <div style={{ flex: 1, height: 36, borderRadius: '0 6px 6px 0', background: COLOR_PSYCH.find(c => c.id === r.ids[1])!.hex }} />
            </div>
            <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.18em', color: r.tone, fontWeight: 600 }}>{r.message}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ColorSlot({ label, sub, selected, onPick }: { label: string; sub: string; selected: any; onPick: (id: string) => void }) {
  return (
    <div className="hub-card" style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
        <div>
          <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-whisper)' }}>{label}</div>
          <div style={{ fontSize: 12, color: 'var(--hub-smoke)', marginTop: 2 }}>{sub}</div>
        </div>
        {selected && <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontStyle: 'italic' }}>{selected.name}</div>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: 6 }}>
        {COLOR_PSYCH.map(c => (
          <button key={c.id} onClick={() => onPick(c.id)} style={{
            aspectRatio: '1/1', borderRadius: 8, background: c.hex,
            border: selected?.id === c.id ? '2px solid var(--hub-magenta)' : '1px solid var(--hub-hairline)',
            boxShadow: selected?.id === c.id ? '0 0 0 3px var(--hub-magenta-soft)' : 'none',
            cursor: 'pointer', padding: 0, transition: 'all 0.18s'
          }} title={c.name} />
        ))}
      </div>
    </div>
  )
}

// ============================================================
// MODULE 9 · FICHA NEXT LEVEL
// ============================================================
export function ModuleFicha({ data, setField }: ModuleProps) {
  const [copied, setCopied] = useState(false)
  const styleData = data.style ? STYLES[data.style] : null
  const seasonData = data.season ? SEASONS[data.season] : null
  const recipe = data.combine?.a && data.combine?.b ? COMBINE_RECIPES.find(r => r.ids.includes(data.combine.a) && r.ids.includes(data.combine.b)) : null
  const dressScore = SITUATIONS.filter(s => (data.dressMatches || {})[s.id] === s.answer).length

  const summary = [
    `Ficha Next Level — ${data.name || 'Tu nombre'}`,
    `Estilo: ${styleData?.label || 'por descubrir'}`,
    `Estación: ${seasonData?.label || 'por descubrir'}`,
    `Combinación clave: ${recipe?.message || 'por explorar'}`,
    `Dress codes: ${dressScore}/${SITUATIONS.length}`,
    `Acción concreta: ${data.action || '—'}`,
    `\nNext Level · Tu imagen habla antes que tú.`
  ].join('\n')

  const copy = async () => {
    try { await navigator.clipboard.writeText(summary); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch {}
  }

  return (
    <div>
      <p style={{ fontSize: 16, color: 'var(--hub-smoke)', maxWidth: 560, lineHeight: 1.55, marginTop: 14 }}>Esto es lo que has descubierto sobre tu imagen profesional.</p>
      <div style={{ marginTop: 32, padding: 48, borderRadius: 18, background: 'var(--hub-midnight)', color: 'var(--hub-paper)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'var(--hub-magenta)', opacity: 0.18, filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 200, height: 200, borderRadius: '50%', background: 'var(--hub-electric)', opacity: 0.06, filter: 'blur(40px)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36 }}>
            <div>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.32em', color: 'var(--hub-magenta)', marginBottom: 14 }}>· FICHA PERSONAL · NEXT LEVEL</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 64, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 0.95 }}>{data.name || 'Tu nombre'}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
            <FichaCell label="ESTILO PERSONAL" value={styleData?.label || '—'} sub={styleData?.tag} accent={!!styleData} />
            <FichaCell label="ESTACIÓN DE COLOR" value={seasonData?.label || '—'} sub={seasonData?.tag} accent={!!seasonData} />
            <FichaCell label="COMBINACIÓN CLAVE" value={recipe?.message || '—'} sub={recipe?.desc} accent={!!recipe} />
            <FichaCell label="DRESS CODE" value={`${dressScore} de ${SITUATIONS.length}`} sub={dressScore === SITUATIONS.length ? 'Lectura completa' : 'Practicando'} accent={dressScore > 0} />
          </div>
          {seasonData && (
            <div style={{ marginTop: 24 }}>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.24em', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>TU PALETA</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {seasonData.palette.map((c, i) => (
                  <div key={i} style={{ flex: 1, height: 50, borderRadius: 6, background: c }} />
                ))}
              </div>
            </div>
          )}
          <div style={{ marginTop: 32 }}>
            <label style={{ display: 'block', fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.24em', color: 'var(--hub-magenta)', marginBottom: 10 }}>
              ACCIÓN CONCRETA QUE VAS A TOMAR DESDE HOY
            </label>
            <textarea
              value={data.action || ''}
              onChange={e => setField('action', e.target.value)}
              placeholder="Ej: revisar mi armario y separar las prendas que ya no proyectan lo que quiero comunicar..."
              rows={3}
              style={{
                width: '100%', padding: '16px 18px', borderRadius: 10,
                background: 'rgba(255,255,255,0.05)', color: 'var(--hub-paper)',
                border: '1px solid rgba(255,255,255,0.15)', fontSize: 15, fontFamily: 'var(--serif)',
                fontStyle: 'italic', outline: 'none', resize: 'vertical', lineHeight: 1.5
              }}
            />
          </div>
          <div style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
            <div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontStyle: 'italic', lineHeight: 1.4, maxWidth: 420 }}>
                &ldquo;Tu imagen es tu carta de presentación. No se trata de cambiar quién eres, sino de proyectar tu mejor versión.&rdquo;
              </div>
              <div style={{ fontFamily: 'var(--mono-font)', fontSize: 10, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)', marginTop: 10 }}>
                — VALENTINA SILVA · ASESORA DE IMAGEN &amp; COLOR
              </div>
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 0.9, textAlign: 'right' }}>
              NEXT<br /><em style={{ color: 'var(--hub-magenta)', fontStyle: 'italic' }}>LEVEL</em>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button className="hub-btn hub-btn-magenta" onClick={copy}>{copied ? '✓ Copiado' : 'Copiar mi ficha'}</button>
        <button className="hub-btn hub-btn-ghost" onClick={() => window.print()}>Imprimir / Guardar PDF</button>
      </div>
    </div>
  )
}

function FichaCell({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent: boolean }) {
  return (
    <div style={{ padding: '18px 20px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ fontFamily: 'var(--mono-font)', fontSize: 9, letterSpacing: '0.24em', color: accent ? 'var(--hub-magenta)' : 'rgba(255,255,255,0.5)' }}>{label}</div>
      <div style={{ fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 500, letterSpacing: '-0.01em', marginTop: 6 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 4, letterSpacing: '0.02em' }}>{sub}</div>}
    </div>
  )
}

// ---- Export all imagen modules as map ----
export const IMAGEN_MODULES = {
  intro: ModuleIntro,
  myths: ModuleMyths,
  halo: ModuleHalo,
  dressCode: ModuleDressCode,
  fitting: ModuleFitting,
  style: ModuleStyle,
  season: ModuleSeason,
  psych: ModulePsych,
  combine: ModuleCombine,
  ficha: ModuleFicha,
}
