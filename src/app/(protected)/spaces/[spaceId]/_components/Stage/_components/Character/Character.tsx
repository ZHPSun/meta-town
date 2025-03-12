import { DynamicIcon, type IconName, iconNames } from 'lucide-react/dynamic'
import { FC } from 'react'
import { TILE_SIZE } from '../../consts'

interface Props {
  avatar: string
}

const isIconName = (name: string): name is IconName =>
  iconNames.includes(name as IconName)

const Character: FC<Props> = ({ avatar }) => {
  if (!isIconName(avatar)) {
    return
  }

  return (
    <div
      className="flex rotate-180 items-center justify-center"
      style={{ width: `${TILE_SIZE}px`, height: `${TILE_SIZE}px` }}
    >
      <DynamicIcon name={avatar} aria-label={avatar} />
    </div>
  )
}

export default Character
