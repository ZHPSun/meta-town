import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useParams } from 'next/navigation'
import { act } from 'react'
import useUser from '@/hooks/useUser'
import Stage, { INITIAL_COORDINATES, WALLS } from './Stage'
import updateSpacePosition from './_hooks/useUpdateSpacePosition/_utils/updateSpacePosition'
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

vi.mock('@/hooks/useUser')
const useUserMock = vi.mocked(useUser)

vi.mock('next/navigation')
const mockParamsMock = vi.mocked(useParams)

vi.mock('./_hooks/useUpdateSpacePosition/_utils/updateSpacePosition')

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

    const { container } = render(<Stage />)

    expect(container).toBeEmptyDOMElement()
  })

  test('renders Placement and Character', async () => {
    useUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    render(<Stage />)

    expect(await screen.findByLabelText('dog')).toBeInTheDocument()
  })

  test('renders walls', () => {
    useUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    render(<Stage />)

    expect(screen.getAllByLabelText('Wall')).toHaveLength(WALLS.length)
  })

  test('renders TiledMap', () => {
    useUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    render(<Stage />)

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
    render(<Stage />)

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
    useUserMock.mockReturnValue({
      data: { id: 'USER_ID', displayName: 'John Doe', avatar: 'dog' },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    const user = userEvent.setup()

    render(<Stage />)

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

    render(<Stage />)

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

    render(<Stage />)

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
    render(<Stage />)

    await user.keyboard('{ArrowDown}')

    await act(() => vi.advanceTimersByTime(200))

    expect(updateSpacePosition).toHaveBeenCalledWith({
      userId: 'USER_ID',
      spaceId,
      coordinates: { x: 0, y: 1, direction: 'S' },
    })

    vi.useRealTimers()
  })
})
