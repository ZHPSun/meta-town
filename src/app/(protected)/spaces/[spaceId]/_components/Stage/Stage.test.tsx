import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useParams } from 'next/navigation'
import { act } from 'react'
import useUser from '@/hooks/useUser'
import upsertSpacePosition from '@/db/upsertSpacePosition'
import * as consts from './consts'
import Stage, { INITIAL_COORDINATES, WALLS } from './Stage'

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

vi.mock('@/hooks/useUser')
const useUserMock = vi.mocked(useUser)

vi.mock('next/navigation')
const mockParamsMock = vi.mocked(useParams)

vi.mock('@/db/upsertSpacePosition')

describe('Stage', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('does not render stage if there is no user', () => {
    useUserMock.mockReturnValue({
      data: null,
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    const { container } = render(<Stage onConfigurationClose={vi.fn()} />)

    expect(container).toBeEmptyDOMElement()
  })

  test('renders Placement and Character', async () => {
    useUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    render(<Stage onConfigurationClose={vi.fn()} />)

    expect(await screen.findByLabelText('dog')).toBeInTheDocument()
  })

  test('renders walls', () => {
    useUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    render(<Stage onConfigurationClose={vi.fn()} />)

    expect(screen.getAllByLabelText('Wall')).toHaveLength(WALLS.length)
  })

  test('renders TiledMap', () => {
    useUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    render(<Stage onConfigurationClose={vi.fn()} />)

    expect(screen.getAllByRole('gridcell')).toHaveLength(
      DIMENSIONS.rows * DIMENSIONS.columns
    )
  })

  test('moves character', async () => {
    useUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    const user = userEvent.setup()
    render(<Stage onConfigurationClose={vi.fn()} />)

    await user.keyboard('{ArrowDown}')

    expect(screen.getByLabelText('Placement: 0, 1')).toHaveStyle({
      top: `${(INITIAL_COORDINATES.y + 1) * TILE_SIZE}px`,
      left: `${INITIAL_COORDINATES.x * TILE_SIZE}px`,
      transform: 'rotate(180deg)',
    })
  })

  test('useCenterCharacter change the style successfully', () => {
    useUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    render(<Stage onConfigurationClose={vi.fn()} />)

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
    useUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    const user = userEvent.setup()

    render(<Stage onConfigurationClose={vi.fn()} />)

    await user.click(await screen.findByRole('button', { name: 'Zoom In' }))

    expect(
      screen.getByLabelText('stage').style.getPropertyValue('--scale')
    ).toBe('1.1')
  })

  test('zooms out', async () => {
    useUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    const user = userEvent.setup()

    render(<Stage onConfigurationClose={vi.fn()} />)

    await user.click(await screen.findByRole('button', { name: 'Zoom Out' }))

    expect(
      screen.getByLabelText('stage').style.getPropertyValue('--scale')
    ).toBe('0.9')
  })

  test('renders OtherCharacter', () => {
    useUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    render(<Stage onConfigurationClose={vi.fn()} />)

    expect(screen.getByLabelText('Placement: 20, 20')).toHaveStyle({
      top: `${20 * TILE_SIZE}px`,
      left: `${20 * TILE_SIZE}px`,
      transform: 'rotate(0deg)',
    })
  })

  test('update space position with the character coordinates on every 200ms', async () => {
    vi.useFakeTimers()

    const userId = 'USER_ID'
    const spaceId = 'SPACE_ID'

    useUserMock.mockReturnValue({
      data: { id: userId },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId,
    })

    const user = userEvent.setup({
      advanceTimers: vi.advanceTimersByTime,
    })
    render(<Stage onConfigurationClose={vi.fn()} />)

    await user.keyboard('{ArrowDown}')

    await act(() => vi.advanceTimersByTime(200))

    expect(upsertSpacePosition).toHaveBeenCalledWith({
      userId: 'USER_ID',
      spaceId,
      coordinates: { x: 0, y: 1, direction: 'S' },
    })

    vi.useRealTimers()
  })

  test('does not render configuration by default', () => {
    useUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    render(<Stage onConfigurationClose={vi.fn()} />)

    expect(
      screen.queryByRole('dialog', { name: 'Configuration' })
    ).not.toBeInTheDocument()
  })

  test('renders configuration when isConfigurationOpen is true', () => {
    useUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    render(<Stage onConfigurationClose={vi.fn()} isConfigurationOpen />)

    expect(
      screen.getByRole('dialog', { name: 'Configuration' })
    ).toBeInTheDocument()
  })

  test('renders configuration buttons on config coordinates', async () => {
    useUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    const user = userEvent.setup()

    render(<Stage onConfigurationClose={vi.fn()} isConfigurationOpen />)

    await user.click(await screen.findByRole('button', { name: 'wall' }))
    await user.hover(screen.getByRole('gridcell', { name: '1, 1' }))

    expect(
      within(screen.getByLabelText('Placement: 1, 1')).getByRole('button', {
        name: 'Wall',
      })
    ).toBeInTheDocument()
  })

  test('configures walls', async () => {
    useUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    const user = userEvent.setup()

    render(<Stage onConfigurationClose={vi.fn()} isConfigurationOpen />)

    await user.click(await screen.findByRole('button', { name: 'wall' }))
    await user.hover(screen.getByRole('gridcell', { name: '1, 1' }))

    await user.click(
      within(screen.getByLabelText('Placement: 1, 1')).getByRole('button', {
        name: 'Wall',
      })
    )

    await user.click(await screen.findByRole('button', { name: 'Close' }))

    expect(screen.getAllByLabelText('Wall')).toHaveLength(WALLS.length + 1)
    expect(screen.getByLabelText('Placement: 1, 1')).toBeInTheDocument()
  })

  test('calls onConfigurationClose when configuration close button is clicked', async () => {
    useUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    const onConfigurationClose = vi.fn()
    const user = userEvent.setup()

    render(
      <Stage onConfigurationClose={onConfigurationClose} isConfigurationOpen />
    )

    await user.click(await screen.findByRole('button', { name: 'Close' }))

    expect(onConfigurationClose).toHaveBeenCalled()
  })
})
