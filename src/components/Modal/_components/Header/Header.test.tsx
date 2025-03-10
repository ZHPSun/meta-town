import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from './Header'

const onCloseMock = vi.fn()

describe('Header', () => {
  test('renders title', () => {
    render(<Header onClose={onCloseMock}>Personalize your identity</Header>)

    expect(
      screen.getByRole('heading', {
        name: 'Personalize your identity',
        level: 2,
      })
    ).toBeInTheDocument()
  })

  test('renders close button', () => {
    render(<Header onClose={onCloseMock}>Personalize your identity</Header>)

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  test('trigger onClose when close button is clicked', async () => {
    const user = userEvent.setup()

    render(<Header onClose={onCloseMock}>Personalize your identity</Header>)

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(onCloseMock).toHaveBeenCalled()
  })
})
