import clsx from 'clsx'
import { DynamicIcon } from 'lucide-react/dynamic'
import { type IconName } from 'lucide-react/dynamic'
import React, { ComponentProps, FC } from 'react'
import Button from '../Button'
import Tooltip from '../Tooltip'

export const SIZE = {
  default: clsx('w-12'),
  large: clsx('w-14'),
  small: clsx('w-10'),
} as const

export const ICON_SIZE = {
  small: 20,
  default: 24,
  large: 28,
} as const

interface Props extends Omit<ComponentProps<typeof Button>, 'children'> {
  icon: IconName
  label: string
  circle?: boolean
  tooltip?: {
    position: ComponentProps<typeof Tooltip>['position']
  }
}

const IconButton: FC<Props> = ({
  className,
  icon,
  label,
  size = 'default',
  variant = 'primary',
  circle = false,
  tooltip = undefined,
  ...rest
}) => (
  <Tooltip text={label} position={tooltip?.position}>
    <Button
      size={size}
      variant={variant}
      className={clsx(
        'inline-flex items-center justify-center !px-0',
        className,
        circle ? '!rounded-full' : '!rounded-2xl',
        SIZE[size]
      )}
      {...rest}
    >
      <DynamicIcon size={ICON_SIZE[size]} name={icon} aria-label={label} />
    </Button>
  </Tooltip>
)

export default IconButton
