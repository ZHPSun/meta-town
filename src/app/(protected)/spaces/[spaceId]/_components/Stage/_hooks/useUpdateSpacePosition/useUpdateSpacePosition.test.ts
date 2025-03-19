import { renderHook } from '@testing-library/react'
import { useParams } from 'next/navigation'
import { act } from 'react'
import useSessionUser from '@/hooks/useSessionUser'
import upsertSpacePosition from '@/db/upsertSpacePosition'
import useSpace from '@/hooks/useSpace'
import { Coordinates } from '../../_components/Placement'
import useUpdateSpacePosition from './useUpdateSpacePosition'

vi.mock('@/hooks/useSessionUser')
const useSessionUserMock = vi.mocked(useSessionUser)

vi.mock('@/hooks/useSpace')
const useSpaceMock = vi.mocked(useSpace)

vi.mock('next/navigation')
const mockParamsMock = vi.mocked(useParams)

vi.mock('@/db/upsertSpacePosition')
const upsertSpacePositionMock = vi.mocked(upsertSpacePosition)

describe('useUpdateSpacePosition', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.resetAllMocks()
    vi.useRealTimers()
  })

  test('does not call upsertSpacePosition if user is not moving', async () => {
    const coordinates = { x: 0, y: 0, direction: 'S' } as const
    const userId = 'USER_ID'
    const spaceId = 'SPACE_ID'

    useSessionUserMock.mockReturnValue({
      data: { id: userId },
    } as unknown as ReturnType<typeof useSessionUser>)

    mockParamsMock.mockReturnValue({
      spaceId,
    })

    useSpaceMock.mockReturnValue({
      data: { id: spaceId },
    } as unknown as ReturnType<typeof useSpace>)

    renderHook(() => useUpdateSpacePosition(coordinates))

    await act(() => vi.advanceTimersByTime(200))

    expect(upsertSpacePosition).not.toHaveBeenCalled()
  })

  test('does not call upsertSpacePosition if there is no user', async () => {
    const coordinates = { x: 0, y: 0, direction: 'S' } as const
    const spaceId = 'SPACE_ID'

    useSessionUserMock.mockReturnValue(
      {} as unknown as ReturnType<typeof useSessionUser>
    )

    mockParamsMock.mockReturnValue({
      spaceId,
    })

    useSpaceMock.mockReturnValue({
      data: { id: spaceId },
    } as unknown as ReturnType<typeof useSpace>)

    renderHook(() => useUpdateSpacePosition(coordinates))

    await act(() => vi.advanceTimersByTime(200))

    expect(upsertSpacePosition).not.toBeCalled()
  })

  test('does not call upsertSpacePosition if there is no space', async () => {
    const coordinates = { x: 0, y: 0, direction: 'S' } as const
    const userId = 'USER_ID'

    useSessionUserMock.mockReturnValue({
      data: { id: userId },
    } as unknown as ReturnType<typeof useSessionUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      data: null,
    } as unknown as ReturnType<typeof useSpace>)

    renderHook(() => useUpdateSpacePosition(coordinates))

    await act(() => vi.advanceTimersByTime(200))

    expect(upsertSpacePosition).not.toBeCalled()
  })

  test('calls upsertSpacePosition if the coordinates change', async () => {
    const coordinates: Coordinates = { x: 0, y: 0, direction: 'S' }
    const userId = 'USER_ID'
    const spaceId = 'SPACE_ID'

    useSessionUserMock.mockReturnValue({
      data: { id: userId },
    } as unknown as ReturnType<typeof useSessionUser>)

    mockParamsMock.mockReturnValue({
      spaceId,
    })

    useSpaceMock.mockReturnValue({
      data: { id: spaceId },
    } as unknown as ReturnType<typeof useSpace>)

    const { rerender } = renderHook(
      ({ coordinates }) => useUpdateSpacePosition(coordinates),
      {
        initialProps: { coordinates },
      }
    )

    await act(() => vi.advanceTimersByTime(200))

    expect(upsertSpacePosition).not.toHaveBeenCalled()

    const newCoordinates: Coordinates = { x: 1, y: 1, direction: 'N' }
    rerender({ coordinates: newCoordinates })

    await act(() => vi.advanceTimersByTime(200))

    expect(upsertSpacePosition).toBeCalledTimes(1)
    expect(upsertSpacePosition).toBeCalledWith({
      userId,
      spaceId,
      coordinates: newCoordinates,
    })
  })

  test('calls upsertSpacePosition with space id', async () => {
    const coordinates: Coordinates = { x: 0, y: 0, direction: 'S' }
    const userId = 'USER_ID'
    const spaceId = 'SPACE_ID'

    const space = {
      id: 'SPACE_UUID',
    }

    useSessionUserMock.mockReturnValue({
      data: { id: userId },
    } as unknown as ReturnType<typeof useSessionUser>)

    mockParamsMock.mockReturnValue({
      spaceId,
    })

    useSpaceMock.mockReturnValue({
      data: space,
    } as unknown as ReturnType<typeof useSpace>)

    const { rerender } = renderHook(
      ({ coordinates }) => useUpdateSpacePosition(coordinates),
      {
        initialProps: { coordinates },
      }
    )

    expect(useSpace).toBeCalledWith(spaceId)

    const newCoordinates: Coordinates = { x: 1, y: 1, direction: 'N' }
    rerender({ coordinates: newCoordinates })

    await act(() => vi.advanceTimersByTime(200))

    expect(upsertSpacePosition).toBeCalledTimes(1)
    expect(upsertSpacePosition).toBeCalledWith({
      userId,
      spaceId: space.id,
      coordinates: newCoordinates,
    })
  })

  test('calls only once if the coordinates changed but update is still in process', async () => {
    const coordinates: Coordinates = { x: 0, y: 0, direction: 'S' }
    const userId = 'USER_ID'
    const spaceId = 'SPACE_ID'

    useSessionUserMock.mockReturnValue({
      data: { id: userId },
    } as unknown as ReturnType<typeof useSessionUser>)

    mockParamsMock.mockReturnValue({
      spaceId,
    })

    useSpaceMock.mockReturnValue({
      data: { id: spaceId },
    } as unknown as ReturnType<typeof useSpace>)

    upsertSpacePositionMock.mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    })

    const { rerender } = renderHook(
      ({ coordinates }) => useUpdateSpacePosition(coordinates),
      {
        initialProps: { coordinates },
      }
    )

    const coordinates1st: Coordinates = { x: 1, y: 1, direction: 'N' }
    rerender({ coordinates: coordinates1st })

    await act(() => vi.advanceTimersByTime(200))

    expect(upsertSpacePosition).toBeCalledTimes(1)
    expect(upsertSpacePosition).toBeCalledWith({
      userId,
      spaceId,
      coordinates: coordinates1st,
    })

    const coordinates2nd: Coordinates = { x: 1, y: 1, direction: 'N' }
    rerender({ coordinates: coordinates2nd })

    await act(() => vi.advanceTimersByTime(200))
    await act(() => vi.advanceTimersByTime(200))
    await act(() => vi.advanceTimersByTime(200))
    await act(() => vi.advanceTimersByTime(200))
    await act(() => vi.advanceTimersByTime(200))
    await act(() => vi.advanceTimersByTime(200))

    expect(upsertSpacePosition).toBeCalledTimes(2)

    expect(upsertSpacePosition).toBeCalledWith({
      userId,
      spaceId,
      coordinates: coordinates2nd,
    })
  })
})
