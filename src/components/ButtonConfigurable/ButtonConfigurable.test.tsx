import { render, screen, waitFor } from '@testing-library/react'
import ButtonConfigurable from '@/components/ButtonConfigurable'
import {
  VARIANT as BUTTON_VARIANT,
  SIZE as BUTTON_SIZE,
} from '@/components/Button'
import {
  WRAPPER_SIZE,
  VARIANT as CONFIGURATION_VARIANT,
} from './_components/Configuration'

describe('ButtonConfigurable', () => {
  test('renders Button', () => {
    render(<ButtonConfigurable>Button</ButtonConfigurable>)

    expect(screen.getByRole('button', { name: 'Button' })).toBeInTheDocument()
  })

  test('renders Configuration', () => {
    render(<ButtonConfigurable>Button</ButtonConfigurable>)

    expect(screen.getByRole('button', { name: 'Config' })).toBeInTheDocument()
  })

  test('renders Configuration with default size', () => {
    render(<ButtonConfigurable>Button</ButtonConfigurable>)

    expect(
      screen.getByRole('button', { name: 'Config' }).parentElement
    ).toHaveClass(WRAPPER_SIZE.default)
  })

  test('renders Configuration with default primary variant', () => {
    render(<ButtonConfigurable>Button</ButtonConfigurable>)

    expect(
      screen.getByRole('button', { name: 'Config' }).parentElement
    ).toHaveClass(CONFIGURATION_VARIANT.primary)
  })

  test.each(['small', 'default', 'large'] as const)(
    'renders Configuration with %s size',
    (size) => {
      render(<ButtonConfigurable size={size}>Button</ButtonConfigurable>)

      expect(
        screen.getByRole('button', { name: 'Config' }).parentElement
      ).toHaveClass(WRAPPER_SIZE[size])
    }
  )

  test.each(['primary', 'secondary', 'success', 'danger', 'warning'] as const)(
    'renders Configuration with %s variant',
    (variant) => {
      render(<ButtonConfigurable variant={variant}>Button</ButtonConfigurable>)

      expect(
        screen.getByRole('button', { name: 'Config' }).parentElement
      ).toHaveClass(CONFIGURATION_VARIANT[variant])
    }
  )

  test('renders Button with default size', () => {
    render(<ButtonConfigurable>Button</ButtonConfigurable>)

    expect(screen.getByRole('button', { name: 'Button' })).toHaveClass(
      BUTTON_SIZE.default
    )
  })

  test.each(['small', 'default', 'large'] as const)(
    'renders Button with %s size',
    (size) => {
      render(<ButtonConfigurable size={size}>Button</ButtonConfigurable>)

      expect(screen.getByRole('button', { name: 'Button' })).toHaveClass(
        BUTTON_SIZE[size]
      )
    }
  )

  test('renders Button with default primary variant', () => {
    render(<ButtonConfigurable>Button</ButtonConfigurable>)

    expect(screen.getByRole('button', { name: 'Button' })).toHaveClass(
      BUTTON_VARIANT.primary
    )
  })

  test.each(['primary', 'secondary', 'success', 'danger', 'warning'] as const)(
    'renders Button with %s variant',
    (variant) => {
      render(<ButtonConfigurable variant={variant}>Button</ButtonConfigurable>)

      expect(screen.getByRole('button', { name: 'Button' })).toHaveClass(
        BUTTON_VARIANT[variant]
      )
    }
  )

  test('renders IconButton', async () => {
    render(<ButtonConfigurable icon="beer" label="Beer" />)

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Beer' })).toBeInTheDocument()
    )
  })

  test('renders IconButton with default size', async () => {
    render(<ButtonConfigurable icon="beer" label="Beer" />)

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Beer' })).toHaveClass(
        BUTTON_SIZE.default
      )
    )
  })

  test.each(['small', 'default', 'large'] as const)(
    'renders IconButton with %s size',
    async (size) => {
      render(<ButtonConfigurable size={size} icon="beer" label="Beer" />)
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Beer' })).toHaveClass(
          BUTTON_SIZE[size]
        )
      })
    }
  )

  test('render IconButton with default primary variant', async () => {
    render(<ButtonConfigurable icon="beer" label="Beer" />)

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Beer' })).toHaveClass(
        BUTTON_VARIANT.primary
      )
    )
  })

  test.each(['primary', 'secondary', 'success', 'danger', 'warning'] as const)(
    'renders IconButton with %s variant',
    async (variant) => {
      render(<ButtonConfigurable variant={variant} icon="beer" label="Beer" />)

      await waitFor(() =>
        expect(screen.getByRole('button', { name: 'Beer' })).toHaveClass(
          BUTTON_VARIANT[variant]
        )
      )
    }
  )
})
