import useSWR, { SWRResponse } from 'swr'
import getOwnedSpaces from '@/db/getOwnedSpaces'
import useUser from '@/hooks/useUser'

type OwnedSpaces = Awaited<ReturnType<typeof getOwnedSpaces>>

const useOwnedSpaces = (): SWRResponse<OwnedSpaces> => {
  const { data: user } = useUser()

  return useSWR(user ? ['owned-spaces', user.id] : null, getOwnedSpaces)
}

export default useOwnedSpaces
