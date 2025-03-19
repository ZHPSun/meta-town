import camelcaseKeys from 'camelcase-keys'
import createSupabaseClient from '@/utils/createSupabaseClient'

export interface JoinedSpace {
  id: string
  name: string
}

const getJoinedSpaces = async (userId: string): Promise<JoinedSpace[]> => {
  const supabaseClient = createSupabaseClient()

  const { data: joinedSpaces } = await supabaseClient
    .from('spaces')
    .select(
      `
    id, name,
    _users_joined_spaces!inner (B)
  `
    )
    .eq('_users_joined_spaces.B', userId)

  if (!joinedSpaces) {
    return []
  }

  return camelcaseKeys(joinedSpaces).map(({ id, name }) => ({ id, name }))
}

export default getJoinedSpaces
