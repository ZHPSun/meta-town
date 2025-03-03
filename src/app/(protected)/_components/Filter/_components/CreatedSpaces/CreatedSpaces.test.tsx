import { render, screen } from '@testing-library/react'
import CreatedSpaces from './CreatedSpaces'

describe('CreatedSpaces', () => {
  test('renders Created Spaces button', () => {
    render(<CreatedSpaces />)
    expect(
      screen.getByRole('button', { name: 'Created Spaces' })
    ).toBeInTheDocument()
  })
})
