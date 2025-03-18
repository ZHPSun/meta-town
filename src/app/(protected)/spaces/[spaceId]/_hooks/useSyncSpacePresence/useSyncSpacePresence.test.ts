import { renderHook } from '@testing-library/react'
import { useParams } from 'next/navigation'
import useUser from '@/hooks/useUser'
import upsertSpacePresence from '@/db/upsertSpacePresence'
import useSyncSpacePresence from './useSyncSpacePresence'

vi.mock('@/hooks/useUser')
const useUserMock = vi.mocked(useUser)

vi.mock('next/navigation')
const mockParamsMock = vi.mocked(useParams)

vi.mock('@/db/upsertSpacePresence')

describe('useSyncSpacePresence', () => {
  test('does not call upsertSpacePresence if there is no user', () => {
    const spaceId = 'SPACE_ID'

    useUserMock.mockReturnValue({} as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId,
    })

    renderHook(() => useSyncSpacePresence())

    expect(upsertSpacePresence).not.toBeCalled()
  })

  test('updates user status to ONLINE when user is present', () => {
    const userId = 'USER_ID'
    const spaceId = 'SPACE_ID'

    useUserMock.mockReturnValue({
      data: { id: userId },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId,
    })

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

    useUserMock.mockReturnValue({
      data: { id: userId },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId,
    })

    const { unmount } = renderHook(() => useSyncSpacePresence())

    unmount()

    expect(upsertSpacePresence).toHaveBeenCalledWith({
      userId: 'USER_ID',
      spaceId: 'SPACE_ID',
      status: 'OFFLINE',
    })
  })
})
