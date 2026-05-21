/**
 * Envio masivo de encuesta de satisfaccion post-evento.
 *
 * Logica:
 *  1. Lee compras WHERE status = 'approved'
 *  2. Filtra placeholders (unknown@, pendiente@) y el merchant (yoselviaadam)
 *  3. Deduplica por email — si hay multiples compras con el mismo email, usa la mas reciente
 *  4. Envia a cada uno un correo con su link unico /encuesta/<compra_id>
 *  5. Reporta exitos y fallos
 *
 * Usage:
 *   npx tsx scripts/send-encuesta-bulk.ts
 */
import { buildEncuestaEmail } from '../src/emails/encuesta-satisfaccion.js'

const RESEND_KEY = process.env.RESEND_API_KEY ?? ''
const FROM = 'Next Level Experience <hola@infonl.yosmentedigital.com>'
const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const SUPA_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nl.yosmentedigital.com'

const PLACEHOLDER_PATTERNS = [/^unknown@/, /pendiente\.com$/]
const SKIP_EMAILS = new Set(['yoselviaadam@gmail.com'])

interface Compra {
  id: string
  comprador_email: string
  comprador_nombre: string | null
  ticket_type: string
  created_at: string
}

function isPlaceholder(email: string): boolean {
  return PLACEHOLDER_PATTERNS.some((p) => p.test(email))
}

async function fetchCompras(): Promise<Compra[]> {
  const res = await fetch(
    `${SUPA_URL}/rest/v1/compras?select=id,comprador_email,comprador_nombre,ticket_type,created_at&status=eq.approved&order=created_at.desc`,
    {
      headers: {
        apikey: SUPA_KEY,
        Authorization: `Bearer ${SUPA_KEY}`,
      },
    }
  )
  if (!res.ok) throw new Error(`Supabase fetch failed: ${res.status}`)
  return res.json() as Promise<Compra[]>
}

function dedupeByEmail(compras: Compra[]): Compra[] {
  const seen = new Set<string>()
  const out: Compra[] = []
  for (const c of compras) {
    const e = c.comprador_email.toLowerCase()
    if (seen.has(e)) continue
    seen.add(e)
    out.push(c)
  }
  return out
}

async function sendOne(c: Compra): Promise<{ ok: boolean; id?: string; error?: string }> {
  const url = `${SITE_URL}/encuesta/${c.id}`
  const { subject, html, text } = buildEncuestaEmail({
    nombre: c.comprador_nombre,
    encuestaUrl: url,
  })

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_KEY}`,
    },
    body: JSON.stringify({
      from: FROM,
      to: c.comprador_email,
      subject,
      html,
      text,
      tags: [
        { name: 'type', value: 'encuesta-bulk' },
        { name: 'ticket', value: c.ticket_type },
      ],
    }),
  })

  const result = (await res.json()) as { id?: string; message?: string }
  if (!res.ok) {
    return { ok: false, error: result.message ?? `HTTP ${res.status}` }
  }
  return { ok: true, id: result.id }
}

async function main() {
  if (!RESEND_KEY) throw new Error('RESEND_API_KEY no configurado')
  if (!SUPA_URL || !SUPA_KEY) throw new Error('Supabase env vars faltantes')

  console.log('Leyendo compras aprobadas...')
  const all = await fetchCompras()
  console.log(`  -> ${all.length} compras aprobadas en total`)

  const filtered = all.filter((c) => {
    if (isPlaceholder(c.comprador_email)) return false
    if (SKIP_EMAILS.has(c.comprador_email.toLowerCase())) return false
    return true
  })
  console.log(`  -> ${filtered.length} despues de filtrar placeholders y merchant`)

  const unique = dedupeByEmail(filtered)
  console.log(`  -> ${unique.length} destinatarios unicos (deduplicados por email)`)

  console.log('\nEnviando correos...\n')

  let ok = 0
  let fail = 0
  const failures: { email: string; error: string }[] = []

  for (const c of unique) {
    const name = c.comprador_nombre ?? '(sin nombre)'
    process.stdout.write(`  -> ${name} <${c.comprador_email}> ... `)

    const res = await sendOne(c)
    if (res.ok) {
      console.log(`OK ${res.id}`)
      ok++
    } else {
      console.log(`FAIL ${res.error}`)
      fail++
      failures.push({ email: c.comprador_email, error: res.error ?? 'unknown' })
    }

    await new Promise((r) => setTimeout(r, 200))
  }

  console.log('\n' + '-'.repeat(60))
  console.log(`OK enviados: ${ok}`)
  console.log(`FAIL fallidos: ${fail}`)
  if (failures.length > 0) {
    console.log('\nDetalles de fallos:')
    failures.forEach((f) => console.log(`  - ${f.email}: ${f.error}`))
  }
}

main().catch((e) => {
  console.error('Error fatal:', e)
  process.exit(1)
})
