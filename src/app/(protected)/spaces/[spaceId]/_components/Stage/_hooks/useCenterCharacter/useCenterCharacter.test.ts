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
    expect(center).toEqual({ left: 50, top: 100 })
  })
})

describe('getPositionOffset', () => {
  test('gets the offset between characterPosition and the center', () => {
    const center = { left: 50, top: 100 }
    const characterPosition = { left: 100, top: 200 }
    const offset = getPositionOffset(characterPosition, center)
    expect(offset).toEqual({ left: -50, top: -100 })
  })
})

describe('getMinMaxPositionOffset', () => {
  test('returns 0 offset while viewport is larger than stage', () => {
    const viewport = { width: 200, height: 200 }
    const stage = { width: 100, height: 100 }
    const offset = { left: 50, top: 100 }
    const zoom = 1

    const offsetWithLimitation = getMinMaxPositionOffset(
      offset,
      zoom,
      stage,
      viewport
    )
    expect(offsetWithLimitation).toEqual({ left: 0, top: 0 })
  })

  test('returns 0 offset while viewport is smaller than stage and offset excess the upper limit 0', () => {
    const viewport = { width: 50, height: 50 }
    const stage = { width: 100, height: 100 }
    const offset = { left: 25, top: 25 }
    const zoom = 1

    const offsetWithLimitation = getMinMaxPositionOffset(
      offset,
      zoom,
      stage,
      viewport
    )
    expect(offsetWithLimitation).toEqual({ left: 0, top: 0 })
  })

  test('returns the lowest offset while viewport is smaller than stage and offset is excess the lower limit', () => {
    const viewport = { width: 50, height: 50 }
    const stage = { width: 100, height: 100 }
    const offset = { left: -75, top: -75 }
    const zoom = 1

    const offsetWithLimitation = getMinMaxPositionOffset(
      offset,
      zoom,
      stage,
      viewport
    )

    // 100 - 50 = 50
    expect(offsetWithLimitation).toEqual({ left: -50, top: -50 })
  })

  test('returns the lowest offset while viewport is smaller than stage and offset is excess the lower limit with zoom', () => {
    const viewport = { width: 50, height: 50 }
    const stage = { width: 100, height: 100 } // 100 * 1.5 = 150
    const offset = { left: -125, top: -125 }
    const zoom = 1.5

    const offsetWithLimitation = getMinMaxPositionOffset(
      offset,
      zoom,
      stage,
      viewport
    )

    // 150 - 50 = 100
    expect(offsetWithLimitation).toEqual({ left: -100, top: -100 })
  })

  test('returns the given offset while viewport is smaller than stage and offset is within the limitation', () => {
    const viewport = { width: 50, height: 50 }
    const stage = { width: 100, height: 100 }
    const offset = { left: -25, top: -25 }
    const zoom = 1

    const offsetWithLimitation = getMinMaxPositionOffset(
      offset,
      zoom,
      stage,
      viewport
    )
    expect(offsetWithLimitation).toEqual({ left: -25, top: -25 })
  })
})

describe('transform', () => {
  test('transforms element', () => {
    const element = document.createElement('div')

    transform(element, { left: 50, top: 100 }, 1)
    expect(element.style.getPropertyValue('--translate-x')).toBe('50px')
    expect(element.style.getPropertyValue('--translate-y')).toBe('100px')
    expect(element.style.getPropertyValue('--scale')).toBe('1')
  })
})

describe('useCenterCharacter', () => {
  test('does not transform element while stageRef does not have a parent element', () => {
    let characterPosition: Coordinates = { x: 15, y: 15, direction: 'S' }
    const stage = document.createElement('div')
    const character = document.createElement('div')
    const zoom = 1

    const { result, rerender } = renderHook(() =>
      useCenterCharacter(characterPosition, zoom)
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

    Object.defineProperty(viewport, 'clientWidth', { value: 400 }) // 400 / 2 = 200
    Object.defineProperty(viewport, 'clientHeight', { value: 400 }) // 400 / 2 = 200

    Object.defineProperty(stage, 'scrollWidth', { value: 800 })
    Object.defineProperty(stage, 'scrollHeight', { value: 800 })

    Object.defineProperty(character, 'offsetLeft', { value: 600 })
    Object.defineProperty(character, 'offsetTop', { value: 500 })

    viewport.appendChild(stage)
    stage.appendChild(character)
    let characterPosition: Coordinates = { x: 15, y: 15, direction: 'S' }
    const zoom = 1

    const { result, rerender } = renderHook(() =>
      useCenterCharacter(characterPosition, zoom)
    )
    const { stageRef, characterRef } = result.current
    stageRef.current = stage
    characterRef.current = character
    characterPosition = { x: 10, y: 10, direction: 'S' }
    rerender()

    expect(stage.style.getPropertyValue('--translate-x')).toBe('-400px') // 200 - 600 = -400
    expect(stage.style.getPropertyValue('--translate-y')).toBe('-300px') // 200 - 500 = -300
    expect(stage.style.getPropertyValue('--scale')).toBe('1')
  })

  test('transforms stage to the center of viewport with zoom', () => {
    const viewport = document.createElement('div')
    const stage = document.createElement('div')
    const character = document.createElement('div')

    Object.defineProperty(viewport, 'clientWidth', { value: 400 }) // 400 / 2 = 200
    Object.defineProperty(viewport, 'clientHeight', { value: 400 }) // 400 / 2 = 200

    Object.defineProperty(stage, 'scrollWidth', { value: 800 })
    Object.defineProperty(stage, 'scrollHeight', { value: 800 })

    Object.defineProperty(character, 'offsetLeft', { value: 600 }) // 600 * 1.5 = 900
    Object.defineProperty(character, 'offsetTop', { value: 500 }) // 500 * 1.5 = 750

    viewport.appendChild(stage)
    stage.appendChild(character)
    let characterPosition: Coordinates = { x: 15, y: 15, direction: 'S' }
    const zoom = 1.5

    const { result, rerender } = renderHook(() =>
      useCenterCharacter(characterPosition, zoom)
    )
    const { stageRef, characterRef } = result.current
    stageRef.current = stage
    characterRef.current = character
    characterPosition = { x: 10, y: 10, direction: 'S' }
    rerender()

    expect(stage.style.getPropertyValue('--translate-x')).toBe('-700px') // 200 - 900 = -700
    expect(stage.style.getPropertyValue('--translate-y')).toBe('-550px') // 200 - 750 = -550
    expect(stage.style.getPropertyValue('--scale')).toBe('1.5')
  })
})
