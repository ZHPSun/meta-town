import { renderHook, act, waitFor } from '@testing-library/react'
import useMedia from './useMedia'

describe('useMedia', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('initializes with null camera stream', () => {
    const { result } = renderHook(() => useMedia({ camera: true }))

    expect(result.current.mediaStream).toBeNull()
  })

  test('initializes with null mic stream', () => {
    const { result } = renderHook(() => useMedia({ mic: true }))

    expect(result.current.mediaStream).toBeNull()
  })

  test('acquires stream when camera is toggled on', async () => {
    const fakeMediaStream = {
      getTracks: (): MediaStreamTrack[] => [],
    } as unknown as MediaStream

    const getUserMediaMock = vi.fn().mockResolvedValue(fakeMediaStream)

    vi.stubGlobal('navigator', {
      mediaDevices: {
        getUserMedia: getUserMediaMock,
      },
    })

    const { result } = renderHook(() => useMedia({ camera: true }))

    act(() => result.current.toggleMediaStream())

    expect(getUserMediaMock).toHaveBeenCalledWith({ video: true })
    await waitFor(() =>
      expect(result.current.mediaStream).toBe(fakeMediaStream)
    )
  })

  test('acquires stream when mic is toggled on', async () => {
    const fakeMediaStream = {
      getTracks: (): MediaStreamTrack[] => [],
    } as unknown as MediaStream

    const getUserMediaMock = vi.fn().mockResolvedValue(fakeMediaStream)

    vi.stubGlobal('navigator', {
      mediaDevices: {
        getUserMedia: getUserMediaMock,
      },
    })

    const { result } = renderHook(() => useMedia({ mic: true }))

    act(() => result.current.toggleMediaStream())

    expect(getUserMediaMock).toHaveBeenCalledWith({ audio: true })
    await waitFor(() =>
      expect(result.current.mediaStream).toBe(fakeMediaStream)
    )
  })

  test('releases stream when camera is toggled off', async () => {
    const stopMock = vi.fn()

    const fakeMediaStream = {
      getTracks: (): MediaStreamTrack[] => [
        {
          stop: stopMock,
        } as unknown as MediaStreamTrack,
      ],
    } as unknown as MediaStream

    vi.stubGlobal('navigator', {
      mediaDevices: {
        getUserMedia: vi.fn().mockResolvedValue(fakeMediaStream),
      },
    })

    const { result } = renderHook(() => useMedia({ camera: true }))

    act(() => result.current.toggleMediaStream())

    await waitFor(() =>
      expect(result.current.mediaStream).toBe(fakeMediaStream)
    )

    act(() => result.current.toggleMediaStream())

    expect(stopMock).toHaveBeenCalled()
    expect(result.current.mediaStream).toBeNull()
  })

  test('releases stream when mic is toggled off', async () => {
    const stopMock = vi.fn()

    const fakeMediaStream = {
      getTracks: (): MediaStreamTrack[] => [
        {
          stop: stopMock,
        } as unknown as MediaStreamTrack,
      ],
    } as unknown as MediaStream

    vi.stubGlobal('navigator', {
      mediaDevices: {
        getUserMedia: vi.fn().mockResolvedValue(fakeMediaStream),
      },
    })

    const { result } = renderHook(() => useMedia({ mic: true }))

    act(() => result.current.toggleMediaStream())

    await waitFor(() =>
      expect(result.current.mediaStream).toBe(fakeMediaStream)
    )

    act(() => result.current.toggleMediaStream())

    expect(stopMock).toHaveBeenCalled()
    expect(result.current.mediaStream).toBeNull()
  })
})
