import { FC } from 'react'
import { createPortal } from 'react-dom'
import IconButton from '@/components/IconButton'
import useDrag from '@/hooks/useDrag'

export type Config = 'walls'

interface Props {
  config?: Config | null
  onConfig: (config: Config) => void
  onClose: () => void
}

const Configuration: FC<Props> = ({ config = null, onConfig, onClose }) => {
  const { handleRef: dragHandleRef } = useDrag()

  const portalRoot = document.getElementById('modal-root')

  if (!portalRoot) {
    return null
  }

  return createPortal(
    <div
      className="fixed left-0 top-0 w-52 cursor-grab space-y-4 rounded-lg rounded-md bg-white p-4 shadow-lg"
      role="dialog"
      aria-label="Configuration"
      ref={dragHandleRef}
    >
      <div className="flex items-center justify-between">
        <div>Config Space</div>
        <IconButton
          icon="x"
          label="Close"
          variant="naked"
          size="small"
          onClick={onClose}
        />
      </div>
      <div>
        <IconButton
          onClick={() => onConfig('walls')}
          icon="brick-wall"
          label="wall"
          variant={config === 'walls' ? 'success' : 'secondary'}
        />
      </div>
    </div>,
    portalRoot
  )
}

export default Configuration
