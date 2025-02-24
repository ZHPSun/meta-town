import Button from '@/components/Button'
import Tooltip from '../Tooltip'
import { EllipsisVertical, Link, Lock } from 'lucide-react'
import { FC } from 'react'

const Header: FC = () => (
  <div className="flex justify-between border-b border-neutral-200 px-6 py-2">
    <div className="flex gap-1">
      <Tooltip text="Copy Link" position="left">
        <Button size="small" variant="naked">
          <Link aria-label="Copy invite link" size={16} />
        </Button>
      </Tooltip>

      <Tooltip text="Lock meeting area" position="left">
        <Button size="small" variant="secondary">
          <Lock aria-label="Lock meeting area" />
        </Button>
      </Tooltip>
    </div>

    <div>
      <Tooltip text="Meeting Info" position="center">
        <Button
          size="small"
          variant="naked"
          prefix={{ icon: 'map-pin' }}
          suffix={{ icon: 'chevron-down' }}
        >
          All-Hands
        </Button>
      </Tooltip>
    </div>

    <div className="flex gap-1">
      <Tooltip text="Meeting Info" position="center">
        <Button
          size="small"
          variant="secondary"
          prefix={{ icon: 'layout-grid' }}
        >
          Meeting view
        </Button>
      </Tooltip>
      <Tooltip text="More options" position="right">
        <Button variant="naked" size="small">
          <EllipsisVertical aria-label="More options" />
        </Button>
      </Tooltip>
    </div>
  </div>
)

export default Header
