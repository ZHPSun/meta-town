import { FC, InputHTMLAttributes } from 'react'
import { DynamicIcon } from 'lucide-react/dynamic'
import { type IconName } from 'lucide-react/dynamic'
import clsx from 'clsx'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  prefix?: {
    name: IconName
    label?: string
  }
}

const Input: FC<Props> = ({ className, prefix, ...rest }) => (
  <div className={clsx(prefix ? 'relative' : '')}>
    {prefix && (
      <div className="absolute bottom-0 left-0 top-0 flex items-center pl-4">
        <DynamicIcon
          className="text-neutral-400"
          name={prefix.name}
          aria-label={prefix.label}
        />
      </div>
    )}
    <input
      className={clsx(
        'box-border h-12 w-full rounded-lg border border-neutral-400 bg-white pr-4 text-neutral-900',
        prefix ? 'pl-12' : 'pl-4',
        className
      )}
      {...rest}
    />
  </div>
)

export default Input
