import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  test('passes onMouseOver to rows', async () => {
    const onMouseOver = vi.fn()
    const user = userEvent.setup()

    render(
      <TiledMap
        dimensions={{ rows: 2, columns: 2 }}
        onMouseOver={onMouseOver}
      />
    )

    await user.hover(screen.getByRole('gridcell', { name: '0, 0' }))

    expect(onMouseOver).toHaveBeenCalledWith(0, 0)
  })
})
