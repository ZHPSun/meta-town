import Button from '@/components/Button/Button'
import { type Variant } from '../../ButtonConfigurable'
import clsx from 'clsx'
import { ChevronUp } from 'lucide-react'
import { ComponentProps, FC } from 'react'

export const VARIANT = {
  primary: clsx('bg-neutral-500 text-white hover:bg-neutral-700'),
  secondary: clsx('bg-neutral-300 hover:bg-neutral-400'),
  success: clsx('bg-emerald-800 text-white hover:bg-emerald-600'),
  warning: clsx('bg-amber-800 text-white hover:bg-amber-600'),
  danger: clsx('bg-rose-800 text-white hover:bg-rose-600'),
}

export const WRAPPER_SIZE = {
  small: clsx('w-14'),
  default: clsx('w-16'),
  large: clsx('w-20'),
}

export const ICON_SIZE = {
  small: 16,
  default: 20,
  large: 22,
}

interface Props extends Pick<ComponentProps<typeof Button>, 'size'> {
  variant?: Variant
}

const Configuration: FC<Props> = ({
  size = 'default',
  variant = 'primary',
}) => (
  <div
    className={clsx(
      'absolute bottom-0 right-0 top-0 rounded-2xl text-right',
      VARIANT[variant],
      WRAPPER_SIZE[size]
    )}
  >
    <button className="h-full px-2 outline-offset-4">
      <ChevronUp size={ICON_SIZE[size]} aria-label="Config" />
    </button>
  </div>
)

export default Configuration
