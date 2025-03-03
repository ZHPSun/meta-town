import { render, screen } from '@testing-library/react'
import Character from './Character'

describe('Character', () => {
  test('renders character', () => {
    render(<Character />)

    expect(screen.getByLabelText('Character')).toBeInTheDocument()
  })
})
