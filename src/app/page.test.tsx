import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home', () => {
  test('renders Header', () => {
    render(<Home />)

    expect(screen.getByRole('link', { name: 'Meta Town' })).toBeInTheDocument()
  })

  test('renders Filter', () => {
    render(<Home />)

    expect(
      screen.getByRole('button', { name: 'Last visited' })
    ).toBeInTheDocument()
  })

  test('renders Spaces', () => {
    render(<Home />)
    expect(screen.getAllByRole('status')).toHaveLength(6)
  })
})
