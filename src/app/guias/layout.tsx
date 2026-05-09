import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { SignOutButton } from './sign-out-button'

export const metadata: Metadata = {
  title: 'Hub Interactivo | Next Level Experience',
  description: 'Hub interactivo del evento Next Level Experience. 3 bloques, 3 expertos, 17 módulos de IA, Imagen y Comunicación.',
}

export default async function GuiasLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const hasAccess = cookieStore.get('guias-access')?.value === 'granted'

  return (
    <>
      {/* Minimal top bar — hub has its own sidebar */}
      <header className="fixed top-0 right-0 z-50 flex items-center gap-3 px-4 py-2">
        <Link
          href="/"
          className="text-xs px-3 py-1.5 rounded-full border transition-colors"
          style={{
            background: 'rgba(250,248,243,0.85)',
            borderColor: 'rgba(10,8,32,0.12)',
            color: 'rgba(10,8,32,0.6)',
            backdropFilter: 'blur(8px)',
          }}
        >
          ← Volver al sitio
        </Link>
        {hasAccess && <SignOutButton />}
      </header>
      {children}
    </>
  )
}
