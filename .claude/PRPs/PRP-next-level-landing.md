# PRP — Next Level Landing Migration

> **Status:** Aprobado por Yoselvia · 2026-04-24
> **Owner:** Yoselvia Adam (cliente) + Claude (ejecutor)
> **Skills:** `bucle-agentico` para ejecutar · `add-payments` (MP en lugar de Polar) · `add-emails` (Resend) · `supabase` · `playwright-cli` para validar

---

## 1. Goal

Migrar la landing **Next Level Workshop** desde HTML standalone (`next-level.html`, 1225 líneas) a una página **Next.js 16 production-ready**, deployada en `nl.yosmentedigital.com`, con **MercadoPago Checkout Pro**, **CRM básico en Supabase**, **email automático con Resend** post-pago, **sistema editable in-browser** (texto + fotos + Wistia), y **WhatsApp flotante** para soporte.

## 2. Non-Goals (fuera de alcance esta iteración)

- Evolution API / WhatsApp automático post-pago (fase 2 cuando haya instancia)
- Hotjar / Meta Pixel / GTM (placeholders solamente, se conectan después)
- Dashboard CRM con UI (la tabla Supabase es suficiente por ahora)
- Login de cliente (no necesario para este flujo)

## 3. Stack confirmado

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 + React 19 + TypeScript |
| Estilos | Tailwind 3.4 + paleta editorial noir |
| Fuentes | Fraunces (display) + Inter (body) + Spline Sans Mono (UI) — vía `next/font` |
| BD | Supabase (tabla `compras` con RLS) |
| Pagos | MercadoPago Checkout Pro (Chile) |
| Emails | Resend + React Email (sender provisional `onboarding@resend.dev`) |
| Hosting | Vercel + Vercel Analytics |
| Dominio | `nl.yosmentedigital.com` |

## 4. Critical Info

- **WhatsApp soporte:** `+56 9 3583 4551` · mensaje pre: "Hola Yoselvia! Quiero más información sobre Next Level Workshop"
- **Email sender:** `onboarding@resend.dev` (provisional hasta verificar dominio)
- **MercadoPago:** credenciales en `.env.local` (NO commit) — Yoselvia debe rotar el access token expuesto en chat después del go-live
- **Workshop:** Sábado 16 mayo 2026, 14h–21h, Condell 1337 Providencia Santiago

## 5. Data Model

```sql
-- Migration: 0001_create_compras.sql
create table public.compras (
  id uuid primary key default gen_random_uuid(),
  ticket_type text not null check (ticket_type in ('general', 'vip')),
  comprador_email text not null,
  comprador_nombre text,
  comprador_telefono text,
  monto_clp integer,
  monto_usd integer,
  payment_id text unique,
  preference_id text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'refunded')),
  raw_webhook jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.compras enable row level security;
-- Solo service_role lee/escribe (no exposición pública)
create policy "service only" on public.compras for all to service_role using (true);
```

## 6. File Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing principal
│   ├── gracias/page.tsx            # Post-pago
│   ├── api/
│   │   ├── checkout/route.ts       # Crea preferencia MP
│   │   └── mercadopago/webhook/route.ts  # Webhook MP → Supabase + Resend
│   └── layout.tsx
├── components/landing/
│   ├── StickyBar.tsx
│   ├── Hero.tsx
│   ├── Ticker.tsx
│   ├── Mirror.tsx
│   ├── CostOfInaction.tsx
│   ├── Promise.tsx
│   ├── ExperienceBlocks.tsx        # 3 bloques tangibles
│   ├── Mentors.tsx
│   ├── Tickets.tsx
│   ├── Testimonials.tsx
│   ├── Guarantee.tsx
│   ├── FAQ.tsx
│   ├── Closing.tsx
│   ├── Footer.tsx
│   └── WhatsAppFloating.tsx
├── components/editable/
│   ├── EditableText.tsx
│   ├── EditableImage.tsx
│   ├── EditableVideo.tsx
│   ├── EditModeToggle.tsx
│   └── useEditMode.ts
├── lib/
│   ├── mercadopago.ts              # SDK wrapper
│   ├── supabase/server.ts
│   ├── resend.ts
│   └── constants.ts                # Workshop info, precios, etc.
└── emails/
    └── ConfirmacionCompra.tsx      # React Email template
```

## 7. Phases

| # | Fase | Output | Validación |
|---|---|---|---|
| 1 | **Setup base** | Tailwind config con paleta noir, fonts via next/font, layout root con SEO, constants compartidos | `npm run dev` corre + tipografía Fraunces visible |
| 2 | **Componentes landing** | 14 componentes en `components/landing/` con copy actualizado (Yoselvia/Claude, VIP online 1:1, "Cupos limitados") | Página Home renderiza idéntica al HTML pero como React |
| 3 | **Sistema editable** | Hook `useEditMode` + componentes `EditableText/Image/Video` con localStorage | Modo edit toggle funciona, persiste tras reload |
| 4 | **MercadoPago** | API route `/api/checkout` crea preference + redirige · webhook `/api/mercadopago/webhook` recibe notificación | Compra de prueba (modo sandbox) llega a webhook con status approved |
| 5 | **Supabase CRM** | Migration tabla `compras` + RLS + helper de inserción desde webhook | Compra de prueba aparece en tabla con todos los datos |
| 6 | **Resend email** | Template React Email + envío automático desde webhook | Email llega a inbox después de compra de prueba con detalles del evento + botón WhatsApp |
| 7 | **Página /gracias** | Vista post-pago con info evento + botón WhatsApp grande + botón "agregar al calendario" (.ics) | Redirect post-MP funciona, página renderiza |
| 8 | **WhatsApp flotante + Tracking placeholders** | Componente WA fijo bottom-right + slots para Hotjar/Meta/GTM (env vars vacías por ahora) + Vercel Analytics activado | WA visible en mobile y desktop, abre wa.me con mensaje pre-cargado |
| 9 | **Deploy** | Push a Vercel + dominio `nl.yosmentedigital.com` configurado + variables de entorno cargadas en Vercel | URL responde con status 200, certificado SSL OK |
| 10 | **Validación Playwright** | Test E2E del flow: home → click ticket → MP sandbox → webhook → email | Test pasa end-to-end |

## 8. Cambios sobre HTML actual

1. **VIP** = post-evento online 1:1 con Yoselvia (no presencial el sábado) — corregir copy en sección Tickets y bloque del timeline
2. **"35 cupos"** → **"Cupos limitados"** en todos lados (sticky bar, hero, cierre)
3. **WhatsApp flotante** esquina inferior derecha (siempre visible)
4. **"Vive la experiencia"** reformulada: 3 bloques tangibles (no timeline cronológica) — uno por mentor con "qué aprendes / qué te llevas / qué cambia"
5. **Diseño** push hacia más elegante / lujo / innovador (animaciones sutiles, micro-interacciones, mejor jerarquía)

## 9. Variables de entorno necesarias

```bash
# .env.local (NO commit — agregar a .gitignore)
NEXT_PUBLIC_SITE_URL=https://nl.yosmentedigital.com

# MercadoPago
MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxx  # SECRET — server only
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-xxx  # OK público

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Resend
RESEND_API_KEY=re_xxx
RESEND_FROM_EMAIL=onboarding@resend.dev

# Tracking (vacíos por ahora, se llenan después)
NEXT_PUBLIC_HOTJAR_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_GTM_ID=

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=56935834551
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hola Yoselvia! Quiero más información sobre Next Level Workshop
```

## 10. Validation criteria (Definition of Done)

- [ ] Lighthouse Mobile > 90
- [ ] Compra de prueba (MP sandbox) llega a Supabase con status approved
- [ ] Email de confirmación llega a inbox dentro de 30s del pago
- [ ] WhatsApp flotante abre wa.me con mensaje pre-cargado
- [ ] Sistema editable funciona en `/` y persiste tras reload
- [ ] Página `/gracias` renderiza después del redirect de MP
- [ ] Deploy en `nl.yosmentedigital.com` accesible con SSL
- [ ] Test Playwright pasa end-to-end

## 11. Risks y mitigación

| Riesgo | Mitigación |
|---|---|
| Token MP expuesto en chat | Yoselvia rota el token desde panel MP después del go-live |
| Resend dominio no verificado | Usamos `onboarding@resend.dev` provisional, después configuramos DNS |
| Webhook MP no llega en localhost | Usamos `ngrok` o tunneling para test local; en prod Vercel funciona directo |
| Tabla `compras` sin backup | Supabase hace backups automáticos diarios |
| Sistema editable usa localStorage (no compartido entre dispositivos) | Aceptable: solo Yoselvia edita, una vez confirmado se hace deploy del estado final |

---

**Aprobación:** Yoselvia confirmó stack, dominio, decisiones críticas. Listo para `bucle-agentico`.

---

## 12. Aprendizajes (auto-blindaje)

### 2026-04-24: Turbopack dev watcher rompe en WSL filesystem desde Windows
- **Error**: Watchpack dispara EISDIR recursivo en cada nivel de `Z:\home\...` y reinicia el server en loop, devolviendo 404 después del primer render.
- **Síntoma**: Primer GET responde 200 con HTML completo. Segundos GETs devuelven 404 con mensaje del Pages Router.
- **Fix temporal**: Validar con `next build` (no usa watcher) en lugar de `next dev`.
- **Fix permanente** (pendiente): Mover proyecto a filesystem nativo Windows, o instalar Node dentro de WSL y correr dev server desde ahí, o configurar `next.config.ts` con `webpackDevMiddleware: { config: { watchOptions: { poll: 1000 }}}`.
- **Aplicar en**: Cualquier proyecto Next.js que viva en WSL filesystem y se edite/sirva desde Windows.

### 2026-04-24: Symbol `Promise` colisiona con global JS
- **Error**: Componente exportado como `Promise` colisiona con `globalThis.Promise` y aunque pasa typecheck, es práctica peligrosa.
- **Fix**: Renombrar a `PromiseSection`.
- **Aplicar en**: Nunca usar nombres de globales JS (Promise, Map, Set, Date, Error) como identificadores de componentes.

### 2026-04-24: Reveal-on-scroll requiere IntersectionObserver client component
- **Error**: HTML standalone tenía `IntersectionObserver` inline en `<script>` que activaba `.reveal → .visible`. Al portar a Next.js, los componentes server quedaron con `.reveal` (opacity 0) sin nada que los activara → página renderizó completamente "negra" (texto invisible).
- **Síntoma**: Build pasa, deploy OK, HTTP 200, HTML válido con `text-cream` aplicado. Computed style del span dice `color: rgb(245,240,232)` y `opacity: 1` en el SPAN, pero el padre `.reveal` con opacity 0 lo oculta.
- **Fix**: Crear `src/components/RevealOnScroll.tsx` ('use client') que monta IO una vez y observa `.reveal` elementos. Importar en layout.tsx después del children. Fallback: si no hay IO disponible, marcar todos como visible.
- **Aplicar en**: Cualquier port de HTML standalone con `.reveal`/`.fade-in`/scroll animations a React. Server components no pueden ejecutar IO — necesitan un client wrapper.

### 2026-04-24: npx tsc detecta package fantasma cuando no encuentra local
- **Error**: `npx tsc` cuando no hay `tsc` en PATH instala `tsc@2.0.4` (un package no relacionado al TypeScript real).
- **Fix**: Llamar el binario directo: `node node_modules/typescript/bin/tsc --noEmit`.
- **Aplicar en**: Validación TS desde scripts donde el binario local pueda no estar en PATH (Windows con node_modules de WSL).
