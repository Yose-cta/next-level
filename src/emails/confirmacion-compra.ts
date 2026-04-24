import { CONTACT, WORKSHOP } from '@/lib/constants'
import { whatsappUrl } from '@/lib/utils'
import type { TicketType } from '@/lib/db'

interface BuildArgs {
  nombre: string | null
  ticketType: TicketType
}

/**
 * Template HTML editorial — sin dependencia de React Email.
 * Inline styles para máxima compatibilidad con clientes de email.
 */
export function buildConfirmacionEmail({ nombre, ticketType }: BuildArgs) {
  const isVip = ticketType === 'vip'
  const greeting = nombre ? `Hola ${nombre.split(' ')[0]}` : 'Hola'
  const wa = whatsappUrl(
    CONTACT.whatsapp.number,
    `Hola Yoselvia! Acabo de comprar mi entrada ${isVip ? 'VIP' : 'General'} para Next Level.`
  )
  const ics = `${process.env.NEXT_PUBLIC_SITE_URL ?? CONTACT.url}/api/calendar`
  const home = process.env.NEXT_PUBLIC_SITE_URL ?? CONTACT.url

  const subject = isVip
    ? '✓ Tu cupo VIP Next Level está confirmado'
    : '✓ Tu cupo Next Level está confirmado'

  const vipBlock = isVip
    ? `
      <tr><td style="padding:24px 0">
        <div style="background:#fff8d6;border:1px solid #ffd23f;border-radius:8px;padding:20px">
          <p style="margin:0 0 6px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#8a7a30;font-weight:600">Tu Activo VIP</p>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#0a0a0a">
            Después del workshop, agendamos tu sesión <strong>1:1 online con Yoselvia</strong> (Mini Radiografía Operativa de tu negocio). Te contactamos por WhatsApp para coordinar fecha.
          </p>
        </div>
      </td></tr>`
    : ''

  const html = `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f5f0e8">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#141414;border-radius:8px;overflow:hidden">
        <tr><td style="padding:40px 32px 0;text-align:center">
          <p style="margin:0;font-size:11px;letter-spacing:.3em;color:#d4b896;font-weight:600">CUPO RESERVADO</p>
          <h1 style="margin:16px 0 0;font-size:34px;line-height:1.1;color:#f5f0e8;font-weight:400;font-family:Georgia,serif">
            ${greeting},<br><span style="color:#ffd23f;font-style:italic">nos vemos el 16 de mayo.</span>
          </h1>
        </td></tr>

        <tr><td style="padding:24px 32px 0">
          <p style="margin:0;font-size:16px;line-height:1.6;color:rgba(245,240,232,.85)">
            Confirmamos tu <strong>${isVip ? 'Entrada VIP Next Level' : 'Entrada General'}</strong>. Guardá la fecha — el sábado 16 de mayo nos vemos en Santiago para 6 horas que van a cambiar cómo operas tu negocio.
          </p>
        </td></tr>

        <tr><td style="padding:32px 32px 0">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border:1px solid rgba(212,184,150,.2);border-radius:8px">
            <tr><td style="padding:24px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 0 12px;border-bottom:1px solid rgba(212,184,150,.15)">
                    <p style="margin:0;font-size:10px;letter-spacing:.25em;color:#8a8580;text-transform:uppercase">FECHA</p>
                    <p style="margin:4px 0 0;font-size:18px;color:#f5f0e8;font-family:Georgia,serif">${WORKSHOP.date.display}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(212,184,150,.15)">
                    <p style="margin:0;font-size:10px;letter-spacing:.25em;color:#8a8580;text-transform:uppercase">HORARIO</p>
                    <p style="margin:4px 0 0;font-size:18px;color:#f5f0e8;font-family:Georgia,serif">14h a 21h · ${WORKSHOP.duration}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0 0">
                    <p style="margin:0;font-size:10px;letter-spacing:.25em;color:#8a8580;text-transform:uppercase">LUGAR</p>
                    <p style="margin:4px 0 0;font-size:18px;color:#f5f0e8;font-family:Georgia,serif">${WORKSHOP.venue.full}</p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </td></tr>

        ${vipBlock}

        <tr><td style="padding:32px 32px 0;text-align:center">
          <a href="${ics}" style="display:inline-block;padding:14px 28px;background:#ffd23f;color:#0a0a0a;text-decoration:none;font-weight:600;font-size:14px;border-radius:999px;margin:0 4px 12px">📅 Agregar al calendario</a>
          <a href="${wa}" style="display:inline-block;padding:14px 28px;background:#25D366;color:#fff;text-decoration:none;font-weight:600;font-size:14px;border-radius:999px;margin:0 4px 12px">💬 WhatsApp</a>
        </td></tr>

        <tr><td style="padding:32px 32px 0">
          <p style="margin:0;font-size:14px;line-height:1.7;color:rgba(245,240,232,.7);font-style:italic;font-family:Georgia,serif">
            "El lunes siguiente vas a empezar distinto — no porque te dimos motivación, sino porque te dimos sistema."
          </p>
        </td></tr>

        <tr><td style="padding:32px;text-align:center;border-top:1px solid rgba(212,184,150,.15);margin-top:24px">
          <p style="margin:24px 0 0;font-size:11px;letter-spacing:.2em;color:#8a8580;text-transform:uppercase;font-weight:500">NEXT LEVEL · Workshop presencial · Santiago 2026</p>
          <p style="margin:8px 0 0;font-size:11px;color:#8a8580">¿Dudas? Respondé este email o escribinos a <a href="${wa}" style="color:#ffd23f;text-decoration:underline">WhatsApp</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`

  const text = `${greeting},

¡Cupo confirmado para Next Level Workshop!

📅 ${WORKSHOP.date.display}
🕐 14h a 21h · ${WORKSHOP.duration}
📍 ${WORKSHOP.venue.full}

${isVip ? 'TU ACTIVO VIP: Después del workshop, agendamos tu sesión 1:1 online con Yoselvia (Mini Radiografía Operativa). Te contactamos por WhatsApp para coordinar fecha.' : ''}

Agregar al calendario: ${ics}
WhatsApp directo: ${wa}

Más info: ${home}

— Next Level
`.trim()

  return { subject, html, text }
}
