'use client'

import clsx from 'clsx'
import { FC, ReactNode, useEffect, useRef, useState } from 'react'

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
  const triggerContainerRef = useRef<HTMLDivElement>(null)

  const toggle = (): void => setIsOpen((previousIsOpen) => !previousIsOpen)

  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      if (
        !(event.target instanceof Element) ||
        triggerContainerRef.current?.contains(event.target)
      ) {
        return
      }

      setIsOpen(false)
    }

    document.addEventListener('click', handleClick)

    return (): void => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className="relative">
      <div ref={triggerContainerRef}>{trigger(toggle, isOpen)}</div>
      {isOpen && (
        <div
          role="menu"
          className={clsx(
            'absolute z-50 mt-2 w-60 rounded rounded-md border border-neutral-300 bg-white px-2 py-4 shadow-lg',
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
