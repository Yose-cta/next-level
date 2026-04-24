import { createClient } from '@supabase/supabase-js'

/**
 * Supabase Admin client — usa service_role.
 * SOLO server-side (API routes, server components, server actions).
 * NUNCA exponer al cliente.
 *
 * Bypassa RLS — usar con cuidado y solo desde código de confianza.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url) throw new Error('NEXT_PUBLIC_SUPABASE_URL no configurado')
  if (!serviceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY no configurado')

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
