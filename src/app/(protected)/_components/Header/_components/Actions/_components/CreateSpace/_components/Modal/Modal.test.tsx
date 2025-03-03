import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from './Modal'

describe('Modal', () => {
  test('renders overlay', () => {
    render(<Modal onClose={vitest.fn} />)

    expect(screen.getByRole('presentation')).toBeInTheDocument()
  })

  test('renders Header', () => {
    render(<Modal onClose={vitest.fn} />)

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  test('renders Form', () => {
    render(<Modal onClose={vitest.fn} />)

    expect(screen.getByLabelText('Space Name:')).toBeInTheDocument()
  })

  test('calls onClose when close button is clicked', async () => {
    const onClose = vitest.fn()
    render(<Modal onClose={onClose} />)

    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalled()
  })
})
