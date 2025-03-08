import useSWR, { SWRResponse } from 'swr'
import useSession from '@/hooks/useSession'
import getUser from './utils/getUser'

type User = Awaited<ReturnType<typeof getUser>>

const useUser = (): SWRResponse<User> => {
  const { data: session } = useSession()

  return useSWR(session ? ['user', session.user.id] : null, getUser)
}

export default useUser
