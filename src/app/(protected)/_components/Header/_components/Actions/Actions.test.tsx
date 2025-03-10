import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Actions from './Actions'

describe('Actions', () => {
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

  test('opens language dropdown when trigger is clicked', async () => {
    const user = userEvent.setup()

    render(<Actions />)

    await user.click(screen.getByRole('button', { name: 'English' }))

    expect(
      within(screen.getByRole('menu')).getByRole('button', { name: 'English' })
    ).toBeInTheDocument()

    expect(
      within(screen.getByRole('menu')).getByRole('button', {
        name: 'Chinese',
      })
    ).toBeInTheDocument()

    expect(
      within(screen.getByRole('menu')).getByRole('button', { name: '日本語' })
    ).toBeInTheDocument()
  })

  test('renders Create Spaces button', () => {
    render(<Actions />)

    expect(
      screen.getByRole('button', { name: 'Create Spaces' })
    ).toBeInTheDocument()
  })

  test('renders Edit Profile button', () => {
    render(<Actions />)

    expect(screen.getByRole('button', { name: 'S.T.' })).toBeInTheDocument()
  })
})
