import useSWR, { SWRResponse } from 'swr'
import getOnlineUsers from '@/db/getOnlineUsers'

type OnlineUsers = Awaited<ReturnType<typeof getOnlineUsers>>

const useOnlineUsers = (spaceId: string): SWRResponse<OnlineUsers> =>
  useSWR(['online-users', spaceId], getOnlineUsers)

export default useOnlineUsers
