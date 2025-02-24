import { FC } from 'react'
import Placement from './_components/Placement'
import Character from './_components/Character'
import TiledMap from './_components/TiledMap'

export const DIMENSIONS = { rows: 30, columns: 30 }

const Stage: FC = () => (
  <div className="relative">
    <Placement coordinates={{ x: 0, y: 0, direction: 'S' }}>
      <Character />
    </Placement>
    <TiledMap dimensions={DIMENSIONS} />
  </div>
)

export default Stage
