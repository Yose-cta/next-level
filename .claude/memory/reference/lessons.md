# Lecciones Aprendidas (Auto-blindaje)

## Bugs encontrados + fixes permanentes

### 2026-04-23: Turbopack watcher loops infinitos en WSL filesystem
- **Error:** `Watchpack Error: EISDIR: illegal operation on a directory` recursivo, server reinicia en loop
- **Causa:** Turbopack en Next.js 16 watcher no tolera el FS UNC `\\wsl.localhost\Ubuntu\...`
- **Fix:** No usar `next dev` para validar. Usar `node node_modules/next/dist/bin/next build` o deploy a Vercel preview.
- **Aplica a:** Cualquier proyecto Next.js 16 corriendo desde Windows sobre WSL filesystem.

### 2026-04-23: `Promise` colisiona con global JS
- **Error:** Componente exportado como `Promise` rompe imports/runtime
- **Fix:** Renombrar a `PromiseSection` (o eliminar y usar otro nombre como `Takeaways`)
- **Aplica a:** Cualquier componente con nombres de globals JS (Promise, Symbol, Date, etc.)

### 2026-04-23: `npx tsc` instala paquete fantasma `tsc@2.0.4`
- **Error:** `npx tsc --noEmit` instala un paquete obsoleto sin relación con TypeScript real
- **Fix:** Usar `node node_modules/typescript/bin/tsc --noEmit` (binario local directo)
- **Aplica a:** Cualquier proyecto TypeScript en Windows + WSL fs

### 2026-04-23: Pages stuck con `opacity: 0` (RevealOnScroll missing)
- **Error:** Toda la página renderiza pero invisible (DOM ahí, opacity 0 forever)
- **Causa:** Las clases `.reveal` empiezan con `opacity: 0` y solo se vuelven `.visible` cuando un IntersectionObserver las agrega. Sin el observer, todo queda oculto.
- **Fix:** Component client `RevealOnScroll` montado en `layout.tsx` que escucha IntersectionObserver
- **Aplica a:** Cualquier página que use el patrón `.reveal` → `.visible`

### 2026-04-23: MercadoPago convierte USD → CLP confundiendo precios
- **Error:** Precios definidos en USD ($67) se convertían a CLP ($60.688) por el tipo de cambio MP
- **Fix:** Pasar `currency_id: 'CLP'` y `unit_price: 67000`/`147000` directo (CLP nativo)
- **Aplica a:** Cualquier integración MP Chile

### 2026-04-23: Sensitive env vars en Vercel no aceptan target `development`
- **Error:** API rechaza setear env var `type: 'sensitive'` con `target: ['production','preview','development']`
- **Fix:** Solo `['production', 'preview']` para sensitives. Development queda con valores de `.env.local`.
- **Aplica a:** Vercel API setup de env vars sensibles

### 2026-04-23: WhatsApp + FAB edit chocan en bottom-right
- **Error:** Ambos botones flotantes en mismo corner se superponen
- **Fix:** WhatsApp queda bottom-right (prioridad cliente). FAB edit movido a bottom-left.
- **Aplica a:** Cualquier app con múltiples FABs

### 2026-04-23: Vercel CLI no autenticado → 401 en deploy
- **Error:** `vercel deploy` sin login retorna 401
- **Fix:** Generar API token en https://vercel.com/account/tokens → pasarlo con `--token=$TOKEN`
- **Aplica a:** Deploys automáticos sin login interactivo

### 2026-04-23: Git "dubious ownership" en WSL filesystem desde Windows
- **Error:** `git status` falla con "dubious ownership in repository"
- **Fix:** `git config --global --add safe.directory '%(prefix)///wsl.localhost/Ubuntu/home/<user>/...'`
- **Aplica a:** Cualquier repo en WSL filesystem accesado desde Windows

### 2026-04-23: MCP Supabase placeholders no se actualizan después de editar `.mcp.json`
- **Error:** Aunque editás `.mcp.json` con credenciales reales, el MCP server cacheado sigue usando placeholders
- **Fix:** Usar Supabase Management API directamente vía fetch + Personal Access Token mientras tanto
- **Aplica a:** Cualquier MCP server que se cachea en memoria

### 2026-04-23: Cliente paste de credenciales en chat
- **Error:** Yoselvia pegó MP token, Supabase token, Resend key, Vercel token directamente en chat
- **Fix:** Advertir y guardar en `.env.local` (gitignored). Pedirle rotar después del go-live.
- **Aplica a:** Cualquier client interaction con credenciales

## Reglas derivadas

1. **Nunca usar `next dev` con Turbopack en WSL fs** — usar `next build` o Vercel preview
2. **Llamar binarios directos con `node node_modules/.../bin/...`** — evita npx fantasmas
3. **`RevealOnScroll` es OBLIGATORIO en layout** — sin él, todo invisible
4. **MP Chile en CLP nativo** — nunca pasar USD esperando conversión
5. **Sensitives Vercel solo en prod+preview** — nunca en development
6. **Recordar a clientes rotar credenciales** después de pegarlas en chat
