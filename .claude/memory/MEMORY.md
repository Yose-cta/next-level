# Memoria del Proyecto — Indice

> Archivos organizados por carpeta (tipo). Max 200 líneas.
> Gestionado por skill memory-manager. Auto-memory de Claude Code DESACTIVADO.
> **Última actualización:** 2026-04-26

## user/ — Sobre el usuario/equipo
- `yoselvia.md` — Perfil completo de la cliente: nombre, marca, estilo de comunicación, preferencias de diseño (sí/no), decisiones tomadas, credenciales pendientes de rotar.

## project/ — Proyectos y decisiones activas
- `state.md` — **PRIMARIO.** Estado actual de Next Level Experience: URLs, IDs, qué está live, qué falta. Actualizado al cierre de cada sesión grande.
- `integrations.md` — Integraciones externas (MP, Supabase, Resend, Vercel) + tracking stack (GTM/GA4/Pixel/Clarity).
- `security-audit-2026-04-26.md` — **Reporte completo de auditoría de seguridad** del 2026-04-26. 8 vulnerabilidades identificadas + fixes aplicados + threat model + pentest 12/12 pass. Referencia para próximas auditorías.

## feedback/ — Correcciones y preferencias
- `copy-style.md` — REGLA CRÍTICA. Todo el copy en español neutro/chileno (tú/tienes/quieres). NUNCA voseo argentino (vos/tenés/querés). La cliente lo pidió varias veces.
- `design-decisions.md` — Decisiones de diseño consolidadas (paleta, fonts, layout patterns).

## reference/ — Donde encontrar cosas
- `git-vercel-config.md` — Email obligatorio para commits (`yoselviaadam@gmail.com`). Si vuelve a fallar deploy por "email could not be matched" o "no contributing access", leer este archivo.
- `conventions.md` — Convenciones del codebase (estructura, nombres, etc.).
- `lessons.md` — Lecciones aprendidas iterando.

## Skills relacionados (en `~/.claude/skills/`)
- `security-audit/` — Skill de auditoría de seguridad 10x. Activable con frases como "audita seguridad", "pentest", "hackea esto". Metodología en 8 fases + scripts curl + library de fixes probados.
- `memory-manager/` — Para mantener esta memoria al día.
- `primer/` — Para cargar contexto al inicio de sesión nueva.
