import { render, screen } from '@testing-library/react'
import Close from './Close'
import userEvent from '@testing-library/user-event'

describe('Close', () => {
  test('renders button', () => {
    render(<Close onClose={vitest.fn()} />)

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  test('triggers onClose when button is clicked', async () => {
    const onClose = vitest.fn()
    render(<Close onClose={onClose} />)

    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalled()
  })
})
