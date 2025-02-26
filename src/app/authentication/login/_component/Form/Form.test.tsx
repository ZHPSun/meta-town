import { render, screen } from '@testing-library/react'
import Form from './Form'

describe('Form', () => {
  test('renders input email', () => {
    render(<Form />)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  test('renders input password', () => {
    render(<Form />)

    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  test('renders Login button', () => {
    render(<Form />)

    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
  })
})
