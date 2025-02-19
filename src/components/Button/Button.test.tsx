import { render, screen, waitFor } from '@testing-library/react'
import Button from './Button'
import userEvent from '@testing-library/user-event'
import { VARIANT, SIZE } from './Button'

describe('Button', () => {
  test('renders button with provided children', () => {
    render(<Button>Click me</Button>)

    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  test('passes the native onClick property to the attribute', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Create Spaces</Button>)

    await userEvent.click(screen.getByRole('button', { name: 'Create Spaces' }))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('renders prefix icon', async () => {
    render(
      <Button prefix={{ icon: 'camera', label: 'Camera' }}>
        Button Prefix
      </Button>
    )

    await waitFor(() =>
      expect(screen.getByLabelText('Camera')).toBeInTheDocument()
    )
  })

  test('renders suffix icon', async () => {
    render(
      <Button suffix={{ icon: 'camera', label: 'Camera' }}>
        Button Suffix
      </Button>
    )

    await waitFor(() =>
      expect(screen.getByLabelText('Camera')).toBeInTheDocument()
    )
  })

  test('renders large size button', () => {
    render(<Button size="large">Large Button</Button>)

    expect(screen.getByRole('button', { name: /Large Button/i })).toHaveClass(
      SIZE.large
    )
  })

  test('renders button with default size', () => {
    render(<Button>Button</Button>)

    expect(screen.getByRole('button', { name: /Button/i })).toHaveClass(
      SIZE.default
    )
  })

  test('renders button with default primary variant', () => {
    render(<Button>Variant</Button>)

    expect(screen.getByRole('button', { name: /Variant/i })).toHaveClass(
      VARIANT.primary
    )
  })

  test.each([
    'primary',
    'secondary',
    'naked',
    'success',
    'danger',
    'warning',
  ] as const)('renders %s variant', (variant) => {
    render(<Button variant={variant}>Variant</Button>)

    expect(screen.getByRole('button', { name: /Variant/i })).toHaveClass(
      VARIANT[variant]
    )
  })
})
