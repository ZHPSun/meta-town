import { render, screen } from '@testing-library/react'
import Option from './Options'

describe('Option', () => {
  test('renders the Option button', () => {
    render(<Option />)
    expect(screen.getByRole('button', { name: 'Options' })).toBeInTheDocument()
  })
})
