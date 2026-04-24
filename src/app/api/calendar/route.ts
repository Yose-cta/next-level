import { NextResponse } from 'next/server'
import { buildIcs } from '@/lib/calendar'

export const runtime = 'nodejs'

/**
 * GET /api/calendar — descarga el .ics del workshop.
 * Browser y apps de calendario lo importan automáticamente.
 */
export function GET() {
  const ics = buildIcs()
  return new NextResponse(ics, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="next-level-workshop.ics"',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
