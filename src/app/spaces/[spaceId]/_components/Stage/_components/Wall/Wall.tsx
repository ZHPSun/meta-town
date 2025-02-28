import { FC } from 'react'
import clsx from 'clsx'
import { BrickWall } from 'lucide-react'
import { TILE_SIZE } from '../../consts'

const Wall: FC = () => (
  <div
    className={clsx('flex items-center justify-center')}
    style={{ width: `${TILE_SIZE}px`, height: `${TILE_SIZE}px` }}
  >
    <BrickWall aria-label="Wall" />
  </div>
)

export default Wall
