/**
 * Resend wrapper minimal — fetch directo a la API.
 * Cero dependencias externas. Server-side only.
 * Docs: https://resend.com/docs/api-reference/emails/send-email
 */

const RESEND_API = 'https://api.resend.com'

export interface SendEmailArgs {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
  tags?: { name: string; value: string }[]
}

export interface SendEmailResponse {
  id: string
}

function getKey() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY no configurado')
  return key
}

function getFrom() {
  const email = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
  const name = process.env.RESEND_FROM_NAME ?? 'Next Level Experience'
  return `${name} <${email}>`
}

export async function sendEmail(args: SendEmailArgs): Promise<SendEmailResponse> {
  const r = await fetch(`${RESEND_API}/emails`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getKey()}`,
    },
    body: JSON.stringify({
      from: getFrom(),
      to: args.to,
      subject: args.subject,
      html: args.html,
      text: args.text,
      reply_to: args.replyTo,
      tags: args.tags,
    }),
  })
  if (!r.ok) {
    const text = await r.text()
    throw new Error(`Resend send failed (${r.status}): ${text}`)
  }
  return r.json() as Promise<SendEmailResponse>
}
