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

  test('renders SideWindow', () => {
    render(<Space />)

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Chat',
      })
    ).toBeInTheDocument()
  })

  test('renders Meeting', () => {
    render(<Space />)

    expect(screen.getByRole('region', { name: 'Map View' })).toBeInTheDocument()
  })
})
