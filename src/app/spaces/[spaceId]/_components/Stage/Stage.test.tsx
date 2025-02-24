import { render, screen } from '@testing-library/react'
import Stage from './Stage'
import * as consts from './consts'

const { DIMENSIONS } = consts

vi.mock('./consts', async (importOriginal) => {
  const actual = await importOriginal<typeof consts>()

  return {
    ...actual,
    DIMENSIONS: {
      rows: 2,
      columns: 2,
    },
  }
})

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
