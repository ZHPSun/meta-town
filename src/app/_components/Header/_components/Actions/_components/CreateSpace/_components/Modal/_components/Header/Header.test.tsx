import { render, screen } from '@testing-library/react'
import Header from './Header'
import userEvent from '@testing-library/user-event'

describe('Header', () => {
  test('renders title', () => {
    render(<Header onClose={() => vitest.fn()} />)

    expect(
      screen.getByRole('heading', { name: 'Create a new space' })
    ).toBeInTheDocument()
  })

  test('renders close button', () => {
    render(<Header onClose={() => vitest.fn()} />)

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  test('triggle onClose when close button is clicked', async () => {
    const onClose = vitest.fn()
    render(<Header onClose={onClose} />)

    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalled()
  })
})
