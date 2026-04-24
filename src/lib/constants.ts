/**
 * Next Level Workshop — fuente única de verdad para datos del evento.
 * Los componentes leen de aquí; cambios de fecha/precio/lugar viven en este archivo.
 */

export const WORKSHOP = {
  name: 'Next Level',
  edition: 'Edición 03 · Mayo 2026',
  tagline: 'Workshop presencial · Santiago · 2026',
  date: {
    iso: '2026-05-16T14:00:00-04:00',
    display: 'Sábado 16 de mayo 2026',
    short: '16 Mayo · 14h–21h',
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
      'Hola Yoselvia! Quiero más información sobre Next Level Workshop del 16 de mayo',
  },
  email: 'hola@yosmentedigital.com',
  domain: 'nl.yosmentedigital.com',
  url: 'https://nl.yosmentedigital.com',
} as const

export const TICKETS = [
  {
    id: 'general',
    name: 'Entrada General',
    tagline: 'Para implementar',
    price: { amount: 67, currency: 'USD', display: '$67' },
    badge: null,
    description: 'Acceso completo al taller de 6 horas.',
    features: [
      'Acceso presencial al Next Level Workshop (6 horas)',
      'Trabajo en vivo con los 3 expertos (IA · Imagen · Comunicación)',
      'Materiales impresos para aplicar durante el evento',
      'Coffee break + networking',
      'Bonus: Gift Card $47.000 para tu próxima compra',
      '2x1: lleva un acompañante',
    ],
    cta: 'Reservar General',
  },
  {
    id: 'vip',
    name: 'Entrada VIP Next Level',
    tagline: 'Para acelerar',
    price: { amount: 147, currency: 'USD', display: '$147' },
    badge: 'MÁS VENDIDO',
    description: 'Todo lo de General + sesión 1:1 online post-evento con Yoselvia.',
    features: [
      'Todo lo incluido en la Entrada General',
      'Sesión grupal privada con Valentina: Colorimetría Presencial Next Level',
      'Sesión grupal privada con Sebastián: Comunicación y expresión',
      'Comunidad VIP cerrada durante 15 días para resolver dudas',
      'Acceso VIP a material exclusivo post-workshop',
    ],
    highlight: {
      title: '+1 hora exclusiva 1:1 ONLINE con Yoselvia · Activo VIP',
      body:
        'Después del evento, agendamos tu sesión 1:1 online. Mini Radiografía Operativa de TU negocio en vivo: auditamos con datos reales y Claude trabajando por vos. Te llevas: informe personalizado, 5 Fugas Invisibles cuantificadas en dinero, Matriz EOAD y plan a 30-60-90 días.',
    },
    cta: 'Reservar VIP',
  },
] as const

export const MENTORS = [
  {
    id: 'yoselvia',
    name: 'Yoselvia Adam',
    role: 'Mentora de negocios conscientes impulsados con IA',
    tag: 'Mentora · IA aplicada',
    moduleNumber: '01',
    moduleTime: '14:30 — 16:00 · 90 min',
    accent: 'electric',
    lema: 'No te enseño a usar Claude. Te enseño a OPERAR con Claude.',
    body:
      'Construís en vivo tu OPERACIÓN INTELIGENTE: un sistema operativo completo con 5 agentes IA coordinados + el mapa de las 5 etapas para construir cualquier negocio profesional.',
    deliverables: [
      'Tu CLAUDE.md personalizado (el cerebro)',
      'Tu Director de Operaciones IA configurado',
      '4 Agentes especializados: Marketing · Ventas · Entrega · Administración',
      '3 tareas programadas trabajando por vos',
      'El Mapa de las 5 Etapas del Sistema Operativo',
      'Tu tarjeta anti-sesgos física',
    ],
    cierre: 'El lunes siguiente tu sistema ya está operando.',
  },
  {
    id: 'valentina',
    name: 'Valentina Silva',
    role: 'Asesora de imagen y color presencial',
    tag: 'Asesora · Imagen + Color',
    moduleNumber: '02',
    moduleTime: '16:30 — 18:00 · 90 min',
    accent: 'champagne',
    lema: 'Tu imagen no es solo cómo te ves. Es cómo habitás tu marca.',
    body:
      'En vivo, espejo en mano, descubrís la paleta de colores y los estilos que potencian tu energía y comunican autoridad. Te vas con tu carta de identidad visual lista para usar.',
    deliverables: [
      'Tu paleta colorimétrica personal (análisis presencial)',
      'Estilos que potencian tu energía y comunican autoridad',
      'Reglas de vestir según ocasión sin perder autenticidad',
      'Presencia visual coherente con el nivel que querés proyectar',
    ],
    cierre: 'Tu imagen abre puertas antes de que digas una palabra.',
  },
  {
    id: 'sebastian',
    name: 'Sebastián Villar',
    role: 'Mentor en comunicación y ventas',
    tag: 'Mentor · Comunicación + Ventas',
    moduleNumber: '03',
    moduleTime: '18:30 — 20:00 · 90 min',
    accent: 'blood',
    lema: 'Cuando comunicás desde tu verdad, las ventas dejan de sentirse forzadas.',
    body:
      'Trabajás tu presencia y tu expresión auténtica. Practicás pitch en parejas, con feedback en vivo. Salís con un mensaje que suena tuyo — porque por primera vez, lo es.',
    deliverables: [
      'Conexión emocional antes de intentar convencer',
      'Voz, lenguaje corporal y emociones que generan confianza real',
      'Comunicación desde tu historia, no desde la presión',
      'Persuasión natural y congruente con tu energía',
    ],
    cierre: 'Cuando te creen, compran. Sin rogar. Sin descuento.',
  },
] as const

export const EXPERIENCE_BLOCKS = [
  {
    id: 'block-1',
    moduleNumber: '01',
    mentor: 'Yoselvia Adam',
    accent: 'electric',
    title: 'Tu sistema operativo IA, construido en vivo',
    learn: 'Cómo pensar tu negocio como una operación inteligente, no como una lista de tareas. Cuándo la IA te libera tiempo y cuándo te quita criterio.',
    take: [
      'Tu CLAUDE.md personalizado (el cerebro de tu operación)',
      'Director de Operaciones IA + 4 agentes (Marketing · Ventas · Entrega · Administración)',
      '3 tareas programadas trabajando por vos',
      'Tu tarjeta anti-sesgos física',
    ],
    change:
      'Salís con una empresa que opera sola en lo repetitivo. Vos lideras lo estratégico. El lunes ya está operando.',
  },
  {
    id: 'block-2',
    moduleNumber: '02',
    mentor: 'Valentina Silva',
    accent: 'champagne',
    title: 'Tu identidad visual, alineada con tu autoridad',
    learn: 'Por qué tu imagen comunica antes que tus palabras. Qué colores te abren puertas y cuáles te restan presencia.',
    take: [
      'Tu paleta colorimétrica personal (análisis presencial con espejo)',
      'Tu carta de identidad visual lista para usar',
      'Reglas de vestir según ocasión sin perder esencia',
      'Estilos que comunican autoridad y energía',
    ],
    change:
      'Salís con una presencia visual que respalda tu mensaje. La gente te lee distinto antes de que abras la boca.',
  },
  {
    id: 'block-3',
    moduleNumber: '03',
    mentor: 'Sebastián Villar',
    accent: 'blood',
    title: 'Tu comunicación de ventas, sin sentirse forzada',
    learn: 'Cómo conectar antes de convencer. Por qué tu voz, tu cuerpo y tu historia venden más que cualquier técnica de cierre.',
    take: [
      'Tu pitch refinado y practicado con feedback en vivo',
      'Estructura de conversación de venta auténtica',
      'Mapa de tus historias clave para ventas',
      'Protocolo de presencia que proyecta autoridad',
    ],
    change:
      'Salís con un mensaje que suena tuyo. Vendés desde tu verdad, no desde la presión. Y cuando te creen, compran.',
  },
] as const

export const FAQS = [
  {
    q: '¿Y si no me sirve?',
    a: 'Este workshop está diseñado para que implementes en el momento. No vienes a escuchar teoría — vas a trabajar sobre tu propio negocio con ejercicios prácticos guiados en vivo. Si en los primeros 60 minutos no sentís que va a cambiar tu negocio, te devolvemos el 100%.',
  },
  {
    q: '¿Por qué solo un día?',
    a: 'Porque lo que falta no es más tiempo — es enfoque. En una jornada intensiva y bien estructurada lograrás avances reales que llevás meses postergando. Este formato es para personas que necesitan claridad y resultados ya.',
  },
  {
    q: 'Ya hice otros cursos. ¿Esto me va a aportar algo?',
    a: 'Justamente por eso es para vos. Esto no es contenido para acumular — es implementación real. Es para quien ya tiene un negocio activo y busca orden, claridad y una imagen coherente para escalar.',
  },
  {
    q: 'Soy tímido y me cuesta mostrarme. ¿Es para mí?',
    a: 'Este espacio es seguro, humano y respetuoso. No se trata de exponerte — se trata de alinear tu negocio con tu esencia. Vas a sentirte acompañado en todo momento.',
  },
  {
    q: '¿Qué pasa si no puedo asistir después de pagar?',
    a: 'Al ser presencial con cupos limitados, tu lugar se reserva exclusivamente. No hay reembolsos, pero podés transferir tu entrada a otra persona si nos avisás con al menos 48 horas de anticipación.',
  },
  {
    q: '¿Es teórico o práctico?',
    a: 'Es práctico. Todo lo que aprendés lo aplicás durante la jornada. Te llevás tu sistema IA funcionando, tu paleta colorimétrica, tu pitch refinado — y un compromiso escrito a 90 días.',
  },
  {
    q: '¿Qué pasa después del 16 de mayo?',
    a: 'Los lunes siguientes empezás distinto. Si elegiste VIP, además tenés tu sesión 1:1 online con Yoselvia (Mini Radiografía Operativa con plan personalizado a 30-60-90 días) y 15 días de comunidad VIP cerrada para resolver dudas y mantener el foco.',
  },
] as const

export const TESTIMONIALS = [
  {
    id: 'testimonio-1',
    quote:
      'Llegué con un negocio que me consumía. Salí con un sistema que trabaja por mí y un mensaje que suena a mí. El lunes ya estaba operando distinto.',
    name: 'Nombre del testimonio 1',
    role: 'Cargo · Ciudad',
  },
  {
    id: 'testimonio-2',
    quote:
      'Pagué por un workshop. Volví con una empresa diferente. La parte de IA con Yoselvia me ahorra hoy 12 horas a la semana — literal.',
    name: 'Nombre del testimonio 2',
    role: 'Cargo · Ciudad',
  },
  {
    id: 'testimonio-3',
    quote:
      'Lo que más me sorprendió: no salimos con teoría. Salimos con cosas hechas. Mi paleta de color, mi pitch, mis agentes IA — todo aterrizado el mismo día.',
    name: 'Nombre del testimonio 3',
    role: 'Cargo · Ciudad',
  },
] as const

export const META = {
  title: 'Next Level Workshop · Sábado 16 Mayo 2026 · Santiago',
  description:
    'Workshop presencial de 6 horas. 3 mentores en vivo: IA aplicada con Claude, imagen y comunicación. Te llevas un sistema funcionando — no apuntes. Cupos limitados.',
  ogImage: '/og-image.png',
} as const

export type Mentor = (typeof MENTORS)[number]
export type Ticket = (typeof TICKETS)[number]
export type ExperienceBlock = (typeof EXPERIENCE_BLOCKS)[number]
export type Faq = (typeof FAQS)[number]
export type Testimonial = (typeof TESTIMONIALS)[number]
