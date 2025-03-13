import { render, screen } from '@testing-library/react'
import Message from './Message'
import Content from './_components/Content'

describe('Message', () => {
  test('renders Avatar', async () => {
    render(
      <Message sender={{ name: 'Jack', avatar: 'bird' }} time="4 minutes ago">
        <Content>Message</Content>
      </Message>
    )

    expect(
      await screen.findByRole('button', { name: 'bird' })
    ).toBeInTheDocument()
  })

  test('renders Content', () => {
    render(
      <Message
        sender={{ name: 'Display Name', avatar: 'bird' }}
        time="4 minutes ago"
      >
        <Content>Message</Content>
      </Message>
    )

    expect(screen.getByText('Message')).toBeInTheDocument()
  })

  test('renders Meta', () => {
    render(
      <Message
        sender={{ name: 'Display Name', avatar: 'bird' }}
        time="4 minutes ago"
      >
        <Content>Message</Content>
      </Message>
    )

    expect(screen.getByText('Display Name')).toBeInTheDocument()
  })

  test('renders sender message', () => {
    render(
      <Message
        sender={{ name: 'Display Name', avatar: 'bird' }}
        time="4 minutes ago"
        isSender
      >
        <Content>Message</Content>
      </Message>
    )

    expect(screen.getByRole('region', { name: 'message' })).toHaveClass(
      'flex-row-reverse'
    )

    expect(screen.getByRole('contentinfo', { name: 'meta' })).toHaveClass(
      'text-right'
    )
  })
})
