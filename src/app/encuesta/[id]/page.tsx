import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { EncuestaForm } from './EncuestaForm'

export const metadata: Metadata = {
  title: 'Tu opinión · Next Level Experience',
  description: '2 minutos. Tu feedback nos ayuda a hacer la próxima edición mejor.',
  robots: { index: false, follow: false },
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EncuestaPage({ params }: PageProps) {
  const { id } = await params

  // Validar UUID formato basico
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(id)) notFound()

  const admin = createAdminClient()
  const { data: compra } = await admin
    .from('compras')
    .select('id, comprador_email, comprador_nombre, status, ticket_type')
    .eq('id', id)
    .single()

  if (!compra) notFound()

  // Si ya respondio, mostrar mensaje de "gracias ya respondiste"
  const { data: existing } = await admin
    .from('encuestas_satisfaccion')
    .select('id, created_at')
    .eq('compra_id', id)
    .maybeSingle()

  const firstName = compra.comprador_nombre?.split(' ')[0] ?? null

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 px-4 py-8 md:py-16">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-slate-500">
            Next Level Experience
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            {firstName ? `${firstName}, ` : ''}cuéntanos cómo te fue
          </h1>
          <p className="mt-3 text-pretty text-slate-600">
            Tu opinión nos ayuda a hacer la próxima edición mejor. Toma 2 minutos.
          </p>
        </div>

        {existing ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
            <div className="mb-3 text-4xl">✓</div>
            <h2 className="mb-2 text-xl font-semibold text-emerald-900">
              Ya recibimos tu respuesta
            </h2>
            <p className="mb-4 text-emerald-800">
              Gracias por tomarte el tiempo. Tu feedback ya está guardado.
            </p>
            <Link
              href="/"
              className="inline-block rounded-full bg-emerald-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Volver al inicio
            </Link>
          </div>
        ) : (
          <EncuestaForm
            compraId={compra.id}
            ticketType={compra.ticket_type as 'general' | 'vip'}
          />
        )}
      </div>
    </main>
  )
}
