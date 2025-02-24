import { render, screen } from '@testing-library/react'
import TiledMap from './TiledMap'

describe('TiledMap', () => {
  test('renders grid', () => {
    render(<TiledMap dimensions={{ rows: 40, columns: 40 }} />)

    expect(screen.getByRole('grid', { name: 'Tiled Map' })).toBeInTheDocument()
  })

  test('renders rows', () => {
    render(<TiledMap dimensions={{ rows: 40, columns: 40 }} />)

    expect(screen.getAllByRole('row')).toHaveLength(40)
  })
})
