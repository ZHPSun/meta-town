import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { VARIANT } from '@/components/Button'
import Participants from './Participants'

describe('Participants', () => {
  test('renders Button', () => {
    render(<Participants onClick={vi.fn()} count={1} status="online" />)

    expect(screen.getByRole('button', { name: 'Participants' })).toHaveClass(
      VARIANT.naked
    )
  })

  test('calls onClick when participants button is clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Participants onClick={handleClick} count={1} status="online" />)

    await user.click(screen.getByRole('button', { name: 'Participants' }))

    expect(handleClick).toBeCalled()
  })

  test('renders secondary Button with sideWindow open', () => {
    render(
      <Participants
        isSideWindowOpen
        onClick={vi.fn()}
        count={0}
        status="online"
      />
    )

    expect(screen.getByRole('button', { name: 'Participants' })).toHaveClass(
      VARIANT.secondary
    )
  })

  test('renders online status', () => {
    render(<Participants onClick={vi.fn()} count={0} status="online" />)

    expect(
      screen.getByLabelText('Participant Status: Available')
    ).toBeInTheDocument()
  })

  test('renders offline status', () => {
    render(<Participants onClick={vi.fn()} count={0} status="offline" />)

    expect(
      screen.getByLabelText('Participant Status: Unavailable')
    ).toBeInTheDocument()
  })

  test('renders user count', () => {
    render(<Participants onClick={vi.fn()} count={10} status="online" />)

    expect(screen.getByText(10)).toBeInTheDocument()
  })
})
