import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useUser from '@/hooks/useUser'
import Form from './Form'
import createUser from './_utils/createUser'

vi.mock('@/hooks/useUser')
const useUserMock = vi.mocked(useUser)

vi.mock('./_utils/createUser')

describe('Form', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('renders form', () => {
    useUserMock.mockReturnValue({
      mutate: vi.fn(),
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    render(<Form />)

    expect(screen.getByPlaceholderText('Display name')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Create user' })
    ).toBeInTheDocument()
  })

  test('calls useUser', () => {
    useUserMock.mockReturnValue({
      mutate: vi.fn(),
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    render(<Form />)

    expect(useUserMock).toHaveBeenCalled()
  })

  test('calls createUser on form submit', async () => {
    useUserMock.mockReturnValue({
      mutate: vi.fn().mockImplementation((fn: () => void) => fn()),
      isLoading: false,
    } as unknown as ReturnType<typeof useUser>)

    const user = userEvent.setup()

    render(<Form />)

    await user.type(screen.getByPlaceholderText('Display name'), 'John Doe')
    await user.click(screen.getByRole('button', { name: 'Create user' }))

    expect(createUser).toHaveBeenCalledWith({
      displayName: 'John Doe',
      avatar: 'dog',
    })
  })

  test('renders disabled button when loading', () => {
    useUserMock.mockReturnValue({
      mutate: vi.fn(),
      isLoading: true,
    } as unknown as ReturnType<typeof useUser>)

    render(<Form />)

    expect(screen.getByRole('button', { name: 'Create user' })).toBeDisabled()
  })
})
