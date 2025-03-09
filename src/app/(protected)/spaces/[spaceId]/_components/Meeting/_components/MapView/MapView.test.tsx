import { render, screen } from '@testing-library/react'
import MapView from './MapView'

describe('MapView', () => {
  test('renders region', () => {
    render(<MapView />)

    expect(screen.getByRole('region', { name: 'Map View' })).toBeInTheDocument()
  })

  test('renders Videos', () => {
    render(<MapView />)

    expect(screen.getAllByText('Placeholder').length).toBe(6)
  })

  test('renders left button', async () => {
    render(<MapView />)

    expect(
      await screen.findByRole('button', { name: 'Previous' })
    ).toBeInTheDocument()
  })

  test('renders right button', async () => {
    render(<MapView />)

    expect(
      await screen.findByRole('button', { name: 'Next' })
    ).toBeInTheDocument()
  })
})
