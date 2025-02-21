import { render, screen } from '@testing-library/react'
import Filter from './Filter'

describe('Filter', () => {
  test('renders Last Visited', () => {
    render(<Filter />)
    expect(
      screen.getByRole('button', { name: 'Last Visited' })
    ).toBeInTheDocument()
  })

  test('renders Created Spaces', () => {
    render(<Filter />)
    expect(
      screen.getByRole('button', { name: 'Created Spaces' })
    ).toBeInTheDocument()
  })

  test('renders Input', () => {
    render(<Filter />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})
