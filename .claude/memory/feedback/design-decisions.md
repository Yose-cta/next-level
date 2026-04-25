# Decisiones de Diseño · Iteraciones

## Iter 1-3 — Setup base + light deluxe (descartado parcialmente)

- HTML standalone migrado a Next.js
- Probamos light theme puro estilo Aesop/Apple keynote
- Yoselvia: "se quedó corto, no se siente innovador ni tech"

## Iter 4 — Dark indigo + multicolor (descartado)

- Background indigo-purple deep + 4 aurora orbs (magenta/cyan/violet/electric)
- Gradient border conic rainbow
- Yoselvia: "menos multicolor, se ve infantil"

## Iter 5 — Light deluxe monocromo (descartado)

- Bone cream + ink + un solo gold
- Yoselvia: "los colores no cambiaron las formas, todo cuadrado"

## Iter 6 — Innovación visual (parcialmente conservado)

- Foto circular hero con orbital rings concéntricos
- Número decorativo "II" gigante translúcido
- Mockup chat tech `claude · activo`
- 3 emblems de dominio (orbital IA + color palette + waveform voz)
- Mentor cards con corner-cut clip-path
- Tickets físicos con notch middle (clip-path)
- Takeaways con orbital double-ring numbers
- Cupos limitados pill VERTICAL gold rotated
- Yoselvia: ✅ "ahora SÍ se siente innovador y tech"

## Iter 7 — Híbrido dark+light + sobrio (ACTUAL · le gustó)

Inspiración: josevillalobos.ai (alternancia dark/light)

**Paleta sobria:** Solo midnight + bone + 2 acentos (electric + magenta). Eliminado cyan + violet.

**Alternancia secciones:**
- Dark: Hero, Mentors, Tickets, VIPDetail, Guarantee, Closing, Footer
- Light: Mirror, ParaTiSi, Takeaways, AntesDespues, Testimonials, FAQ
- Shell: CostOfInaction
- Electric: Ticker (única franja en movimiento)

**Mantenido de Iter 6:** todos los elementos innovadores (orbital, clip-path, notch, emblems, número II).

## Iter 7+ (cambios sin commit del linter / Yoselvia)

- Hero rediseñado: foto del equipo cambió por "Experience Pass" panel glass vertical con info clave
- Copy reposicionado: "Deja de cargarlo todo tú y empieza a dirigir, proyectar y vender"
- Nuevos componentes:
  - `ParaTiSi` (sección "esta experiencia es para ti si...")
  - `AntesDespues` (transformación visual antes/después)
  - `VIPDetail` (sección dedicada al detalle de la oferta VIP con las 3 sesiones)
- Mentors v2: layout zigzag editorial alternado (no más grid plano)
- CostOfInaction v2: 4 fugas con mensaje ético (no manipulativo)
- Tickets v2: incluye `forYou` field + tabla comparativa
- Mirror v2: sección "loop diario" añadida
- Closing v2: copy reposicionado + 2 CTAs (Reservar + ver precios)
- Guarantee v2: badges sobre el reembolso

## Reglas para futuras iteraciones

1. Mantener paleta 2 acentos (electric + magenta) — no agregar cyan/violet
2. Mantener alternancia dark/light entre secciones
3. Mantener ticker como única franja en movimiento
4. Mantener tipografía editorial Instrument Serif italic
5. Mantener español neutro chileno (NO voseo)
6. Mantener innovación visual de Iter 6 (orbital, clip-path, notch, emblems)
7. Sin pedir, no remover componentes ya validados por Yoselvia
