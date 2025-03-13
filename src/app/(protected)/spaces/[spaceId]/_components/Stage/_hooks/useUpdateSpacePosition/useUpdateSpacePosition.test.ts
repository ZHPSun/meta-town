import { renderHook } from '@testing-library/react'
import { useParams } from 'next/navigation'
import { act } from 'react'
import useUser from '@/hooks/useUser'
import { Coordinates } from '../../_components/Placement'
import updateSpacePosition from './_utils/updateSpacePosition'
import useUpdateSpacePosition from './useUpdateSpacePosition'

vi.mock('@/hooks/useUser')
const useUserMock = vi.mocked(useUser)

vi.mock('next/navigation')
const mockParamsMock = vi.mocked(useParams)

vi.mock('./_utils/updateSpacePosition')
const updateSpacePositionMock = vi.mocked(updateSpacePosition)

describe('useUpdateSpacePosition', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.resetAllMocks()
    vi.useRealTimers()
  })

  test('does not call updateSpacePosition if user is not moving', async () => {
    const coordinates = { x: 0, y: 0, direction: 'S' } as const
    const userId = 'USER_ID'
    const spaceId = 'SPACE_ID'

    useUserMock.mockReturnValue({
      data: { id: userId },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId,
    })

    renderHook(() => useUpdateSpacePosition(coordinates))

    await act(() => vi.advanceTimersByTime(200))

    expect(updateSpacePosition).not.toHaveBeenCalled()
  })

  test('does not call updateSpacePosition if there is no user', async () => {
    const coordinates = { x: 0, y: 0, direction: 'S' } as const
    const spaceId = 'SPACE_ID'

    useUserMock.mockReturnValue({} as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId,
    })

    renderHook(() => useUpdateSpacePosition(coordinates))

    await act(() => vi.advanceTimersByTime(200))

    expect(updateSpacePosition).not.toBeCalled()
  })

  test('calls updateSpacePosition if the coordinates change', async () => {
    const coordinates: Coordinates = { x: 0, y: 0, direction: 'S' }
    const userId = 'USER_ID'
    const spaceId = 'SPACE_ID'

    useUserMock.mockReturnValue({
      data: { id: userId },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId,
    })

    const { rerender } = renderHook(
      ({ coordinates }) => useUpdateSpacePosition(coordinates),
      {
        initialProps: { coordinates },
      }
    )

    await act(() => vi.advanceTimersByTime(200))

    expect(updateSpacePosition).not.toHaveBeenCalled()

    const newCoordinates: Coordinates = { x: 1, y: 1, direction: 'N' }
    rerender({ coordinates: newCoordinates })

    await act(() => vi.advanceTimersByTime(200))

    expect(updateSpacePosition).toBeCalledTimes(1)
    expect(updateSpacePosition).toBeCalledWith({
      userId,
      spaceId,
      coordinates: newCoordinates,
    })
  })

  test('calls only once if the coordinates changed but update is still in process', async () => {
    const coordinates: Coordinates = { x: 0, y: 0, direction: 'S' }
    const userId = 'USER_ID'
    const spaceId = 'SPACE_ID'

    useUserMock.mockReturnValue({
      data: { id: userId },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId,
    })

    updateSpacePositionMock.mockImplementation(async () => {
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

    expect(updateSpacePosition).toBeCalledTimes(1)
    expect(updateSpacePosition).toBeCalledWith({
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

    expect(updateSpacePosition).toBeCalledTimes(2)

    expect(updateSpacePosition).toBeCalledWith({
      userId,
      spaceId,
      coordinates: coordinates2nd,
    })
  })
})
