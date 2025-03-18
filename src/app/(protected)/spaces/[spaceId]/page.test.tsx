import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useParams } from 'next/navigation'
import { VARIANT } from '@/components/Button'
import useSpace from '@/hooks/useSpace'
import useUser from '@/hooks/useUser'
import useSyncSpacePresence from './_hooks/useSyncSpacePresence'
import Space from './page'

vi.mock('@/hooks/useSpace')
const useSpaceMock = vi.mocked(useSpace)

vi.mock('@/hooks/useUser')
const useUserMock = vi.mocked(useUser)

vi.mock('next/navigation')
const mockParamsMock = vi.mocked(useParams)

vi.mock('./_hooks/useSyncSpacePresence')

describe('Space', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('renders loading when useSpace is loading', () => {
    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      isLoading: true,
      data: null,
    } as unknown as ReturnType<typeof useSpace>)

    render(<Space />)

    expect(
      screen.getByText('Please wait, we are syncing the metaverse...')
    ).toBeInTheDocument()
  })

  test('renders not found when useSpace returns null', () => {
    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      isLoading: false,
      data: null,
    } as unknown as ReturnType<typeof useSpace>)

    render(<Space />)

    expect(screen.getByText('Space not found')).toBeInTheDocument()
  })

  test('calls useSpace with spaceId from params', () => {
    const spaceId = 'SPACE_ID'

    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId,
    })

    useSpaceMock.mockReturnValue({
      isLoading: false,
      data: {},
    } as unknown as ReturnType<typeof useSpace>)

    render(<Space />)

    expect(useSpace).toHaveBeenCalledWith(spaceId)
  })

  test('renders Header', () => {
    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      isLoading: false,
      data: { id: 'SPACE_ID', name: 'All-Hands' },
    } as unknown as ReturnType<typeof useSpace>)

    render(<Space />)

    expect(
      screen.getByRole('button', { name: 'All-Hands' })
    ).toBeInTheDocument()
  })

  test('calls useSyncSpacePresence hook when rendering Space page', () => {
    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      isLoading: false,
      data: { id: 'SPACE_ID', name: 'All-Hands' },
    } as unknown as ReturnType<typeof useSpace>)

    render(<Space />)

    expect(useSyncSpacePresence).toHaveBeenCalled()
  })

  test('does not render meeting view initially', () => {
    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      isLoading: false,
      data: { id: 'SPACE_ID', name: 'All-Hands' },
    } as unknown as ReturnType<typeof useSpace>)

    render(<Space />)

    expect(
      screen.queryByRole('presentation', { name: 'Meeting' })
    ).not.toBeInTheDocument()
  })

  test('renders the meeting view when meeting view button is clicked', async () => {
    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      isLoading: false,
      data: { id: 'SPACE_ID', name: 'All-Hands' },
    } as unknown as ReturnType<typeof useSpace>)

    const user = userEvent.setup()

    render(<Space />)

    await user.click(screen.getByRole('button', { name: 'Meeting view' }))

    expect(
      screen.getByRole('presentation', { name: 'Meeting' })
    ).toBeInTheDocument()
  })

  test('closes meeting view when meeting view button is clicked if meeting view already opened', async () => {
    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      isLoading: false,
      data: { id: 'SPACE_ID', name: 'All-Hands' },
    } as unknown as ReturnType<typeof useSpace>)

    const user = userEvent.setup()

    render(<Space />)

    await user.click(screen.getByRole('button', { name: 'Meeting view' }))

    await user.click(screen.getByRole('button', { name: 'Meeting view' }))

    expect(
      screen.queryByRole('presentation', { name: 'Meeting' })
    ).not.toBeInTheDocument()
  })

  test('renders Stage', () => {
    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      isLoading: false,
      data: { id: 'SPACE_ID', name: 'All-Hands' },
    } as unknown as ReturnType<typeof useSpace>)

    render(<Space />)

    expect(screen.getByRole('grid', { name: 'Tiled Map' })).toBeInTheDocument()
  })

  test('renders Footer', () => {
    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      isLoading: false,
      data: { id: 'SPACE_ID', name: 'All-Hands' },
    } as unknown as ReturnType<typeof useSpace>)

    render(<Space />)

    expect(
      screen.getByLabelText('Participant Status: Available')
    ).toBeInTheDocument()
  })

  test('toggles ChatSideWindow', async () => {
    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      isLoading: false,
      data: { id: 'SPACE_ID', name: 'All-Hands' },
    } as unknown as ReturnType<typeof useSpace>)

    const user = userEvent.setup()

    render(<Space />)

    await user.click(await screen.findByRole('button', { name: 'Chat' }))

    expect(
      screen.getByRole('region', { name: 'Chat Side Window' })
    ).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Chat' })).toHaveClass(
      VARIANT.secondary
    )

    await user.click(await screen.findByRole('button', { name: 'Chat' }))

    expect(
      screen.queryByRole('region', { name: 'Chat Side Window' })
    ).not.toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Chat' })).toHaveClass(
      VARIANT.naked
    )
  })

  test('closes ChatSideWindow on click side window close button', async () => {
    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      isLoading: false,
      data: { id: 'SPACE_ID', name: 'All-Hands' },
    } as unknown as ReturnType<typeof useSpace>)

    const user = userEvent.setup()

    render(<Space />)

    await user.click(await screen.findByRole('button', { name: 'Chat' }))

    expect(
      screen.getByRole('region', { name: 'Chat Side Window' })
    ).toBeInTheDocument()

    await user.click(await screen.findByRole('button', { name: 'Close' }))

    expect(
      screen.queryByRole('region', { name: 'Chat Side Window' })
    ).not.toBeInTheDocument()
  })

  test('toggles ParticipantsSideWindow', async () => {
    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      isLoading: false,
      data: { id: 'SPACE_ID', name: 'All-Hands' },
    } as unknown as ReturnType<typeof useSpace>)

    const user = userEvent.setup()

    render(<Space />)

    await user.click(
      await screen.findByRole('button', { name: 'Participants' })
    )

    expect(
      screen.getByRole('region', { name: 'Participants Side Window' })
    ).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Participants' })).toHaveClass(
      VARIANT.secondary
    )

    await user.click(
      await screen.findByRole('button', { name: 'Participants' })
    )

    expect(
      screen.queryByRole('region', { name: 'Participants Side Window' })
    ).not.toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Participants' })).toHaveClass(
      VARIANT.naked
    )
  })

  test('closes ParticipantsSideWindow on click side window close button', async () => {
    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      isLoading: false,
      data: { id: 'SPACE_ID', name: 'All-Hands' },
    } as unknown as ReturnType<typeof useSpace>)

    const user = userEvent.setup()

    render(<Space />)

    await user.click(
      await screen.findByRole('button', { name: 'Participants' })
    )

    expect(
      screen.getByRole('region', { name: 'Participants Side Window' })
    ).toBeInTheDocument()

    await user.click(await screen.findByRole('button', { name: 'Close' }))

    expect(
      screen.queryByRole('region', { name: 'Participants Side Window' })
    ).not.toBeInTheDocument()
  })

  test('renders stage configuration', async () => {
    useUserMock.mockReturnValue({
      data: {
        id: 'ID',
        displayName: 'John Doe',
        avatar: 'dog',
      },
    } as unknown as ReturnType<typeof useUser>)

    mockParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    })

    useSpaceMock.mockReturnValue({
      isLoading: false,
      data: { id: 'SPACE_ID', name: 'All-Hands' },
    } as unknown as ReturnType<typeof useSpace>)

    const user = userEvent.setup()

    render(<Space />)

    await user.click(
      await screen.findByRole('button', { name: 'More options' })
    )

    await user.click(screen.getByRole('button', { name: 'Edit space' }))

    expect(
      screen.getByRole('dialog', { name: 'Configuration' })
    ).toBeInTheDocument()

    await user.click(await screen.findByRole('button', { name: 'Close' }))

    expect(
      screen.queryByRole('dialog', { name: 'Configuration' })
    ).not.toBeInTheDocument()
  })
})
