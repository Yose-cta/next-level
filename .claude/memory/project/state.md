# Estado del Proyecto · Next Level Experience

> **Última actualización:** 2026-04-26 · cierre del día

## URLs vivas

| Tipo | URL |
|---|---|
| Producción | https://nl.yosmentedigital.com |
| Vercel preview alias | https://next-level-seven-rose.vercel.app |
| Vercel dashboard | https://vercel.com/yose-ctas-projects/next-level |
| Supabase dashboard | https://supabase.com/dashboard/project/zpviurroxadbzciigxmc |
| GA4 dashboard | https://analytics.google.com (property: Next Level Experience) |
| Meta Events Manager | https://business.facebook.com/events_manager2 (dataset: nextlevelexperience) |
| Microsoft Clarity | https://clarity.microsoft.com/projects/view/whv2dxsb09 |
| Google Tag Manager | https://tagmanager.google.com (container: GTM-TVFBZP8N) |

## IDs importantes

| Servicio | ID |
|---|---|
| Vercel project | `prj_b4WYeKGfuPxb1y9vWPvVdPFaYdwb` |
| Vercel team | `team_jGwoOoGnlnQ7YUwE6I7sEDPW` (yose-ctas-projects) |
| Supabase project ref | `zpviurroxadbzciigxmc` |
| MercadoPago user | `710845593` (yose-cta@yoselviaadam.com) |
| GTM container | `GTM-TVFBZP8N` |
| Meta Pixel | `1595688924875467` (dataset `nextlevelexperience`) |
| Google Analytics 4 | `G-1HD402XQ6V` (Stream ID `14591535441`) |
| Microsoft Clarity | `whv2dxsb09` |

## Lo que está LIVE (2026-04-26)

### Sistema base
- ✅ Landing en `nl.yosmentedigital.com` con SSL
- ✅ Tickets General $67k / VIP $147k en CLP
- ✅ Checkout MercadoPago Chile funcionando (verificado con compra real $500 CLP que pasó OK)
- ✅ Webhook MP → Supabase tabla `compras` (idempotente, HMAC timing-safe, fail-closed)
- ✅ Email Resend automático post-pago aprobado (con email enmascarado en logs)
- ✅ Página `/gracias` con WhatsApp + .ics calendar + tracking
- ✅ WhatsApp flotante bottom-right
- ✅ Diseño deluxe híbrido dark+light (alternancia tipo josevillalobos.ai)

### Tracking + Analytics (4 plataformas)
- ✅ **Google Tag Manager** — `GTM-TVFBZP8N` activo
- ✅ **Google Analytics 4** — `G-1HD402XQ6V` activo (instalado vía gtag, no GTM)
- ✅ **Meta Pixel** — `1595688924875467` activo + verificado (PageView + InitiateCheckout)
- ✅ **Microsoft Clarity** — `whv2dxsb09` activo (reemplazó Hotjar)
- ✅ Eventos `begin_checkout` (click CTAs) y `purchase` (en /gracias con MP confirm)
- ✅ Disparo simultáneo a GTM dataLayer + GA4 gtag + Meta Pixel fbq

### Seguridad (defense in depth — 12/12 pentest passed)
- ✅ HSTS + X-Frame-Options DENY + X-Content-Type-Options nosniff
- ✅ Referrer-Policy + Permissions-Policy (11 APIs bloqueadas)
- ✅ **Content-Security-Policy ENFORCING** (whitelist GTM/Pixel/Clarity/Wistia/MP)
- ✅ COOP + CORP (process isolation contra Spectre)
- ✅ X-Permitted-Cross-Domain-Policies + X-Powered-By eliminado
- ✅ Production: removeConsole + no source maps + no fingerprint
- ✅ Webhook POST: HMAC-SHA256 timing-safe + fail-closed
- ✅ Webhook GET (legacy IPN): shared secret en URL `?key=`
- ✅ PII (email) enmascarada en logs
- ✅ Rate limit `/api/checkout`: 10 req/min IP + cookie debounce 3s

### Visuales
- ✅ Hero image branded (equipo + "NEXT LEVEL EXPERIENCE" wordmark)
- ✅ OG cover image (mejora drástica del social sharing)
- ✅ VIP key image (gold treatment) en 3 puntos exclusivos: agenda HTML + /gracias + email
- ✅ **Mobile-first hero:** la imagen se muestra ANTES del copy en mobile (desktop intacto)

### Copy
- ✅ Hero reescrito (audiencia más amplia, 3 párrafos punzantes)
- ✅ Bloque 01 IA (Yoselvia) rebuild completo — usuario marcó como FINAL

## Lo que falta

### 🔴 Bloqueante para sacarle jugo a GA4 (5 min)
- [ ] Marcar `purchase` como Key Event (conversión) en GA4 → estrella ⭐
- [ ] Configurar moneda CLP en GA4 Property Settings

### 🟡 Recomendado próximos días
- [ ] Crear Funnel Exploration en GA4 (page_view → begin_checkout → purchase)
- [ ] Verificar Realtime en GA4
- [ ] Vincular Search Console a GA4
- [ ] Marcar `Purchase` como conversión en Meta Ads Manager

### 🟢 Opcional / cuando quiera
- [ ] Copy Bloques 02 (Imagen/Valentina) y 03 (Comunicación/Sebastián) — mismo tratamiento que 01
- [ ] Logo cubo aislado para favicon (la nueva imagen no funciona a 32×32)
- [ ] Recuperar acceso a Hotjar/Contentsquare vía soporte CSQ (si quiere)
- [ ] Configurar URL del IPN GET en MP dashboard con `?key=...` (si MP envía GETs)
- [ ] Verificar dominio `yosmentedigital.com` en Resend para emails desde `hola@`
- [ ] Subir fotos reales de mentores + testimonios
- [ ] Conectar videos Wistia en testimonios
- [ ] Evolution API para WhatsApp automático post-pago
- [ ] Vincular Google Ads a GA4

### 🔒 Seguridad operacional pendiente
- [ ] Rotar credenciales que se expusieron en chat anterior:
  - MercadoPago Access Token
  - Supabase Service Role Key + Personal Token
  - Resend API Key
  - Vercel API Token

## Hitos del 2026-04-26

19 commits. Sistema de tracking + seguridad pro + copy nueva + visuales + mobile UX. Working tree clean.

## Hitos del 2026-05-06 — incidente crítico resuelto

~10 commits adicionales. Resolución de incidente "cliente fantasma" + hardening webhook + performance + cleanup BD. Ver `.claude/skills/_daily-summaries/2026-05-06.md` para detalle completo.

### Bugs reales arreglados
- Webhook crasheaba HTTP 500 en `payment.payer.*` sin optional chaining (commit `c9f8b00`)
- Webhook ahora devuelve 200 + log en fallos de DB (no 500)
- TEST- access token detection in checkout
- live_mode=false rechazado en producción

### Infraestructura nueva
- `/api/admin/db-check?key=<IPN_KEY>` — diagnóstico Supabase
- `/api/admin/payment-recovery?key=<IPN_KEY>&id=<payment_id>[&resend_to=...]` — recovery manual de pagos
- `/api/cron/keepalive` — ping diario para evitar auto-pause (vercel.json)
- `scripts/compress-images.mjs` — compresor con sharp reusable

### Performance
- Imágenes /public: 8.01 MB → 1.87 MB (-77%)
- Sitio 3-5x más rápido en mobile

### Estado BD
- Supabase upgradeado a **Pro** (no más auto-pause)
- Tabla `compras` limpia: **0 registros** (los 12 viejos eran tests de dev)
- Estructura, RLS, índices intactos

### Último commit (cierre del 2026-05-06)
`5ebbe86 perf(images): compress oversized PNGs in /public — 8 MB → 1.87 MB (-77%)`
