import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ParticipantsSideWindow from './ParticipantsSideWindow'

describe('ParticipantsSideWindow', () => {
  test('renders header', () => {
    render(<ParticipantsSideWindow onClose={vi.fn()} />)

    expect(screen.getByText('Users')).toBeInTheDocument()
  })

  test('renders side window', () => {
    render(<ParticipantsSideWindow onClose={vi.fn()} />)

    expect(
      screen.getByRole('region', { name: 'Participants Side Window' })
    ).toBeInTheDocument()
  })

  test('calls onClose when close button is clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<ParticipantsSideWindow onClose={handleClick} />)

    await waitFor(() =>
      user.click(screen.getByRole('button', { name: 'Close' }))
    )

    expect(handleClick).toBeCalled()
  })
})
