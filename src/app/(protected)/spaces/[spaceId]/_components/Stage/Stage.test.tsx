import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Stage, { INITIAL_COORDINATES, WALLS } from './Stage'
import * as consts from './consts'

const { DIMENSIONS, TILE_SIZE } = consts

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

  test('renders walls', () => {
    render(<Stage />)

    expect(screen.getAllByLabelText('Wall')).toHaveLength(WALLS.length)
  })

  test('renders TiledMap', () => {
    render(<Stage />)

    expect(screen.getAllByRole('gridcell')).toHaveLength(
      DIMENSIONS.rows * DIMENSIONS.columns
    )
  })

  test('moves character', async () => {
    const user = userEvent.setup()
    render(<Stage />)

    await user.keyboard('{ArrowDown}')

    expect(
      screen
        .getAllByTestId('placement')
        .find((placement) => within(placement).queryByLabelText('Character'))
    ).toHaveStyle({
      top: `${(INITIAL_COORDINATES.y + 1) * TILE_SIZE}px`,
      left: `${INITIAL_COORDINATES.x * TILE_SIZE}px`,
      transform: 'rotate(180deg)',
    })
  })

  test('useCenterCharacter change the style successfully', async () => {
    const user = userEvent.setup()
    render(<Stage />)
    await user.keyboard('{ArrowDown}')
    expect(screen.getByLabelText('stage').style.transform).toBe(
      'translate(0px, 0px)'
    )
  })

  test('renders OtherCharacter', () => {
    render(<Stage />)

    expect(
      screen
        .getAllByTestId('placement')
        .find((placement) =>
          within(placement).queryByLabelText('OtherCharacter')
        )
    ).toHaveStyle({
      top: `${20 * TILE_SIZE}px`,
      left: `${20 * TILE_SIZE}px`,
      transform: 'rotate(0deg)',
    })
  })
})
