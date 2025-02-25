import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SIZE as BUTTON_SIZE, VARIANT as BUTTON_VARIANT } from '../Button'
import IconButton, { SIZE } from './IconButton'
import { POSITION as TOOLTIP_POSITION } from '../Tooltip'

describe('IconButton', () => {
  test('renders icon', async () => {
    render(<IconButton icon="beer" label="Beer" />)

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Beer' })).toBeInTheDocument()
    )
  })

  test('passes the native onClick property to the attribute', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<IconButton icon="beer" label="Beer" onClick={handleClick} />)

    await waitFor(() =>
      user.click(screen.getByRole('button', { name: 'Beer' }))
    )

    expect(handleClick).toBeCalledTimes(1)
  })

  test('renders button with default size', async () => {
    render(<IconButton icon="beer" label="Beer" />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Beer' })).toHaveClass(
        SIZE.default
      )

      expect(screen.getByRole('button', { name: 'Beer' })).toHaveClass(
        BUTTON_SIZE.default
      )
    })
  })

  test.each(['small', 'default', 'large'] as const)(
    'renders button with %s size',
    async (size) => {
      render(<IconButton size={size} icon="beer" label="Beer" />)
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Beer' })).toHaveClass(
          SIZE[size]
        )

        expect(screen.getByRole('button', { name: 'Beer' })).toHaveClass(
          BUTTON_SIZE[size]
        )
      })
    }
  )

  test('renders button with default rounded square', async () => {
    render(<IconButton icon="beer" label="Beer" />)

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Beer' })).toHaveClass(
        '!rounded-2xl'
      )
    )
  })

  test('renders circle button', async () => {
    render(<IconButton icon="beer" label="Beer" circle />)

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Beer' })).toHaveClass(
        '!rounded-full'
      )
    )
  })

  test('renders button with default variant', async () => {
    render(<IconButton icon="beer" label="Beer" />)

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Beer' })).toHaveClass(
        BUTTON_VARIANT.primary
      )
    )
  })

  test.each([
    'primary',
    'secondary',
    'naked',
    'success',
    'danger',
    'warning',
  ] as const)('renders button with %s variant', async (variant) => {
    render(<IconButton variant={variant} icon="beer" label="Beer" />)
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Beer' })).toHaveClass(
        BUTTON_VARIANT[variant]
      )
    )
  })

  test('renders Tooltip', () => {
    render(<IconButton icon="beer" label="Beer" />)

    expect(screen.getByRole('tooltip', { name: 'Beer' })).toBeInTheDocument()
  })

  test('renders Tooltip with default center position', () => {
    render(<IconButton icon="beer" label="Beer" />)

    expect(screen.getByRole('tooltip', { name: 'Beer' })).toHaveClass(
      TOOLTIP_POSITION.center
    )
  })

  test.each(['left', 'center', 'right'] as const)(
    'renders Tooltip with %s position',
    (position) => {
      render(<IconButton icon="beer" label="Beer" tooltip={{ position }} />)

      expect(screen.getByRole('tooltip', { name: 'Beer' })).toHaveClass(
        TOOLTIP_POSITION[position]
      )
    }
  )
})
