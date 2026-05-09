'use client'

import { useRouter } from 'next/navigation'

export function SignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    await fetch('/api/guias-access', { method: 'DELETE' })
    router.push('/guias/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-sm text-white/50 hover:text-magenta transition-colors"
    >
      Salir
    </button>
  )
}
