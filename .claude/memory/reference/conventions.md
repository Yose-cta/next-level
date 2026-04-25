# Convenciones del Proyecto

## Idioma

**Español neutro chileno** en TODO el copy:
- ✅ tú, haces, sales, comunicas, vendes, te llevas
- ❌ vos, hacés, salís, comunicás, vendés, te llevás (Argentino)

## Naming

| Tipo | Convención | Ejemplo |
|---|---|---|
| Components | PascalCase | `MentorProfile.tsx` |
| Files | kebab-case (excepto components) | `mercadopago.ts` |
| Variables/funciones | camelCase | `whatsappUrl()` |
| Constants global | SCREAMING_SNAKE | `WORKSHOP`, `MENTORS`, `TICKETS` |
| CSS classes | kebab-case + prefijo `sec-` para sections | `sec-dark`, `sec-light`, `sec-shell` |

## Estilo de código

- TypeScript **strict mode** activado
- **NUNCA** `any` — usar `unknown` o tipos específicos
- Validar inputs externos con manual checks (no Zod por ahora — sin dep)
- Server Components por default, `'use client'` solo cuando se necesita
- Helpers en `lib/`, componentes en `components/`
- Exports nombrados (no defaults) excepto `page.tsx`/`layout.tsx`

## Tailwind

- Paleta custom en `tailwind.config.ts` — usar tokens semánticos:
  - `bg-midnight`, `bg-bone`, `bg-shell`
  - `text-ink`, `text-charcoal`, `text-ash`, `text-white/85`, etc.
  - `text-electric`, `text-magenta` (acentos)
  - `text-gold`, `text-gold-dark`, `text-gold-light` (detalles editoriales)
- Custom utilities en `globals.css`:
  - `.sec-dark` / `.sec-light` / `.sec-shell` (themes)
  - `.eyebrow` (labels mono)
  - `.reveal` (scroll fade-up)
  - `.magnetic` (CTAs que siguen cursor)
  - `.glass-dark` / `.glass-light`
  - `.clip-corner-tr` / `.clip-corner-bl` / `.ticket-shape`
  - `.orbit-ring` / `.photo-circle` / `.number-decor`

## Patrón "Reveal on scroll"

Los componentes usan `<div className="reveal">` que arranca con `opacity:0`. El componente client `RevealOnScroll` (montado en layout) hace IntersectionObserver y agrega `.visible` cuando entra al viewport.

⚠️ **Si quitas `<RevealOnScroll />` del layout, TODA la página queda invisible.**

## Patrón "Sistema editable in-browser"

Todos los textos críticos llevan `data-editable="key-único"`. Las imágenes `data-image="key"`. Los videos `data-video="key"`.

El `EditModeProvider` (client component en layout):
- Activa modo edit con `Cmd/Ctrl + E` o FAB ✏️
- En modo edit: `contentEditable=true` + click sobre images abre file picker + click sobre videos abre prompt Wistia
- Persiste todo en `localStorage` con prefijo `nl_`
- Botón "Restaurar" borra todo y vuelve al original

## Git

- Commits en Conventional Commits (English): `feat:`, `fix:`, `chore:`, `refactor:`
- NO commitear `.env.local`, `.next/`, `node_modules/`, `tsconfig.tsbuildinfo`
- NO commitear `.playwright-mcp/` (screenshots de testing)
- Confirmar con Yoselvia antes de commits que toquen muchos archivos

## Deploy

- `vercel deploy --prod --yes --token=$VERCEL_TOKEN`
- Build se hace en Vercel (Linux), evita issues de Turbopack en WSL fs
- Antes de deploy: validar con `node node_modules/next/dist/bin/next build` localmente
