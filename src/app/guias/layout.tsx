import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { SignOutButton } from './sign-out-button'

export const metadata: Metadata = {
  title: 'Guías Interactivas',
  description: 'Material interactivo del evento Next Level Experience. Practica, evalúa y transforma tu comunicación, imagen e IA.',
}

export default async function GuiasLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      <header className="sticky top-0 z-40 glass-dark border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/guias" className="flex items-center gap-3 group">
            <span className="font-display italic text-lg text-white group-hover:text-electric transition-colors">
              Next Level
            </span>
            <span className="text-white/30">|</span>
            <span className="eyebrow text-white/50">Guías</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-white/50 hover:text-electric transition-colors"
            >
              ← Volver al sitio
            </Link>
            {user && <SignOutButton />}
          </div>
        </div>
      </header>
      <main className="min-h-[calc(100vh-3.5rem)]">{children}</main>
    </>
  )
}
