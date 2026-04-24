'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const PREFIX = 'nl_'
const KEY_TEXT = `${PREFIX}text_`
const KEY_IMG = `${PREFIX}img_`
const KEY_VID = `${PREFIX}vid_`

type EditableEl = HTMLElement & { dataset: DOMStringMap }

function extractWistiaId(input: string): string | null {
  if (!input) return null
  const m = input.match(/medias\/([a-z0-9]+)/i) ?? input.match(/embed\/iframe\/([a-z0-9]+)/i)
  if (m) return m[1]
  if (/^[a-z0-9]+$/i.test(input.trim())) return input.trim()
  return null
}

function injectWistia(slot: HTMLElement, mediaId: string) {
  slot.innerHTML = ''
  const iframe = document.createElement('iframe')
  iframe.src = `https://fast.wistia.net/embed/iframe/${mediaId}?videoFoam=true`
  iframe.allow = 'autoplay; fullscreen'
  iframe.allowFullscreen = true
  iframe.style.cssText = 'width:100%;height:100%;border:0;display:block'
  slot.appendChild(iframe)
  slot.classList.add('has-video')
}

function restoreAll() {
  document.querySelectorAll<EditableEl>('[data-editable]').forEach((el) => {
    const v = localStorage.getItem(KEY_TEXT + el.dataset.editable)
    if (v !== null) el.innerHTML = v
  })
  document.querySelectorAll<HTMLElement>('[data-image]').forEach((el) => {
    const v = localStorage.getItem(KEY_IMG + el.dataset.image)
    if (v) el.style.backgroundImage = `url(${v})`
  })
  document.querySelectorAll<HTMLElement>('[data-video]').forEach((el) => {
    const v = localStorage.getItem(KEY_VID + (el.dataset.video ?? ''))
    if (v) injectWistia(el, v)
  })
}

export function EditModeProvider() {
  const [editMode, setEditMode] = useState(false)
  const editModeRef = useRef(editMode)
  useEffect(() => {
    editModeRef.current = editMode
  }, [editMode])

  // 1. On mount: restore stored content
  useEffect(() => {
    restoreAll()
  }, [])

  // 2. Toggle body class & contentEditable when mode flips
  useEffect(() => {
    document.body.classList.toggle('edit-mode', editMode)
    document.querySelectorAll<EditableEl>('[data-editable]').forEach((el) => {
      el.contentEditable = editMode ? 'true' : 'false'
      if (editMode) el.spellcheck = false
    })
  }, [editMode])

  // 3. Save text on blur
  useEffect(() => {
    const onBlur = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null
      if (!t || !t.dataset?.editable) return
      localStorage.setItem(KEY_TEXT + t.dataset.editable, t.innerHTML)
    }
    document.addEventListener('blur', onBlur, true)
    return () => document.removeEventListener('blur', onBlur, true)
  }, [])

  // 4. Click handler for image upload + video wistia
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!editModeRef.current) return
      const target = e.target as HTMLElement | null
      if (!target) return

      const imgSlot = target.closest<HTMLElement>('[data-image]')
      if (imgSlot) {
        e.preventDefault()
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = (ev) => {
          const file = (ev.target as HTMLInputElement).files?.[0]
          if (!file) return
          const reader = new FileReader()
          reader.onload = (re) => {
            const dataUrl = re.target?.result as string
            imgSlot.style.backgroundImage = `url(${dataUrl})`
            try {
              localStorage.setItem(KEY_IMG + (imgSlot.dataset.image ?? ''), dataUrl)
            } catch {
              alert('La foto es muy pesada para guardar local. Intentá una <2MB o subila a /public.')
            }
          }
          reader.readAsDataURL(file)
        }
        input.click()
        return
      }

      const vidSlot = target.closest<HTMLElement>('[data-video]')
      if (vidSlot) {
        e.preventDefault()
        const url = window.prompt(
          'Pegá la URL de Wistia o el ID del video:\n\nEjemplo:\n• https://tucuenta.wistia.com/medias/abc123\n• abc123'
        )
        if (!url) return
        const id = extractWistiaId(url)
        if (!id) {
          alert('No reconocí ese link. Pegá un link de Wistia válido.')
          return
        }
        injectWistia(vidSlot, id)
        localStorage.setItem(KEY_VID + (vidSlot.dataset.video ?? ''), id)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // 5. Keyboard shortcut Cmd/Ctrl + E
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault()
        setEditMode((v) => !v)
      } else if (e.key === 'Escape' && editModeRef.current) {
        setEditMode(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const restore = useCallback(() => {
    if (
      !window.confirm(
        'Esto borra TODOS tus cambios (textos, fotos, videos) y vuelve al original. ¿Continuar?'
      )
    )
      return
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k))
    location.reload()
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setEditMode((v) => !v)}
        title="Editar página (Ctrl/Cmd + E)"
        aria-label="Toggle edit mode"
        className={`fixed bottom-6 left-6 z-[9999] w-12 h-12 rounded-full flex items-center justify-center text-base font-bold cursor-pointer transition-transform hover:scale-105 hover:-rotate-6 no-print ${
          editMode
            ? 'bg-magenta text-white shadow-glow-magenta'
            : 'bg-electric text-noir shadow-glow-electric'
        }`}
      >
        {editMode ? '✓' : '✏️'}
      </button>

      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9998] bg-noir-3 border border-champagne/25 rounded-full px-5 py-2.5 flex items-center gap-4 text-sm text-cream shadow-editorial transition-transform duration-300 no-print ${
          editMode ? 'translate-y-0' : 'translate-y-[150%]'
        }`}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-mutedc">
          Modo edición
        </span>
        <span className="text-cream/40" aria-hidden>
          ·
        </span>
        <span className="text-xs text-cream/70 hidden sm:inline">
          Texto + Fotos + Videos Wistia
        </span>
        <button
          type="button"
          onClick={restore}
          className="px-3.5 py-1.5 rounded-full bg-blood/15 text-red-300 hover:bg-blood/30 hover:text-white transition text-xs font-medium"
          title="Borra TODOS tus cambios"
        >
          Restaurar
        </button>
        <button
          type="button"
          onClick={() => setEditMode(false)}
          className="px-3.5 py-1.5 rounded-full bg-electric text-noir font-medium hover:bg-yellow-300 transition text-xs"
        >
          Listo ✓
        </button>
      </div>
    </>
  )
}
