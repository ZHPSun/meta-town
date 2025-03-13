import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatSideWindow from './ChatSideWindow'

describe('ChatSideWindow', () => {
  test('renders header', () => {
    render(<ChatSideWindow onClose={vi.fn()} />)

    expect(screen.getByText('Chat')).toBeInTheDocument()
  })

  test('renders Messages', () => {
    render(<ChatSideWindow onClose={vi.fn()} />)

    expect(screen.getAllByRole('region', { name: 'message' })).toHaveLength(6)
  })

  test('renders Form', async () => {
    render(<ChatSideWindow onClose={vi.fn()} />)

    expect(
      await screen.findByRole('button', { name: 'Send' })
    ).toBeInTheDocument()
  })

  test('renders side window', () => {
    render(<ChatSideWindow onClose={vi.fn()} />)

    expect(
      screen.getByRole('region', { name: 'Chat Side Window' })
    ).toBeInTheDocument()
  })

  test('calls onClose when close button is clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<ChatSideWindow onClose={handleClick} />)

    await user.click(await screen.findByRole('button', { name: 'Close' }))

    expect(handleClick).toBeCalled()
  })
})
