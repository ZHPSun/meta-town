import { FC } from 'react'
import Button from '@/components/Button'
import IconButton from '@/components/IconButton'
import Tooltip from '@/components/Tooltip'
import Dropdown from '@/components/Dropdown'
import VerticalList from '@/components/VerticalList'

interface Space {
  id: string
  name: string
}

interface Props {
  space: Space
  onEditSpace: () => void
  onMeetingViewClick: () => void
  isShowMeeting?: boolean
}

const Header: FC<Props> = ({
  space,
  onMeetingViewClick,
  isShowMeeting = false,
  onEditSpace,
}) => (
  <header className="flex justify-between border-b border-neutral-200 px-6 py-2">
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
          {space.name}
        </Button>
      </Tooltip>
    </div>

    <div className="flex gap-1">
      <Button
        size="small"
        variant={isShowMeeting ? 'secondary' : 'naked'}
        prefix={{ icon: 'layout-grid' }}
        onClick={onMeetingViewClick}
      >
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
  </header>
)

export default Header
