import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatSideWindow from './ChatSideWindow'

describe('ChatSideWindow', () => {
  test('renders header', () => {
    render(<ChatSideWindow onClose={vi.fn()} />)

    expect(screen.getByText('Chat')).toBeInTheDocument()
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

    await waitFor(() =>
      user.click(screen.getByRole('button', { name: 'Close' }))
    )

    expect(handleClick).toBeCalled()
  })
})
