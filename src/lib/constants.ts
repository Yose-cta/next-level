/**
 * Next Level Experience — fuente única de verdad para datos del evento.
 * Lenguaje: español neutro chileno (tú, haces, sales, etc.)
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
  email: 'hola@yosmentedigital.com',
  domain: 'nl.yosmentedigital.com',
  url: 'https://nl.yosmentedigital.com',
} as const

export const BRAND = {
  logoSrc: '/next-level-logo.png',
  logoAlt: 'NEXT LEVEL',
} as const

export const TICKETS = [
  {
    id: 'general',
    name: 'Entrada General',
    tagline: 'Para implementar',
    price: { amount: 67000, currency: 'CLP', display: '$67.000' },
    badge: null,
    description: 'Acceso completo al taller de 6 horas presenciales.',
    features: [
      'Acceso presencial al Next Level Experience (6 horas)',
      'Trabajo en vivo con los 3 expertos (IA · Imagen · Comunicación)',
      'Materiales impresos para aplicar durante el evento',
      'Coffee break + networking',
      'Bonus: Gift Card $47.000 para tu próxima compra',
      '2x1: lleva un acompañante',
    ],
    cta: 'Reservar General',
    hidden: false,
  },
  {
    id: 'vip',
    name: 'Entrada VIP Next Level',
    tagline: 'Para acelerar',
    price: { amount: 147000, currency: 'CLP', display: '$147.000' },
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
        'Después del evento agendamos tu sesión 1:1 online. Mini Radiografía Operativa de TU negocio en vivo: auditamos con datos reales y Claude trabajando en tiempo real. Te llevas: informe personalizado, 5 Fugas Invisibles cuantificadas en dinero, Matriz EOAD y plan a 30-60-90 días.',
    },
    cta: 'Reservar VIP',
    hidden: false,
  },
  {
    id: 'test',
    name: 'Test de Pago',
    tagline: 'Solo testing — no es entrada real',
    price: { amount: 1000, currency: 'CLP', display: '$1.000' },
    badge: null,
    description: 'Botón de prueba para validar el flujo end-to-end de Mercado Pago.',
    features: ['Crea preference → checkout MP → webhook → Supabase → email Resend'],
    cta: 'Probar pago $1.000',
    hidden: true,
  },
] as const

export const MENTORS = [
  {
    id: 'yoselvia',
    name: 'Yoselvia Adam',
    role: 'Mentora de IA Aplicada',
    expertise: 'Negocios conscientes impulsados con Claude',
    tag: 'IA aplicada · Operación inteligente',
    moduleNumber: '01',
    moduleTime: '14:30 — 16:00',
    accent: 'electric',
    lema: 'No te enseño a usar Claude. Te enseño a OPERAR con Claude.',
    bio: 'Estratega y consultora de negocios especializada en construir sistemas operativos con IA. Formó a +500 emprendedores latinoamericanos en pasar de operar su negocio a dirigirlo desde el sistema.',
    teaches: 'Cómo construir tu Operación Inteligente con 5 agentes IA coordinados que trabajan por ti.',
    deliverables: [
      'Tu CLAUDE.md personalizado (el cerebro)',
      'Director de Operaciones IA + 4 Agentes especializados',
      '3 tareas programadas trabajando por ti',
      'El Mapa de las 5 Etapas del Sistema Operativo',
      'Tu tarjeta anti-sesgos física',
    ],
  },
  {
    id: 'valentina',
    name: 'Valentina Silva',
    role: 'Asesora de Imagen & Color',
    expertise: 'Análisis colorimétrico presencial y autoridad visual',
    tag: 'Imagen + Color · Presencia',
    moduleNumber: '02',
    moduleTime: '16:30 — 18:00',
    accent: 'magenta',
    lema: 'Tu imagen no es solo cómo te ves. Es cómo habitas tu marca.',
    bio: 'Asesora de imagen presencial con +10 años de experiencia. Trabaja la presencia visual como herramienta de autoridad para emprendedoras y consultoras que quieren proyectar otro nivel.',
    teaches: 'Cómo construir tu paleta colorimétrica personal y vestir desde tu identidad.',
    deliverables: [
      'Tu paleta colorimétrica personal (análisis presencial con espejo)',
      'Tu carta de identidad visual lista para usar',
      'Reglas de vestir según ocasión sin perder esencia',
      'Estilos que comunican autoridad y energía',
    ],
  },
  {
    id: 'sebastian',
    name: 'Sebastián Villar',
    role: 'Mentor en Comunicación y Ventas',
    expertise: 'Pitch auténtico, persuasión sin presión',
    tag: 'Comunicación + Ventas · Voz',
    moduleNumber: '03',
    moduleTime: '18:30 — 20:00',
    accent: 'cyan',
    lema: 'Cuando comunicas desde tu verdad, las ventas dejan de sentirse forzadas.',
    bio: 'Mentor en ventas auténticas y comunicación humana. Acompañó a +300 profesionales a vender sus servicios sin scripts ni presión, desde su voz real.',
    teaches: 'Cómo comunicar tu valor desde tu historia y vender sin sentirte forzado.',
    deliverables: [
      'Tu pitch refinado y practicado con feedback en vivo',
      'Estructura de conversación de venta auténtica',
      'Mapa de tus historias clave para ventas',
      'Protocolo de presencia que proyecta autoridad',
    ],
  },
] as const

export const TAKEAWAYS = [
  {
    n: '01',
    title: 'Tu sistema operativo IA',
    body: 'CLAUDE.md personalizado + Director de Operaciones + 4 agentes coordinados (Marketing · Ventas · Entrega · Administración) trabajando para ti desde el lunes.',
  },
  {
    n: '02',
    title: 'Tu mensaje de marca claro',
    body: 'Tu propuesta en 3 niveles de voz: pitch corto, conversación de venta y narrativa larga. Lo que dices cuando te preguntan a qué te dedicas — finalmente claro.',
  },
  {
    n: '03',
    title: 'Tu paleta colorimétrica personal',
    body: 'Análisis presencial con espejo. Tu carta de identidad visual con los colores que abren puertas y los que evitar. Listo para imprimir.',
  },
  {
    n: '04',
    title: 'Tu pitch refinado',
    body: 'Practicas en parejas con feedback en vivo de Sebastián. Sales con tu mensaje pulido, tu lenguaje corporal alineado y tu historia ordenada.',
  },
  {
    n: '05',
    title: 'Protocolo de presencia',
    body: 'Cómo entras a una reunión, cómo te sientas, cómo respiras antes de hablar. Las micro-decisiones que construyen autoridad antes de que digas la primera palabra.',
  },
  {
    n: '06',
    title: 'Tu plan a 90 días',
    body: 'Compromiso escrito antes de irte. Las 3 acciones específicas que vas a ejecutar el lunes, el primer mes y el primer trimestre.',
  },
] as const

export const FAQS = [
  {
    q: '¿Y si no me sirve?',
    a: 'Esta experiencia está diseñada para que implementes en el momento. No vienes a escuchar teoría — trabajas sobre tu propio negocio con ejercicios prácticos guiados en vivo. Si en los primeros 60 minutos no sientes que va a cambiar tu negocio, te devolvemos el 100%.',
  },
  {
    q: '¿Por qué solo medio día?',
    a: 'Porque lo que falta no es más tiempo — es enfoque. En una jornada intensiva y bien estructurada logras avances reales que llevas meses postergando. Este formato es para personas que necesitan claridad y resultados ya.',
  },
  {
    q: 'Ya hice otros cursos. ¿Esto me va a aportar algo?',
    a: 'Justamente por eso es para ti. Esto no es contenido para acumular — es implementación real. Es para quien ya tiene un negocio activo y busca orden, claridad y una imagen coherente para escalar.',
  },
  {
    q: 'Soy tímido y me cuesta mostrarme. ¿Es para mí?',
    a: 'Este espacio es seguro, humano y respetuoso. No se trata de exponerte — se trata de alinear tu negocio con tu esencia. Vas a sentirte acompañado en todo momento.',
  },
  {
    q: '¿Qué pasa si no puedo asistir después de pagar?',
    a: 'Al ser presencial con cupos limitados, tu lugar se reserva exclusivamente. No hay reembolsos, pero puedes transferir tu entrada a otra persona si nos avisas con al menos 48 horas de anticipación.',
  },
  {
    q: '¿Es teórico o práctico?',
    a: 'Es práctico. Todo lo que aprendes lo aplicas durante la jornada. Te llevas tu sistema IA funcionando, tu paleta colorimétrica, tu pitch refinado — y un compromiso escrito a 90 días.',
  },
  {
    q: '¿Qué pasa después del 16 de mayo?',
    a: 'Los lunes siguientes empiezas distinto. Si elegiste VIP, además tienes tu sesión 1:1 online con Yoselvia (Mini Radiografía Operativa con plan personalizado a 30-60-90 días) y 15 días de comunidad VIP cerrada para resolver dudas y mantener el foco.',
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
      'Pagué por una experiencia. Volví con una empresa diferente. La parte de IA con Yoselvia me ahorra hoy 12 horas a la semana — literal.',
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
  title: 'Next Level Experience · 2nd Edition · 16 Mayo 2026 · Santiago',
  description:
    'Half-Day Experience presencial. 3 mentores en vivo: IA aplicada con Claude, imagen y comunicación. Te llevas un sistema funcionando — no apuntes. Cupos limitados.',
  ogImage: '/next-level-logo.png',
} as const

export type Mentor = (typeof MENTORS)[number]
export type Ticket = (typeof TICKETS)[number]
export type Takeaway = (typeof TAKEAWAYS)[number]
export type Faq = (typeof FAQS)[number]
export type Testimonial = (typeof TESTIMONIALS)[number]
