import useSWR, { SWRResponse } from 'swr'
import getUser from './utils/getUser'

type User = Awaited<ReturnType<typeof getUser>>

const useUser = (): SWRResponse<User> => useSWR('user', getUser)

export default useUser
