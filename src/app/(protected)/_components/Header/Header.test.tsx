import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  test('renders Navigation', () => {
    render(<Header />)

    expect(screen.getByRole('button', { name: 'Events' })).toBeInTheDocument()
  })

  test('renders Actions', () => {
    render(<Header />)

    expect(screen.getByRole('button', { name: 'S.T.' })).toBeInTheDocument()
  })
})
