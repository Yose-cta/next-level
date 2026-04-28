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

## Tracking activo (4 plataformas) — 2026-04-26

| Tracker | env var | ID |
|---|---|---|
| Google Tag Manager | `NEXT_PUBLIC_GTM_ID` | `GTM-TVFBZP8N` |
| Google Analytics 4 | `NEXT_PUBLIC_GA4_ID` | `G-1HD402XQ6V` |
| Meta Pixel | `NEXT_PUBLIC_META_PIXEL_ID` | `1595688924875467` |
| Microsoft Clarity | `NEXT_PUBLIC_CLARITY_ID` | `whv2dxsb09` |

**Eventos custom:** `begin_checkout` (click CTAs) y `purchase` (en /gracias con MP confirmation) — ver `src/lib/analytics.ts`. Disparan a GTM dataLayer + GA4 gtag + Meta Pixel fbq simultáneamente.

**REGLA:** GA4 está instalado vía código (gtag.js en Trackers.tsx). NO configurar GA4 también dentro de GTM (causaría doble PageView).

**Hotjar reemplazado por Clarity** — cuenta Hotjar migrada a Contentsquare con panel roto. Clarity es free unlimited.

## Seguridad webhook MP

- POST: HMAC-SHA256 timing-safe (`MERCADOPAGO_WEBHOOK_SECRET`) + fail-closed en producción
- GET (legacy IPN): shared secret en URL via `MERCADOPAGO_IPN_KEY` — configurar en MP dashboard como `https://nl.yosmentedigital.com/api/mercadopago/webhook?key=<value>`
- Respuesta opaca (no leakea compra_id ni email_sent)
- PII enmascarada en logs

## CSP enforcing en producción

`next.config.ts` tiene CSP en modo bloqueante (no Report-Only) con whitelist específica para todos los dominios de los integradores. Si agregás un servicio nuevo, hay que whitelistearlo en `script-src`, `connect-src`, `img-src` y `frame-src` según corresponda.
