import { renderHook } from '@testing-library/react'
import useSWR from 'swr'
import getSpaces from '@/db/getSpaces'
import useUser from '@/hooks/useUser'
import useSpaces from './useSpaces'

vi.mock('swr')
const useSWRMock = vi.mocked(useSWR)
vi.mock('@/hooks/useUser')
const useUserMock = vi.mocked(useUser)

describe('useSpaces', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('calls useSWR with null key if user is false', () => {
    useUserMock.mockReturnValue({
      data: false,
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    renderHook(() => useSpaces())

    expect(useSWRMock).toHaveBeenCalledWith(null, getSpaces)
  })

  test('calls useSWR with key and fetcher', () => {
    const user = {
      id: 'userId',
    }

    useUserMock.mockReturnValue({
      data: user,
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    renderHook(() => useSpaces())

    expect(useSWRMock).toHaveBeenCalledWith(['spaces', user.id], getSpaces)
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

    const { result } = renderHook(() => useSpaces())
    console.log(result)
    expect(result.current).toEqual({
      data,
      isLoading: false,
    })
  })
})
