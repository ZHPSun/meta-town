import { render, screen } from '@testing-library/react'
import Tile from './Tile'

describe('Tile', () => {
  test('renders gridcell', () => {
    render(<Tile x={3} y={4} />)

    expect(screen.getByRole('gridcell', { name: '3, 4' })).toBeInTheDocument()
  })
})
