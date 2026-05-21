import { CONTACT } from '@/lib/constants'

interface BuildArgs {
  nombre: string | null
  encuestaUrl: string
}

/**
 * Email de invitacion a la encuesta de satisfaccion post-evento.
 * Template HTML inline-styled (sin React Email) para max compatibilidad.
 */
export function buildEncuestaEmail({ nombre, encuestaUrl }: BuildArgs) {
  const greeting = nombre ? `Hola ${nombre.split(' ')[0]}` : 'Hola'

  const subject = '¿Cómo te fue en Next Level Experience? · 2 minutos'

  const text = `${greeting},

Gracias por haber sido parte de Next Level Experience.

Queremos hacer la próxima edición mejor — y para eso necesitamos tu opinión honesta.

Toma 2 minutos. Tu feedback nos ayuda más que cualquier "gracias".

Responder la encuesta:
${encuestaUrl}

Si tu testimonio nos lo autorizas, puede ayudar a que más personas se animen a vivir esta experiencia.

Gracias por confiar.

— Yoselvia, Valentina y Sebastián
   Next Level Experience
`

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0f172a;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;">
<tr><td align="center">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06);">

  <!-- HEADER -->
  <tr>
    <td style="padding:32px 32px 16px;text-align:center;border-bottom:1px solid #f1f5f9;">
      <p style="margin:0;font-size:11px;letter-spacing:2px;font-weight:600;color:#64748b;text-transform:uppercase;">
        Next Level Experience
      </p>
      <p style="margin:6px 0 0;font-size:12px;color:#94a3b8;">
        Edición 16 mayo · Santiago
      </p>
    </td>
  </tr>

  <!-- BODY -->
  <tr>
    <td style="padding:32px;">
      <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;font-weight:600;color:#0f172a;">
        ${greeting}, ¿cómo te fue?
      </h1>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#334155;">
        Gracias por haber sido parte de Next Level Experience.
      </p>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#334155;">
        Queremos hacer la próxima edición mejor — y para eso necesitamos tu opinión <strong>honesta</strong>.
      </p>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#334155;">
        Toma 2 minutos. Tu feedback nos ayuda más que cualquier "gracias".
      </p>

      <!-- CTA -->
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 8px;">
        <tr>
          <td style="border-radius:9999px;background:#0f172a;">
            <a href="${encuestaUrl}" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:9999px;">
              Responder encuesta (2 min) →
            </a>
          </td>
        </tr>
      </table>

      <p style="margin:24px 0 0;font-size:13px;line-height:1.5;color:#64748b;">
        Si tu testimonio nos lo autorizas, puede ayudar a que más personas se animen a vivir esta experiencia.
      </p>
    </td>
  </tr>

  <!-- DIVISOR + FIRMA -->
  <tr>
    <td style="padding:24px 32px 32px;border-top:1px solid #f1f5f9;">
      <p style="margin:0 0 4px;font-size:14px;line-height:1.5;color:#334155;">
        Gracias por confiar.
      </p>
      <p style="margin:0;font-size:14px;line-height:1.5;color:#334155;">
        <strong>Yoselvia, Valentina y Sebastián</strong><br>
        <span style="color:#64748b;">Next Level Experience</span>
      </p>
    </td>
  </tr>

  <!-- FOOTER -->
  <tr>
    <td style="padding:16px 32px;background:#f8fafc;text-align:center;">
      <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.5;">
        Recibiste este correo porque asististe a Next Level Experience.<br>
        <a href="${CONTACT.url}" style="color:#94a3b8;text-decoration:underline;">${CONTACT.domain}</a>
      </p>
    </td>
  </tr>

</table>

</td></tr>
</table>

</body>
</html>`

  return { subject, html, text }
}
