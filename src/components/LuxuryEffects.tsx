'use client'

import { useEffect } from 'react'

/**
 * Premium UX layer:
 * 1. Cursor light — sets CSS vars --cursor-x/y for the radial spotlight
 * 2. Magnetic CTAs — buttons with `data-magnetic` attract toward the cursor
 *
 * All effects respect prefers-reduced-motion.
 */
export function LuxuryEffects() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return // skip on touch

    document.body.classList.add('cursor-light')

    const root = document.documentElement
    let raf = 0
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (raf) return
      raf = requestAnimationFrame(() => {
        root.style.setProperty('--cursor-x', `${tx}px`)
        root.style.setProperty('--cursor-y', `${ty}px`)
        raf = 0
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    // Magnetic buttons
    const magnetics = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'))
    const cleanups: Array<() => void> = []
    for (const el of magnetics) {
      const strength = Number(el.dataset.magnetic) || 0.25
      const onEnter = () => (el.style.transition = 'transform 80ms ease-out')
      const onLeave = () => {
        el.style.transition = 'transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)'
        el.style.transform = 'translate(0, 0)'
      }
      const onMoveBtn = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
      }
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
      el.addEventListener('mousemove', onMoveBtn)
      cleanups.push(() => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.removeEventListener('mousemove', onMoveBtn)
      })
    }

    return () => {
      window.removeEventListener('mousemove', onMove)
      cleanups.forEach((fn) => fn())
      document.body.classList.remove('cursor-light')
      cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
