'use client'
import { FC } from 'react'
import { Loader } from 'lucide-react'
import useSpaces from '@/hooks/useSpaces'
import SpacePreview from './_components/SpacePreview'

const Spaces: FC = () => {
  const { data: spaces, isLoading } = useSpaces()
  if (isLoading)
    return (
      <Loader className="animate-spine" role="status" aria-label="Loading" />
    )

  return (
    <div className="flex flex-wrap" role="group" aria-label="Spaces">
      {spaces?.map((space) => (
        <SpacePreview key={space.id} name={space.name} spaceId={space.id} />
      ))}
    </div>
  )
}

export default Spaces
