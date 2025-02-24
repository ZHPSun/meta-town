import { render, screen } from '@testing-library/react'
import Placement from './Placement'
import { TILE_SIZE } from '../../consts'

describe('Placement', () => {
  test('renders placement', () => {
    render(
      <Placement coordinates={{ x: 3, y: 4, direction: 'E' }}>
        <div>Hello, World!</div>
      </Placement>
    )

    expect(screen.getByTestId('placement')).toHaveStyle({
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

    expect(screen.getByText('Hello, World!')).toBeInTheDocument()
  })
})
