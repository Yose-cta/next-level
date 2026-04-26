import type { NextConfig } from 'next'

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
