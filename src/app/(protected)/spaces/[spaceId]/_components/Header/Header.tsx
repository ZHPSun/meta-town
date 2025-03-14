import { FC } from 'react'
import Button from '@/components/Button'
import IconButton from '@/components/IconButton'
import Tooltip from '@/components/Tooltip'
import Dropdown from '@/components/Dropdown'
import VerticalList from '@/components/VerticalList'

interface Props {
  onEditSpace: () => void
}

const Header: FC<Props> = ({ onEditSpace }) => (
  <div className="flex justify-between border-b border-neutral-200 px-6 py-2">
    <div className="flex gap-1">
      <IconButton
        size="small"
        variant="naked"
        icon="link"
        label="Copy invite link"
        tooltip={{ position: 'bottom-left' }}
      />

      <IconButton
        size="small"
        variant="secondary"
        icon="lock"
        label="Lock meeting area"
      />
    </div>

    <div>
      <Tooltip text="My Spaces" position="bottom">
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

      <Dropdown
        trigger={(toggle, isOpen) => (
          <IconButton
            size="small"
            onClick={toggle}
            variant={isOpen ? 'secondary' : 'naked'}
            icon="ellipsis-vertical"
            label="More options"
            tooltip={{ position: 'bottom-right' }}
          />
        )}
        position="bottom-right"
      >
        <VerticalList>
          <VerticalList.Item>
            <Button
              onClick={onEditSpace}
              variant="naked"
              prefix={{ icon: 'edit' }}
            >
              Edit space
            </Button>
          </VerticalList.Item>
        </VerticalList>
      </Dropdown>
    </div>
  </div>
)

export default Header
