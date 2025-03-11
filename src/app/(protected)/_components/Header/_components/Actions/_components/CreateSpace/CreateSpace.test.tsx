import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useUser from '@/hooks/useUser'
import CreateSpace from './CreateSpace'

vi.mock('@/hooks/useUser')
const useUserMock = vi.mocked(useUser)

describe('CreateSpace', () => {
  test('renders button', () => {
    render(<CreateSpace />)

    expect(
      screen.getByRole('button', { name: 'Create Spaces' })
    ).toBeInTheDocument()
  })

  test('does not render modal initially', () => {
    render(<CreateSpace />)

    expect(
      screen.queryByRole('button', { name: 'Close' })
    ).not.toBeInTheDocument()
  })

  test('triggers modal when button is clicked', async () => {
    useUserMock.mockReturnValue({
      data: { id: 'AUTH_ID' },
    } as unknown as ReturnType<typeof useUser>)

    render(<CreateSpace />)

    await userEvent.click(screen.getByRole('button', { name: 'Create Spaces' }))

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  test('triggers then close the modal when button is clicked', async () => {
    useUserMock.mockReturnValue({
      data: { id: 'AUTH_ID' },
    } as unknown as ReturnType<typeof useUser>)

    render(<CreateSpace />)

    await userEvent.click(screen.getByRole('button', { name: 'Create Spaces' }))
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(
      screen.queryByRole('button', { name: 'Close' })
    ).not.toBeInTheDocument()
  })
})
