/**
 * Rate limiter en memoria — defensa básica contra bots y double-clicks.
 *
 * LIMITACIONES:
 *  - In-memory: solo funciona en la misma instancia Lambda. Vercel puede
 *    correr múltiples instancias, así que un atacante distribuido evade.
 *  - Resetea en cold-start: bajo tráfico, el contador puede vaciarse seguido.
 *
 * UPGRADE PATH (cuando haya tráfico real):
 *  - @upstash/ratelimit + Upstash Redis (free tier 10k req/día)
 *  - Distribuido entre regiones de Vercel
 *  - Persiste entre cold-starts
 *
 * Para una landing pública con bajo volumen, esto + cookie debounce + DDoS
 * de Vercel Hobby es suficiente.
 */

interface Bucket {
  hits: number[]
}

const buckets = new Map<string, Bucket>()

interface RateLimitOptions {
  /** Identificador (IP, cookie value, etc.) */
  key: string
  /** Ventana en milisegundos */
  windowMs: number
  /** Hits máximos en la ventana */
  max: number
}

interface RateLimitResult {
  allowed: boolean
  /** Hits restantes en la ventana actual */
  remaining: number
  /** Cuándo se vence el rate limit (ms desde epoch) */
  resetAt: number
}

export function checkRateLimit({
  key,
  windowMs,
  max,
}: RateLimitOptions): RateLimitResult {
  const now = Date.now()
  const cutoff = now - windowMs

  const bucket = buckets.get(key) ?? { hits: [] }
  // Limpiar hits viejos
  bucket.hits = bucket.hits.filter((t) => t > cutoff)

  // Cleanup ocasional para evitar memory leak (ejecuta ~1 de cada 100 hits)
  if (Math.random() < 0.01) cleanupExpired(cutoff)

  if (bucket.hits.length >= max) {
    const oldestInWindow = bucket.hits[0] ?? now
    return {
      allowed: false,
      remaining: 0,
      resetAt: oldestInWindow + windowMs,
    }
  }

  bucket.hits.push(now)
  buckets.set(key, bucket)

  return {
    allowed: true,
    remaining: max - bucket.hits.length,
    resetAt: now + windowMs,
  }
}

function cleanupExpired(cutoff: number) {
  for (const [key, bucket] of buckets.entries()) {
    bucket.hits = bucket.hits.filter((t) => t > cutoff)
    if (bucket.hits.length === 0) buckets.delete(key)
  }
}

/**
 * Extrae IP del request. En Vercel viene en x-forwarded-for.
 * Fallback a un valor constante para que el limit aplique global si no hay IP.
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  const real = headers.get('x-real-ip')
  if (real) return real.trim()
  return 'unknown'
}
