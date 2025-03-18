import useSWR, { SWRResponse } from 'swr'
import getSpace from '@/db/getSpace'

type Space = Awaited<ReturnType<typeof getSpace>>

const useSpace = (spaceId: string): SWRResponse<Space> =>
  useSWR(['space', spaceId], getSpace)

export default useSpace
