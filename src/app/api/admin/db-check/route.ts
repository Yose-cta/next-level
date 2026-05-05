import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Diagnostic endpoint — verifica que Supabase esté funcionando.
 * Solo accesible con MERCADOPAGO_IPN_KEY como auth (reusamos la misma).
 *
 * Uso: GET /api/admin/db-check?key=<IPN_KEY>
 *
 * Devuelve:
 *  - { ok: true, count: N } si la BD responde
 *  - { ok: false, error: "..." } con detalles del fallo
 */
export async function GET(req: NextRequest) {
  // Auth con el shared secret que ya tenemos
  const ipnKey = process.env.MERCADOPAGO_IPN_KEY
  const provided = req.nextUrl.searchParams.get('key')
  if (!ipnKey || !provided || provided !== ipnKey) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const result: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env_check: {
      url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      service_role_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      service_role_prefix: process.env.SUPABASE_SERVICE_ROLE_KEY
        ? process.env.SUPABASE_SERVICE_ROLE_KEY.slice(0, 8)
        : null,
    },
  }

  try {
    const supabase = createAdminClient()
    const start = Date.now()

    // Test 1: count de compras
    const { count, error: countError } = await supabase
      .from('compras')
      .select('*', { count: 'exact', head: true })

    result.elapsed_count_ms = Date.now() - start

    if (countError) {
      result.ok = false
      result.test = 'count'
      result.error = {
        code: countError.code,
        message: countError.message,
        details: countError.details,
        hint: countError.hint,
      }
      return NextResponse.json(result, { status: 503 })
    }

    result.compras_count = count

    // Test 2: insert/upsert con un row de test (con onConflict para no duplicar)
    const testStart = Date.now()
    const { error: upsertError } = await supabase
      .from('compras')
      .upsert(
        {
          payment_id: 'TEST_DB_CHECK_' + Date.now(),
          ticket_type: 'general',
          comprador_email: 'dbcheck@test.local',
          status: 'pending',
        },
        { onConflict: 'payment_id' }
      )
    result.elapsed_upsert_ms = Date.now() - testStart

    if (upsertError) {
      result.ok = false
      result.test = 'upsert'
      result.error = {
        code: upsertError.code,
        message: upsertError.message,
        details: upsertError.details,
        hint: upsertError.hint,
      }
      return NextResponse.json(result, { status: 503 })
    }

    // Limpiar el row de test
    await supabase.from('compras').delete().like('payment_id', 'TEST_DB_CHECK_%')

    result.ok = true
    result.message = 'Database is healthy'
    return NextResponse.json(result)
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'unknown'
    const stack = e instanceof Error ? e.stack : undefined
    result.ok = false
    result.error = { message: msg, stack }
    return NextResponse.json(result, { status: 500 })
  }
}
