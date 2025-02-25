import Button from '@/components/Button'
import IconButton from '@/components/IconButton'
import Tooltip from '@/components/Tooltip'
import { FC } from 'react'

const Header: FC = () => (
  <div className="flex justify-between border-b border-neutral-200 px-6 py-2">
    <div className="flex gap-1">
      <IconButton
        size="small"
        variant="naked"
        icon="link"
        label="Copy invite link"
        tooltip={{ position: 'left' }}
      />

      <IconButton
        size="small"
        variant="secondary"
        icon="lock"
        label="Lock meeting area"
      />
    </div>

    <div>
      <Tooltip text="My Spaces" position="center">
        <Button
          size="small"
          variant="naked"
          prefix={{ icon: 'sparkles' }}
          suffix={{ icon: 'chevron-down' }}
        >
          All-Hands
        </Button>
      </Tooltip>
    </div>

    <div className="flex gap-1">
      <Button size="small" variant="secondary" prefix={{ icon: 'layout-grid' }}>
        Meeting view
      </Button>
      <IconButton
        size="small"
        variant="naked"
        icon="ellipsis-vertical"
        label="More options"
        tooltip={{ position: 'right' }}
      />
    </div>
  </div>
)

export default Header
