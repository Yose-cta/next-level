/**
 * Next Level Experience — fuente única de verdad para datos del evento.
 * Lenguaje: español neutro chileno (tú, haces, sales, etc.)
 *
 * Versión 2.0 — copy reposicionado:
 *   "Deja de cargarlo todo tú y empieza a dirigir, proyectar y vender
 *    desde tu siguiente nivel."
 */

export const WORKSHOP = {
  name: 'Next Level Experience',
  edition: '2nd Edition',
  tagline: 'Next Level Experience · Half-Day · Santiago 2026',
  format: 'Half-Day Experience',
  date: {
    iso: '2026-05-16T14:00:00-04:00',
    display: 'Sábado 16 de mayo 2026',
    short: '16 Mayo · 14h–21h',
    day: '16',
    month: 'MAY',
    year: '2026',
  },
  duration: '6 horas presenciales',
  venue: {
    address: 'Condell 1337',
    district: 'Providencia',
    city: 'Santiago',
    full: 'Condell 1337, Providencia, Santiago',
  },
  capacity: 'Cupos limitados',
  totalHours: 6,
  modules: 3,
} as const

export const CONTACT = {
  whatsapp: {
    number: '56935834551',
    display: '+56 9 3583 4551',
    message:
      'Hola Yoselvia! Quiero más información sobre Next Level Experience del 16 de mayo',
  },
  whatsappGroup: 'https://chat.whatsapp.com/JQ9gyUXXywh2z2C0SjSrNj?mode=gi_t',
  whatsappGroupVip: 'https://chat.whatsapp.com/ICoU3xBTL07DBzBKHoT8M9?mode=gi_t',
  email: 'hola@yosmentedigital.com',
  domain: 'nl.yosmentedigital.com',
  url: 'https://nl.yosmentedigital.com',
} as const

export const BRAND = {
  logoSrc: '/logo.png',
  logoAlt: 'NEXT LEVEL',
} as const

/* ============================================================
 * 3 PILARES — bloques principales del programa
 * ============================================================ */
export const PILLARS = [
  {
    n: '01',
    name: 'IA con Claude',
    headline: 'Sal del modo operador.',
    sub: 'Deja de sostenerlo todo manualmente.',
  },
  {
    n: '02',
    name: 'Imagen y presencia',
    headline: 'Proyecta autoridad real.',
    sub: 'Coherencia visual con tu siguiente nivel.',
  },
  {
    n: '03',
    name: 'Comunicación y ventas',
    headline: 'Vende con seguridad.',
    sub: 'Comunica tu valor sin minimizarte.',
  },
] as const

/* ============================================================
 * TICKETS
 * ============================================================ */
export const TICKETS = [
  {
    id: 'general',
    name: 'Entrada General',
    tagline: 'Para vivir la experiencia completa · 2x1',
    price: { amount: 67000, currency: 'CLP', display: '$67.000' },
    badge: null,
    description:
      'Acceso completo a Next Level Experience: 6 horas presenciales para que tu negocio se perciba, se comunique y se venda al nivel del valor que realmente entregas.',
    features: [
      'Acceso presencial al Next Level Experience (6 horas)',
      'Trabajo en vivo con los 3 expertos: IA, imagen y comunicación',
      'Materiales impresos para aplicar durante el evento',
      'Coffee break + networking con personas en tu mismo nivel',
      'Bonus: Gift Card de $27.000 para usar en alguno de nuestros servicios',
      '2x1: puedes llevar un acompañante',
    ],
    forYou:
      'Quieres vivir la experiencia completa, trabajar los 3 bloques y llevarte claridad para mejorar cómo te muestras, comunicas y sostienes tu negocio. Incluye 2x1 para venir con alguien que también quiera elevar su negocio.',
    cta: 'Reservar Entrada General 2x1',
    hidden: false,
  },
  {
    id: 'vip',
    name: 'Entrada VIP Next Level Experience',
    tagline: 'Para aterrizarlo a tu caso real',
    price: { amount: 147000, currency: 'CLP', display: '$147.000' },
    badge: 'EXPERIENCIA COMPLETA',
    description:
      'Incluye la experiencia presencial completa + 3 sesiones online 1:1 después del evento, una con cada experto, para aplicar lo trabajado a tu caso real.',
    features: [
      'Acceso presencial al Next Level Experience (6 horas)',
      'Trabajo en vivo con los 3 expertos: IA, imagen y comunicación',
      'Materiales impresos para aplicar durante el evento',
      'Coffee break + networking con personas en tu mismo nivel',
      '<strong class="text-electric">★ Solo VIP:</strong> 1 hora 1:1 online con Yoselvia · <strong>Auditoría VIP de tu negocio con Claude en vivo</strong>',
      '<strong class="text-electric">★ Solo VIP:</strong> 1 hora 1:1 online con Valentina · <strong>Colorimetría VIP + revisión personalizada de imagen, color y presencia</strong>',
      '<strong class="text-electric">★ Solo VIP:</strong> 1 hora 1:1 online con Sebastián · <strong>revisión personalizada de comunicación y ventas</strong>',
      '<strong class="text-electric">★ Solo VIP:</strong> Comunidad VIP cerrada durante 15 días para resolver dudas',
    ],
    highlight: {
      title: '3 horas privadas 1:1 después del evento',
      body:
        'Una sesión online con cada experto para revisar tu negocio, tu imagen y tu mensaje. La experiencia VIP no termina cuando acaba el evento — ahí recién empieza el trabajo aplicado a tu caso real.',
    },
    forYou:
      'Quieres que después del evento revisemos tu caso con una mirada personalizada en IA y estructura, imagen y presencia, y comunicación y ventas.',
    cta: 'Reservar Entrada VIP',
    hidden: false,
  },
] as const

/* ============================================================
 * MENTORES — los 3 bloques de la experiencia
 * ============================================================ */
export const MENTORS = [
  {
    id: 'yoselvia',
    name: 'Yoselvia Adam',
    role: 'Mentora de IA Aplicada',
    expertise: 'Negocios conscientes impulsados con Claude',
    tag: 'IA aplicada · Claude',
    moduleNumber: '01',
    moduleTitle:
      'Deja de sostener todo desde tu cabeza y empieza a operar con más criterio.',
    moduleSubtitle:
      'Muchas veces el problema no es que falten ideas. El problema es que sobran tareas repetidas, procesos improvisados y decisiones que dependen demasiado de ti.',
    moduleTime: '14:10 — 15:40',
    accent: 'electric',
    lema:
      'La IA no viene a reemplazar tu criterio. Viene a ayudarte a ordenar, documentar y mejorar lo que hoy te cuesta demasiado sostener.',
    bio:
      'En este bloque vas a revisar qué partes de tu negocio consumen tiempo, energía o margen sin que lo notes. Tareas que repites, mensajes que vuelves a escribir, seguimientos que haces tarde, cotizaciones que armas desde cero, contenido que improvisas y procesos que nadie más podría ejecutar porque solo viven en tu cabeza.',
    teaches:
      'A usar Claude con intención: dejar de repetir tareas, ordenar tus ideas y construir una forma de trabajar menos dependiente de ti.',
    works: [
      'Cómo identificar las partes más débiles de tu negocio',
      'Dónde estás perdiendo tiempo, dinero o energía sin darte cuenta',
      'Qué tareas te mantienen atrapada en el día a día aunque parezcan pequeñas',
      'Qué procesos siguen viviendo en tu cabeza y te impiden soltar',
      'Qué herramientas realmente necesitas y cuáles solo están agregando ruido',
      'Qué eliminar, simplificar, automatizar o delegar con criterio de IA',
      'Cómo empezar a usar Claude para pensar mejor tu operación, no solo para generar respuestas',
    ],
    deliverables: [
      'Mapa inicial de tu operación actual o futura',
      'Identificación de fugas de tiempo, dinero y energía',
      'Criterio para usar Claude e IA sin improvisar ni delegar a ciegas',
      'Lista priorizada de qué soltar, simplificar, automatizar o delegar primero',
      'Plan de acción para operar con más orden y menos carga',
    ],
    vipSession: {
      name: 'Auditoría VIP de tu negocio con Claude en vivo',
      duration: '60 minutos · 1:1 online',
      experience: [
        'Mirada personalizada sobre tu negocio',
        'Detección de tus principales fugas de tiempo, energía y dinero',
        'Claridad sobre qué necesitas soltar primero',
        'Recomendaciones aplicadas a tu caso real',
        'Plan de acción claro para tus próximos pasos',
      ],
      takeaway: [
        'Informe personalizado de tu negocio',
        'Tus principales fugas priorizadas',
        'Mapa claro de decisiones',
        'Plan de acción para los próximos 30 días',
      ],
    },
  },
  {
    id: 'valentina',
    name: 'Valentina Silva',
    role: 'Asesora de Imagen & Color',
    expertise: 'Imagen, color y presencia con autoridad',
    tag: 'Imagen + Color · Presencia',
    moduleNumber: '02',
    moduleTitle:
      'Haz que tu presencia comunique el nivel al que quieres que te perciban.',
    moduleSubtitle:
      'Tu imagen ya está hablando por ti. La pregunta es si está diciendo lo que quieres que diga.',
    moduleTime: '16:10 — 17:40',
    accent: 'magenta',
    lema: 'No se trata de verte distinta. Se trata de que tu imagen deje de comunicar menos de lo que realmente eres capaz de entregar.',
    bio:
      'En este bloque vas a mirar tu presencia profesional desde la estrategia, no desde la superficialidad. Vas a trabajar qué comunica tu imagen actual, qué señales estás enviando en los primeros segundos, qué errores pueden restarte profesionalismo, y cómo usar color, estilo y presencia para proyectar mejor tu valor.',
    teaches:
      'A leer qué transmite tu presencia hoy y a tomar decisiones de imagen con más intención: color, formas, presencia y coherencia visual.',
    works: [
      'Qué transmite tu imagen actual',
      'Qué puede estar debilitando tu presencia, autoridad o coherencia',
      'Qué necesitas reforzar para proyectarte con más seguridad',
      'Cómo verte más alineada con la etapa de negocio que quieres construir',
      'Qué decisiones de color, estilo y presencia pueden ayudarte a comunicar mejor tu valor',
    ],
    deliverables: [
      'Criterios para tomar decisiones de imagen con intención',
      'Mapa de ajustes para elevar tu percepción visual',
      'Guía base de coherencia visual aplicable de inmediato',
      'Mayor claridad sobre cómo quieres ser percibida en esta nueva etapa',
    ],
    vipSession: {
      name: 'Colorimetría VIP 1:1 + revisión personalizada de imagen, color y presencia',
      duration: '60 minutos · 1:1 online',
      experience: [
        'Sesión de colorimetría aplicada a tu caso: tus colores que suman y los que restan',
        'Diagnóstico personalizado de imagen, silueta y presencia',
        'Claridad sobre qué está afectando tu autoridad visual hoy',
        'Criterios para tomar decisiones de imagen con intención',
      ],
      takeaway: [
        'Tu paleta de colores personalizada (los que te activan, los que te apagan)',
        'Diagnóstico claro de qué comunica tu presencia hoy',
        'Guía de ajustes en color, silueta y estilo personal',
        'Criterios para vestirte con intención y proyectar autoridad',
      ],
    },
  },
  {
    id: 'sebastian',
    name: 'Sebastián Villar',
    role: 'Mentor en Comunicación y Ventas',
    expertise: 'Comunicación clara, persuasión sin presión',
    tag: 'Comunicación + Ventas',
    moduleNumber: '03',
    moduleTitle:
      'Aprende a comunicar tu valor para que el cliente lo entienda, lo valore y actúe.',
    moduleSubtitle:
      'Puedes tener una gran oferta, pero si no sabes explicarla de forma clara, el cliente no la percibe completa.',
    moduleTime: '18:10 — 19:40',
    accent: 'gold',
    lema:
      'Vender no debería sentirse como empujar. Debería sentirse como ayudar a la persona correcta a entender por qué tu solución tiene sentido para ella.',
    bio:
      'En este bloque vas a trabajar comunicación con intención. No solo qué dices, también cómo lo dices, con qué energía, con qué presencia, con qué estructura y con qué seguridad. Vas a revisar cómo conectar con tu audiencia, cómo identificar su problema, cómo presentar tu beneficio y cómo guiar a la acción.',
    teaches:
      'A pulir el mensaje con el que presentas tu oferta y a sostener conversaciones de venta sin minimizar tu trabajo.',
    works: [
      'Qué necesita escuchar tu cliente para entender mejor tu valor',
      'Qué puede estar haciendo que tu mensaje suene débil, confuso o poco diferenciador',
      'Cómo explicar lo que haces con más seguridad',
      'Cómo vender con más presencia sin sentir que estás forzando',
      'Cómo dejar de minimizar tu trabajo al hablar de tu oferta',
    ],
    deliverables: [
      'Frases guía para hablar de tu valor con seguridad',
      'Estructura clara para sostener una conversación de venta',
      'Ajustes concretos para presentar mejor tu oferta',
      'Mayor claridad para comunicar lo que haces sin enredarte ni justificarte de más',
    ],
    vipSession: {
      name: 'Revisión personalizada de comunicación y ventas',
      duration: '60 minutos · 1:1 online',
      experience: [
        'Mirada experta sobre tu mensaje actual',
        'Recomendaciones para comunicar tu valor con más claridad',
        'Ajustes para vender con más presencia y seguridad',
        'Una guía más clara para presentar mejor tu oferta',
      ],
      takeaway: [
        'Feedback personalizado sobre tu comunicación',
        'Ajustes concretos para presentar mejor tu oferta',
        'Frases guía para hablar de tu valor con seguridad',
        'Recomendaciones para vender sin minimizar tu trabajo',
      ],
    },
  },
] as const

/* ============================================================
 * TAKEAWAYS — qué te llevas de las 6 horas
 * ============================================================ */
export const TAKEAWAYS = [
  {
    n: '01',
    title: 'Ver tu negocio con más precisión',
    body:
      'Vas a entender qué está comunicando tu imagen antes de que expliques tu valor, y detectar dónde estás perdiendo claridad, tiempo o credibilidad sin notarlo.',
  },
  {
    n: '02',
    title: 'Detectar qué parte de tu mensaje está débil',
    body:
      'Vas a reconocer dónde estás vendiendo desde la duda o la justificación, y qué necesitas ajustar para que tu valor sea más fácil de entender y comprar.',
  },
  {
    n: '03',
    title: 'Identificar fugas invisibles de tiempo y margen',
    body:
      'Vas a ver qué tareas están consumiendo tu energía sin que las llames problema, y cómo la IA puede ayudarte a estructurar y sostener mejor partes de tu negocio.',
  },
  {
    n: '04',
    title: 'Criterios para tomar mejores decisiones',
    body:
      'Vas a salir con criterios claros sobre tu presencia, tu comunicación y tu forma de operar — no solo inspiración, sino dirección concreta.',
  },
  {
    n: '05',
    title: 'Coherencia entre lo que eres y lo que proyectas',
    body:
      'Vas a dejar de mirar tu negocio como cosas sueltas y empezar a verlo como una experiencia completa que el cliente percibe antes de comprar.',
  },
  {
    n: '06',
    title: 'Tu negocio más fácil de entender, confiar y comprar',
    body:
      'Cuando tu presencia es coherente, tu comunicación es clara y tu estructura mejora, el cliente no solo ve lo que haces — empieza a percibir por qué vale lo que cobras.',
  },
] as const

/* ============================================================
 * PARA TI SI — autodiagnóstico
 * ============================================================ */
export const PARA_TI_SI = [
  'Tienes experiencia, pero sientes que tu mercado todavía no percibe todo tu valor.',
  'Te cuesta explicar tu oferta de forma simple, clara y segura.',
  'Sientes que tu imagen no siempre refleja el nivel profesional que quieres proyectar.',
  'Has sentido que necesitas justificar tu precio o demostrar demasiado para vender.',
  'Quieres comunicar con más presencia, seguridad y autoridad.',
  'Quieres usar IA de forma práctica, no desde la moda, sino para ahorrar tiempo y ordenar tu negocio.',
  'Tienes procesos, mensajes o seguimientos que todavía dependen demasiado de tu memoria.',
  'Quieres dejar de improvisar tanto en cómo te muestras, cómo vendes y cómo sostienes tu negocio.',
  'Quieres que tu negocio se vea más claro, más profesional y más confiable para las personas correctas.',
] as const

export const NO_ES_PARA_TI = [
  'Buscas motivación sin revisar nada de fondo.',
  'Quieres una clase pasiva donde solo tomas apuntes.',
  'Crees que la imagen no importa en los negocios.',
  'No estás dispuesta a mirar cómo estás comunicando hoy.',
  'Quieres usar IA solo porque está de moda, pero no quieres ordenar nada.',
  'Esperas que una tarde haga todo el trabajo por ti.',
  'Prefieres seguir vendiendo desde la improvisación antes que mirar qué necesita ajustarse.',
] as const

/* ============================================================
 * COSTO DE NO ACTUAR — 4 fugas concretas
 * ============================================================ */
export const COSTS = [
  {
    id: 'cost-1',
    metric: 'Precio',
    body:
      'Lo pagas cuando bajas tu precio, cuando explicas demasiado y cuando te comparan con alguien más barato.',
  },
  {
    id: 'cost-2',
    metric: 'Tiempo',
    body:
      'Lo pagas cuando una oportunidad se enfría por falta de seguimiento o cuando repites tareas que ya no deberían depender de ti.',
  },
  {
    id: 'cost-3',
    metric: 'Percepción',
    body:
      'Lo pagas cuando tu imagen comunica menos autoridad de la que tienes y tu mensaje no logra hacer evidente por qué deberían elegirte.',
  },
  {
    id: 'cost-4',
    metric: 'Energía',
    body:
      'Lo pagas con cansancio, con improvisación, con tareas repetidas y con la sensación de que estás trabajando mucho más de lo que el negocio te devuelve.',
  },
] as const

/* ============================================================
 * ANTES / DESPUÉS — comparación visual
 * ============================================================ */
export const SHIFTS = [
  { before: 'Tu imagen comunica menos de lo que vales', after: 'Tu presencia refuerza tu mensaje y genera confianza más rápido' },
  { before: 'Tu mensaje es confuso o demasiado largo', after: 'Comunicas tu valor de forma clara, directa y con seguridad' },
  { before: 'Vendes desde la duda o la justificación', after: 'Guías la conversación con presencia y dirección' },
  { before: 'Tus procesos viven en tu cabeza', after: 'Tienes estructura para sostener tu negocio sin desgastarte' },
  { before: 'La IA es una herramienta suelta que no sabes aplicar', after: 'Usas IA con criterio para ordenar, simplificar y decidir mejor' },
  { before: 'Tu negocio depende de tu energía para funcionar', after: 'Tu negocio empieza a funcionar con más independencia de ti' },
  { before: 'El mercado no percibe todo tu valor', after: 'Tu valor es más visible, más creíble y más fácil de elegir' },
] as const

/* ============================================================
 * FAQS
 * ============================================================ */
export const FAQS = [
  {
    q: 'Ya he ido a eventos y después todo sigue igual. ¿Qué hace diferente a este?',
    a: 'Next Level no es una charla inspiracional. Está diseñado para trabajar tres áreas que afectan directamente cómo te percibe y te compra el mercado: tu presencia, tu comunicación y la estructura con la que sostienes tu negocio. No vienes solo a escuchar — vienes a mirar tu caso, reconocer brechas y tomar decisiones más claras.',
  },
  {
    q: '¿Y si mi problema no es la operación?',
    a: 'Probablemente tu problema no se siente como "operación". Se siente como falta de tiempo, seguimientos que se enfrían, mensajes que repites, ventas que te cuestan más de lo necesario, contenido que improvisas y tareas que solo tú sabes hacer. Eso también es estructura. No lo trabajamos desde lo técnico, sino desde cómo afecta tu tiempo, tu margen y tu capacidad de vender mejor.',
  },
  {
    q: '¿Y si no sé usar IA?',
    a: 'No necesitas saber usar IA de forma avanzada. La experiencia está pensada para que entiendas cómo usarla como apoyo para ordenar, simplificar y tomar mejores decisiones en tu negocio. No se trata de aprender herramientas por moda — se trata de entender qué parte de tu negocio puede mejorar con ayuda de IA.',
  },
  {
    q: '¿La parte de imagen es solo sobre ropa?',
    a: 'No. La imagen se trabaja como una herramienta de comunicación profesional. Tu presencia, tus colores, tu lenguaje corporal y tu coherencia visual influyen en cómo te perciben. No se trata de verte distinta — se trata de que tu imagen deje de comunicar menos de lo que realmente eres capaz de entregar.',
  },
  {
    q: '¿La parte de comunicación es para hablar en público?',
    a: 'También, pero no solo. Comunicar mejor te ayuda a vender, presentar tu oferta, conectar con clientes, contar tu historia y guiar a la acción. La comunicación no es solo escenario — también es una reunión, una historia en Instagram, una llamada de venta o una conversación con un cliente potencial.',
  },
  {
    q: '¿Puedo ir sola?',
    a: 'Sí. Y también puedes venir acompañada porque la Entrada General incluye 2x1. Puedes venir con una amiga, socia, colega o persona que también esté construyendo su negocio y quiera elevar cómo se muestra, comunica y vende.',
  },
  {
    q: '¿La Entrada VIP vale la pena?',
    a: 'Sí, si quieres una mirada más personalizada después del evento. La VIP incluye 3 sesiones privadas 1:1 online para aplicar lo trabajado a tu caso: una de IA y estructura, una de imagen y presencia, y una de comunicación y ventas. La General te da la experiencia completa. La VIP te da experiencia + dirección aplicada.',
  },
  {
    q: '¿Cuánto dura la experiencia?',
    a: '6 horas. De 14h a 21h, en Providencia, Santiago. No es para saturarte de teoría — es para mirar tu negocio, tu imagen y tu mensaje con otros ojos y salir con dirección.',
  },
  {
    q: '¿Qué pasa después de comprar mi entrada?',
    a: 'Recibes la confirmación y la información para asistir: dirección exacta, qué llevar y agenda. Si compras la Entrada VIP, después del evento se coordinan tus 3 sesiones online 1:1 con cada experto.',
  },
] as const

/* ============================================================
 * TESTIMONIOS
 * ============================================================ */
export const TESTIMONIALS = [
  {
    id: 'testimonio-1',
    wistiaId: '5pewa34xp9',
    quote:
      'Fue un encuentro increíble. Aprendimos sobre inteligencia artificial, códigos de vestimenta para potenciar la imagen y habilidades comunicacionales. Me voy muy feliz; lo recomiendo mucho si quieres llevar tu negocio o marca al siguiente nivel.',
    name: 'Ximena Nuñez',
    role: 'Coach de marketing',
  },
  {
    id: 'testimonio-2',
    wistiaId: '0vp7qx25i2',
    quote: 'Así se vivió Next Level Experience.',
    name: 'Recorrido en video',
    role: 'Resumen del evento',
  },
  {
    id: 'testimonio-3',
    wistiaId: '98qm57bhon',
    quote:
      'Me ayudaron a ordenar la planificación de mi negocio, entender cómo proyectarme mejor con mi imagen y reforzar algo clave: la comunicación. Fue una experiencia muy valiosa; de verdad los invito a vivirla.',
    name: 'Eliseo Navarro',
    role: 'Fundador de ads semtis',
  },
] as const

export const META = {
  title: 'Next Level Experience · 2nd Edition · 16 Mayo 2026 · Santiago',
  description:
    'Experiencia presencial de 6 horas para emprendedores y profesionales que quieren que su negocio se perciba, se comunique y se venda al nivel del valor que realmente entregan.',
  ogImage: '/og-cover.png',
} as const

export type Mentor = (typeof MENTORS)[number]
export type Ticket = (typeof TICKETS)[number]
export type Takeaway = (typeof TAKEAWAYS)[number]
export type Faq = (typeof FAQS)[number]
export type Testimonial = (typeof TESTIMONIALS)[number]
export type Pillar = (typeof PILLARS)[number]
export type Cost = (typeof COSTS)[number]
export type Shift = (typeof SHIFTS)[number]
