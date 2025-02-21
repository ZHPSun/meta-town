import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home', () => {
  test('renders Header', () => {
    render(<Home />)

    expect(
      screen.getByRole('button', { name: 'Meta Town' })
    ).toBeInTheDocument()
  })

  test('renders Input', () => {
    render(<Home />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('renders Spaces', () => {
    render(<Home />)
    expect(screen.getAllByRole('status')).toHaveLength(6)
  })
})
