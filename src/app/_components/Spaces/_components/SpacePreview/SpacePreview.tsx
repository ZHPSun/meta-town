import { FC } from 'react'
import Preview from './_components/Preview'
import Info from './_components/Info'
import Participants from './_components/Participants'

const SpacePreview: FC = () => (
  <div>
    <Participants count={0} />
    <div>
      <Preview />
      <Info name="Space Name" time="4 days ago" />
    </div>
  </div>
)

export default SpacePreview
