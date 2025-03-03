import createSupabaseClient, { Tables } from '@/utils/createSupabaseClient'

interface Data {
  displayName: string
  avatar: string
}

type User = Pick<Tables<'users'>, 'id' | 'displayName' | 'avatar'>

const createUser = async (data: Data): Promise<User | null> => {
  const supabaseClient = createSupabaseClient()

  const { data: user } = await supabaseClient
    .from('users')
    .insert(data)
    .select('id, displayName, avatar')
    .single()

  return user
}

export default createUser
