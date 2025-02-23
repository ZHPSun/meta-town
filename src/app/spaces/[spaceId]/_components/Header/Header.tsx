import Button from '@/components/Button'
import Tooltip from '../Tooltip'
import { EllipsisVertical, Link, Lock } from 'lucide-react'
import { FC } from 'react'

const Header: FC = () => (
  <div className="flex justify-between bg-gray-700 p-4">
    <div className="flex gap-1">
      <Tooltip text="Copy Link" position="left">
        <Button>
          <Link aria-label="Copy invite link" />
        </Button>
      </Tooltip>

      <Tooltip text="Lock meeting area" position="left">
        <Button>
          <Lock aria-label="Lock meeting area" />
        </Button>
      </Tooltip>
    </div>

    <div>
      <Tooltip text="Meeting Info" position="center">
        <Button prefix={{ icon: 'map-pin' }} suffix={{ icon: 'chevron-down' }}>
          All-Hands
        </Button>
      </Tooltip>
    </div>

    <div className="flex gap-1">
      <Tooltip text="Meeting Info" position="center">
        <Button prefix={{ icon: 'layout-grid' }}>Meeting view</Button>
      </Tooltip>
      <Tooltip text="More options" position="right">
        <Button>
          <EllipsisVertical aria-label="More options" />
        </Button>
      </Tooltip>
    </div>
  </div>
)

export default Header
