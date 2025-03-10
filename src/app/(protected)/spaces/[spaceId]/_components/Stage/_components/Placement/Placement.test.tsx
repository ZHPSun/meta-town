import { render, screen } from '@testing-library/react'
import { TILE_SIZE } from '../../consts'
import Placement from './Placement'

describe('Placement', () => {
  test('renders placement', () => {
    render(
      <Placement coordinates={{ x: 3, y: 4, direction: 'E' }}>
        <div>Hello, World!</div>
      </Placement>
    )

    expect(screen.getByLabelText('Placement: 3, 4')).toHaveStyle({
      top: `${TILE_SIZE * 4}px`,
      left: `${TILE_SIZE * 3}px`,
      transform: 'rotate(90deg)',
    })
  })

  test('renders children', () => {
    render(
      <Placement coordinates={{ x: 3, y: 4, direction: 'N' }}>
        <div>Hello, World!</div>
      </Placement>
    )

    expect(screen.getByLabelText('Placement: 3, 4')).toContainElement(
      screen.getByText('Hello, World!')
    )
  })

  test('attaches ref', () => {
    const ref = { current: null }

    render(
      <Placement coordinates={{ x: 3, y: 4, direction: 'N' }} ref={ref}>
        <div>Hello, World!</div>
      </Placement>
    )

    expect(screen.getByLabelText('Placement: 3, 4')).toBe(ref.current)
  })
})
