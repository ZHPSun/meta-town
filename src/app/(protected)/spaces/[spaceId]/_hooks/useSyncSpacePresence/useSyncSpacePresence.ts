import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import upsertSpacePresence from '@/db/upsertSpacePresence'
import useSpace from '@/hooks/useSpace'
import useSessionUser from '@/hooks/useSessionUser'

const useSyncSpacePresence = (): void => {
  const { data: user } = useSessionUser()

  const { spaceId } = useParams<{ spaceId: string }>()
  const { data: space } = useSpace(spaceId)

  useEffect(() => {
    if (!user?.id || !space?.id) {
      return
    }

    void upsertSpacePresence({
      userId: user.id,
      spaceId: space.id,
      status: 'ONLINE',
    })

    return (): void => {
      void upsertSpacePresence({
        userId: user.id,
        spaceId: space.id,
        status: 'OFFLINE',
      })
    }
  }, [user?.id, space?.id])
}

export default useSyncSpacePresence
