import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useParams } from 'next/navigation'
import { act } from 'react'
import useSessionUser from '@/hooks/useSessionUser'
import useSpace from '@/hooks/useSpace'
import useOnlineUsers from '@/hooks/useOnlineUsers'
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

vi.mock('@/hooks/useSessionUser')
const useSessionUserMock = vi.mocked(useSessionUser)

vi.mock('@/hooks/useSpace')
const useSpaceMock = vi.mocked(useSpace)

vi.mock('@/hooks/useOnlineUsers')
const useOnlineUsersMock = vi.mocked(useOnlineUsers)

vi.mock('next/navigation')
const useParamsMock = vi.mocked(useParams)

vi.mock('@/db/upsertSpacePosition')

describe('Stage', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('does not render stage if there is no user', () => {
    useSessionUserMock.mockReturnValue({
      data: null,
    } as unknown as ReturnType<typeof useSessionUser>)

    useParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      data: { id: 'SPACE_ID' },
    } as unknown as ReturnType<typeof useSpace>)

    useOnlineUsersMock.mockReturnValue({
      data: [],
    } as unknown as ReturnType<typeof useOnlineUsers>)

    const { container } = render(<Stage onConfigurationClose={vi.fn()} />)

    expect(container).toBeEmptyDOMElement()
  })

  test('renders Placement and Character', async () => {
    useSessionUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useSessionUser>)

    useParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      data: { id: 'SPACE_ID' },
    } as unknown as ReturnType<typeof useSpace>)

    useOnlineUsersMock.mockReturnValue({
      data: [],
    } as unknown as ReturnType<typeof useOnlineUsers>)

    render(<Stage onConfigurationClose={vi.fn()} />)

    expect(await screen.findByLabelText('dog')).toBeInTheDocument()
  })

  test('renders walls', () => {
    useSessionUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useSessionUser>)

    useParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      data: { id: 'SPACE_ID' },
    } as unknown as ReturnType<typeof useSpace>)

    useOnlineUsersMock.mockReturnValue({
      data: [],
    } as unknown as ReturnType<typeof useOnlineUsers>)

    render(<Stage onConfigurationClose={vi.fn()} />)

    expect(screen.getAllByLabelText('Wall')).toHaveLength(WALLS.length)
  })

  test('renders TiledMap', () => {
    useSessionUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useSessionUser>)

    useParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      data: { id: 'SPACE_ID' },
    } as unknown as ReturnType<typeof useSpace>)

    useOnlineUsersMock.mockReturnValue({
      data: [],
    } as unknown as ReturnType<typeof useOnlineUsers>)

    render(<Stage onConfigurationClose={vi.fn()} />)

    expect(screen.getAllByRole('gridcell')).toHaveLength(
      DIMENSIONS.rows * DIMENSIONS.columns
    )
  })

  test('moves character', async () => {
    useSessionUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useSessionUser>)

    useParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      data: { id: 'SPACE_ID' },
    } as unknown as ReturnType<typeof useSpace>)

    useOnlineUsersMock.mockReturnValue({
      data: [],
    } as unknown as ReturnType<typeof useOnlineUsers>)

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
    useSessionUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useSessionUser>)

    useParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      data: { id: 'SPACE_ID' },
    } as unknown as ReturnType<typeof useSpace>)

    useOnlineUsersMock.mockReturnValue({
      data: [],
    } as unknown as ReturnType<typeof useOnlineUsers>)

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
    useSessionUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useSessionUser>)

    useParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      data: { id: 'SPACE_ID' },
    } as unknown as ReturnType<typeof useSpace>)

    useOnlineUsersMock.mockReturnValue({
      data: [],
    } as unknown as ReturnType<typeof useOnlineUsers>)

    const user = userEvent.setup()

    render(<Stage onConfigurationClose={vi.fn()} />)

    await user.click(await screen.findByRole('button', { name: 'Zoom In' }))

    expect(
      screen.getByLabelText('stage').style.getPropertyValue('--scale')
    ).toBe('1.1')
  })

  test('zooms out', async () => {
    useSessionUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useSessionUser>)

    useParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      data: { id: 'SPACE_ID' },
    } as unknown as ReturnType<typeof useSpace>)

    useOnlineUsersMock.mockReturnValue({
      data: [],
    } as unknown as ReturnType<typeof useOnlineUsers>)

    const user = userEvent.setup()

    render(<Stage onConfigurationClose={vi.fn()} />)

    await user.click(await screen.findByRole('button', { name: 'Zoom Out' }))

    expect(
      screen.getByLabelText('stage').style.getPropertyValue('--scale')
    ).toBe('0.9')
  })

  test('renders other characters', () => {
    const spaceId = 'SPACE_ID'

    const space = {
      id: 'SPACE_UUID',
    }

    useSessionUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useSessionUser>)

    useParamsMock.mockReturnValue({
      spaceId,
    })

    useSpaceMock.mockReturnValue({
      data: space,
    } as unknown as ReturnType<typeof useSpace>)

    useOnlineUsersMock.mockReturnValue({
      data: [
        { id: '1', displayName: 'Alice', avatar: 'bird' },
        { id: '2', displayName: 'Bob', avatar: 'dog' },
        { id: '3', displayName: 'Charlie', avatar: 'cat' },
      ],
    } as unknown as ReturnType<typeof useOnlineUsers>)

    render(<Stage onConfigurationClose={vi.fn()} />)

    expect(useSpaceMock).toHaveBeenCalledWith(spaceId)
    expect(useOnlineUsersMock).toHaveBeenCalledWith(space.id)

    expect(screen.getByLabelText('Placement: 6, 6')).toBeInTheDocument()

    expect(screen.getByLabelText('Placement: 6, 7')).toBeInTheDocument()

    expect(screen.getByLabelText('Placement: 9, 9')).toBeInTheDocument()

    expect(screen.getAllByLabelText('OtherCharacter')).toHaveLength(3)
  })

  test('update space position with the character coordinates on every 200ms', async () => {
    vi.useFakeTimers()

    const userId = 'USER_ID'
    const spaceId = 'SPACE_ID'

    useSessionUserMock.mockReturnValue({
      data: { id: userId },
    } as unknown as ReturnType<typeof useSessionUser>)

    useParamsMock.mockReturnValue({
      spaceId,
    })

    useSpaceMock.mockReturnValue({
      data: { id: 'SPACE_ID' },
    } as unknown as ReturnType<typeof useSpace>)

    useSpaceMock.mockReturnValue({
      data: { id: spaceId },
    } as unknown as ReturnType<typeof useSpace>)

    useOnlineUsersMock.mockReturnValue({
      data: [],
    } as unknown as ReturnType<typeof useOnlineUsers>)

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
    useSessionUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useSessionUser>)

    useParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      data: { id: 'SPACE_ID' },
    } as unknown as ReturnType<typeof useSpace>)

    useOnlineUsersMock.mockReturnValue({
      data: [],
    } as unknown as ReturnType<typeof useOnlineUsers>)

    render(<Stage onConfigurationClose={vi.fn()} />)

    expect(
      screen.queryByRole('dialog', { name: 'Configuration' })
    ).not.toBeInTheDocument()
  })

  test('renders configuration when isConfigurationOpen is true', () => {
    useSessionUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useSessionUser>)

    useParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      data: { id: 'SPACE_ID' },
    } as unknown as ReturnType<typeof useSpace>)

    useOnlineUsersMock.mockReturnValue({
      data: [],
    } as unknown as ReturnType<typeof useOnlineUsers>)

    render(<Stage onConfigurationClose={vi.fn()} isConfigurationOpen />)

    expect(
      screen.getByRole('dialog', { name: 'Configuration' })
    ).toBeInTheDocument()
  })

  test('renders configuration buttons on config coordinates', async () => {
    useSessionUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useSessionUser>)

    useParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      data: { id: 'SPACE_ID' },
    } as unknown as ReturnType<typeof useSpace>)

    useOnlineUsersMock.mockReturnValue({
      data: [],
    } as unknown as ReturnType<typeof useOnlineUsers>)

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
    useSessionUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useSessionUser>)

    useParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      data: { id: 'SPACE_ID' },
    } as unknown as ReturnType<typeof useSpace>)

    useOnlineUsersMock.mockReturnValue({
      data: [],
    } as unknown as ReturnType<typeof useOnlineUsers>)

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
    useSessionUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useSessionUser>)

    useParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      data: { id: 'SPACE_ID' },
    } as unknown as ReturnType<typeof useSpace>)

    useOnlineUsersMock.mockReturnValue({
      data: [],
    } as unknown as ReturnType<typeof useOnlineUsers>)

    const onConfigurationClose = vi.fn()
    const user = userEvent.setup()

    render(
      <Stage onConfigurationClose={onConfigurationClose} isConfigurationOpen />
    )

    await user.click(await screen.findByRole('button', { name: 'Close' }))

    expect(onConfigurationClose).toHaveBeenCalled()
  })
})
