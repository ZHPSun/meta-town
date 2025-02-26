import { render, screen } from '@testing-library/react'
import SignUp from './page'

describe('SignUp', () => {
  test('renders Logo', () => {
    render(<SignUp />)

    expect(screen.getByRole('link', { name: 'Meta Town' })).toBeInTheDocument()
  })

  test('renders Form', () => {
    render(<SignUp />)

    expect(
      screen.getByText('By signing up, you agree to our')
    ).toBeInTheDocument()
  })

  test('renders link to login page', () => {
    render(<SignUp />)

    expect(screen.getByRole('link', { name: 'Login now!' })).toHaveAttribute(
      'href',
      '/authentication/login'
    )
  })
})
