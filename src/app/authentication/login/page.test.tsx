import { render, screen } from '@testing-library/react'
import Login from './page'

describe('Login', () => {
  test('renders Logo', () => {
    render(<Login />)

    expect(screen.getByRole('link', { name: 'Meta Town' })).toBeInTheDocument()
  })

  test('renders Form', () => {
    render(<Login />)

    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
  })

  test('renders link to registration page', () => {
    render(<Login />)

    expect(screen.getByRole('link', { name: 'Sign up now!' })).toHaveAttribute(
      'href',
      '/authentication/sign-up'
    )
  })
})
