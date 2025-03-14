import useSWR, { SWRResponse } from 'swr'
import useUser from '@/hooks/useUser'
import getSpaces from './utils/getSpaces'

type spaces = Awaited<ReturnType<typeof getSpaces>>

const useSpaces = (): SWRResponse<spaces> => {
  const { data: user } = useUser()

  return useSWR(user ? ['spaces', user.id] : null, getSpaces)
}

export default useSpaces
