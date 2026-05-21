import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/encuesta
 * Recibe respuestas de la encuesta de satisfaccion post-evento.
 * El token es el compra_id (UUID) que se valida contra la tabla compras.
 *
 * Rate limit: 5 envios por IP por hora (evita spam).
 * Idempotencia: UPSERT por compra_id (UNIQUE) — si responde dos veces, se sobreescribe.
 */

const RespuestaSchema = z.object({
  compra_id: z.string().uuid(),
  rating_general: z.number().int().min(1).max(5),
  rating_yoselvia: z.number().int().min(1).max(5).nullable().optional(),
  rating_valentina: z.number().int().min(1).max(5).nullable().optional(),
  rating_sebastian: z.number().int().min(1).max(5).nullable().optional(),
  rating_organizacion: z.number().int().min(1).max(5).nullable().optional(),
  lo_mejor: z.string().max(2000).nullable().optional(),
  lo_mejorar: z.string().max(2000).nullable().optional(),
  nps: z.number().int().min(0).max(10).nullable().optional(),
  testimonio: z.string().max(2000).nullable().optional(),
  permite_publicar: z.boolean().default(false),
})

export async function POST(req: NextRequest) {
  try {
    // Rate limit por IP — 5 envios por hora
    const ip = getClientIp(req.headers)
    const rl = checkRateLimit({
      key: `encuesta:${ip}`,
      windowMs: 60 * 60 * 1000,
      max: 5,
    })
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Demasiados envíos. Intenta más tarde.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const parsed = RespuestaSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', detail: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data
    const admin = createAdminClient()

    // 1. Validar que la compra existe y esta aprobada
    const { data: compra, error: compraErr } = await admin
      .from('compras')
      .select('id, comprador_email, comprador_nombre, status')
      .eq('id', data.compra_id)
      .single()

    if (compraErr || !compra) {
      return NextResponse.json(
        { error: 'No encontramos tu compra. Revisa el link del correo.' },
        { status: 404 }
      )
    }
    if (compra.status !== 'approved') {
      return NextResponse.json(
        { error: 'Tu compra aún no está aprobada. No podemos guardar la encuesta.' },
        { status: 403 }
      )
    }

    // 2. Upsert respuesta (idempotente por compra_id)
    const userAgent = req.headers.get('user-agent')?.slice(0, 500) ?? null
    const { error: insertErr } = await admin
      .from('encuestas_satisfaccion')
      .upsert(
        {
          compra_id: data.compra_id,
          comprador_email: compra.comprador_email,
          comprador_nombre: compra.comprador_nombre,
          rating_general: data.rating_general,
          rating_yoselvia: data.rating_yoselvia ?? null,
          rating_valentina: data.rating_valentina ?? null,
          rating_sebastian: data.rating_sebastian ?? null,
          rating_organizacion: data.rating_organizacion ?? null,
          lo_mejor: data.lo_mejor ?? null,
          lo_mejorar: data.lo_mejorar ?? null,
          nps: data.nps ?? null,
          testimonio: data.testimonio ?? null,
          permite_publicar: data.permite_publicar,
          ip,
          user_agent: userAgent,
        },
        { onConflict: 'compra_id' }
      )

    if (insertErr) {
      console.error('[encuesta] insert error:', insertErr)
      return NextResponse.json(
        { error: 'No se pudo guardar la encuesta', detail: insertErr.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[encuesta] error:', e)
    const message = e instanceof Error ? e.message : 'Error desconocido'
    return NextResponse.json({ error: 'Error interno', detail: message }, { status: 500 })
  }
}
