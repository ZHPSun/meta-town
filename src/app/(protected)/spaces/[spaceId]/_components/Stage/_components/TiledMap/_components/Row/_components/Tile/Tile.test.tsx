import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Tile from './Tile'

describe('Tile', () => {
  test('renders gridcell', () => {
    render(<Tile x={3} y={4} />)

    expect(screen.getByRole('gridcell', { name: '3, 4' })).toBeInTheDocument()
  })

  test('calls onMouseOver when hover', async () => {
    const onMouseOver = vi.fn()

    const user = userEvent.setup()

    render(<Tile x={3} y={4} onMouseOver={onMouseOver} />)

    await user.hover(screen.getByRole('gridcell', { name: '3, 4' }))

    expect(onMouseOver).toHaveBeenCalledWith(3, 4)
  })
})
