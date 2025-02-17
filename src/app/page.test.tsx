import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home', () => {
  test('renders Create Spaces button', () => {
    render(<Home />)

    expect(screen.getByText('Create Spaces')).toBeInTheDocument()
  })
})
