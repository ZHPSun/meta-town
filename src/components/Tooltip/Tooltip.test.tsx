import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Tooltip, { POSITION } from './Tooltip'

describe('Tooltip', () => {
  test('renders tooltip with provided children', () => {
    render(<Tooltip text="Tooltip text">Hover me</Tooltip>)
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  test('renders tooltip text', () => {
    render(<Tooltip text="Tooltip text">Hover me</Tooltip>)

    expect(screen.getByRole('tooltip', { name: 'Tooltip text' })).toHaveClass(
      'hidden group-hover:block'
    )

    expect(
      screen.getByRole('tooltip', { name: 'Tooltip text' })
    ).toBeInTheDocument()
  })

  test.each(['left', 'right', 'center'] as const)(
    'renders tooltip in %s position',
    async (position) => {
      render(
        <Tooltip text="Tooltip text" position={position}>
          <button>Hover me</button>
        </Tooltip>
      )
      await userEvent.hover(screen.getByRole('button', { name: 'Hover me' }))
      expect(screen.getByRole('tooltip', { name: 'Tooltip text' })).toHaveClass(
        POSITION[position]
      )
    }
  )

  test('renders tooltip with default center position', async () => {
    render(
      <Tooltip text="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    )

    await userEvent.hover(screen.getByRole('button', { name: 'Hover me' }))
    expect(screen.getByRole('tooltip', { name: 'Tooltip text' })).toHaveClass(
      POSITION.center
    )
  })
})
