import { createClient, SupabaseClient } from '@supabase/supabase-js'

const createSupabaseClient = (): SupabaseClient => {
  const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return supabaseClient
}

export default createSupabaseClient
