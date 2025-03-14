import { render, screen } from '@testing-library/react'
import TiledMap from './TiledMap'

describe('TiledMap', () => {
  test('renders grid', () => {
    render(<TiledMap dimensions={{ rows: 2, columns: 2 }} />)

    expect(screen.getByRole('grid', { name: 'Tiled Map' })).toBeInTheDocument()
  })

  test('renders rows', () => {
    render(<TiledMap dimensions={{ rows: 2, columns: 2 }} />)

    expect(screen.getAllByRole('row')).toHaveLength(2)
  })

  test('passes onEdit to rows', () => {
    const onEdit = vi.fn()

    render(<TiledMap dimensions={{ rows: 2, columns: 2 }} onEdit={onEdit} />)

    expect(screen.getAllByRole('button')).toHaveLength(4)
  })
})
