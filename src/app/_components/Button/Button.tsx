import clsx from 'clsx'
import { FC } from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button: FC<Props> = ({ children, className, ...rest }) => {
  return (
    <button
      className={clsx(
        'rounded-xl border-4 border-solid px-4 py-2 font-bold text-black hover:bg-black hover:text-white',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
