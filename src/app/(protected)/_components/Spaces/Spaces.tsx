'use client'
import { FC } from 'react'
import { Loader } from 'lucide-react'
import useOwnedSpaces from '@/hooks/useOwnedSpaces'
import SpacePreview from './_components/SpacePreview'

const Spaces: FC = () => {
  const { data: ownedSpaces, isLoading } = useOwnedSpaces()
  if (isLoading)
    return (
      <Loader className="animate-spine" role="status" aria-label="Loading" />
    )

  return (
    <div className="flex flex-wrap" role="group" aria-label="Spaces">
      {ownedSpaces?.map((space) => (
        <SpacePreview key={space.id} name={space.name} spaceId={space.id} />
      ))}
    </div>
  )
}

export default Spaces
