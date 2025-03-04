import { renderHook } from '@testing-library/react'
import { type Coordinates } from '../../_components/Placement'
import useCenterCharacter, {
  getCenter,
  getPositionOffset,
  getMinMaxPositionOffset,
  transform,
} from './useCenterCharacter'

describe('getCenter', () => {
  test('gets the center coordinate', () => {
    const elementMock = {
      clientWidth: 100,
      clientHeight: 200,
    } as HTMLElement

    const center = getCenter(elementMock)
    expect(center).toEqual({ x: 50, y: 100 })
  })
})

describe('getPositionOffset', () => {
  test('gets the offset between characterPosition and the center', () => {
    const center = { x: 50, y: 100 }
    const characterPosition = { x: 100, y: 200 }
    const offset = getPositionOffset(characterPosition, center)
    expect(offset).toEqual({ x: -50, y: -100 })
  })
})

describe('getMinMaxPositionOffset', () => {
  test('returns 0 offset while viewport is larger than stage', () => {
    const viewport = { width: 200, height: 200 }
    const stage = { width: 100, height: 100 }
    const offset = { x: 50, y: 100 }

    const offsetWithLimitation = getMinMaxPositionOffset(
      offset,
      stage,
      viewport
    )
    expect(offsetWithLimitation).toEqual({ x: 0, y: 0 })
  })

  test('returns 0 offset while viewport is smaller than stage and offset excess the upper limit 0', () => {
    const viewport = { width: 50, height: 50 }
    const stage = { width: 100, height: 100 }
    const offset = { x: 25, y: 25 }

    const offsetWithLimitation = getMinMaxPositionOffset(
      offset,
      stage,
      viewport
    )
    expect(offsetWithLimitation).toEqual({ x: 0, y: 0 })
  })

  test('returns the lowest offset while viewport is smaller than stage and offset is excess the lower limit', () => {
    const viewport = { width: 50, height: 50 }
    const stage = { width: 100, height: 100 }
    const offset = { x: -75, y: -75 }

    const offsetWithLimitation = getMinMaxPositionOffset(
      offset,
      stage,
      viewport
    )
    expect(offsetWithLimitation).toEqual({ x: -50, y: -50 })
  })

  test('returns the given offset while viewport is smaller than stage and offset is within the limitation', () => {
    const viewport = { width: 50, height: 50 }
    const stage = { width: 100, height: 100 }
    const offset = { x: -25, y: -25 }

    const offsetWithLimitation = getMinMaxPositionOffset(
      offset,
      stage,
      viewport
    )
    expect(offsetWithLimitation).toEqual({ x: -25, y: -25 })
  })
})

describe('transform', () => {
  test('transforms element', () => {
    const elementMock = {
      style: {},
    } as HTMLElement

    transform(elementMock, { x: 50, y: 100 })
    expect(elementMock.style.transform).toBe('translate(50px, 100px)')
  })
})

describe('useCenterCharacter', () => {
  test('does not transform element while stageRef and characterRef are null', () => {
    let characterPosition = { x: 15, y: 15, direction: 'S' } as Coordinates

    const { result, rerender } = renderHook(() =>
      useCenterCharacter(characterPosition)
    )
    const stageRef = result.current.stageRef
    characterPosition = { x: 10, y: 10, direction: 'S' }
    rerender()
    expect(stageRef.current).toBeNull()
  })

  test('does not transform element while stageRef does not have a parent element', () => {
    let characterPosition = { x: 15, y: 15, direction: 'S' } as Coordinates
    const stage = document.createElement('div')
    const character = document.createElement('div')

    const { result, rerender } = renderHook(() =>
      useCenterCharacter(characterPosition)
    )
    const { stageRef, characterRef } = result.current
    stageRef.current = stage
    characterRef.current = character
    characterPosition = { x: 10, y: 10, direction: 'S' }
    rerender()
    expect(stage).not.toHaveStyle('transform: translate(0px, 0px)')
  })

  test('transforms stage to the center of viewport', () => {
    const viewport = document.createElement('div')
    const stage = document.createElement('div')
    const character = document.createElement('div')
    Object.defineProperty(viewport, 'clientWidth', { value: 400 })
    Object.defineProperty(viewport, 'clientHeight', { value: 400 })
    Object.defineProperty(stage, 'scrollWidth', { value: 800 })
    Object.defineProperty(stage, 'scrollHeight', { value: 800 })

    stage.getBoundingClientRect = vi.fn(
      () =>
        ({
          left: 0,
          top: 0,
        }) as unknown as DOMRect
    )

    character.getBoundingClientRect = vi.fn(
      () =>
        ({
          left: 400,
          top: 400,
        }) as unknown as DOMRect
    )

    viewport.appendChild(stage)
    stage.appendChild(character)
    let characterPosition = { x: 15, y: 15, direction: 'S' } as Coordinates

    const { result, rerender } = renderHook(() =>
      useCenterCharacter(characterPosition)
    )
    const { stageRef, characterRef } = result.current
    stageRef.current = stage
    characterRef.current = character
    characterPosition = { x: 10, y: 10, direction: 'S' }
    rerender()
    expect(stage).toHaveStyle('transform: translate(-200px, -200px)')
  })
})
