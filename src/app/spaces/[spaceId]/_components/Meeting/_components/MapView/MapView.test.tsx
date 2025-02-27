import { render, screen } from '@testing-library/react'
import MapView from './MapView'

describe('MapView', () => {
  test('renders Video', () => {
    render(<MapView />)

    expect(screen.getByText('Jack')).toBeInTheDocument()
  })
})
