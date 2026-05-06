import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CLARITY_API = 'https://www.clarity.ms/export-data/api/v1/project-live-insights'

type ClarityMetric = {
  metricName: string
  information: Record<string, unknown>[]
}

/**
 * Proxy to Clarity Data Export API.
 *
 * GET /api/admin/clarity?key=<IPN_KEY>
 *   → Full dashboard (traffic + devices + sources + UX issues) — 4 API calls
 *
 * GET /api/admin/clarity?key=<IPN_KEY>&days=1&dim=Device
 *   → Custom single query
 *
 * Requires env: CLARITY_API_TOKEN, MERCADOPAGO_IPN_KEY
 * Rate limit: 10 requests/day to Clarity API.
 */
export async function GET(req: NextRequest) {
  const ipnKey = process.env.MERCADOPAGO_IPN_KEY
  const provided = req.nextUrl.searchParams.get('key')
  if (!ipnKey || !provided || provided !== ipnKey) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const clarityToken = process.env.CLARITY_API_TOKEN
  if (!clarityToken) {
    return NextResponse.json(
      { error: 'CLARITY_API_TOKEN not configured' },
      { status: 500 }
    )
  }

  const days = req.nextUrl.searchParams.get('days') || '3'
  const dim1 = req.nextUrl.searchParams.get('dim')

  if (dim1) {
    const data = await fetchClarity(clarityToken, days, dim1)
    return NextResponse.json(data)
  }

  const [traffic, devices, sources, ux] = await Promise.all([
    fetchClarity(clarityToken, days, 'Browser'),
    fetchClarity(clarityToken, days, 'Device'),
    fetchClarity(clarityToken, days, 'Source', 'Medium'),
    fetchClarity(clarityToken, days, 'Country'),
  ])

  const summary = {
    period: `last ${days} days`,
    fetched_at: new Date().toISOString(),
    traffic: extractMetric(traffic, 'Traffic'),
    scroll_depth: extractMetric(traffic, 'ScrollDepth'),
    engagement: extractMetric(traffic, 'EngagementTime'),
    dead_clicks: extractMetric(traffic, 'DeadClickCount'),
    rage_clicks: extractMetric(traffic, 'RageClickCount'),
    excessive_scroll: extractMetric(traffic, 'ExcessiveScroll'),
    quickback: extractMetric(traffic, 'QuickbackClick'),
    script_errors: extractMetric(traffic, 'ScriptErrorCount'),
    devices: extractMetric(devices, 'Traffic'),
    sources: extractMetric(sources, 'Traffic'),
    countries: extractMetric(ux, 'Traffic'),
    raw: { traffic, devices, sources, ux },
  }

  return NextResponse.json(summary)
}

async function fetchClarity(
  token: string,
  days: string,
  dim1?: string,
  dim2?: string,
  dim3?: string
): Promise<ClarityMetric[]> {
  const params = new URLSearchParams({ numOfDays: days })
  if (dim1) params.set('dimension1', dim1)
  if (dim2) params.set('dimension2', dim2)
  if (dim3) params.set('dimension3', dim3)

  const res = await fetch(`${CLARITY_API}?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    return [{ metricName: '_error', information: [{ status: res.status, body: text }] }]
  }

  return res.json()
}

function extractMetric(data: ClarityMetric[], name: string): Record<string, unknown>[] | null {
  const metric = data.find(
    (m) => m.metricName.toLowerCase() === name.toLowerCase()
  )
  return metric?.information ?? null
}
