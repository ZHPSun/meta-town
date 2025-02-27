import { renderHook } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DIMENSIONS } from '../consts'
import useMovement from './useMovement'

describe('useMovement', () => {
  test('initializes with given coordinates', () => {
    const { result } = renderHook(() =>
      useMovement({ x: 1, y: 1, direction: 'S' })
    )

    expect(result.current).toEqual({ x: 1, y: 1, direction: 'S' })
  })

  test.each([
    {
      name: 'moves up',
      initial: { x: 0, y: 1, direction: 'S' },
      key: '{arrowup}',
      expected: { x: 0, y: 0, direction: 'N' },
    },
    {
      name: 'moves down',
      initial: { x: 0, y: 0, direction: 'N' },
      key: '{arrowdown}',
      expected: { x: 0, y: 1, direction: 'S' },
    },
    {
      name: 'moves left',
      initial: { x: 1, y: 0, direction: 'E' },
      key: '{arrowleft}',
      expected: { x: 0, y: 0, direction: 'W' },
    },
    {
      name: 'moves right',
      initial: { x: 0, y: 0, direction: 'W' },
      key: '{arrowright}',
      expected: { x: 1, y: 0, direction: 'E' },
    },
  ] as const)('$name', async ({ initial, key, expected }) => {
    const user = userEvent.setup()
    const { result } = renderHook(() => useMovement(initial))

    await user.keyboard(key)

    expect(result.current).toEqual(expected)
  })

  test.each([
    {
      name: 'stops at upper left corner',
      initial: { x: 0, y: 0, direction: 'S' },
      keys: ['{arrowup}', '{arrowleft}'],
      expected: { x: 0, y: 0, direction: 'W' },
    },
    {
      name: 'stops at lower right corner',
      initial: {
        x: DIMENSIONS.columns - 1,
        y: DIMENSIONS.rows - 1,
        direction: 'N',
      },
      keys: ['{arrowdown}', '{arrowright}'],
      expected: {
        x: DIMENSIONS.columns - 1,
        y: DIMENSIONS.rows - 1,
        direction: 'E',
      },
    },
  ] as const)('$name', async ({ initial, keys, expected }) => {
    const user = userEvent.setup()
    const { result } = renderHook(() => useMovement(initial))

    for (const key of keys) {
      await user.keyboard(key)
    }

    expect(result.current).toEqual(expected)
  })
})
