import type { Metadata } from 'next'
import Link from 'next/link'

import { CONTACT, TICKETS, WORKSHOP } from '@/lib/constants'
import { googleCalendarUrl, whatsappUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Gracias por reservar · Next Level Experience',
  description:
    'Tu cupo está reservado. Aquí tienes todos los datos del workshop, qué hacer ahora y cómo registrar a tu acompañante.',
  robots: { index: false, follow: false },
}

interface PageProps {
  searchParams: Promise<{ ticket?: string; status?: string }>
}

export default async function GraciasPage({ searchParams }: PageProps) {
  const params = await searchParams
  const ticketId = params.ticket ?? 'general'
  const ticket = TICKETS.find((t) => t.id === ticketId) ?? TICKETS[0]
  const isPending = params.status === 'pending'
  const isVip = ticket.id === 'vip'
  const isTest = ticket.id === 'test'
  // El ticket de test se muestra como "Entrada General" para que la prueba refleje
  // exactamente lo que va a ver el cliente real al comprar la General.
  const displayTicket = isTest
    ? TICKETS.find((t) => t.id === 'general') ?? ticket
    : ticket
  const isGeneral = ticket.id === 'general' || isTest

  const waUrlDudas = whatsappUrl(
    CONTACT.whatsapp.number,
    `Hola Yoselvia! Acabo de reservar mi cupo ${displayTicket.name} para Next Level Experience del 16 de mayo. Tengo una consulta:`
  )

  const waUrlAcompanante = whatsappUrl(
    CONTACT.whatsapp.number,
    `Hola Yoselvia! Compré mi entrada General 2x1 para Next Level Experience del 16 de mayo y quiero registrar a mi acompañante.

Nombre del comprador:
Nombre del acompañante:
Correo del acompañante:
Teléfono del acompañante:`
  )

  // URL para agregar a Google Calendar (16 mayo 2026, 14h-21h Chile = -04:00)
  const googleCalUrl = googleCalendarUrl({
    title: 'Next Level Experience · 2nd Edition',
    startUtc: '20260516T180000Z', // 14:00 Santiago = 18:00 UTC
    endUtc: '20260517T010000Z', // 21:00 Santiago = 01:00 UTC siguiente
    details:
      'Workshop presencial · 6 horas con Yoselvia, Valentina y Sebastián. Llegar 15 minutos antes.',
    location: WORKSHOP.venue.full,
  })

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Glow ambient sutil */}
      <div
        className="absolute inset-0 -z-10 opacity-50 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,210,63,.08), transparent 70%)',
        }}
        aria-hidden
      />

      <div className="max-w-2xl w-full mx-auto">
        {/* ============================================ */}
        {/* 1. HERO BIENVENIDA                            */}
        {/* ============================================ */}
        <header className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-electric text-electric font-display text-3xl sm:text-4xl mb-8">
            ✓
          </div>

          <div className="font-mono text-xs uppercase tracking-[0.3em] text-champagne mb-4">
            {isPending ? 'Confirmando tu pago' : 'Tu lugar está reservado'}
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-cream font-light leading-[1.05]">
            {isPending ? (
              <>
                Estamos confirmando
                <br />
                <em className="text-electric not-italic">tu pago.</em>
              </>
            ) : (
              <>
                Ya estás dentro de
                <br />
                <em className="text-electric not-italic">Next Level Experience.</em>
              </>
            )}
          </h1>

          <p className="mt-8 text-lg text-cream/85 leading-relaxed max-w-xl mx-auto">
            {isPending
              ? 'Cuando confirmemos el pago te llega un email con todos los detalles. Si tienes dudas, escríbenos directo por WhatsApp.'
              : `Confirmamos tu ${displayTicket.name}. Acabas de tomar una decisión que pocos toman: parar, mirar tu negocio con otros ojos y empezar a dirigir desde tu siguiente nivel.`}
          </p>
        </header>

        {/* ============================================ */}
        {/* 2. DATOS DEL EVENTO                          */}
        {/* ============================================ */}
        <section className="mt-14 bg-noir-2 border border-champagne/15 rounded-sm p-6 sm:p-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-electric mb-5">
            Guarda la fecha
          </div>

          <div className="grid sm:grid-cols-3 gap-5 sm:gap-4">
            <Detail label="Fecha" value={WORKSHOP.date.display} />
            <Detail label="Horario" value="14h a 21h · 6h" />
            <Detail label="Lugar" value={WORKSHOP.venue.full} />
          </div>

          {!isPending && (
            <p className="mt-6 pt-6 border-t border-champagne/10 text-sm text-cream/65 leading-relaxed">
              En unos minutos vas a recibir el comprobante por email a la
              dirección que registraste.{' '}
              <strong className="text-cream">
                Revisa también spam o promociones.
              </strong>
            </p>
          )}
        </section>

        {/* ============================================ */}
        {/* 3. ¿QUÉ HAGO AHORA? — checklist 3 pasos      */}
        {/* ============================================ */}
        {!isPending && (
          <section className="mt-14">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-champagne mb-6">
              ¿Qué hago ahora?
            </div>

            <ol className="space-y-6">
              <Step n="01" title="Revisa tu correo">
                Te llega un email con el comprobante y la agenda detallada del
                workshop. Confirma que recibiste todo —{' '}
                <strong className="text-cream">si no, revisa tu spam.</strong>
              </Step>
              <Step n="02" title="Agrega la fecha a tu calendario">
                <a
                  href={googleCalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electric hover:underline"
                >
                  Agregar a Google Calendar →
                </a>{' '}
                Sábado 16 de mayo, 14h a 21h. Bloquea el día completo: vas a
                querer estar 100% presente.
              </Step>
              <Step n="03" title="Ven con preguntas. Vas a salir con respuestas.">
                Piensa en qué parte de tu negocio te tiene más operando, qué
                imagen quieres proyectar y dónde sientes que tu mensaje no llega
                como debería. De ahí salimos.
              </Step>
            </ol>
          </section>
        )}

        {/* ============================================ */}
        {/* 4. ACOMPAÑANTE (solo General)                */}
        {/* ============================================ */}
        {isGeneral && !isPending && (
          <section className="mt-14 bg-magenta/5 border border-magenta/30 rounded-sm p-6 sm:p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-magenta mb-3">
              Tu entrada incluye 2×1
            </div>

            <h2 className="font-display text-2xl sm:text-3xl text-cream leading-tight">
              ¿Vienes con alguien?
            </h2>

            <p className="mt-4 text-cream/85 leading-relaxed">
              Comparte Next Level Experience con alguien que también esté en su
              próxima etapa. Registramos a tu acompañante por WhatsApp con sus
              datos — tarda 1 minuto y ya queda listo.
            </p>

            <a
              href={waUrlAcompanante}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-3 bg-magenta text-white font-semibold px-7 py-4 rounded-full hover:opacity-90 transition"
            >
              <WhatsAppIcon />
              <span>Registrar a mi acompañante</span>
            </a>
          </section>
        )}

        {/* ============================================ */}
        {/* 5. VIP — 3 sesiones 1:1                      */}
        {/* ============================================ */}
        {isVip && !isPending && (
          <section className="mt-14 bg-electric/10 border border-electric/30 rounded-sm p-6 sm:p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-electric mb-3">
              Tu Activo VIP · 3 sesiones 1:1 post-evento
            </div>

            <h2 className="font-display text-2xl sm:text-3xl text-cream leading-tight">
              Después del workshop, agendamos tus 3 sesiones privadas
            </h2>

            <ul className="mt-6 space-y-3">
              <li className="flex gap-3 text-cream/85 leading-relaxed">
                <span className="text-electric shrink-0 mt-0.5">★</span>
                <span>
                  <strong className="text-cream">Yoselvia</strong> · Auditoría
                  VIP de tu negocio con Claude (60 min)
                </span>
              </li>
              <li className="flex gap-3 text-cream/85 leading-relaxed">
                <span className="text-electric shrink-0 mt-0.5">★</span>
                <span>
                  <strong className="text-cream">Valentina</strong> ·
                  Colorimetría VIP + revisión de imagen y presencia (60 min)
                </span>
              </li>
              <li className="flex gap-3 text-cream/85 leading-relaxed">
                <span className="text-electric shrink-0 mt-0.5">★</span>
                <span>
                  <strong className="text-cream">Sebastián</strong> · Revisión
                  personalizada de comunicación y ventas (60 min)
                </span>
              </li>
            </ul>

            <p className="mt-6 pt-5 border-t border-electric/15 text-sm text-cream/70 leading-relaxed">
              Te contactamos por WhatsApp después del 16 de mayo para coordinar
              fechas y horarios.
            </p>
          </section>
        )}

        {/* ============================================ */}
        {/* 6. GRUPO DE WHATSAPP — comunidad de compradores */}
        {/* ============================================ */}
        {!isPending && (
          <section className="mt-14 bg-noir-2 border border-electric/25 rounded-sm p-6 sm:p-8 relative overflow-hidden">
            <div
              className="absolute inset-0 -z-0 opacity-30 pointer-events-none"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(246, 207, 47, 0.18), transparent 70%)',
              }}
              aria-hidden
            />

            <div className="relative">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-electric mb-3">
                Súmate al grupo · Solo para compradores
              </div>

              <h2 className="font-display text-2xl sm:text-3xl text-cream leading-tight">
                Te recibimos en el grupo de Next Level Experience
              </h2>

              <p className="mt-4 text-cream/85 leading-relaxed">
                Ahí van los recordatorios, contenido pre-evento, ubicación
                exacta del lugar y networking con el resto del grupo. Es{' '}
                <strong className="text-cream">privado y exclusivo</strong>{' '}
                para quienes ya reservaron su cupo.
              </p>

              <a
                href={CONTACT.whatsappGroup}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-3 bg-whatsapp text-white font-semibold px-7 py-4 rounded-full hover:opacity-90 transition"
              >
                <WhatsAppIcon />
                <span>Unirme al grupo</span>
              </a>
            </div>
          </section>
        )}

        {/* ============================================ */}
        {/* 7. CTAs secundarios                          */}
        {/* ============================================ */}
        <section className="mt-14 grid sm:grid-cols-2 gap-4">
          <a
            href={waUrlDudas}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-noir-2 border border-champagne/30 text-cream font-semibold px-6 py-4 rounded-full hover:border-electric hover:text-electric transition"
          >
            <WhatsAppIcon />
            <span>Tengo una duda</span>
          </a>
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-electric text-electric font-semibold px-6 py-4 rounded-full hover:bg-electric hover:text-noir transition"
          >
            <span aria-hidden>📅</span>
            <span>Agregar a Google Calendar</span>
          </a>
        </section>

        {/* ============================================ */}
        {/* 8. CIERRE EMOCIONAL                          */}
        {/* ============================================ */}
        {!isPending && (
          <section className="mt-16 text-center">
            <p className="font-display italic text-2xl sm:text-3xl text-cream/90 leading-snug">
              Nos vemos el 16 de mayo en Santiago.
              <br />
              <span className="text-electric not-italic">Ven a vivirlo.</span>
            </p>
          </section>
        )}

        <div className="mt-14 text-center">
          <Link
            href="/"
            className="inline-block text-mutedc hover:text-electric transition text-xs font-mono uppercase tracking-widest"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}

/* ============ Componentes locales ============ */

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-mutedc mb-1.5">
        {label}
      </div>
      <div className="text-cream font-display text-lg leading-tight">
        {value}
      </div>
    </div>
  )
}

function Step({
  n,
  title,
  children,
}: {
  n: string
  title: string
  children: React.ReactNode
}) {
  return (
    <li className="flex gap-5 sm:gap-6">
      <span className="font-mono text-[11px] tracking-[0.2em] text-electric pt-1.5 shrink-0">
        {n}
      </span>
      <div className="flex-1">
        <div className="font-display text-xl text-cream mb-1.5 leading-snug">
          {title}
        </div>
        <div className="text-sm sm:text-base text-cream/75 leading-relaxed">
          {children}
        </div>
      </div>
    </li>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}
