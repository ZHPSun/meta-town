import { render, screen } from '@testing-library/react'
import Form from './Form'

describe('Form', () => {
  test('renders Input', () => {
    render(<Form />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('renders send button', async () => {
    render(<Form />)

    expect(
      await screen.findByRole('button', { name: 'Send' })
    ).toBeInTheDocument()
  })
})
