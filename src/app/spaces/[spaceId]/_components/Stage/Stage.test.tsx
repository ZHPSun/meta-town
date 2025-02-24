import { render, screen } from '@testing-library/react'
import Stage, { DIMENSIONS } from './Stage'

describe('Stage', () => {
  test('renders Placement and Character', () => {
    render(<Stage />)

    expect(screen.getByLabelText('Character')).toBeInTheDocument()
  })

  test('renders TiledMap', () => {
    render(<Stage />)

    expect(screen.getAllByRole('gridcell')).toHaveLength(
      DIMENSIONS.rows * DIMENSIONS.columns
    )
  })
})
