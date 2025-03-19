import { renderHook } from '@testing-library/react'
import { useParams } from 'next/navigation'
import upsertSpacePresence from '@/db/upsertSpacePresence'
import useSpace from '@/hooks/useSpace'
import useSessionUser from '@/hooks/useSessionUser'
import useSyncSpacePresence from './useSyncSpacePresence'

vi.mock('@/hooks/useSessionUser')
const useSessionUserMock = vi.mocked(useSessionUser)

vi.mock('@/hooks/useSpace')
const useSpaceMock = vi.mocked(useSpace)

vi.mock('next/navigation')
const mockParamsMock = vi.mocked(useParams)

vi.mock('@/db/upsertSpacePresence')

describe('useSyncSpacePresence', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('does not call upsertSpacePresence if there is no user', () => {
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

    renderHook(() => useSyncSpacePresence())

    expect(upsertSpacePresence).not.toBeCalled()
  })

  test('does not call upsertSpacePresence if there is no space', () => {
    const userId = 'USER_ID'

    useSessionUserMock.mockReturnValue({
      data: { id: userId },
    } as unknown as ReturnType<typeof useSessionUser>)

    mockParamsMock.mockReturnValue({})

    useSpaceMock.mockReturnValue({} as unknown as ReturnType<typeof useSpace>)

    renderHook(() => useSyncSpacePresence())

    expect(upsertSpacePresence).not.toBeCalled()
  })

  test('calls upsertSpacePresence with spaceId', () => {
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

    const { unmount } = renderHook(() => useSyncSpacePresence())

    expect(useSpace).toBeCalledWith(spaceId)

    expect(upsertSpacePresence).toBeCalledWith({
      userId,
      spaceId: space.id,
      status: 'ONLINE',
    })

    unmount()

    expect(upsertSpacePresence).toBeCalledWith({
      userId,
      spaceId: space.id,
      status: 'OFFLINE',
    })
  })

  test('updates user status to ONLINE when user is present', () => {
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

    renderHook(() => useSyncSpacePresence())

    expect(upsertSpacePresence).toBeCalledWith({
      userId,
      spaceId,
      status: 'ONLINE',
    })
  })

  test('updates user status to OFFLINE when user is not present', () => {
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

    const { unmount } = renderHook(() => useSyncSpacePresence())

    unmount()

    expect(upsertSpacePresence).toHaveBeenCalledWith({
      userId,
      spaceId,
      status: 'OFFLINE',
    })
  })
})
