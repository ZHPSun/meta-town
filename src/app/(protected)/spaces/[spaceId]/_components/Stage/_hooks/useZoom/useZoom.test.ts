import { renderHook } from '@testing-library/react'
import { act } from 'react'
import useZoom from './useZoom'

describe('useZoom', () => {
  test('returns zoom', () => {
    const { result } = renderHook(() => useZoom())

    expect(result.current.zoom).toBe(1)
  })

  test('zooms in', () => {
    const { result } = renderHook(() => useZoom())

    act(() => {
      result.current.zoomIn()
    })

    expect(result.current.zoom).toBe(1.1)
  })

  test('zooms out', () => {
    const { result } = renderHook(() => useZoom())

    act(() => {
      result.current.zoomOut()
    })

    expect(result.current.zoom).toBe(0.9)
  })

  test('zooms to the maximum', () => {
    const { result } = renderHook(() => useZoom())

    act(() => {
      for (let i = 0; i < 10; i++) {
        result.current.zoomIn()
      }
    })

    expect(result.current.zoom).toBe(1.5)
  })

  test('zooms to the minimum', () => {
    const { result } = renderHook(() => useZoom())

    act(() => {
      for (let i = 0; i < 10; i++) {
        result.current.zoomOut()
      }
    })

    expect(result.current.zoom).toBe(0.5)
  })
})
