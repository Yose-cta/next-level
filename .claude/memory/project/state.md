# Estado del Proyecto

## URLs vivas

| Tipo | URL |
|---|---|
| Producción | https://nl.yosmentedigital.com |
| Vercel preview alias | https://next-level-seven-rose.vercel.app |
| Vercel dashboard | https://vercel.com/yose-ctas-projects/next-level |
| Supabase dashboard | https://supabase.com/dashboard/project/zpviurroxadbzciigxmc |

## IDs importantes

| Servicio | ID |
|---|---|
| Vercel project | `prj_b4WYeKGfuPxb1y9vWPvVdPFaYdwb` |
| Vercel team | `team_jGwoOoGnlnQ7YUwE6I7sEDPW` (yose-ctas-projects) |
| Supabase project ref | `zpviurroxadbzciigxmc` |
| MercadoPago user | `710845593` (yose-cta@yoselviaadam.com) |

## Lo que está LIVE

- ✅ Landing en `nl.yosmentedigital.com` con SSL
- ✅ Tickets General $67k / VIP $147k en CLP
- ✅ Checkout MercadoPago Chile funcionando (botón test $1.000 valida flujo)
- ✅ Webhook MP → Supabase tabla `compras` (idempotente con HMAC verify)
- ✅ Email Resend automático post-pago aprobado
- ✅ Página `/gracias` con WhatsApp + .ics calendar
- ✅ WhatsApp flotante bottom-right
- ✅ Sistema editable in-browser (Cmd+E)
- ✅ Diseño deluxe híbrido dark+light (alternancia tipo josevillalobos.ai)

## Lo que falta

- [ ] Subir fotos reales de mentores + testimonios (Yoselvia con Cmd+E)
- [ ] Conectar videos Wistia en testimonios
- [ ] Verificar dominio Resend para emails desde `hola@yosmentedigital.com`
- [ ] Rotar credenciales expuestas en chat
- [ ] Conectar Hotjar / Meta Pixel / GTM (env vars en Vercel)
- [ ] Evolution API para WhatsApp automático post-pago

## Última iteración: Iter 7+ (commit `919ceaa` + cambios pendientes del linter)

Tema híbrido dark+light + componentes nuevos: `AntesDespues`, `ParaTiSi`, `VIPDetail`. Copy reposicionado en `constants.ts` v2.0 ("Deja de cargarlo todo tú...").
