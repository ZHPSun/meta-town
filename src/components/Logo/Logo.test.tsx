import { render, screen } from '@testing-library/react'
import Logo from './Logo'

describe('Logo', () => {
  test('renders link to the home page', () => {
    render(<Logo />)
    expect(screen.getByRole('link', { name: /Meta Town/i })).toHaveAttribute(
      'href',
      '/'
    )
  })
})
