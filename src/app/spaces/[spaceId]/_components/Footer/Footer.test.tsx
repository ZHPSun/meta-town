import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  test('renders the Main menu button', () => {
    render(<Footer />)

    expect(
      screen.getByRole('button', { name: 'Main menu' })
    ).toBeInTheDocument()
  })

  test('renders the Chat button', () => {
    render(<Footer />)

    expect(
      screen.getByRole('button', { name: 'Main menu' })
    ).toBeInTheDocument()
  })

  test('renders participants', () => {
    render(<Footer />)

    expect(
      screen.getByLabelText('Participant Status: Available')
    ).toBeInTheDocument()
  })

  test('renders the Leave space button', () => {
    render(<Footer />)

    expect(
      screen.getByRole('button', { name: 'Leave space' })
    ).toBeInTheDocument()
  })
})
