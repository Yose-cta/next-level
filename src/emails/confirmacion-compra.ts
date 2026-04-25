import { CONTACT, WORKSHOP } from '@/lib/constants'
import { googleCalendarUrl, whatsappUrl } from '@/lib/utils'
import type { TicketType } from '@/lib/db'

interface BuildArgs {
  nombre: string | null
  ticketType: TicketType
}

/**
 * Template HTML editorial — sin dependencia de React Email.
 * Inline styles para máxima compatibilidad con clientes de email.
 *
 * Diferenciación por ticket:
 *   - VIP: bloque con las 3 sesiones 1:1 (Yoselvia, Valentina, Sebastián)
 *   - General: bloque de 2x1 con CTA pre-llenado para registrar acompañante
 *   - Ambos: bloque del grupo exclusivo de WhatsApp
 */
export function buildConfirmacionEmail({ nombre, ticketType }: BuildArgs) {
  const isVip = ticketType === 'vip'
  // ticketType solo puede ser 'general' | 'vip' (TicketType en db.ts).
  // El ticket de test se mapea a 'general' automáticamente en inferTicketType.
  const isGeneral = ticketType === 'general'
  const ticketDisplayName = isVip
    ? 'Entrada VIP Next Level Experience'
    : 'Entrada General'
  const greeting = nombre ? `Hola ${nombre.split(' ')[0]}` : 'Hola'

  const waDudas = whatsappUrl(
    CONTACT.whatsapp.number,
    `Hola Yoselvia! Acabo de comprar mi ${ticketDisplayName} para Next Level Experience. Tengo una consulta:`
  )

  const waAcompanante = whatsappUrl(
    CONTACT.whatsapp.number,
    `Hola Yoselvia! Compré mi entrada General 2x1 para Next Level Experience del 16 de mayo y quiero registrar a mi acompañante.

Nombre del comprador:
Nombre del acompañante:
Correo del acompañante:
Teléfono del acompañante:`
  )

  const waGroup = isVip ? CONTACT.whatsappGroupVip : CONTACT.whatsappGroup
  const vipAgendaUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? CONTACT.url}/vip-agenda.html`
  const calendarUrl = googleCalendarUrl({
    title: 'Next Level Experience · 2nd Edition',
    startUtc: '20260516T180000Z', // 14:00 Santiago = 18:00 UTC
    endUtc: '20260517T010000Z', // 21:00 Santiago = 01:00 UTC siguiente
    details:
      'Workshop presencial · 6 horas con Yoselvia, Valentina y Sebastián. Llegar 15 minutos antes.',
    location: WORKSHOP.venue.full,
  })
  const home = process.env.NEXT_PUBLIC_SITE_URL ?? CONTACT.url

  const subject = isVip
    ? '✓ Tu cupo VIP Next Level Experience está confirmado'
    : '✓ Tu cupo Next Level Experience está confirmado'

  // ============== VIP BLOCK (3 sesiones 1:1) ==============
  const vipBlock = isVip
    ? `
      <tr><td style="padding:24px 32px 0">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff8d6;border:1px solid #ffd23f;border-radius:8px">
          <tr><td style="padding:24px">
            <p style="margin:0 0 6px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#8a7a30;font-weight:600">Tu Activo VIP · 3 sesiones 1:1 post-evento</p>
            <p style="margin:0 0 16px;font-size:18px;line-height:1.3;color:#0a0a0a;font-family:Georgia,serif">
              Después del workshop agendamos tus <strong>3 sesiones privadas</strong>.
            </p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(138,122,48,.2)">
              <tr><td style="padding:14px 0 0;font-size:14px;line-height:1.6;color:#0a0a0a">
                ★ <strong>Yoselvia</strong> · Auditoría VIP de tu negocio con Claude (60 min)
              </td></tr>
              <tr><td style="padding:8px 0 0;font-size:14px;line-height:1.6;color:#0a0a0a">
                ★ <strong>Valentina</strong> · Colorimetría VIP + revisión de imagen y presencia (60 min)
              </td></tr>
              <tr><td style="padding:8px 0 0;font-size:14px;line-height:1.6;color:#0a0a0a">
                ★ <strong>Sebastián</strong> · Revisión personalizada de comunicación y ventas (60 min)
              </td></tr>
            </table>
            <p style="margin:16px 0 0;padding-top:14px;border-top:1px solid rgba(138,122,48,.2);font-size:13px;line-height:1.6;color:#5c5223">
              Te contactaremos por WhatsApp después del 16 de mayo para coordinar fechas y horarios.
            </p>
          </td></tr>
        </table>
      </td></tr>`
    : ''

  // ============== 2X1 BLOCK (solo General) ==============
  const acompananteBlock = isGeneral
    ? `
      <tr><td style="padding:24px 32px 0">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(243,37,154,.08);border:1px solid rgba(243,37,154,.4);border-radius:8px">
          <tr><td style="padding:24px">
            <p style="margin:0 0 6px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#f3259a;font-weight:600">Tu entrada incluye 2×1</p>
            <p style="margin:0 0 12px;font-size:20px;line-height:1.25;color:#f5f0e8;font-family:Georgia,serif">
              ¿Vienes con alguien?
            </p>
            <p style="margin:0 0 18px;font-size:14px;line-height:1.65;color:rgba(245,240,232,.85)">
              Comparte Next Level Experience con alguien que también esté en su próxima etapa. Registramos a tu acompañante por WhatsApp con sus datos — tarda 1 minuto.
            </p>
            <a href="${waAcompanante}" style="display:inline-block;padding:13px 26px;background:#f3259a;color:#fff;text-decoration:none;font-weight:600;font-size:14px;border-radius:999px">💬 Registrar a mi acompañante</a>
          </td></tr>
        </table>
      </td></tr>`
    : ''

  // ============== AGENDA VIP (solo VIP) ==============
  const agendaVipBlock = isVip
    ? `
      <tr><td style="padding:24px 32px 0">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff8d6;border:2px solid #ffd23f;border-radius:8px">
          <tr><td style="padding:24px">
            <p style="margin:0 0 6px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#8a7a30;font-weight:600">★ Tu agenda completa · Imprimible</p>
            <p style="margin:0 0 12px;font-size:20px;line-height:1.25;color:#0a0a0a;font-family:Georgia,serif">
              Mira tu agenda VIP completa
            </p>
            <p style="margin:0 0 18px;font-size:14px;line-height:1.65;color:#3a3a3a">
              Cronología hora a hora del 16 de mayo + detalle de tus 3 sesiones privadas + cómo agendar con cada experto. <strong style="color:#0a0a0a">Puedes guardarla o imprimirla.</strong>
            </p>
            <a href="${vipAgendaUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:13px 26px;background:#ffd23f;color:#0a0a0a;text-decoration:none;font-weight:600;font-size:14px;border-radius:999px">★ Ver mi agenda VIP</a>
          </td></tr>
        </table>
      </td></tr>`
    : ''

  // ============== GRUPO WHATSAPP (VIP o General) ==============
  const grupoBlock = isVip
    ? `
      <tr><td style="padding:24px 32px 0">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,210,63,.08);border:1px solid rgba(255,210,63,.4);border-radius:8px">
          <tr><td style="padding:24px">
            <p style="margin:0 0 6px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#ffd23f;font-weight:600">Súmate al grupo VIP · Solo para compradores VIP</p>
            <p style="margin:0 0 12px;font-size:20px;line-height:1.25;color:#f5f0e8;font-family:Georgia,serif">
              Te recibimos en el grupo VIP
            </p>
            <p style="margin:0 0 18px;font-size:14px;line-height:1.65;color:rgba(245,240,232,.85)">
              Ahí coordinas tus 3 sesiones 1:1 con Yoselvia, Valentina y Sebastián. También recibes recordatorios, contenido pre-evento y ubicación exacta del lugar. <strong style="color:#f5f0e8">Privado y exclusivo</strong> para quienes compraron el VIP.
            </p>
            <a href="${waGroup}" style="display:inline-block;padding:13px 26px;background:#25D366;color:#fff;text-decoration:none;font-weight:600;font-size:14px;border-radius:999px">💬 Entrar al grupo VIP</a>
          </td></tr>
        </table>
      </td></tr>`
    : `
      <tr><td style="padding:24px 32px 0">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,210,63,.08);border:1px solid rgba(255,210,63,.4);border-radius:8px">
          <tr><td style="padding:24px">
            <p style="margin:0 0 6px;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#ffd23f;font-weight:600">Súmate al grupo · Solo para compradores</p>
            <p style="margin:0 0 12px;font-size:20px;line-height:1.25;color:#f5f0e8;font-family:Georgia,serif">
              Te recibimos en el grupo de Next Level Experience
            </p>
            <p style="margin:0 0 18px;font-size:14px;line-height:1.65;color:rgba(245,240,232,.85)">
              Ahí van los recordatorios, contenido pre-evento, ubicación exacta del lugar y networking con el resto del grupo. <strong style="color:#f5f0e8">Privado y exclusivo.</strong>
            </p>
            <a href="${waGroup}" style="display:inline-block;padding:13px 26px;background:#25D366;color:#fff;text-decoration:none;font-weight:600;font-size:14px;border-radius:999px">💬 Unirme al grupo</a>
          </td></tr>
        </table>
      </td></tr>`

  // ============== HTML COMPLETO ==============
  const html = `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f5f0e8">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#141414;border-radius:8px;overflow:hidden">

        <!-- HERO -->
        <tr><td style="padding:40px 32px 0;text-align:center">
          <p style="margin:0;font-size:11px;letter-spacing:.3em;color:#d4b896;font-weight:600">TU LUGAR ESTÁ RESERVADO</p>
          <h1 style="margin:16px 0 0;font-size:34px;line-height:1.1;color:#f5f0e8;font-weight:400;font-family:Georgia,serif">
            ${greeting},<br><span style="color:#ffd23f;font-style:italic">ya estás dentro de Next Level Experience.</span>
          </h1>
        </td></tr>

        <!-- BODY -->
        <tr><td style="padding:24px 32px 0">
          <p style="margin:0;font-size:16px;line-height:1.65;color:rgba(245,240,232,.85)">
            Confirmamos tu <strong>${ticketDisplayName}</strong>. Acabas de tomar una decisión que pocos toman: parar, mirar tu negocio con otros ojos y empezar a dirigir desde tu siguiente nivel.
          </p>
        </td></tr>

        <!-- DATOS EVENTO -->
        <tr><td style="padding:32px 32px 0">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border:1px solid rgba(212,184,150,.2);border-radius:8px">
            <tr><td style="padding:24px">
              <p style="margin:0 0 16px;font-size:10px;letter-spacing:.3em;color:#ffd23f;text-transform:uppercase;font-weight:600">Guarda la fecha</p>
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
              <p style="margin:18px 0 0;padding-top:14px;border-top:1px solid rgba(212,184,150,.15);font-size:13px;line-height:1.6;color:rgba(245,240,232,.65)">
                Si no recibes comprobante en los próximos minutos, <strong style="color:#f5f0e8">revisa spam o promociones.</strong>
              </p>
            </td></tr>
          </table>
        </td></tr>

        ${vipBlock}
        ${agendaVipBlock}
        ${acompananteBlock}
        ${grupoBlock}

        <!-- CTAs -->
        <tr><td style="padding:32px 32px 0;text-align:center">
          <a href="${calendarUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:14px 28px;background:#ffd23f;color:#0a0a0a;text-decoration:none;font-weight:600;font-size:14px;border-radius:999px;margin:0 4px 12px">📅 Agregar a Google Calendar</a>
          <a href="${waDudas}" style="display:inline-block;padding:14px 28px;background:#1a1a1a;border:1px solid rgba(212,184,150,.3);color:#f5f0e8;text-decoration:none;font-weight:600;font-size:14px;border-radius:999px;margin:0 4px 12px">💬 Tengo una duda</a>
        </td></tr>

        <!-- CIERRE EMOCIONAL -->
        <tr><td style="padding:32px 32px 0;text-align:center">
          <p style="margin:0;font-size:18px;line-height:1.5;color:rgba(245,240,232,.9);font-style:italic;font-family:Georgia,serif">
            Nos vemos el 16 de mayo en Santiago.<br>
            <span style="color:#ffd23f;font-style:normal">Ven a vivirlo.</span>
          </p>
        </td></tr>

        <!-- FOOTER -->
        <tr><td style="padding:32px;text-align:center">
          <p style="margin:32px 0 0;padding-top:24px;border-top:1px solid rgba(212,184,150,.15);font-size:11px;letter-spacing:.2em;color:#8a8580;text-transform:uppercase;font-weight:500">NEXT LEVEL · 2nd Edition · Santiago 2026</p>
          <p style="margin:8px 0 0;font-size:11px;color:#8a8580">¿Dudas? Responde este email o escríbenos por <a href="${waDudas}" style="color:#ffd23f;text-decoration:underline">WhatsApp</a></p>
          <p style="margin:8px 0 0;font-size:11px"><a href="${home}" style="color:#8a8580;text-decoration:underline">${CONTACT.domain}</a></p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`

  // ============== TEXT FALLBACK ==============
  const text = `${greeting}, ya estás dentro de Next Level Experience.

Confirmamos tu ${ticketDisplayName}.

GUARDA LA FECHA
📅 ${WORKSHOP.date.display}
🕐 14h a 21h · ${WORKSHOP.duration}
📍 ${WORKSHOP.venue.full}

${
  isVip
    ? `TU ACTIVO VIP — 3 sesiones 1:1 post-evento:
★ Yoselvia · Auditoría VIP de tu negocio con Claude (60 min)
★ Valentina · Colorimetría VIP + revisión de imagen y presencia (60 min)
★ Sebastián · Revisión personalizada de comunicación y ventas (60 min)
Te contactaremos por WhatsApp después del 16 de mayo para coordinar.

TU AGENDA VIP COMPLETA (cronología + sesiones + cómo agendar):
${vipAgendaUrl}

`
    : ''
}${
    isGeneral
      ? `TU ENTRADA INCLUYE 2×1
¿Vienes con alguien? Registra a tu acompañante por WhatsApp:
${waAcompanante}

`
      : ''
  }${
    isVip
      ? `SÚMATE AL GRUPO VIP (privado, solo para compradores VIP)
Ahí coordinas tus 3 sesiones 1:1 con cada mentor:
${waGroup}`
      : `SÚMATE AL GRUPO EXCLUSIVO
Recordatorios, ubicación exacta y networking con el resto del grupo:
${waGroup}`
  }

Agregar a Google Calendar: ${calendarUrl}
WhatsApp directo: ${waDudas}

Nos vemos el 16 de mayo en Santiago. Ven a vivirlo.

— Next Level Experience · ${home}
`.trim()

  return { subject, html, text }
}
