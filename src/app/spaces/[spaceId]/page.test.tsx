import { render, screen } from '@testing-library/react'
import Space from './page'

describe('Space', () => {
  test('renders Header', () => {
    render(<Space />)

    expect(
      screen.getByRole('button', { name: 'All-Hands' })
    ).toBeInTheDocument()
  })

  test('renders Stage', () => {
    render(<Space />)

    expect(screen.getByRole('grid', { name: 'Tiled Map' })).toBeInTheDocument()
  })

  test('renders Footer', () => {
    render(<Space />)

    expect(
      screen.getByLabelText('Participant Status: Available')
    ).toBeInTheDocument()
  })

  test('renders Sidewindow', () => {
    render(<Space />)

    expect(screen.getByText('Chat')).toBeInTheDocument()
  })
})
