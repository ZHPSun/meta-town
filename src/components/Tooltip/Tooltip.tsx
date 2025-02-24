import clsx from 'clsx'
import { FC } from 'react'
import { ReactNode } from 'react'

export const POSITION = {
  left: 'left-1',
  right: 'right-1',
  center: 'left-1/2 -translate-x-1/2',
} as const

export type Position = 'left' | 'right' | 'center'

interface Props {
  text: string
  position?: Position
  children: ReactNode
}

const Tooltip: FC<Props> = ({ children, text, position = 'center' }) => (
  <div className="group relative inline-block">
    {children}
    <span
      className={clsx(
        'absolute top-full z-50 mt-2 hidden whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white group-hover:block',
        POSITION[position]
      )}
    >
      {text}
    </span>
  </div>
)

export default Tooltip
