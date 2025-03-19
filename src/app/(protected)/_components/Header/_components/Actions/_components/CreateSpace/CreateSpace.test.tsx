import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useSessionUser from '@/hooks/useSessionUser'
import createSpace from '@/db/createSpace'
import CreateSpace from './CreateSpace'

vi.mock('@/hooks/useSessionUser')
const useSessionUserMock = vi.mocked(useSessionUser)

vi.mock('@/db/createSpace')
const createSpaceMock = vi.mocked(createSpace)

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
    useSessionUserMock.mockReturnValue({
      data: { id: 'AUTH_ID' },
    } as unknown as ReturnType<typeof useSessionUser>)

    render(<CreateSpace />)

    await userEvent.click(screen.getByRole('button', { name: 'Create Spaces' }))

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  test('triggers then close the modal when button is clicked', async () => {
    useSessionUserMock.mockReturnValue({
      data: { id: 'AUTH_ID' },
    } as unknown as ReturnType<typeof useSessionUser>)

    render(<CreateSpace />)

    await userEvent.click(screen.getByRole('button', { name: 'Create Spaces' }))
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(
      screen.queryByRole('button', { name: 'Close' })
    ).not.toBeInTheDocument()
  })

  test('closes modal when form submit successful', async () => {
    const AUTH_ID = 'AUTH_ID'
    useSessionUserMock.mockReturnValue({
      data: { id: AUTH_ID },
    } as unknown as ReturnType<typeof useSessionUser>)
    createSpaceMock.mockResolvedValue(undefined)
    const user = userEvent.setup()

    render(<CreateSpace />)

    await user.click(screen.getByRole('button', { name: 'Create Spaces' }))

    await user.type(
      screen.getByRole('textbox', { name: 'Space Name:' }),
      'test'
    )
    await user.click(screen.getByRole('button', { name: 'Create Space' }))

    expect(screen.queryByText('Create a new space')).not.toBeInTheDocument()
  })
})
