import { render, screen } from '@testing-library/react'
import OtherCharacter from './OtherCharacter'

describe('OtherCharacter', () => {
  test('renders other character', () => {
    render(<OtherCharacter />)

    expect(screen.getByLabelText('OtherCharacter')).toBeInTheDocument()
  })
})
