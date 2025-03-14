import createSupabaseClient from '@/utils/createSupabaseClient'

interface Data {
  displayName: string
  avatar: string
  authId: string
}

const createUser = async (data: Data): Promise<void> => {
  const supabaseClient = createSupabaseClient()

  await supabaseClient.from('users').insert({
    display_name: data.displayName,
    avatar: data.avatar,
    auth_id: data.authId,
  })
}

export default createUser
