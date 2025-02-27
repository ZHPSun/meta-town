import clsx from 'clsx'
import { FC, useId, ReactNode } from 'react'

export const POSITION = {
  left: clsx('left-1'),
  right: clsx('right-1'),
  center: clsx('left-1/2 -translate-x-1/2'),
} as const

export type Position = 'left' | 'right' | 'center'

interface Props {
  text: string
  position?: Position
  children: ReactNode
}

const Tooltip: FC<Props> = ({ children, text, position = 'center' }) => {
  const describedbyId = useId()

  return (
    <div className="group relative inline-block">
      <div aria-describedby={describedbyId}>{children}</div>
      <span
        id={describedbyId}
        role="tooltip"
        className={clsx(
          'absolute top-full z-50 mt-2 hidden whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white group-hover:block',
          POSITION[position]
        )}
      >
        {text}
      </span>
    </div>
  )
}

export default Tooltip
