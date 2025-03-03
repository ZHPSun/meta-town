import { render, screen } from '@testing-library/react'
import Wall from './Wall'

describe('Wall', () => {
  test('renders wall', () => {
    render(<Wall />)

    expect(screen.getByLabelText('Wall')).toBeInTheDocument()
  })
})
