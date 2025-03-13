import { FC } from 'react'
import { type IconName } from 'lucide-react/dynamic'
import IconButton from '@/components/IconButton'

interface Props {
  avatar: IconName
  name: string
}

const Avatar: FC<Props> = ({ avatar, name }) => (
  <IconButton
    icon={avatar}
    label={name}
    variant="secondary"
    circle
    tooltip={{ position: 'top' }}
    className="h-10 w-10 border-2"
  />
)

export default Avatar
