import createSupabaseClient from '@/utils/createSupabaseClient'

interface Data {
  displayName: string
  avatar: string
}

const createUser = async (data: Data): Promise<void> => {
  const supabaseClient = createSupabaseClient()

  const {
    data: { user: auth },
  } = await supabaseClient.auth.getUser()

  if (!auth) {
    return
  }

  await supabaseClient.from('users').insert({
    display_name: data.displayName,
    avatar: data.avatar,
    auth_id: auth.id,
  })
}

export default createUser
