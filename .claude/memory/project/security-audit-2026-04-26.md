# Security Audit — Next Level Experience — 2026-04-26

> Auditoría completa contra OWASP-style checklist + pentest activo de producción.
> 8 fixes implementados en 3 commits. Skill `security-audit` creado en Synapis para futuras revisiones.

---

## Threat Model

**Assets:**
- Integridad del flow de pagos (MercadoPago)
- Base de compras en Supabase
- Access tokens server-side (MP, Resend, Supabase service role)
- Reputación de la marca

**Threat actors:**
- Bots oportunistas (escaneo automático de vulns)
- Atacantes targeted (competidores, scammers locales)
- Script kiddies (probando exploits conocidos)

**Worst case:**
- Webhooks falsos marcando compras como aprobadas → emails de confirmación a víctimas
- Spam masivo de checkouts inflando dashboard MP / agotando rate limits
- PII de compradores leakeada (Ley 19.628 CL)

---

## Hallazgos por severidad

### 🔴 Critical → FIXED

#### Vuln #1: EditModeProvider — XSS sink en código muerto
- **Archivo:** `src/components/editable/EditModeProvider.tsx` (eliminado)
- **Problema:** `el.innerHTML = localStorage.getItem(...)` permite Self-XSS persistente vía `<img onerror>`
- **Fix:** Archivo + directorio eliminados. Commit `0d19356`.

#### Vuln #2: Webhook GET bypassa autenticación
- **Archivo:** `src/app/api/mercadopago/webhook/route.ts:64-78`
- **Problema:** GET handler sin firma — atacante podía hitear `?topic=payment&id=X` y triggerar `processPayment()` con cualquier ID
- **Fix:** Shared secret en URL (`?key=<MERCADOPAGO_IPN_KEY>`). Fail-closed en prod. Commit `fe89cb9`.

### 🟠 High → FIXED

#### Vuln #3: Webhook POST fail-open si secret ausente
- **Antes:** `if (secret) {...}` — sin secret, procesaba cualquier POST
- **Fix:** Fail-closed en producción. Commit `0d19356`.

#### Vuln #4: HMAC comparison vulnerable a timing attack
- **Archivo:** `src/lib/mercadopago.ts:129`
- **Antes:** `return computed === sig` (string ==)
- **Fix:** `timingSafeEqual(Buffer.from(computed,'hex'), Buffer.from(sig,'hex'))`. Commit `0d19356`.

#### Vuln #5: Sin rate limit en /api/checkout
- **Problema:** Cada GET creaba preferencia real en MP API. Sin defensa contra spam/DDoS.
- **Fix:** In-memory IP rate limit (10/min) + cookie debounce (3s). Commit `fe89cb9`.

### 🟡 Medium → FIXED

#### Vuln #6: PII (email) en logs servidor
- **Archivo:** `webhook/route.ts:88` — `console.log({payer_email})`
- **Fix:** Función `maskEmail()` → `yo***@gmail.com`. Commit `fe89cb9`.

#### Vuln #7: Webhook leakea metadatos en respuesta
- **Antes:** Response exponía `compra_id` (UUID interno), `email_sent`, `status`
- **Fix:** Respuesta opaca `{ok:true}`. Commit `fe89cb9`.

#### Vuln #8: Sin Content-Security-Policy
- **Fix:** CSP en modo `report-only` con whitelist de GTM/Pixel/Hotjar/Wistia/MP. Commit `0d19356`.

---

## Headers de seguridad implementados

```
✅ Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
✅ X-Frame-Options: DENY
✅ X-Content-Type-Options: nosniff
✅ Referrer-Policy: strict-origin-when-cross-origin
✅ Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
✅ Content-Security-Policy-Report-Only: <whitelist completo>
```

---

## Pentest activo — resultados (12/12 pass post-fix)

| Ataque | Pre-fix | Post-fix |
|---|---|---|
| `GET /.env`, `.git/HEAD`, `package.json` | 404 ✅ | 404 ✅ |
| HTTP DELETE/PUT/PATCH/TRACE | 405 ✅ | 405 ✅ |
| `?ticket=<script>alert(1)</script>` | 400 ✅ | 400 ✅ |
| Path traversal `?ticket=../../../etc/passwd` | 400 ✅ | 400 ✅ |
| Webhook POST sin firma | 401 ✅ | 401 ✅ |
| Webhook GET sin token | 200 🚨 | 401 ✅ |
| Webhook GET con token incorrecto | 200 🚨 | 401 ✅ |
| Bundle scan secrets | clean ✅ | clean ✅ |
| Source maps expuestos | 404 ✅ | 404 ✅ |
| CSP Report-Only header | absent 🚨 | present ✅ |
| HMAC timing attack | vulnerable 🚨 | timing-safe ✅ |
| Rate limit /api/checkout | none 🚨 | 10/min/IP ✅ |

---

## Pendiente del usuario

### Configuración manual (post-deploy)

**1. Vercel env var:** Agregar `MERCADOPAGO_IPN_KEY` en https://vercel.com/yose-ctas-projects/next-level/settings/environment-variables
   - Valor: `bf60f0488438921e241b013403d9766210e1a883b54caf1ceb89dd2514515e8e`
   - Environments: Production, Preview, Development

**2. MercadoPago dashboard:** Actualizar URL del webhook IPN legacy a:
   ```
   https://nl.yosmentedigital.com/api/mercadopago/webhook?key=bf60f0488438921e241b013403d9766210e1a883b54caf1ceb89dd2514515e8e
   ```

**3. Redeploy** (sin cache) para aplicar la nueva env var.

**4. Verificar webhook real:** hacer una compra de prueba y confirmar que el email llega.

### Próximas auditorías sugeridas

- **3 meses:** re-run de smoke test (`pentest-smoke.sh`) + re-evaluar
- **CSP enforcing:** después de 1 semana sin warnings en Report-Only, cambiar header a `Content-Security-Policy` (sin `-Report-Only`)
- **Antes de cada cambio sensible:** webhook, auth, integraciones nuevas

### Mejoras opcionales (no urgentes)

- 🟢 **Upgrade rate limit a Upstash Redis** (si tráfico crece) — distribuido entre Lambdas
- 🟢 **Sentry / Axiom** para alertas de errores y firmas inválidas en webhooks
- 🟢 **`.well-known/security.txt`** (RFC 9116) — facilita reportes responsables
- 🟢 **`robots.txt`** y `sitemap.xml` (SEO, no seguridad)
- 🟢 **Recuperar acceso a Hotjar/Contentsquare** vía soporte (cuenta migrada)
- 🟢 **Conectar GA4 dentro de GTM** para analytics además de Pixel
- 🟢 **Eventos custom en Meta Ads** — marcar `Purchase` como evento de optimización

---

## Commits del trabajo de seguridad

```
fe89cb9 fix(security): pentest fixes — webhook GET auth, PII masking, rate limit
0d19356 fix(security): 4 hardening fixes from audit
ed09e01 feat(security): add Self-XSS console warning
ca052d6 feat(tracking): add conversion events for GTM and Meta Pixel
```

---

## Skill creado en Synapis

`~/.claude/skills/security-audit/` — usable en cualquier proyecto futuro:
- `SKILL.md` — entrada con frontmatter
- `methodology.md` — 8 fases detalladas
- `pentest-toolkit.md` — scripts curl reutilizables
- `fixes-library.md` — 10 patrones de fix probados
- `pentest-smoke.sh` — script ejecutable (TARGET=url ./pentest-smoke.sh)

Activar con: "audita seguridad", "pentest", "hackea mi página", "verifica vulnerabilidades".
