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
      'Acceso completo a Next Level Experience: 6 horas presenciales para dejar de improvisar, mirar tu negocio con más criterio, proyectarte con más autoridad y comunicar tu valor con más seguridad.',
    features: [
      'Acceso presencial al Next Level Experience (6 horas)',
      'Trabajo en vivo con los 3 expertos: IA, imagen y comunicación',
      'Materiales impresos para aplicar durante el evento',
      'Coffee break + networking con personas en tu mismo nivel',
      'Bonus: Gift Card de $27.000 para usar en alguno de nuestros servicios',
      '2x1: puedes llevar un acompañante',
    ],
    forYou:
      'Quieres vivir la experiencia completa, trabajar los 3 bloques principales y llevarte herramientas para aplicar por tu cuenta. También es ideal si quieres venir con alguien que esté construyendo, ordenando o elevando su negocio contigo.',
    cta: 'Reservar Entrada General',
    hidden: false,
  },
  {
    id: 'vip',
    name: 'Entrada VIP Next Level Experience',
    tagline: 'Para aterrizarlo a tu caso real',
    price: { amount: 147000, currency: 'CLP', display: '$147.000' },
    badge: 'EXPERIENCIA COMPLETA',
    description:
      'Incluye la experiencia presencial completa + 3 sesiones online 1:1 después del evento, una con cada experto. La General te da la experiencia completa. La VIP te ayuda a aplicar lo aprendido a tu caso real.',
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
      'Quieres salir del evento con dirección, pero también tener una mirada personalizada después para aplicar lo aprendido a tu negocio, tu imagen y tu comunicación.',
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
      'Encuentra las fugas que te mantienen operando y empieza a ordenar tu negocio con IA.',
    moduleSubtitle:
      'Antes de automatizar, delegar o vender más, necesitas ver qué partes de tu negocio siguen dependiendo demasiado de ti.',
    moduleTime: '14:10 — 15:40',
    accent: 'electric',
    lema:
      'No necesitas hacerlo todo tú. Necesitas construir una operación que no se coma tu tiempo, tu energía ni tu margen.',
    bio:
      'En este bloque vas a usar Claude como apoyo estratégico para mirar tu negocio con criterio, detectar dónde estás perdiendo tiempo, energía y margen, y decidir qué deberías eliminar, simplificar, automatizar o delegar primero. No se trata de aprender prompts bonitos — se trata de dejar de usar la IA como herramienta suelta y empezar a usarla como apoyo para pensar, ordenar y operar mejor.',
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
      'Haz que tu imagen comunique el nivel al que quieres vender.',
    moduleSubtitle:
      'Antes de que expliques tu oferta, antes de que hables de tu experiencia, tu presencia ya está comunicando algo.',
    moduleTime: '16:10 — 17:40',
    accent: 'magenta',
    lema: 'Tu imagen también vende, incluso antes de que hables.',
    bio:
      'En este bloque vas a mirar tu imagen con intención: qué estás proyectando hoy, qué puede estar debilitando tu presencia y qué ajustes necesitas hacer para que tu imagen acompañe la etapa de negocio que quieres construir. No se trata de verte "más producida" — se trata de verte más alineada con el valor que quieres que el mercado perciba de ti.',
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
      'Aprende a comunicar tu valor sin minimizarte y vender con más seguridad.',
    moduleSubtitle:
      'Puedes tener una gran oferta, mucha experiencia y resultados reales… pero si no sabes comunicarlo con claridad, el mercado no lo percibe completo.',
    moduleTime: '18:10 — 19:40',
    accent: 'gold',
    lema:
      'Si no sabes comunicar tu valor, el mercado no puede percibirlo completo.',
    bio:
      'En este bloque vas a trabajar cómo presentar lo que haces con más claridad, cómo expresar tu valor con más seguridad y cómo sostener conversaciones comerciales con mayor presencia. No se trata de sonar perfecto — se trata de que tu mensaje tenga más intención, más estructura y más fuerza.',
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
    title: 'Un mapa de qué necesitas soltar',
    body:
      'Vas a detectar qué tareas, decisiones o procesos ya no deberían depender tanto de ti si quieres crecer con más orden.',
  },
  {
    n: '02',
    title: 'Una mirada más clara de tu operación',
    body:
      'Vas a ver tu negocio con más estructura, no como una lista mental infinita que intentas recordar mientras respondes mensajes, entregas, vendes y resuelves.',
  },
  {
    n: '03',
    title: 'Recursos de Claude listos para aplicar',
    body:
      'Te llevas herramientas concretas para empezar a usar IA como apoyo real desde la semana siguiente, sin tecnicismos innecesarios ni prompts genéricos que no sabes cómo adaptar.',
  },
  {
    n: '04',
    title: 'Criterios de imagen y presencia',
    body:
      'Vas a entender qué ajustes pueden ayudarte a proyectar más seguridad, coherencia y autoridad visual.',
  },
  {
    n: '05',
    title: 'Herramientas para comunicar tu valor',
    body:
      'Te llevas frases guía y ajustes específicos para presentar tu oferta con más seguridad, vender sin minimizarte y explicar mejor por qué lo que haces vale.',
  },
  {
    n: '06',
    title: 'Una dirección más clara para tu siguiente etapa',
    body:
      'Sales con más criterio sobre cómo quieres operar, verte, hablar y vender en esta nueva etapa de tu negocio.',
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
  'Tu imagen no refleja todavía el nivel, la autoridad o el valor real de lo que haces.',
  'Te cuesta comunicar tu oferta sin enredarte, minimizarte o sentir que tienes que justificar demasiado.',
  'Quieres vender con más presencia, más seguridad y más intención.',
  'Sientes que improvisas demasiado: procesos, contenido, seguimiento, conversaciones, decisiones.',
  'Quieres dejar de operar como alguien que apenas sostiene el negocio y empezar a moverte como alguien que lo dirige.',
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
  { before: 'Todo depende de ti', after: 'Sabes qué empezar a soltar y qué ordenar primero' },
  { before: 'Improvisas demasiado', after: 'Tienes más criterio para decidir dónde poner tu energía' },
  {
    before: 'Quieres usar IA, pero no sabes por dónde empezar',
    after: 'Tienes recursos concretos para aplicarla a tu negocio',
  },
  {
    before: 'Tu imagen no refleja todo tu valor',
    after: 'Sabes qué ajustar para proyectarte con más coherencia y autoridad',
  },
  {
    before: 'Te cuesta explicar tu oferta',
    after: 'Comunicas con más claridad qué haces, para quién y por qué importa',
  },
  {
    before: 'Vendes con dudas',
    after: 'Sostienes conversaciones comerciales con más presencia y seguridad',
  },
  {
    before: 'Trabajas mucho y avanzas poco',
    after: 'Tienes una dirección más clara para moverte hacia tu siguiente etapa',
  },
] as const

/* ============================================================
 * FAQS
 * ============================================================ */
export const FAQS = [
  {
    q: '¿Necesito saber usar Claude o tener experiencia con IA?',
    a: 'No. La experiencia está pensada para emprendedores, coaches, marcas personales y profesionales que quieren aprender a usar la IA de forma práctica, sin tecnicismos. Puedes estar empezando o ya vendiendo — lo importante es que quieras aplicar la IA con más criterio a tu negocio.',
  },
  {
    q: '¿Esto es para mí si recién estoy empezando?',
    a: 'Sí. Si estás empezando, esta experiencia te ayuda a construir con más claridad desde el inicio y evitar caer en años de improvisación. Vas a poder ordenar mejor cómo quieres operar, cómo quieres presentarte y cómo quieres comunicar tu valor desde ahora.',
  },
  {
    q: 'Ya tengo un negocio funcionando. ¿Vale la pena para mí?',
    a: 'Sí. Especialmente si ya vendes, pero sientes que todo depende demasiado de ti, que tu imagen no refleja tu nivel o que tu comunicación podría ser mucho más clara. Esta experiencia no es solo para quien empieza — también es para quien necesita ordenar, ajustar y elevar lo que ya está construyendo.',
  },
  {
    q: '¿Voy a salir con todo resuelto?',
    a: 'No vamos a prometerte que en 6 horas vas a resolver todo tu negocio. Pero sí vas a salir con claridad, herramientas y pasos concretos para empezar a soltar carga, proyectarte mejor y comunicar con más seguridad.',
  },
  {
    q: '¿La Entrada VIP vale la pena?',
    a: 'Sí, si quieres una mirada más personalizada después del evento. La VIP incluye 3 sesiones privadas 1:1 online: una auditoría de tu negocio con Claude, una revisión de imagen y color, y una revisión de comunicación y ventas. La General te da la experiencia completa. La VIP te da experiencia + dirección aplicada a tu caso real.',
  },
  {
    q: '¿Cuánto dura la experiencia presencial?',
    a: '6 horas. De 14h a 21h, en Santiago. La idea no es saturarte de teoría — es darte el espacio para mirar tu negocio, tu imagen y tu mensaje con otros ojos y salir con dirección.',
  },
  {
    q: '¿La entrada incluye acompañante?',
    a: 'Solo la Entrada General incluye 2x1: puedes llevar un acompañante sin costo adicional. La Entrada VIP no tiene 2x1 porque es individual, pero incluye 3 sesiones privadas 1:1 online post-evento, una con cada experto.',
  },
  {
    q: '¿Qué pasa después de comprar mi entrada?',
    a: 'Recibes la confirmación de tu compra y la información necesaria para asistir al evento: dirección exacta, qué llevar y agenda. Si compras la Entrada VIP, después del evento se coordinan tus 3 sesiones online 1:1 con cada experto.',
  },
  {
    q: '¿Y si después no puedo asistir?',
    a: 'Al ser una experiencia presencial con cupos limitados, tu lugar se reserva exclusivamente. No hay reembolsos, pero puedes transferir tu entrada a otra persona si nos avisas con al menos 48 horas de anticipación.',
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
