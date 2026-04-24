import { CONTACT, WORKSHOP } from './constants'

/**
 * Genera un .ics (iCalendar) con el evento del workshop.
 * Lo usamos para el botón "Agregar al calendario" en la página de gracias.
 */
export function buildIcs() {
  const start = new Date(WORKSHOP.date.iso)
  const end = new Date(start.getTime() + WORKSHOP.totalHours * 60 * 60 * 1000)

  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

  const uid = `next-level-${start.getTime()}@${CONTACT.domain}`

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//Next Level//Workshop//ES`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:Next Level Workshop`,
    `DESCRIPTION:6 horas presenciales · 3 mentores · IA aplicada\\, imagen y comunicación. Información: ${CONTACT.url}`,
    `LOCATION:${WORKSHOP.venue.full}`,
    `URL:${CONTACT.url}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Recordatorio Next Level Workshop',
    'TRIGGER:-PT1D',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n')
}
