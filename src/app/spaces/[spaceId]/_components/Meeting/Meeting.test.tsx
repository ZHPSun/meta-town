import { render, screen } from '@testing-library/react'
import Meeting from './Meeting'

describe('Meeting', () => {
  test('renders MapView', () => {
    render(<Meeting />)

    expect(screen.getByText('Jack')).toBeInTheDocument()
  })
})
