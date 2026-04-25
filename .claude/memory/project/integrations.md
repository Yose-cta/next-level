# Integraciones Externas

## MercadoPago (Chile)

- **Modo:** Producción
- **Currency:** CLP nativo (no USD para evitar conversión inesperada)
- **Endpoint:** `https://api.mercadopago.com/checkout/preferences`
- **Webhook URL configurada en MP dashboard:** `https://nl.yosmentedigital.com/api/mercadopago/webhook`
- **Eventos suscritos:** `payment` únicamente
- **HMAC verification:** Habilitada (env `MERCADOPAGO_WEBHOOK_SECRET`)
- **Wrapper:** `src/lib/mercadopago.ts` (fetch directo, sin SDK)

## Supabase

- **Project ref:** `zpviurroxadbzciigxmc`
- **Region:** South America (São Paulo)
- **Plan:** Free
- **Tabla principal:** `public.compras` (15 columnas, RLS service_role-only, índices en payment_id/email/status, trigger updated_at)
- **Cliente browser:** `src/lib/supabase/client.ts` (anon)
- **Cliente server:** `src/lib/supabase/server.ts` (SSR cookies)
- **Cliente admin:** `src/lib/supabase/admin.ts` (service_role · solo API routes)

## Resend

- **From sender:** `Next Level <onboarding@resend.dev>` (provisional)
- **Pendiente:** verificar dominio `yosmentedigital.com` para enviar desde `hola@`
- **Template:** `src/emails/confirmacion-compra.ts` (HTML inline editorial — sin React Email dep)
- **Wrapper:** `src/lib/resend.ts` (fetch directo)
- **Disparo:** desde webhook MP cuando `status=approved && !email_enviado_at`

## Vercel

- **Project:** `next-level` en team `yose-ctas-projects`
- **Framework detectado:** Next.js
- **Build output:** Static + Dynamic routes (8 routes)
- **Domains:** `nl.yosmentedigital.com` (custom) + `next-level-seven-rose.vercel.app` (alias)
- **Analytics:** Vercel Analytics activado (free tier)
- **DNS de Yoselvia:** GoDaddy → CNAME `nl` → `cname.vercel-dns.com`

## MCPs disponibles

- `mcp__supabase__*` — listar tablas, ejecutar SQL, aplicar migrations
- `mcp__playwright__*` — testing visual y E2E
- `mcp__4aebae86...vercel__*` — deploy, list projects, get deployment

## Tracking pendientes (env vars vacías = no se renderizan)

- `NEXT_PUBLIC_HOTJAR_ID`
- `NEXT_PUBLIC_META_PIXEL_ID`
- `NEXT_PUBLIC_GTM_ID`

Ver `src/components/tracking/Trackers.tsx` — solo render si la env existe.
