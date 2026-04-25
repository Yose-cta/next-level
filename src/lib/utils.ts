type ClassValue = string | number | null | false | undefined | ClassValue[]

/**
 * Tailwind class merger lite — concatena clases válidas, ignora falsy.
 * Sin dependencias externas. Si más adelante agregamos `tailwind-merge`,
 * swap interno sin tocar callers.
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = []
  for (const i of inputs) {
    if (!i) continue
    if (Array.isArray(i)) out.push(cn(...i))
    else out.push(String(i))
  }
  return out.join(' ')
}

/**
 * URL builder para WhatsApp click-to-chat.
 */
export function whatsappUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

/**
 * URL para agregar evento a Google Calendar (abre en pestaña nueva).
 * No requiere descarga de archivo .ics — el usuario lo agrega con 1 click.
 */
export function googleCalendarUrl(opts: {
  title: string
  startUtc: string // formato: 20260516T180000Z
  endUtc: string // formato: 20260517T010000Z
  details: string
  location: string
}): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: opts.title,
    dates: `${opts.startUtc}/${opts.endUtc}`,
    details: opts.details,
    location: opts.location,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
