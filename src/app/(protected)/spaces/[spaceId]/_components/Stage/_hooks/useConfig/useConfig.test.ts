import { renderHook } from '@testing-library/react'
import { act } from 'react'
import { Coordinates } from '../../_components/Placement'
import useConfig from './useConfig'

describe('useConfig', () => {
  test('toggles configuration mode', () => {
    const { result } = renderHook(() => useConfig({ walls: [] }))

    expect(result.current.config).toBeNull()

    act(() => {
      result.current.handleConfig('walls')
    })

    expect(result.current.config).toBe('walls')

    act(() => {
      result.current.handleConfig('walls')
    })

    expect(result.current.config).toBeNull()
  })

  test('returns handledEdit when configuration mode is enabled', () => {
    const { result } = renderHook(() => useConfig({ walls: [] }))

    act(() => {
      result.current.handleConfig('walls')
    })

    expect(result.current.handleEdit).toBeDefined()
  })

  test('return configured walls on top of walls', () => {
    const walls: Coordinates[] = [{ x: 1, y: 1, direction: 'N' }]

    const { result } = renderHook(() => useConfig({ walls }))

    act(() => {
      result.current.handleConfig('walls')
    })

    act(() => {
      result.current.handleEdit(0, 1)
    })

    expect(result.current.data.walls).toEqual([
      { x: 1, y: 1, direction: 'N' },
      { x: 0, y: 1, direction: 'N' },
    ])
  })

  test('does not configure data when configuration mode is disabled', () => {
    const walls: Coordinates[] = [{ x: 1, y: 1, direction: 'N' }]

    const { result } = renderHook(() => useConfig({ walls }))

    act(() => {
      result.current.handleEdit(0, 1)
    })

    expect(result.current.data.walls).toEqual(walls)
  })

  test('returns coordinatesConfig with config and handled coordinates', () => {
    const { result } = renderHook(() => useConfig({ walls: [] }))

    act(() => {
      result.current.handleConfig('walls')
    })

    act(() => {
      result.current.handleCoordinates(1, 1)
    })

    expect(result.current.coordinatesConfig).toEqual({
      x: 1,
      y: 1,
      direction: 'N',
      config: 'walls',
    })
  })

  test('returns null coordinatesConfig when configuration mode is disabled', () => {
    const { result } = renderHook(() => useConfig({ walls: [] }))

    act(() => {
      result.current.handleCoordinates(1, 1)
    })

    expect(result.current.coordinatesConfig).toBeNull()
  })

  test('returns null coordinatesConfig on configuration changed', () => {
    const { result } = renderHook(() => useConfig({ walls: [] }))

    act(() => {
      result.current.handleConfig('walls')
    })

    act(() => {
      result.current.handleCoordinates(1, 1)
    })

    act(() => {
      result.current.handleConfig('walls')
    })

    expect(result.current.coordinatesConfig).toBeNull()
  })
})
