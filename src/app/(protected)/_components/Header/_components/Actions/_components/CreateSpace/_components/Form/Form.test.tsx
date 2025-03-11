import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useUser from '@/hooks/useUser'
import createSpace from './_utils/createSpace'
import Form from './Form'

vi.mock('./_utils/createSpace')
const createSpaceMock = vi.mocked(createSpace)

vi.mock('@/hooks/useUser')
const useUserMock = vi.mocked(useUser)

describe('Form', () => {
  test('renders Form', () => {
    useUserMock.mockReturnValue({
      data: { id: 'AUTH_ID' },
    } as unknown as ReturnType<typeof useUser>)

    render(<Form />)

    expect(screen.getByLabelText('Space Name:')).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Create Space' })
    ).toBeInTheDocument()
  })

  test('does not call createSpace while space name is empty', async () => {
    useUserMock.mockReturnValue({
      data: { id: 'AUTH_ID' },
    } as unknown as ReturnType<typeof useUser>)

    const user = userEvent.setup()
    render(<Form />)
    const input = screen.getByRole('textbox', { name: 'Space Name:' })
    await user.type(input, ' ')
    await user.clear(input)

    await user.click(screen.getByRole('button', { name: 'Create Space' }))

    expect(createSpaceMock).not.toHaveBeenCalled()
  })

  test('renders nothing when user is null', () => {
    useUserMock.mockReturnValue({
      data: null,
    } as unknown as ReturnType<typeof useUser>)
    const { container } = render(<Form />)

    expect(container).toBeEmptyDOMElement()
  })

  test('calls createSpace on form submit', async () => {
    const AUTH_ID = 'AUTH_ID'
    useUserMock.mockReturnValue({
      data: { id: AUTH_ID },
    } as unknown as ReturnType<typeof useUser>)
    const user = userEvent.setup()
    render(<Form />)

    await user.type(
      screen.getByRole('textbox', { name: 'Space Name:' }),
      'test'
    )
    await user.click(screen.getByRole('button', { name: 'Create Space' }))

    expect(createSpaceMock).toHaveBeenCalledWith({
      name: 'test',
      ownerId: AUTH_ID,
    })
  })

  test('renders loading spinner when createSpace is in progress', async () => {
    useUserMock.mockReturnValue({
      data: { id: 'AUTH_ID' },
    } as unknown as ReturnType<typeof useUser>)
    const user = userEvent.setup()
    createSpaceMock.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    )
    render(<Form />)
    await user.type(
      screen.getByRole('textbox', { name: 'Space Name:' }),
      'test'
    )
    await user.click(screen.getByRole('button', { name: 'Create Space' }))

    expect(screen.getByRole('button', { name: 'Loading' })).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Loading' })).toBeDisabled()

    await waitFor(() => {
      expect(createSpaceMock).toHaveBeenCalled()
    })
  })
})
