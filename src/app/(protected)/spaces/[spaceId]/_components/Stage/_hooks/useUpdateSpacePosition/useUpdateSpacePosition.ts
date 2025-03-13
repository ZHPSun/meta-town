import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import useUser from '@/hooks/useUser'
import { type Coordinates } from '../../_components/Placement'
import updateSpacePosition from './_utils/updateSpacePosition'

const useUpdateSpacePosition = (characterCoordinates: Coordinates): void => {
  const { data: user } = useUser()
  const { spaceId } = useParams<{ spaceId: string }>()
  const lastUpdatedRef = useRef(characterCoordinates)

  useEffect(() => {
    lastUpdatedRef.current = characterCoordinates
  }, [characterCoordinates])

  useEffect(() => {
    let coordinates = lastUpdatedRef.current
    let isProcessing = false

    const interval = setInterval(() => {
      const handleUpdateSpacePosition = async (): Promise<void> => {
        if (!user?.id) {
          return
        }

        if (coordinates === lastUpdatedRef.current || isProcessing) {
          return
        }

        coordinates = lastUpdatedRef.current
        isProcessing = true

        await updateSpacePosition({
          userId: user.id,
          spaceId,
          coordinates,
        })

        isProcessing = false
      }

      void handleUpdateSpacePosition()
    }, 200)

    return (): void => {
      clearInterval(interval)
    }
  }, [user?.id, spaceId])
}

export default useUpdateSpacePosition
