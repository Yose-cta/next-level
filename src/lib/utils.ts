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
