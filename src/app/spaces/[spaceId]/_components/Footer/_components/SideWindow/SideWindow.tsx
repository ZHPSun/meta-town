import React, { ReactNode, FC } from 'react'
import IconButton from '@/components/IconButton'

interface Props {
  children: ReactNode
  header: ReactNode
}

const SideWindow: FC<Props> = ({ children, header }) => (
  <div className="absolute bottom-0 right-0 top-0 w-80 overflow-hidden bg-black text-white">
    <div className="flex items-center justify-between">
      {header}

      <div>
        <IconButton icon="x" label="Close" />
      </div>
    </div>

    <div className="flex items-center justify-center overflow-auto">
      {children}
    </div>
  </div>
)

export default SideWindow
