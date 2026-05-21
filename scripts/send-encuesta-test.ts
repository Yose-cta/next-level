/**
 * Test del email de encuesta — envia a un destinatario unico.
 * Usage: npx tsx scripts/send-encuesta-test.ts
 */
import { buildEncuestaEmail } from '../src/emails/encuesta-satisfaccion.js'

const API_KEY = process.env.RESEND_API_KEY ?? ''
const FROM = 'Next Level Experience <hola@infonl.yosmentedigital.com>'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nl.yosmentedigital.com'

// Compra de test creada en Supabase
const TEST_COMPRA_ID = 'facbf2b0-8ae5-44be-95aa-e1923824617f'
const RECIPIENT = { name: 'Yoselvia Adam', email: 'yoselviaadam@gmail.com' }

async function main() {
  const encuestaUrl = `${SITE_URL}/encuesta/${TEST_COMPRA_ID}`
  console.log(`Encuesta URL: ${encuestaUrl}`)

  const { subject, html, text } = buildEncuestaEmail({
    nombre: RECIPIENT.name,
    encuestaUrl,
  })

  console.log(`\n--- Enviando a ${RECIPIENT.name} <${RECIPIENT.email}> ---`)
  console.log(`Subject: ${subject}`)

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      from: FROM,
      to: RECIPIENT.email,
      subject,
      html,
      text,
      tags: [
        { name: 'type', value: 'encuesta-test' },
      ],
    }),
  })

  const result = await res.json()

  if (!res.ok) {
    console.error(`FAILED:`, JSON.stringify(result, null, 2))
    process.exit(1)
  } else {
    console.log(`OK! Email ID: ${(result as { id: string }).id}`)
  }
}

main().catch((e) => {
  console.error('Error:', e)
  process.exit(1)
})
