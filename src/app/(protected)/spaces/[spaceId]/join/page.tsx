'use client'

import { useParams } from 'next/navigation'
import { FC, useEffect } from 'react'
import GlobalLoading from '@/components/GlobalLoading'
import getJoinedSpaces from '@/db/getJoinedSpaces'
import joinSpace from '@/db/joinSpace'
import useUser from '@/hooks/useUser'
import navigate from '@/utils/navigate'

const Join: FC = () => {
  const { data: user } = useUser()
  const { spaceId } = useParams<{ spaceId: string }>()

  useEffect(() => {
    if (!user) {
      return
    }

    const handleJoinSpace = async (): Promise<void> => {
      const spaces = await getJoinedSpaces(user.id)
      const hasJoinedSpace = spaces.map((space) => space.id).includes(spaceId)

      if (!hasJoinedSpace) {
        void joinSpace({ spaceId, userId: user.id })
      }

      navigate(`/spaces/${spaceId}`)
    }

    void handleJoinSpace()
  }, [user, spaceId])

  return <GlobalLoading />
}

export default Join
