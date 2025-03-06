import { FC } from 'react'
import SideWindow from '../SideWindow'

interface Props {
  onClose: () => void
}

const ChatSideWindow: FC<Props> = ({ onClose }) => (
  <div role="region" aria-label="Chat Side Window">
    <SideWindow header={<span>Chat</span>} onClose={onClose}>
      Content
    </SideWindow>
  </div>
)

export default ChatSideWindow
