import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import useUser from '@/hooks/useUser'
import upsertSpacePresence from '@/db/upsertSpacePresence'

const useSyncSpacePresence = (): void => {
  const { data: user } = useUser()
  const { spaceId } = useParams<{ spaceId: string }>()

  useEffect(() => {
    if (!user?.id) {
      return
    }

    void upsertSpacePresence({
      userId: user.id,
      spaceId,
      status: 'ONLINE',
    })

    return (): void => {
      void upsertSpacePresence({
        userId: user.id,
        spaceId,
        status: 'OFFLINE',
      })
    }
  }, [user?.id, spaceId])
}

export default useSyncSpacePresence
