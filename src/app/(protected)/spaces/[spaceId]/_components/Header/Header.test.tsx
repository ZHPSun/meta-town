import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  test('renders copy link button', async () => {
    render(<Header />)

    expect(
      await screen.findByRole('button', { name: 'Copy invite link' })
    ).toBeInTheDocument()
  })

  test('renders lock meeting area button', async () => {
    render(<Header />)

    expect(
      await screen.findByRole('button', { name: 'Lock meeting area' })
    ).toBeInTheDocument()
  })

  test('renders all-hands button', () => {
    render(<Header />)

    expect(
      screen.getByRole('button', { name: 'All-Hands' })
    ).toBeInTheDocument()
  })

  test('renders meeting view button', () => {
    render(<Header />)

    expect(
      screen.getByRole('button', { name: 'Meeting view' })
    ).toBeInTheDocument()
  })

  test('renders more options button', async () => {
    render(<Header />)

    expect(
      await screen.findByRole('button', { name: 'More options' })
    ).toBeInTheDocument()
  })
})
