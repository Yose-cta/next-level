import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Keep-alive cron — mantiene el proyecto Supabase activo para evitar
 * auto-pause del free tier (después de 7 días sin actividad).
 *
 * Aún con Pro, dejarlo activo es defensa en profundidad. Cron en
 * vercel.json corre 1× al día.
 *
 * Solo accesible si el caller manda el header `x-cron-key` matching.
 * Vercel lo manda automáticamente con `CRON_SECRET` env var.
 */
export async function GET(req: Request) {
  // Vercel manda este header en cron jobs automáticos
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret) {
    const authHeader = req.headers.get('authorization')
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }
  }

  try {
    const supabase = createAdminClient()
    const start = Date.now()
    const { error } = await supabase.from('compras').select('id').limit(1)
    const elapsedMs = Date.now() - start

    if (error) {
      console.error('[cron keepalive] Supabase error:', error)
      return NextResponse.json(
        { ok: false, error: error.message, elapsedMs },
        { status: 503 }
      )
    }

    console.log('[cron keepalive] Supabase OK', { elapsedMs })
    return NextResponse.json({ ok: true, elapsedMs, timestamp: new Date().toISOString() })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'unknown'
    console.error('[cron keepalive] unexpected:', msg)
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}
