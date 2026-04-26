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
    tagline: 'Para vivir la experiencia completa',
    price: { amount: 67000, currency: 'CLP', display: '$67.000' },
    badge: null,
    description:
      'Acceso completo a Next Level Experience: 6 horas presenciales para dejar de improvisar, proyectarte con más autoridad y comunicar tu valor con más seguridad.',
    features: [
      'Acceso presencial al Next Level Experience (6 horas)',
      'Trabajo en vivo con los 3 expertos: IA, imagen y comunicación',
      'Materiales impresos para aplicar durante el evento',
      'Coffee break + networking con personas en tu mismo nivel',
      'Bonus: Gift Card de $27.000 para usar en alguno de nuestros servicios',
      '2x1: puedes llevar un acompañante',
    ],
    forYou:
      'Quieres vivir la experiencia completa, trabajar los 3 bloques principales y llevarte herramientas para aplicar por tu cuenta.',
    cta: 'Reservar Entrada General',
    hidden: false,
  },
  {
    id: 'vip',
    name: 'Entrada VIP Next Level Experience',
    tagline: 'Para tener una mirada más personalizada',
    price: { amount: 147000, currency: 'CLP', display: '$147.000' },
    badge: 'EXPERIENCIA COMPLETA',
    description:
      'La experiencia presencial completa + 3 sesiones privadas 1:1 online post-evento con cada experto. (Sin promo 2x1 — solo para ti.)',
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
      'Quieres una mirada personalizada después del evento. Quieres que los 3 expertos revisen tu caso real y te den dirección para aterrizar lo aprendido.',
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
    moduleTitle: 'Construye un negocio que no dependa solo de ti',
    moduleSubtitle:
      'Ordena cómo vas a operar, vender y entregar antes de que el caos te cueste dinero.',
    moduleTime: '14:10 — 15:40',
    accent: 'electric',
    lema:
      'No necesitas hacerlo todo tú. Necesitas construir una operación que no se coma tu tiempo, tu energía ni tu margen.',
    bio:
      'Yoselvia te guía a mirar tu negocio por dentro para detectar qué está drenando tu tiempo, margen y energía — y a usar Claude e IA con criterio para ordenar tu operación. No se trata solo de vender más: se trata de construir algo que puedas sostener mejor.',
    teaches:
      'A usar Claude con intención: dejar de repetir tareas, ordenar tus ideas y construir una forma de trabajar menos dependiente de ti.',
    works: [
      'Cómo identificar las partes más débiles de tu negocio',
      'Dónde estás perdiendo tiempo, dinero o energía sin darte cuenta',
      'Qué herramientas realmente necesitas y cuáles son gasto innecesario',
      'Cómo ordenar la forma en que vendes, entregas y das seguimiento',
      'Qué eliminar, simplificar, automatizar o delegar — con criterio de IA',
    ],
    deliverables: [
      'Claridad de tu operación actual o futura',
      'Mapa de cómo entregar mejor tu servicio, producto o experiencia',
      'Identificación de fugas de tiempo, dinero y energía',
      'Criterio para usar Claude e IA sin improvisar ni delegar a ciegas',
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
    moduleTitle: 'Imagen, color y presencia',
    moduleSubtitle:
      'Proyecta una imagen que comunique seguridad, coherencia y autoridad.',
    moduleTime: '16:10 — 17:40',
    accent: 'magenta',
    lema: 'Tu imagen también vende, incluso antes de que hables.',
    bio:
      'Valentina te ayuda a entender qué está comunicando tu imagen hoy y cómo alinear tu presencia con el nivel de autoridad, seguridad y coherencia que quieres proyectar.',
    teaches:
      'A leer qué transmite tu presencia hoy y a tomar decisiones de imagen con más intención: color, formas, presencia y coherencia visual.',
    works: [
      'Qué transmite tu imagen actual',
      'Qué puede estar debilitando tu presencia',
      'Qué necesitas reforzar para proyectar más autoridad',
      'Cómo verte más coherente con la etapa de negocio que quieres construir',
    ],
    deliverables: [
      'Criterios para tomar decisiones de imagen con intención',
      'Mapa de ajustes para elevar tu percepción visual',
      'Guía base de coherencia visual aplicable de inmediato',
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
    moduleTitle: 'Comunicación y ventas',
    moduleSubtitle:
      'Comunica tu valor con claridad y vende con más seguridad.',
    moduleTime: '18:10 — 19:40',
    accent: 'gold',
    lema:
      'Si no sabes comunicar tu valor, el mercado no puede percibirlo completo.',
    bio:
      'Sebastián te enseña a comunicar tu oferta con más claridad, expresar tu valor con más seguridad y sostener conversaciones comerciales con mayor presencia.',
    teaches:
      'A pulir el mensaje con el que presentas tu oferta y a sostener conversaciones de venta sin minimizar tu trabajo.',
    works: [
      'Qué necesita escuchar tu cliente para entender mejor tu valor',
      'Qué puede estar haciendo que tu mensaje suene débil o poco claro',
      'Cómo vender con más presencia',
      'Cómo explicar lo que haces con más seguridad',
    ],
    deliverables: [
      'Frases guía para hablar de tu valor con seguridad',
      'Estructura clara para sostener una conversación de venta',
      'Ajustes concretos para presentar mejor tu oferta',
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
    title: 'Claridad sobre qué soltar',
    body:
      'Sales con la mirada limpia: sabes qué tareas necesitas dejar de cargar tú para liberar tiempo y energía real.',
  },
  {
    n: '02',
    title: 'Una mirada más ordenada de tu negocio',
    body:
      'Vas a poder ver tus prioridades de forma estructurada — no como una lista mental que se te escapa entre la operación del día.',
  },
  {
    n: '03',
    title: '3 recursos de Claude listos para aplicar',
    body:
      'Tres herramientas concretas para empezar a usar IA como apoyo real desde la semana siguiente, sin tecnicismos innecesarios.',
  },
  {
    n: '04',
    title: 'Criterios de imagen y presencia',
    body:
      'Te llevas criterios claros para ajustar color, presencia y coherencia visual — para que tu imagen acompañe el valor de lo que haces.',
  },
  {
    n: '05',
    title: 'Herramientas para comunicar tu valor',
    body:
      'Frases guía y ajustes específicos para presentar tu oferta con más seguridad y vender sin minimizarte.',
  },
  {
    n: '06',
    title: 'Una visión más clara de tu próxima etapa',
    body:
      'Cómo quieres verte, hablar y vender en este siguiente nivel — con dirección concreta, no buenas intenciones.',
  },
] as const

/* ============================================================
 * PARA TI SI — autodiagnóstico
 * ============================================================ */
export const PARA_TI_SI = [
  'Sientes que todo depende de ti.',
  'Trabajas mucho, pero no sientes que estés avanzando al nivel que quieres.',
  'Quieres usar IA, pero no sabes cómo aplicarla de forma útil en tu negocio.',
  'Sabes que necesitas soltar tareas, pero no tienes claro por dónde empezar.',
  'Tu imagen no refleja todavía el valor real de lo que haces.',
  'Te cuesta comunicar tu oferta con seguridad.',
  'Quieres vender con más claridad, presencia y autoridad.',
  'Ya no quieres seguir improvisando y necesitas empezar a dirigir con más intención.',
] as const

/* ============================================================
 * COSTO DE NO ACTUAR — 4 fugas concretas
 * ============================================================ */
export const COSTS = [
  {
    id: 'cost-1',
    metric: 'Tiempo',
    body:
      'Horas que se van en operativa repetida que ya no debería depender de ti.',
  },
  {
    id: 'cost-2',
    metric: 'Claridad',
    body:
      'Decides desde el agotamiento, no desde el enfoque. Y eso se nota en tus resultados.',
  },
  {
    id: 'cost-3',
    metric: 'Autoridad',
    body:
      'Tu imagen no acompaña el valor de lo que haces. El mercado percibe menos de lo que vales.',
  },
  {
    id: 'cost-4',
    metric: 'Dinero',
    body:
      'Vendes con duda y minimizando tu trabajo. Y la duda en quien comunica se convierte en menos cierres.',
  },
] as const

/* ============================================================
 * ANTES / DESPUÉS — comparación visual
 * ============================================================ */
export const SHIFTS = [
  { before: 'Todo depende de ti', after: 'Sabes qué empezar a soltar' },
  { before: 'Improvisas demasiado', after: 'Tienes más claridad para decidir' },
  {
    before: 'Quieres usar IA, pero no sabes por dónde empezar',
    after: 'Tienes recursos listos para aplicar',
  },
  {
    before: 'Tu imagen no refleja todo tu valor',
    after: 'Sabes qué ajustar para proyectarte mejor',
  },
  { before: 'Te cuesta explicar tu oferta', after: 'Comunicas con más claridad' },
  {
    before: 'Vendes con dudas',
    after: 'Vendes con más presencia y seguridad',
  },
  {
    before: 'Trabajas mucho y avanzas poco',
    after: 'Tienes una dirección más clara para tu siguiente etapa',
  },
] as const

/* ============================================================
 * FAQS
 * ============================================================ */
export const FAQS = [
  {
    q: '¿Necesito saber usar Claude o tener experiencia con IA?',
    a: 'No. La experiencia está pensada para emprendedores, coaches, marcas personales y profesionales que quieren aprender a usar la IA de forma práctica, sin tecnicismos — estés empezando o ya vendiendo. Vas a entender cómo aplicarla a tu negocio aunque hoy no tengas ninguna experiencia.',
  },
  {
    q: '¿Esto es para mí si recién estoy empezando?',
    a: 'Sí. Si estás empezando, esta experiencia te ayuda a construir con más claridad desde el inicio y evitar caer en años de improvisación.',
  },
  {
    q: 'Ya tengo un negocio funcionando. ¿Vale la pena para mí?',
    a: 'También. Especialmente si ya vendes pero sientes que todo depende demasiado de ti, que tu imagen no refleja tu nivel o que tu comunicación podría ser mucho más clara.',
  },
  {
    q: '¿Voy a salir con todo resuelto?',
    a: 'No vamos a prometerte que en 6 horas vas a resolver todo tu negocio. Pero sí vas a salir con claridad, herramientas y pasos concretos para empezar a soltar carga, proyectarte mejor y comunicar con más seguridad.',
  },
  {
    q: '¿La Entrada VIP vale la pena?',
    a: 'Sí, si quieres una mirada más personalizada después del evento. La VIP incluye 3 sesiones privadas 1:1 online (1 hora con cada experto): auditoría de tu negocio con Claude, revisión de imagen y color, y revisión de comunicación y ventas. La General te da la experiencia completa. La VIP te da experiencia + dirección aplicada a tu caso.',
  },
  {
    q: '¿Cuánto dura la experiencia presencial?',
    a: '6 horas. De 14h a 21h, en Santiago. La idea no es saturarte de teoría — es darte el espacio para mirar tu negocio, tu imagen y tu mensaje con otros ojos y salir con dirección.',
  },
  {
    q: '¿La entrada incluye acompañante?',
    a: 'Solo la Entrada General incluye 2x1: puedes llevar un acompañante sin costo adicional. La Entrada VIP no tiene 2x1 — es individual, pero a cambio recibes 3 sesiones privadas 1:1 online post-evento (1 hora con cada experto). Las entradas son personales y no transferibles.',
  },
  {
    q: '¿Qué pasa después de comprar mi entrada?',
    a: 'Recibes inmediatamente la confirmación de tu compra y la información necesaria para asistir al evento (dirección exacta, qué llevar, agenda). Si compras la Entrada VIP, después del evento se coordinan tus 3 sesiones online 1:1 con cada experto.',
  },
  {
    q: '¿Y si después no puedo asistir?',
    a: 'Al ser presencial con cupos limitados, tu lugar se reserva exclusivamente. No hay reembolsos, pero puedes transferir tu entrada a otra persona si nos avisas con al menos 48 horas de anticipación.',
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
    'Half-Day Experience presencial. 3 expertos en vivo: IA con Claude, imagen y comunicación. Deja de cargarlo todo tú y empieza a dirigir, proyectar y vender desde tu siguiente nivel.',
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
