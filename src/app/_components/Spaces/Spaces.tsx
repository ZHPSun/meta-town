import { FC } from 'react'
import SpacePreview from './_components/SpacePreview'

const Spaces: FC = () => (
  <div className="flex flex-wrap">
    <SpacePreview />
    <SpacePreview />
    <SpacePreview />
    <SpacePreview />
    <SpacePreview />
    <SpacePreview />
  </div>
)

export default Spaces
