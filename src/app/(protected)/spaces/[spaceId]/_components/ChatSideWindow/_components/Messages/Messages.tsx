import { FC } from 'react'
import Message from './_components/Message'
import Content from './_components/Message/_components/Content'

const Messages: FC = () => (
  <div className="w-full space-y-4 overflow-y-auto px-2">
    <Message
      sender={{ name: 'Display Name', avatar: 'bird' }}
      time="4 minutes ago"
    >
      <Content>Melbourne</Content>
    </Message>
    <Message
      sender={{ name: 'Display Name', avatar: 'bird' }}
      time="4 minutes ago"
      isSender
    >
      <Content>It is the capital</Content>
    </Message>
    <Message
      sender={{ name: 'Display Name', avatar: 'bird' }}
      time="4 minutes ago"
      isSender
    >
      <Content>
        Melbourne is situated along the River and has a temperate climate with a
        mix of warm summers and cool winters
      </Content>
    </Message>
    <Message
      sender={{ name: 'Display Name', avatar: 'bird' }}
      time="4 minutes ago"
      isSender
    >
      <Content>
        It is also famous for its coffee culture, and as the host of many
        international events
      </Content>
    </Message>
    <Message
      sender={{ name: 'Display Name', avatar: 'bird' }}
      time="4 minutes ago"
    >
      <Content>
        Melbourne is situated along the River and has a temperate climate with a
        mix of warm summers and cool winters
      </Content>
    </Message>
    <Message
      sender={{ name: 'Display Name', avatar: 'bird' }}
      time="4 minutes ago"
    >
      <Content>
        If you are referring to another place with a similar name, let me know!
      </Content>
    </Message>
  </div>
)

export default Messages
