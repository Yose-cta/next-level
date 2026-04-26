'use client'

import { useEffect } from 'react'

/**
 * Protección contra Self-XSS — el ataque donde alguien convence a un usuario
 * de pegar código malicioso en la consola del navegador para "obtener algo
 * gratis" / "hackear su cuenta" / etc.
 *
 * Patrón usado por Facebook, Google, Twitter, GitHub. No bloquea el código
 * (los devs reales necesitan la consola), pero advierte de forma muy visible
 * cuando alguien abre DevTools por primera vez en la sesión.
 *
 * Solo se loguea una vez por carga de página.
 */
export function SelfXSSWarning() {
  useEffect(() => {
    // Solo en producción (en dev molesta al desarrollar)
    if (process.env.NODE_ENV !== 'production') return

    const titleStyle = [
      'color: #ff003c',
      'font-size: 48px',
      'font-weight: 900',
      'font-family: -apple-system, system-ui, sans-serif',
      'text-shadow: 2px 2px 0 rgba(0,0,0,0.4)',
      'padding: 8px 0',
    ].join(';')

    const bodyStyle = [
      'color: #1a1a1a',
      'background: #ffd23f',
      'font-size: 15px',
      'font-weight: 600',
      'font-family: -apple-system, system-ui, sans-serif',
      'padding: 8px 12px',
      'line-height: 1.6',
    ].join(';')

    const accentStyle = [
      'color: #ff003c',
      'font-size: 14px',
      'font-weight: 700',
      'font-family: -apple-system, system-ui, sans-serif',
      'padding: 6px 0',
    ].join(';')

    const mutedStyle = [
      'color: #666',
      'font-size: 12px',
      'font-family: -apple-system, system-ui, sans-serif',
      'padding: 6px 0',
    ].join(';')

    // eslint-disable-next-line no-console
    console.log('%c¡ALTO!', titleStyle)
    // eslint-disable-next-line no-console
    console.log(
      '%c Esta es una herramienta para desarrolladores. \n Si alguien te dijo que pegues código aquí para obtener algo gratis, hackear, "verificar tu cuenta", desbloquear funciones o cualquier cosa similar — es una ESTAFA. \n Pegarlo le da a esa persona acceso a tu sesión, tus pagos y tus datos. ',
      bodyStyle
    )
    // eslint-disable-next-line no-console
    console.log('%c → Nunca pegues código que no entiendas.', accentStyle)
    // eslint-disable-next-line no-console
    console.log(
      '%cSi eres desarrolladora/desarrollador y sabes lo que haces, ignora este aviso.',
      mutedStyle
    )
  }, [])

  return null
}
