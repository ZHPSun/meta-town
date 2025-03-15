import clsx from 'clsx'
import { FC } from 'react'
import IconButton from '@/components/IconButton'
import { Avatar } from '../../Form'
import ColorPicker, { COLORS } from './_components/ColorPicker'

export const ANIMALS = [
  'bird',
  'cat',
  'dog',
  'fish',
  'rabbit',
  'snail',
  'squirrel',
  'turtle',
  'worm',
  'rat',
] as const

interface Props {
  value: Avatar
  onChange: (value: Avatar) => void
}

const AvatarPicker: FC<Props> = ({ onChange, value }) => (
  <div className="space-y-2">
    <ColorPicker
      onSelect={(color: string) => {
        onChange({ animal: value.animal, color })
      }}
      value={value.color}
    />

    <div className="flex flex-wrap gap-2">
      {ANIMALS.map((animal, index) => (
        <IconButton
          key={index}
          icon={animal}
          onClick={() => {
            onChange({ animal, color: value.color })
          }}
          label={animal}
          className={clsx(value.color && COLORS[value.color], '!bg-white')}
          variant={value.animal === animal ? 'secondary' : 'naked'}
          size="large"
          circle
        />
      ))}
    </div>
  </div>
)

export default AvatarPicker
