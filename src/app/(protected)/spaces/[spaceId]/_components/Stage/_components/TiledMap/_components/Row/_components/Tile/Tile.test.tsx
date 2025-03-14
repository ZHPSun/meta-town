import { render, screen } from '@testing-library/react'
import Tile from './Tile'

describe('Tile', () => {
  test('renders gridcell', () => {
    render(<Tile x={3} y={4} />)

    expect(screen.getByRole('gridcell', { name: '3, 4' })).toBeInTheDocument()
  })

  test('renders button with onEdit', () => {
    render(<Tile x={3} y={4} onEdit={vi.fn()} />)

    expect(screen.getByRole('button', { name: '3, 4' })).toBeInTheDocument()
  })

  test('calls onEdit when clicked button', () => {
    const onEdit = vi.fn()

    render(<Tile x={3} y={4} onEdit={onEdit} />)

    screen.getByRole('button', { name: '3, 4' }).click()

    expect(onEdit).toHaveBeenCalledWith(3, 4)
  })
})
