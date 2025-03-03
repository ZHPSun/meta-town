'use client'

import clsx from 'clsx'
import { FC, ReactNode, useState } from 'react'

interface Props {
  trigger: (toggle: () => void, isOpen: boolean) => ReactNode
  children: ReactNode
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
}

export const POSITION = {
  'bottom-left': clsx('left-0 top-full mt-2'),
  'bottom-right': clsx('right-0 top-full mt-2'),
  'top-left': clsx('bottom-full left-0 mb-2'),
  'top-right': clsx('bottom-full right-0 mb-2'),
}

const Dropdown: FC<Props> = ({
  trigger,
  children,
  position = 'bottom-left',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = (): void => setIsOpen((previousIsOpen) => !previousIsOpen)

  return (
    <div className="relative">
      <div>{trigger(toggle, isOpen)}</div>
      {isOpen && (
        <div
          role="menu"
          className={clsx(
            'absolute z-10 mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5',
            POSITION[position]
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default Dropdown
