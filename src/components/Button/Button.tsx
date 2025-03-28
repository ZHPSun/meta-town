import clsx from 'clsx'
import { Loader } from 'lucide-react'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

export const VARIANT = {
  primary: clsx(
    'border border-neutral-900 bg-neutral-900 text-white hover:border-neutral-700 hover:bg-neutral-700'
  ),
  secondary: clsx(
    'border border-neutral-400 bg-white text-neutral-900 hover:border-neutral-200 hover:bg-neutral-200'
  ),
  naked: clsx(
    'border border-transparent text-neutral-900 hover:border-neutral-200 hover:bg-neutral-200'
  ),
  success: clsx(
    'border border-emerald-500 bg-emerald-500 text-white hover:border-emerald-700 hover:bg-emerald-700'
  ),
  warning: clsx(
    'border border-amber-500 bg-amber-500 text-white hover:border-amber-700 hover:bg-amber-700'
  ),
  danger: clsx(
    'border border-rose-500 bg-rose-500 text-white hover:border-rose-700 hover:bg-rose-700'
  ),
} as const

export const SIZE = {
  default: clsx('h-12 px-4'),
  large: clsx('h-14 px-8 text-lg'),
  small: clsx('h-10 px-2 text-sm'),
} as const

type Size = 'default' | 'large' | 'small'

type Variant =
  | 'primary'
  | 'secondary'
  | 'naked'
  | 'success'
  | 'warning'
  | 'danger'

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'prefix' | 'suffix'> {
  isLoading?: boolean
  children: ReactNode
  size?: Size
  variant?: Variant
  prefix?: {
    label?: string
    icon: IconName
  }
  suffix?: {
    label?: string
    icon: IconName
  }
}

const Button: FC<Props> = ({
  children,
  className,
  isLoading = false,
  size = 'default',
  variant = 'primary',
  type = 'button',
  prefix = undefined,
  suffix = undefined,
  ...rest
}) => (
  <button
    className={clsx(
      'rounded-lg align-middle outline-offset-4',
      (prefix ?? suffix) && 'inline-flex items-center gap-2',
      VARIANT[variant],
      SIZE[size],
      className
    )}
    disabled={isLoading}
    type={type}
    {...rest}
  >
    {isLoading ? (
      <Loader
        className="mx-auto animate-spin"
        role="status"
        aria-label="Loading"
      />
    ) : (
      <>
        {prefix && <DynamicIcon name={prefix.icon} aria-label={prefix.label} />}
        {children}
        {suffix && <DynamicIcon name={suffix.icon} aria-label={suffix.label} />}
      </>
    )}
  </button>
)

export default Button
