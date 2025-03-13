import clsx from 'clsx'
import { Circle, CircleCheck } from 'lucide-react'
import { FC } from 'react'
import Tooltip from '@/components/Tooltip'
import Button from '@/components/Button'

export const COLORS: Record<string, string> = {
  gray: clsx('!text-neutral-700'),
  blue: clsx('!text-blue-700'),
  green: clsx('!text-green-700'),
  yellow: clsx('!text-yellow-700'),
  purple: clsx('!text-purple-700'),
  pink: clsx('!text-pink-700'),
} as const

interface Props {
  onSelect: (color: string) => void
  value: string
}

const ColorPicker: FC<Props> = ({ onSelect, value }) => (
  <div className="flex flex-wrap gap-2">
    {Object.entries(COLORS).map(([color, className]) => (
      <Tooltip text={color} key={color}>
        <Button
          variant="naked"
          size="small"
          className={clsx(className)}
          onClick={() => onSelect(color)}
          aria-label={color}
        >
          {value === color ? (
            <CircleCheck
              strokeWidth={3}
              size={20}
              aria-label={`${color} Selected`}
            />
          ) : (
            <Circle strokeWidth={3} size={20} aria-label={`${color} Option`} />
          )}
        </Button>
      </Tooltip>
    ))}
  </div>
)

export default ColorPicker
