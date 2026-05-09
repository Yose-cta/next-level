'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function GuiasLogin() {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/guias-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })

    if (res.ok) {
      router.push('/guias')
      router.refresh()
    } else {
      setError('Código incorrecto. Revisa tu entrada o contacta al equipo.')
    }

    setLoading(false)
  }

  return (
    <section className="sec-dark min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-display italic text-display-lg mb-2">
            Next Level
          </h1>
          <p className="text-white/50 text-sm">
            Guías Interactivas · Acceso exclusivo para asistentes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-dark border border-white/10 rounded-2xl p-8 space-y-5">
          <h2 className="font-display italic text-2xl text-center mb-2">
            Código de acceso
          </h2>

          <p className="text-sm text-white/40 text-center">
            Ingresa el código que recibiste al comprar tu entrada.
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-center text-lg tracking-widest font-mono uppercase placeholder:text-white/30 placeholder:text-sm placeholder:tracking-normal placeholder:font-sans focus:outline-none focus:border-electric/50 transition-colors"
              placeholder="Ingresa tu código"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="w-full bg-electric text-midnight font-semibold py-3 rounded-lg hover:bg-electric/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verificando...' : 'Acceder'}
          </button>
        </form>

        <p className="text-center text-xs text-white/20 mt-8">
          Next Level Experience · 16 Mayo 2026
        </p>
      </div>
    </section>
  )
}
