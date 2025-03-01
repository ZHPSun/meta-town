import { FC, ComponentPropsWithoutRef, useId } from 'react'
import clsx from 'clsx'
import Input from '../Input'

interface Props extends Omit<ComponentPropsWithoutRef<typeof Input>, 'id'> {
  label?: string
  errorMessage?: string
}

const TextField: FC<Props> = ({ label, errorMessage, className, ...rest }) => {
  const generatedId = useId()
  const inputId = generatedId

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={inputId}
          className={clsx(
            'block text-sm',
            errorMessage ? 'text-rose-500' : 'text-neutral-600'
          )}
        >
          {label}
        </label>
      )}
      <Input
        id={inputId}
        {...rest}
        className={clsx(errorMessage ? 'border-rose-500' : '', className)}
      />
      {errorMessage && <p className="text-sm text-rose-500">{errorMessage}</p>}
    </div>
  )
}

export default TextField
