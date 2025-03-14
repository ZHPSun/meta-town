import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from './Header'

describe('Header', () => {
  test('renders copy link button', async () => {
    render(<Header onEditSpace={vi.fn()} />)

    expect(
      await screen.findByRole('button', { name: 'Copy invite link' })
    ).toBeInTheDocument()
  })

  test('renders lock meeting area button', async () => {
    render(<Header onEditSpace={vi.fn()} />)

    expect(
      await screen.findByRole('button', { name: 'Lock meeting area' })
    ).toBeInTheDocument()
  })

  test('renders all-hands button', () => {
    render(<Header onEditSpace={vi.fn()} />)

    expect(
      screen.getByRole('button', { name: 'All-Hands' })
    ).toBeInTheDocument()
  })

  test('renders meeting view button', () => {
    render(<Header onEditSpace={vi.fn()} />)

    expect(
      screen.getByRole('button', { name: 'Meeting view' })
    ).toBeInTheDocument()
  })

  test('calls onEditSpace when edit space button is clicked', async () => {
    const onEditSpace = vi.fn()

    const user = userEvent.setup()

    render(<Header onEditSpace={onEditSpace} />)

    expect(
      await screen.findByRole('button', { name: 'More options' })
    ).toBeInTheDocument()

    await user.click(
      await screen.findByRole('button', { name: 'More options' })
    )

    expect(
      screen.getByRole('button', { name: 'Edit space' })
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Edit space' }))

    expect(onEditSpace).toHaveBeenCalled()
  })
})
