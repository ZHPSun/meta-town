import useSWR, { SWRResponse } from 'swr'
import getSpaces from '@/db/getSpaces'
import useUser from '@/hooks/useUser'

type spaces = Awaited<ReturnType<typeof getSpaces>>

const useSpaces = (): SWRResponse<spaces> => {
  const { data: user } = useUser()

  return useSWR(user ? ['spaces', user.id] : null, getSpaces)
}

export default useSpaces
