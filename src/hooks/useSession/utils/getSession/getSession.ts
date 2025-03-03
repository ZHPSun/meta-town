import createSupabaseClient from '@/utils/createSupabaseClient'

const getSession = async (): Promise<boolean> => {
  const supabase = createSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return !!session
}

export default getSession
