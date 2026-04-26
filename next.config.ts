import type { NextConfig } from 'next'

/**
 * Content Security Policy — modo ENFORCING (bloquea, no solo avisa).
 *
 * Cubre los integradores actuales: GTM, Meta Pixel, Hotjar, Wistia, Google Fonts,
 * MercadoPago (form-action). Si agregás un servicio nuevo, recordá whitelistearlo
 * o el navegador lo va a bloquear silenciosamente.
 */
const cspDirectives: Record<string, string[]> = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Inline scripts del Trackers (GTM/Pixel/Clarity bootstrap)
    "'unsafe-eval'", // Clarity y Wistia usan eval interno
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://connect.facebook.net',
    'https://www.clarity.ms',
    'https://*.clarity.ms',
    'https://fast.wistia.net',
    'https://fast.wistia.com',
  ],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'img-src': [
    "'self'",
    'data:',
    'blob:',
    'https://www.facebook.com',
    'https://www.googletagmanager.com',
    'https://*.google-analytics.com',
    'https://*.clarity.ms',
    'https://*.wistia.com',
    'https://embed-fastly.wistia.com',
    'https://embedwistia-a.akamaihd.net',
  ],
  'font-src': ["'self'", 'data:', 'https://fonts.gstatic.com'],
  'connect-src': [
    "'self'",
    'https://www.googletagmanager.com',
    'https://*.google-analytics.com',
    'https://www.facebook.com',
    'https://connect.facebook.net',
    'https://www.clarity.ms',
    'https://*.clarity.ms',
    'https://*.wistia.com',
    'https://fast.wistia.net',
    'https://embed-fastly.wistia.com',
  ],
  'frame-src': [
    "'self'",
    'https://fast.wistia.net',
    'https://*.wistia.net',
    'https://www.googletagmanager.com',
    'https://www.facebook.com',
    'https://td.doubleclick.net',
  ],
  'form-action': [
    "'self'",
    'https://www.mercadopago.cl',
    'https://www.mercadopago.com',
  ],
  'base-uri': ["'self'"],
  'object-src': ["'none'"],
  'frame-ancestors': ["'none'"],
  // Fuerza HTTPS dentro de la página — bloquea cualquier recurso http://
  'upgrade-insecure-requests': [],
  // Bloquea inyección de mixed content
  'block-all-mixed-content': [],
}

const cspString = Object.entries(cspDirectives)
  .map(([directive, sources]) =>
    sources.length === 0 ? directive : `${directive} ${sources.join(' ')}`
  )
  .join('; ')

/**
 * Headers de seguridad globales (enforcing).
 * Aplican a todas las rutas servidas por Next.js.
 *
 * Defensa en profundidad — múltiples capas porque ninguna sola es perfecta.
 */
const securityHeaders = [
  // ---- Transporte ----
  // Fuerza HTTPS en futuras visitas (1 año + subdominios + preload)
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },

  // ---- Anti-clickjacking ----
  // La página no se puede embeber en iframes externos (defensa legacy)
  { key: 'X-Frame-Options', value: 'DENY' },

  // ---- Anti-MIME-sniffing ----
  // El navegador respeta el Content-Type declarado, no adivina
  { key: 'X-Content-Type-Options', value: 'nosniff' },

  // ---- Privacidad de Referer ----
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

  // ---- APIs sensibles del navegador ----
  // Bloquea cámara, mic, geo, pagos web a menos que sea necesario
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), magnetometer=(), gyroscope=(), accelerometer=(), midi=(), interest-cohort=()',
  },

  // ---- CSP — bloqueo real (no más report-only) ----
  // Bloquea ejecución de scripts y carga de recursos no whitelisted.
  // Esta es la defensa principal contra XSS, code injection y data exfil.
  { key: 'Content-Security-Policy', value: cspString },

  // ---- Aislamiento de procesos (Spectre / cross-origin) ----
  // Aísla el documento de cualquier ventana cross-origin
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  // Solo recursos same-origin pueden embeber este documento
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },

  // ---- Bloqueo de Flash legacy / Adobe ----
  { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },

  // ---- DNS prefetch control (privacy + perf) ----
  { key: 'X-DNS-Prefetch-Control', value: 'on' },

  // ---- Anti-IE legacy (no XSS auditor — era buggy) ----
  { key: 'X-XSS-Protection', value: '0' },
]

const nextConfig: NextConfig = {
  // Activa el MCP server en /_next/mcp (Next.js 16+)
  experimental: {
    mcpServer: true,
  },

  /**
   * Compiler hardening:
   * - removeConsole: elimina console.* de los bundles de producción.
   *   Reduce información expuesta a quien abra DevTools.
   *   Mantiene console.error para visibilidad de errores reales.
   */
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  /**
   * Producción: NO genera source maps (oculta el código fuente).
   */
  productionBrowserSourceMaps: false,

  /**
   * Oculta el header `X-Powered-By: Next.js`. Reduce info útil para fingerprinting.
   */
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
