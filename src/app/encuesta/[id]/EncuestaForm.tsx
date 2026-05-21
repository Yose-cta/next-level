'use client'

import { useState } from 'react'
import Link from 'next/link'

type Rating = 1 | 2 | 3 | 4 | 5
type Nps = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

interface Props {
  compraId: string
  ticketType: 'general' | 'vip'
}

interface FormState {
  rating_general: Rating | null
  rating_yoselvia: Rating | null
  rating_valentina: Rating | null
  rating_sebastian: Rating | null
  rating_organizacion: Rating | null
  lo_mejor: string
  lo_mejorar: string
  nps: Nps | null
  testimonio: string
  permite_publicar: boolean
}

const INITIAL: FormState = {
  rating_general: null,
  rating_yoselvia: null,
  rating_valentina: null,
  rating_sebastian: null,
  rating_organizacion: null,
  lo_mejor: '',
  lo_mejorar: '',
  nps: null,
  testimonio: '',
  permite_publicar: false,
}

export function EncuestaForm({ compraId }: Props) {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!form.rating_general) {
      setError('Por favor califica la experiencia general (1-5 estrellas).')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/encuesta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          compra_id: compraId,
          rating_general: form.rating_general,
          rating_yoselvia: form.rating_yoselvia,
          rating_valentina: form.rating_valentina,
          rating_sebastian: form.rating_sebastian,
          rating_organizacion: form.rating_organizacion,
          lo_mejor: form.lo_mejor.trim() || null,
          lo_mejorar: form.lo_mejorar.trim() || null,
          nps: form.nps,
          testimonio: form.testimonio.trim() || null,
          permite_publicar: form.permite_publicar,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'No se pudo enviar. Intenta de nuevo.')
        setSubmitting(false)
        return
      }
      setSuccess(true)
    } catch (_e) {
      setError('Error de conexión. Revisa tu internet e intenta de nuevo.')
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="mb-3 text-4xl">✓</div>
        <h2 className="mb-2 text-2xl font-semibold text-emerald-900">
          ¡Gracias por tu feedback!
        </h2>
        <p className="mb-6 text-emerald-800">
          Tu opinión ya quedó guardada. Nos ayuda a hacer la próxima edición mejor.
        </p>
        <Link
          href="/"
          className="inline-block rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Rating general */}
      <Section
        title="¿Cómo calificarías la experiencia en general?"
        required
      >
        <StarRating
          value={form.rating_general}
          onChange={(v) => setForm({ ...form, rating_general: v })}
        />
      </Section>

      {/* Ratings por mentor */}
      <Section title="Califica cada bloque">
        <div className="space-y-5">
          <RatingRow
            label="01 · Yoselvia · IA con Claude"
            value={form.rating_yoselvia}
            onChange={(v) => setForm({ ...form, rating_yoselvia: v })}
          />
          <RatingRow
            label="02 · Valentina · Imagen y Presencia"
            value={form.rating_valentina}
            onChange={(v) => setForm({ ...form, rating_valentina: v })}
          />
          <RatingRow
            label="03 · Sebastián · Comunicación y Ventas"
            value={form.rating_sebastian}
            onChange={(v) => setForm({ ...form, rating_sebastian: v })}
          />
          <RatingRow
            label="Organización del evento (lugar, coffee, timing)"
            value={form.rating_organizacion}
            onChange={(v) => setForm({ ...form, rating_organizacion: v })}
          />
        </div>
      </Section>

      {/* Texto abierto: lo mejor */}
      <Section title="¿Qué fue lo mejor para ti?">
        <textarea
          value={form.lo_mejor}
          onChange={(e) => setForm({ ...form, lo_mejor: e.target.value })}
          placeholder="Un momento, una idea, una conversación, algo que te llevas..."
          rows={3}
          maxLength={2000}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </Section>

      {/* Texto abierto: que mejorarias */}
      <Section title="¿Qué mejorarías para la próxima edición?">
        <textarea
          value={form.lo_mejorar}
          onChange={(e) => setForm({ ...form, lo_mejorar: e.target.value })}
          placeholder="Honesto, directo. Nos ayuda más tu crítica que tu cumplido."
          rows={3}
          maxLength={2000}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      </Section>

      {/* NPS */}
      <Section title="¿Qué tan probable es que recomiendes Next Level a un colega o amiga?">
        <NpsScale
          value={form.nps}
          onChange={(v) => setForm({ ...form, nps: v })}
        />
      </Section>

      {/* Testimonio */}
      <Section title="¿Nos dejas un testimonio? (opcional)">
        <textarea
          value={form.testimonio}
          onChange={(e) => setForm({ ...form, testimonio: e.target.value })}
          placeholder="Si quieres ayudarnos, escribe en 2-3 líneas qué te llevaste de la experiencia."
          rows={4}
          maxLength={2000}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
        <label className="mt-3 flex cursor-pointer items-start gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={form.permite_publicar}
            onChange={(e) =>
              setForm({ ...form, permite_publicar: e.target.checked })
            }
            className="mt-0.5 h-4 w-4 cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span>
            Autorizo que usen mi testimonio (con mi nombre) en redes y la página web
            para promocionar futuras ediciones.
          </span>
        </label>
      </Section>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-slate-900 px-6 py-4 text-base font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {submitting ? 'Enviando...' : 'Enviar mi feedback'}
      </button>

      <p className="text-center text-xs text-slate-500">
        Tus respuestas son confidenciales. Solo se publica el testimonio si tú lo autorizas.
      </p>
    </form>
  )
}

/* ============================================================
 * Componentes auxiliares
 * ============================================================ */

function Section({
  title,
  required,
  children,
}: {
  title: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
      <label className="mb-4 block text-base font-medium text-slate-900">
        {title}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
    </div>
  )
}

function StarRating({
  value,
  onChange,
}: {
  value: Rating | null
  onChange: (v: Rating) => void
}) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n as Rating)}
          className={`text-4xl transition ${
            value && n <= value
              ? 'text-amber-400 hover:text-amber-500'
              : 'text-slate-200 hover:text-slate-300'
          }`}
          aria-label={`${n} estrella${n > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

function RatingRow({
  label,
  value,
  onChange,
}: {
  label: string
  value: Rating | null
  onChange: (v: Rating) => void
}) {
  return (
    <div>
      <p className="mb-2 text-sm text-slate-700">{label}</p>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n as Rating)}
            className={`text-2xl transition ${
              value && n <= value
                ? 'text-amber-400 hover:text-amber-500'
                : 'text-slate-200 hover:text-slate-300'
            }`}
            aria-label={`${n} estrella${n > 1 ? 's' : ''}`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  )
}

function NpsScale({
  value,
  onChange,
}: {
  value: Nps | null
  onChange: (v: Nps) => void
}) {
  return (
    <div>
      <div className="grid grid-cols-11 gap-1">
        {Array.from({ length: 11 }, (_, i) => i as Nps).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`rounded-lg py-2 text-sm font-medium transition ${
              value === n
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-slate-500">
        <span>Para nada</span>
        <span>Totalmente</span>
      </div>
    </div>
  )
}
