import createSupabaseClient from '@/utils/createSupabaseClient'

interface Data {
  spaceId: string
  userId: string
}

const joinSpace = async (data: Data): Promise<void> => {
  const supabaseClient = createSupabaseClient()

  await supabaseClient
    .from('_users_joined_spaces')
    .insert({ A: data.spaceId, B: data.userId })
}

export default joinSpace
