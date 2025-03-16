import { renderHook } from '@testing-library/react'
import useSWR from 'swr'
import getOwnedSpaces from '@/db/getOwnedSpaces'
import useUser from '@/hooks/useUser'
import useOwnedSpaces from './useOwnedSpaces'

vi.mock('swr')
const useSWRMock = vi.mocked(useSWR)
vi.mock('@/hooks/useUser')
const useUserMock = vi.mocked(useUser)

describe('useOwnedSpaces', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('calls useSWR with null key if user is false', () => {
    useUserMock.mockReturnValue({
      data: false,
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    renderHook(() => useOwnedSpaces())

    expect(useSWRMock).toHaveBeenCalledWith(null, getOwnedSpaces)
  })

  test('calls useSWR with key and fetcher', () => {
    const user = {
      id: 'userId',
    }

    useUserMock.mockReturnValue({
      data: user,
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    renderHook(() => useOwnedSpaces())

    expect(useSWRMock).toHaveBeenCalledWith(
      ['owned-spaces', user.id],
      getOwnedSpaces
    )
  })

  test('returns result from useSWR', () => {
    const user = {
      id: 'userId',
    }

    const data = {
      id: 'ID',
      name: 'Space Name',
    }

    useUserMock.mockReturnValue({
      data: user,
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    useSWRMock.mockReturnValue({
      data,
      isLoading: false,
    } as unknown as ReturnType<typeof useSWR>)

    const { result } = renderHook(() => useOwnedSpaces())

    expect(result.current).toEqual({
      data,
      isLoading: false,
    })
  })
})
