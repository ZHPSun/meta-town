import clsx from 'clsx'
import { FC, useState } from 'react'
import IconButton from '@/components/IconButton'
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

const AvatarPicker: FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>('gray')
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null)

  return (
    <div className="space-y-2">
      <ColorPicker onSelect={setSelectedColor} value={selectedColor} />

      <div className="flex flex-wrap gap-2">
        {ANIMALS.map((animal, index) => (
          <IconButton
            key={index}
            icon={animal}
            onClick={() => setSelectedAnimal(animal)}
            label={animal}
            className={clsx(
              selectedColor && COLORS[selectedColor],
              '!bg-white'
            )}
            variant={selectedAnimal === animal ? 'secondary' : 'naked'}
            size="large"
            circle
          />
        ))}
      </div>
    </div>
  )
}

export default AvatarPicker
