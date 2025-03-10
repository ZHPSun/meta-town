import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EditProfile from './EditProfile'

describe('EditProfile', () => {
  test('renders button', () => {
    render(<EditProfile />)

    expect(screen.getByRole('button', { name: 'S.T.' })).toBeInTheDocument()
  })

  test('does not render modal initially', () => {
    render(<EditProfile />)

    expect(
      screen.queryByRole('heading', { name: 'Edit Your Profile' })
    ).not.toBeInTheDocument()
  })

  test('opens the modal when button is clicked', async () => {
    const user = userEvent.setup()

    render(<EditProfile />)

    await user.click(screen.getByRole('button', { name: 'S.T.' }))

    expect(
      screen.getByRole('heading', { name: 'Edit Your Profile' })
    ).toBeInTheDocument()
  })

  test('closes the modal when close button is clicked', async () => {
    const user = userEvent.setup()

    render(<EditProfile />)

    await user.click(screen.getByRole('button', { name: 'S.T.' }))
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(
      screen.queryByRole('heading', { name: 'Edit Your Profile' })
    ).not.toBeInTheDocument()
  })
})
