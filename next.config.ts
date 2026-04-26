import type { NextConfig } from 'next'

/**
 * Content Security Policy — modo REPORT-ONLY.
 * No bloquea nada todavía; solo loguea violaciones en la consola del navegador.
 * Tras 1 semana monitoreando: pasar el header a `Content-Security-Policy` para
 * empezar a bloquear de verdad.
 *
 * Cubre los integradores actuales: GTM, Meta Pixel, Hotjar, Wistia, Google Fonts,
 * MercadoPago (form-action). Si agregás un servicio nuevo, recordá whitelistearlo.
 */
const cspDirectives: Record<string, string[]> = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Inline scripts del Trackers (GTM/Pixel/Hotjar bootstrap)
    "'unsafe-eval'", // Hotjar y Wistia usan eval interno
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://connect.facebook.net',
    'https://*.hotjar.com',
    'https://*.hotjar.io',
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
    'https://*.hotjar.com',
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
    'https://*.hotjar.com',
    'https://*.hotjar.io',
    'wss://*.hotjar.com',
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
}

const cspString = Object.entries(cspDirectives)
  .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
  .join('; ')

/**
 * Headers de seguridad globales.
 * Aplican a todas las rutas servidas por Next.js.
 */
const securityHeaders = [
  // Fuerza HTTPS en futuras visitas (1 año + subdominios + preload)
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Previene clickjacking (la página no se puede embeber en iframes externos)
  { key: 'X-Frame-Options', value: 'DENY' },
  // Previene MIME-sniffing — el navegador respeta el Content-Type declarado
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Limita la info de Referer enviada en navegación externa
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Bloquea acceso a APIs sensibles del navegador (cámara, mic, geo, pagos web)
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
  // CSP en modo report-only — no bloquea aún, solo loguea violaciones
  {
    key: 'Content-Security-Policy-Report-Only',
    value: cspString,
  },
]

const nextConfig: NextConfig = {
  // Activa el MCP server en /_next/mcp (Next.js 16+)
  experimental: {
    mcpServer: true,
  },

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
