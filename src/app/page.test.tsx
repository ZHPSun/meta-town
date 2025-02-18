import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home', () => {
  test('renders Header', () => {
    render(<Home />)

    expect(
      screen.getByRole('button', { name: 'Meta Town' })
    ).toBeInTheDocument()
  })
})
