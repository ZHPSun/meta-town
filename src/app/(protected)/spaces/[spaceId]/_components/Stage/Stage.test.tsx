import { render, screen } from '@testing-library/react'
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

    expect(screen.getByLabelText('Placement: 0, 1')).toHaveStyle({
      top: `${(INITIAL_COORDINATES.y + 1) * TILE_SIZE}px`,
      left: `${INITIAL_COORDINATES.x * TILE_SIZE}px`,
      transform: 'rotate(180deg)',
    })
  })

  test('useCenterCharacter change the style successfully', () => {
    render(<Stage />)

    expect(screen.getByLabelText('stage').style.transform).toBe(
      'translate(var(--translate-x), var(--translate-y)) scale(var(--scale))'
    )

    expect(screen.getByLabelText('stage').style.transformOrigin).toBe(
      'top left'
    )

    expect(
      screen.getByLabelText('stage').style.getPropertyValue('--translate-x')
    ).toBe('0px')

    expect(
      screen.getByLabelText('stage').style.getPropertyValue('--translate-y')
    ).toBe('0px')

    expect(
      screen.getByLabelText('stage').style.getPropertyValue('--scale')
    ).toBe('1')
  })

  test('zooms in', async () => {
    const user = userEvent.setup()

    render(<Stage />)

    await user.click(await screen.findByRole('button', { name: 'Zoom In' }))

    expect(
      screen.getByLabelText('stage').style.getPropertyValue('--scale')
    ).toBe('1.1')
  })

  test('zooms out', async () => {
    const user = userEvent.setup()

    render(<Stage />)

    await user.click(await screen.findByRole('button', { name: 'Zoom Out' }))

    expect(
      screen.getByLabelText('stage').style.getPropertyValue('--scale')
    ).toBe('0.9')
  })

  test('renders OtherCharacter', () => {
    render(<Stage />)

    expect(screen.getByLabelText('Placement: 20, 20')).toHaveStyle({
      top: `${20 * TILE_SIZE}px`,
      left: `${20 * TILE_SIZE}px`,
      transform: 'rotate(0deg)',
    })
  })
})
