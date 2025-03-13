import { FC, ReactElement } from 'react'
import { type IconName } from 'lucide-react/dynamic'
import clsx from 'clsx'
import Avatar from './_components/Avatar'
import Meta from './_components/Meta'

interface From {
  name: string
  avatar: IconName
}

interface Props {
  sender: From
  isSender?: boolean
  time: string
  children: ReactElement
}

const Message: FC<Props> = ({ sender, isSender = false, time, children }) => (
  <div
    role="region"
    aria-label="message"
    className={clsx('items-top flex gap-2', {
      'flex-row-reverse': isSender,
    })}
  >
    <Avatar avatar={sender.avatar} name={sender.avatar} />
    <div>
      <Meta name={sender.name} time={time} isSender={isSender} />
      {children}
    </div>
  </div>
)

export default Message
