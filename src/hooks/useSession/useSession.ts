import { useEffect } from 'react'
import useSWR, { SWRResponse } from 'swr'
import getSession from './utils/getSession'
import login from './utils/login'

type Session = Awaited<ReturnType<typeof getSession>>

const useSession = (): SWRResponse<Session> => {
  const result = useSWR<boolean>('session', getSession)

  useEffect(() => {
    const { isLoading, data } = result

    if (isLoading || !!data) {
      return
    }

    login()
  }, [result])

  return result
}

export default useSession
