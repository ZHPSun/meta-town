import clsx from 'clsx'
import { FC } from 'react'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'

export const VARIANT = {
  primary: clsx(
    'border border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-700'
  ),
  secondary: clsx(
    'border border-neutral-400 bg-white text-neutral-900 hover:bg-neutral-200'
  ),
  naked: clsx(
    'border border-transparent text-neutral-900 hover:bg-neutral-200'
  ),
  success: clsx(
    'border border-emerald-500 bg-emerald-500 text-white hover:bg-emerald-700'
  ),
  warning: clsx(
    'border border-amber-500 bg-amber-500 text-white hover:bg-amber-700'
  ),
  danger: clsx(
    'border border-rose-500 bg-rose-500 text-white hover:bg-rose-700'
  ),
}

export const SIZE = {
  default: clsx('h-12 px-4'),
  large: clsx('h-14 px-8 text-lg'),
  small: clsx('h-10 px-2 text-sm'),
}

export type Size = 'default' | 'large' | 'small'

export type Variant =
  | 'primary'
  | 'secondary'
  | 'naked'
  | 'success'
  | 'warning'
  | 'danger'

interface Props
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'prefix' | 'suffix'
  > {
  children: React.ReactNode
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
  size = 'default',
  variant = 'primary',
  prefix,
  suffix,
  ...rest
}) => (
  <button
    className={clsx(
      'rounded-lg outline-offset-4',
      (prefix ?? suffix) && 'flex items-center gap-2',
      VARIANT[variant],
      SIZE[size],
      className
    )}
    {...rest}
  >
    {prefix && <DynamicIcon name={prefix.icon} aria-label={prefix.label} />}
    {children}
    {suffix && <DynamicIcon name={suffix.icon} aria-label={suffix.label} />}
  </button>
)

export default Button
