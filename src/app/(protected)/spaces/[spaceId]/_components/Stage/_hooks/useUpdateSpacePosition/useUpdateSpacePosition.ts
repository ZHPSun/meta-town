import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import updateSpacePosition from '@/db/upsertSpacePosition'
import useSpace from '@/hooks/useSpace'
import useSessionUser from '@/hooks/useSessionUser'
import { type Coordinates } from '../../_components/Placement'

const useUpdateSpacePosition = (characterCoordinates: Coordinates): void => {
  const { data: user } = useSessionUser()

  const { spaceId } = useParams<{ spaceId: string }>()
  const { data: space } = useSpace(spaceId)

  const lastUpdatedRef = useRef(characterCoordinates)

  useEffect(() => {
    lastUpdatedRef.current = characterCoordinates
  }, [characterCoordinates])

  useEffect(() => {
    if (!user?.id || !space?.id) {
      return
    }

    let coordinates = lastUpdatedRef.current
    let isProcessing = false

    const interval = setInterval(() => {
      const handleUpdateSpacePosition = async (): Promise<void> => {
        if (coordinates === lastUpdatedRef.current || isProcessing) {
          return
        }

        coordinates = lastUpdatedRef.current
        isProcessing = true

        await updateSpacePosition({
          userId: user.id,
          spaceId: space.id,
          coordinates,
        })

        isProcessing = false
      }

      void handleUpdateSpacePosition()
    }, 200)

    return (): void => {
      clearInterval(interval)
    }
  }, [user?.id, space?.id])
}

export default useUpdateSpacePosition
