import { FC } from 'react'
import Preview from './_components/Preview'
import Info from './_components/Info'
import Participants from './_components/Participants'

interface Props {
  name: string
  spaceId: string
}

const SpacePreview: FC<Props> = ({ name, spaceId }) => (
  <div className="w-1/4 p-6">
    <div className="relative">
      <Preview spaceId={spaceId} />
      <Participants count={0} />
    </div>
    <Info name={name} time="4 days ago" />
  </div>
)

export default SpacePreview
