import { fireEvent, renderHook } from '@testing-library/react'
import useDrag from './useDrag'

describe('useDrag', () => {
  test('drags element by setting style', () => {
    const handle = document.createElement('div')
    document.body.appendChild(handle)

    const { result, rerender } = renderHook(() => useDrag())

    const { handleRef } = result.current

    handleRef.current = handle
    rerender()

    fireEvent.mouseDown(handle, { target: handle })
    fireEvent.mouseMove(document, {
      clientX: 50,
      clientY: 100,
    })
    fireEvent.mouseUp(document)

    expect(handle).toHaveStyle('position: fixed; left: 50px; top: 100px')

    document.body.removeChild(handle)
  })

  test('does not drag element if target is not handle', () => {
    const handle = document.createElement('div')
    const other = document.createElement('div')
    document.body.appendChild(handle)
    document.body.appendChild(other)

    const { result, rerender } = renderHook(() => useDrag())

    const { handleRef } = result.current

    handleRef.current = handle
    rerender()

    fireEvent.mouseDown(other)
    fireEvent.mouseMove(document, {
      clientX: 50,
      clientY: 100,
    })
    fireEvent.mouseUp(document)

    expect(handle).not.toHaveStyle('position: fixed; left: 50px; top: 100px')

    document.body.removeChild(handle)
    document.body.removeChild(other)
  })
})
