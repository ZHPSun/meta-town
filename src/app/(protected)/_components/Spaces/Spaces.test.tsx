import { render, screen } from '@testing-library/react'
import Spaces from './Spaces'

describe('Spaces', () => {
  test('renders Spaces', () => {
    render(<Spaces />)
    expect(screen.getAllByRole('status')).toHaveLength(6)
  })
})
