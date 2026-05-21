import type { Metadata } from 'next'
import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'

export const metadata: Metadata = {
  title: 'Resultados Encuesta · Admin',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<{ key?: string }>
}

interface Respuesta {
  id: string
  compra_id: string
  comprador_email: string
  comprador_nombre: string | null
  rating_general: number | null
  rating_yoselvia: number | null
  rating_valentina: number | null
  rating_sebastian: number | null
  rating_organizacion: number | null
  lo_mejor: string | null
  lo_mejorar: string | null
  nps: number | null
  testimonio: string | null
  permite_publicar: boolean
  created_at: string
}

function avg(values: (number | null)[]): number | null {
  const nums = values.filter((v): v is number => v !== null)
  if (nums.length === 0) return null
  return nums.reduce((a, b) => a + b, 0) / nums.length
}

function npsScore(values: (number | null)[]): number | null {
  const nums = values.filter((v): v is number => v !== null)
  if (nums.length === 0) return null
  const promoters = nums.filter((n) => n >= 9).length
  const detractors = nums.filter((n) => n <= 6).length
  return Math.round(((promoters - detractors) / nums.length) * 100)
}

export default async function AdminEncuestasPage({ searchParams }: PageProps) {
  const { key } = await searchParams
  const expected = process.env.MERCADOPAGO_IPN_KEY

  if (!expected || key !== expected) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="mb-2 text-2xl font-semibold text-slate-900">Acceso restringido</h1>
          <p className="text-sm text-slate-600">
            Esta página necesita una clave de acceso. Pídela al admin del sitio.
          </p>
        </div>
      </main>
    )
  }

  const admin = createAdminClient()
  const { data: respuestas, error } = await admin
    .from('encuestas_satisfaccion')
    .select('*')
    .order('created_at', { ascending: false })

  const list: Respuesta[] = (respuestas as Respuesta[]) ?? []

  // Stats
  const total = list.length
  const ratingGeneral = avg(list.map((r) => r.rating_general))
  const ratingYos = avg(list.map((r) => r.rating_yoselvia))
  const ratingVal = avg(list.map((r) => r.rating_valentina))
  const ratingSeb = avg(list.map((r) => r.rating_sebastian))
  const ratingOrg = avg(list.map((r) => r.rating_organizacion))
  const nps = npsScore(list.map((r) => r.nps))
  const testimonios = list.filter((r) => r.permite_publicar && r.testimonio?.trim())

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
            Admin · Next Level Experience
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
            Resultados de la encuesta
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {total} respuesta{total === 1 ? '' : 's'} recopilada{total === 1 ? '' : 's'}
            {total > 0 ? ` · última: ${formatDate(list[0].created_at)}` : ''}
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            Error al cargar: {error.message}
          </div>
        )}

        {total === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <p className="text-slate-600">
              Aún no hay respuestas. Cuando los asistentes contesten, aparecerán acá.
            </p>
          </div>
        ) : (
          <>
            {/* Stats cards */}
            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              <StatCard label="Respuestas" value={String(total)} accent="slate" />
              <StatCard
                label="Rating general"
                value={ratingGeneral !== null ? `${ratingGeneral.toFixed(1)} ★` : '—'}
                accent="amber"
              />
              <StatCard
                label="NPS Score"
                value={nps !== null ? String(nps) : '—'}
                accent={nps !== null && nps >= 50 ? 'emerald' : nps !== null && nps < 0 ? 'red' : 'slate'}
                hint={nps !== null ? npsLabel(nps) : null}
              />
              <StatCard
                label="Testimonios autorizados"
                value={String(testimonios.length)}
                accent="indigo"
              />
            </div>

            {/* Ratings por mentor */}
            <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-base font-semibold text-slate-900">Rating por bloque</h2>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                <BlockRating label="01 · Yoselvia · IA" value={ratingYos} />
                <BlockRating label="02 · Valentina · Imagen" value={ratingVal} />
                <BlockRating label="03 · Sebastián · Comunicación" value={ratingSeb} />
                <BlockRating label="Organización" value={ratingOrg} />
              </div>
            </div>

            {/* Testimonios destacados */}
            {testimonios.length > 0 && (
              <div className="mb-8 rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
                <h2 className="mb-4 text-base font-semibold text-indigo-900">
                  💬 Testimonios autorizados para publicar ({testimonios.length})
                </h2>
                <div className="space-y-3">
                  {testimonios.map((t) => (
                    <blockquote
                      key={t.id}
                      className="rounded-xl border border-indigo-100 bg-white p-4 text-sm"
                    >
                      <p className="italic text-slate-800">&ldquo;{t.testimonio}&rdquo;</p>
                      <footer className="mt-2 text-xs text-slate-600">
                        — {t.comprador_nombre ?? t.comprador_email}
                        {t.rating_general && <span className="ml-2">· {t.rating_general}/5 ★</span>}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            )}

            {/* Tabla completa */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
                    <tr>
                      <th className="px-4 py-3 text-left">Fecha</th>
                      <th className="px-4 py-3 text-left">Comprador</th>
                      <th className="px-4 py-3 text-center">General</th>
                      <th className="px-4 py-3 text-center">Yos</th>
                      <th className="px-4 py-3 text-center">Val</th>
                      <th className="px-4 py-3 text-center">Seb</th>
                      <th className="px-4 py-3 text-center">Org</th>
                      <th className="px-4 py-3 text-center">NPS</th>
                      <th className="px-4 py-3 text-left">Lo mejor</th>
                      <th className="px-4 py-3 text-left">A mejorar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {list.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-xs text-slate-500">
                          {formatDate(r.created_at)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-slate-900">
                            {r.comprador_nombre ?? '—'}
                          </div>
                          <div className="text-xs text-slate-500">{r.comprador_email}</div>
                        </td>
                        <td className="px-4 py-3 text-center font-semibold">
                          {r.rating_general ?? '—'}
                        </td>
                        <td className="px-4 py-3 text-center text-slate-700">
                          {r.rating_yoselvia ?? '—'}
                        </td>
                        <td className="px-4 py-3 text-center text-slate-700">
                          {r.rating_valentina ?? '—'}
                        </td>
                        <td className="px-4 py-3 text-center text-slate-700">
                          {r.rating_sebastian ?? '—'}
                        </td>
                        <td className="px-4 py-3 text-center text-slate-700">
                          {r.rating_organizacion ?? '—'}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {r.nps !== null ? (
                            <span
                              className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                r.nps >= 9
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : r.nps >= 7
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {r.nps}
                            </span>
                          ) : (
                            '—'
                          )}
                        </td>
                        <td className="max-w-xs px-4 py-3 text-xs text-slate-700">
                          {truncate(r.lo_mejor, 100)}
                        </td>
                        <td className="max-w-xs px-4 py-3 text-xs text-slate-700">
                          {truncate(r.lo_mejorar, 100)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        <p className="mt-8 text-center text-xs text-slate-400">
          <Link href="/" className="hover:text-slate-600">
            ← volver al inicio
          </Link>
        </p>
      </div>
    </main>
  )
}

function StatCard({
  label,
  value,
  accent,
  hint,
}: {
  label: string
  value: string
  accent: 'slate' | 'amber' | 'emerald' | 'red' | 'indigo'
  hint?: string | null
}) {
  const accents = {
    slate: 'text-slate-900',
    amber: 'text-amber-600',
    emerald: 'text-emerald-600',
    red: 'text-red-600',
    indigo: 'text-indigo-600',
  }
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-semibold ${accents[accent]}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  )
}

function BlockRating({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs text-slate-600">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">
        {value !== null ? `${value.toFixed(1)} ★` : '—'}
      </p>
    </div>
  )
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('es-CL', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function truncate(s: string | null, max: number): string {
  if (!s) return '—'
  if (s.length <= max) return s
  return s.slice(0, max) + '…'
}

function npsLabel(score: number): string {
  if (score >= 70) return 'Excelente'
  if (score >= 50) return 'Muy bueno'
  if (score >= 30) return 'Bueno'
  if (score >= 0) return 'Mejorable'
  return 'Crítico'
}
