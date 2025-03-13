import { FC } from 'react'
import SideWindow from '../SideWindow'
import Messages from './_components/Messages'
import Form from './_components/Form'

interface Props {
  onClose: () => void
}

const ChatSideWindow: FC<Props> = ({ onClose }) => (
  <div role="region" aria-label="Chat Side Window">
    <SideWindow header={<span>Chat</span>} onClose={onClose}>
      <div className="flex h-full flex-col items-center justify-between gap-6 pb-4">
        <Messages />
        <Form />
      </div>
    </SideWindow>
  </div>
)

export default ChatSideWindow
