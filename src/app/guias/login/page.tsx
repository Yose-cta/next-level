'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function GuiasLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (isRegister) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/api/auth/callback` },
      })
      if (error) {
        setError(error.message)
      } else {
        setSuccess('Revisa tu email para confirmar tu cuenta.')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message === 'Invalid login credentials' ? 'Email o contraseña incorrectos' : error.message)
      } else {
        router.push('/guias')
        router.refresh()
      }
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
            {isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-electric/10 border border-electric/30 rounded-lg px-4 py-3 text-sm text-electric">
              {success}
            </div>
          )}

          <div>
            <label className="eyebrow text-white/40 text-xs mb-1.5 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-electric/50 transition-colors"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="eyebrow text-white/40 text-xs mb-1.5 block">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-electric/50 transition-colors"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-electric text-midnight font-semibold py-3 rounded-lg hover:bg-electric/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Cargando...' : isRegister ? 'Crear cuenta' : 'Entrar'}
          </button>

          <p className="text-center text-sm text-white/40">
            {isRegister ? '¿Ya tienes cuenta?' : '¿Primera vez?'}{' '}
            <button
              type="button"
              onClick={() => { setIsRegister(!isRegister); setError(''); setSuccess('') }}
              className="text-electric hover:underline"
            >
              {isRegister ? 'Inicia sesión' : 'Regístrate'}
            </button>
          </p>
        </form>

        <p className="text-center text-xs text-white/20 mt-8">
          Next Level Experience · 16 Mayo 2026
        </p>
      </div>
    </section>
  )
}
