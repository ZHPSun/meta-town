import React, { ReactNode, FC } from 'react'
import IconButton from '@/components/IconButton'

interface Props {
  children: ReactNode
  header: ReactNode
}

const SideWindow: FC<Props> = ({ children, header }) => (
  <div className="absolute bottom-0 right-0 top-0 w-96 overflow-hidden bg-gray-100">
    <div className="flex items-center justify-between px-6 py-4">
      {header}

      <IconButton variant="secondary" size="small" icon="x" label="Close" />
    </div>

    <div className="flex items-center justify-center overflow-auto">
      {children}
    </div>
  </div>
)

export default SideWindow
