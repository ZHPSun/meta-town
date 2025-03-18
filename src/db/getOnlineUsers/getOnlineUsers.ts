import camelcaseKeys, { CamelCaseKeys } from 'camelcase-keys'
import createSupabaseClient, { Tables } from '@/utils/createSupabaseClient'

type OnlineUser = CamelCaseKeys<
  Pick<Tables<'users'>, 'id' | 'display_name' | 'avatar'>
>

const getOnlineUsers = async ([, spaceId]: [string, string]): Promise<
  OnlineUser[] | null
> => {
  const supabaseClient = createSupabaseClient()

  const { data: onlineUsers } = await supabaseClient
    .from('users')
    .select(
      `
      id,
      display_name,
      avatar,
      user_space_presences!inner (
        space_id,
        status
      )
      `
    )
    .match({
      'user_space_presences.space_id': spaceId,
      'user_space_presences.status': 'ONLINE',
    })

  if (!onlineUsers) {
    return null
  }

  return camelcaseKeys(
    onlineUsers.map(({ id, display_name, avatar }) => ({
      id,
      display_name,
      avatar,
    }))
  )
}

export default getOnlineUsers
