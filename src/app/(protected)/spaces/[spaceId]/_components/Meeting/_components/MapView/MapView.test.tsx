import { render, screen, waitFor } from '@testing-library/react'
import MapView from './MapView'

describe('MapView', () => {
  test('renders Videos', () => {
    render(<MapView />)

    expect(screen.getByRole('region', { name: 'Map View' })).toBeInTheDocument()
  })

  test('renders left button', async () => {
    render(<MapView />)

    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Previous' })
      ).toBeInTheDocument()
    )
  })

  test('renders right button', async () => {
    render(<MapView />)

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument()
    )
  })
})
