import { render, screen } from '@testing-library/react'
import Actions from './Actions'

describe('Actions', () => {
  test('renders users button', () => {
    render(<Actions />)

    expect(screen.getByRole('button', { name: 'S.T.' })).toBeInTheDocument()
  })

  test('renders Resources button', () => {
    render(<Actions />)

    expect(
      screen.getByRole('button', { name: 'Resources' })
    ).toBeInTheDocument()
  })

  test('renders i18n button', () => {
    render(<Actions />)

    expect(screen.getByRole('button', { name: 'English' })).toBeInTheDocument()
  })

  test('renders Create Spaces button', () => {
    render(<Actions />)

    expect(
      screen.getByRole('button', { name: 'Create Spaces' })
    ).toBeInTheDocument()
  })
})
