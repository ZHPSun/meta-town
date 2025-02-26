import clsx from 'clsx'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import React, { ComponentProps, FC } from 'react'
import Button from '../Button'
import Tooltip from '../Tooltip'

export const SIZE = {
  default: clsx('w-12'),
  large: clsx('w-14'),
  small: clsx('w-10'),
}

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
      <DynamicIcon name={icon} aria-label={label} />
    </Button>
  </Tooltip>
)

export default IconButton
