import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home', () => {
  test('renders a heading with the correct text', () => {
    render(<Home />)

    expect(
      screen.getByRole('heading', { name: 'Hello Meta Town' })
    ).toBeInTheDocument()
  })
})
