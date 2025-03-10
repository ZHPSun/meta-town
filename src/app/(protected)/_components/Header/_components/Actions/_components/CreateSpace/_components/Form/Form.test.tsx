import { render, screen } from '@testing-library/react'
import Form from './Form'

describe('Form', () => {
  test('renders label', () => {
    render(<Form />)

    expect(screen.getByLabelText('Space Name:')).toBeInTheDocument()
  })

  test('renders input', () => {
    render(<Form />)

    expect(
      screen.getByPlaceholderText('Enter the name of the space')
    ).toBeInTheDocument()
  })

  test('renders button', () => {
    render(<Form />)

    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument()
  })
})
