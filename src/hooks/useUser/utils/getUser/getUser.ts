import createSupabaseClient, { Tables } from '@/utils/createSupabaseClient'

type User = Pick<Tables<'users'>, 'id' | 'displayName' | 'avatar'>

const getUser = async (): Promise<User | null> => {
  const supabase = createSupabaseClient()

  const {
    data: { user: auth },
  } = await supabase.auth.getUser()

  if (!auth) {
    return null
  }

  const { data: user } = await supabase
    .from('users')
    .select('id, displayName, avatar')
    .eq('id', auth.id)
    .single()

  return user
}

export default getUser
