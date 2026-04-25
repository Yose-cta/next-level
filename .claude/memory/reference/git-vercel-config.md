# Git + Vercel — Configuración Validada

## Email del autor de commits

**OBLIGATORIO:** Todos los commits deben firmarse con `yoselviaadam@gmail.com`.

```bash
git config --global user.name "Yoselvia"
git config --global user.email "yoselviaadam@gmail.com"
```

## Por qué importa (no romper esto)

Vercel valida 2 cosas en cada auto-deploy desde GitHub:

1. **Email del commit debe estar Verified en GitHub** (cuenta `Yose-cta`)
2. **Email del commit debe ser owner/contributor del proyecto Vercel**

Plan Hobby NO permite agregar contributors a repos privados. Por eso el ÚNICO email que cumple ambas condiciones es `yoselviaadam@gmail.com` (Primary verified en GitHub Y Primary del owner Vercel).

## Emails que NO funcionan

| Email | GitHub | Vercel owner | Resultado |
|-------|--------|--------------|-----------|
| `hola@yosmentedigital.com` | ❌ no verificado | ❌ no es owner | Bloqueado: "email could not be matched" |
| `supcricionesyag@gmail.com` | ✅ verificado | ❌ es OTRA cuenta Vercel | Bloqueado: "no contributing access" (Hobby) |
| **`yoselviaadam@gmail.com`** | ✅ Primary verified | ✅ Primary owner | **✅ Deploy OK** |

## Si un commit ya está pusheado con email malo

```bash
# 1. Asegurar config correcto
git config --global user.email "yoselviaadam@gmail.com"

# 2. Re-firmar último commit
git commit --amend --no-edit --reset-author

# 3. Force push (seguro: solo reescribe author, no contenido)
git push --force-with-lease origin master
```

## Cuentas relevantes

- **GitHub:** `Yose-cta` (yoselviaadam@gmail.com Primary)
- **Vercel team:** `yose-ctas-projects` (yoselviaadam@gmail.com Primary, plan Hobby)
- **Repo:** https://github.com/Yose-cta/next-level (privado)
- **Producción:** https://nl.yosmentedigital.com

---

*Aprendizaje 2026-04-25 — Tras 2 deploys bloqueados consecutivos por email mismatch.*
