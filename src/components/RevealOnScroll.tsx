'use client'

import { useEffect } from 'react'

/**
 * Activa la animación `.reveal` → `.visible` al entrar en viewport.
 * Sin esto, todo elemento con clase `.reveal` se queda con opacity 0.
 *
 * Si el browser no soporta IntersectionObserver (rara vez), revela todo de una.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal')

    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add('visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    )

    elements.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
