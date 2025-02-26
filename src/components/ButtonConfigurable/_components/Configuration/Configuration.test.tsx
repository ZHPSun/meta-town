import { render, screen } from '@testing-library/react'
import Configuration, {
  ICON_SIZE,
  VARIANT,
  WRAPPER_SIZE,
} from './Configuration'

describe('Configuration', () => {
  test('renders configuration button', () => {
    render(<Configuration />)

    expect(screen.getByRole('button', { name: 'Config' })).toBeInTheDocument()
  })

  test('renders configuration button wrapper with default size', () => {
    render(<Configuration />)

    expect(
      screen.getByRole('button', { name: 'Config' }).parentElement
    ).toHaveClass(WRAPPER_SIZE.default)
  })

  test.each(['small', 'default', 'large'] as const)(
    'renders configuration button wrapper with %s size',
    (size) => {
      render(<Configuration size={size} />)

      expect(
        screen.getByRole('button', { name: 'Config' }).parentElement
      ).toHaveClass(WRAPPER_SIZE[size])
    }
  )

  test('renders configuration button wrapper with default primary variant', () => {
    render(<Configuration />)
    expect(
      screen.getByRole('button', { name: 'Config' }).parentElement
    ).toHaveClass(VARIANT.primary)
  })

  test.each(['primary', 'secondary', 'success', 'danger', 'warning'] as const)(
    'renders configuration button wrapper with %s variant',
    (variant) => {
      render(<Configuration variant={variant} />)
      expect(
        screen.getByRole('button', { name: 'Config' }).parentElement
      ).toHaveClass(VARIANT[variant])
    }
  )

  test('renders configuration button with default size', () => {
    render(<Configuration />)

    expect(screen.getByLabelText('Config')).toHaveAttribute(
      'width',
      ICON_SIZE.default.toString()
    )

    expect(screen.getByLabelText('Config')).toHaveAttribute(
      'height',
      ICON_SIZE.default.toString()
    )
  })

  test.each(['small', 'default', 'large'] as const)(
    'renders configuration button with %s size',
    (size) => {
      render(<Configuration size={size} />)

      expect(screen.getByLabelText('Config')).toHaveAttribute(
        'width',
        ICON_SIZE[size].toString()
      )

      expect(screen.getByLabelText('Config')).toHaveAttribute(
        'height',
        ICON_SIZE[size].toString()
      )
    }
  )
})
