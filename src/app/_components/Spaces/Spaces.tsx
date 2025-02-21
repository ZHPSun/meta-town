import { FC } from 'react'
import SpacePreview from './_components/SpacePreview'

const Spaces: FC = () => (
  <div className="flex flex-wrap gap-12 p-8">
    <SpacePreview />
    <SpacePreview />
    <SpacePreview />
    <SpacePreview />
    <SpacePreview />
    <SpacePreview />
  </div>
)

export default Spaces
