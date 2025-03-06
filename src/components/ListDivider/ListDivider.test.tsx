import { render, screen } from '@testing-library/react'
import ListDivider from './ListDivider'

describe('ListDivider', () => {
  test('renders divider', () => {
    render(<ListDivider />)

    expect(screen.getByRole('separator')).toBeInTheDocument()
  })
})
