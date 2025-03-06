import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { VARIANT } from '@/components/Button'
import Footer from './Footer'

describe('Footer', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('renders the Main menu button', () => {
    render(<Footer onChatClick={vi.fn()} onParticipantsClick={vi.fn()} />)

    expect(screen.getByRole('link', { name: 'Meta Town' })).toBeInTheDocument()
  })

  test('renders Camera', async () => {
    vi.stubGlobal('navigator', {
      mediaDevices: {
        getUserMedia: vi.fn().mockResolvedValue({
          getTracks: (): MediaStreamTrack[] => [],
        } as unknown as MediaStream),
      },
    })

    const user = userEvent.setup()
    render(<Footer onChatClick={vi.fn()} onParticipantsClick={vi.fn()} />)

    await user.click(await screen.findByRole('button', { name: 'Camera' }))

    expect(screen.getByLabelText('Video Feed')).toBeInTheDocument()
  })

  test('renders video ButtonConfigurable', async () => {
    render(<Footer onChatClick={vi.fn()} onParticipantsClick={vi.fn()} />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Camera' })).toBeInTheDocument()
    })
  })

  test('renders danger Button with camera off', async () => {
    render(<Footer onChatClick={vi.fn()} onParticipantsClick={vi.fn()} />)

    expect(await screen.findByRole('button', { name: 'Camera' })).toHaveClass(
      VARIANT.danger
    )
  })

  test('renders success Button with camera on', async () => {
    vi.stubGlobal('navigator', {
      mediaDevices: {
        getUserMedia: vi.fn().mockResolvedValue({
          getTracks: (): MediaStreamTrack[] => [],
        } as unknown as MediaStream),
      },
    })

    const user = userEvent.setup()
    render(<Footer onChatClick={vi.fn()} onParticipantsClick={vi.fn()} />)

    await user.click(await screen.findByRole('button', { name: 'Camera' }))

    expect(await screen.findByRole('button', { name: 'Camera' })).toHaveClass(
      VARIANT.success
    )
  })

  test('renders microphone ButtonConfigurable', async () => {
    render(<Footer onChatClick={vi.fn()} onParticipantsClick={vi.fn()} />)

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Microphone' })
      ).toBeInTheDocument()
    })
  })

  test('renders danger Button with mic off', async () => {
    render(<Footer onChatClick={vi.fn()} onParticipantsClick={vi.fn()} />)

    expect(
      await screen.findByRole('button', { name: 'Microphone' })
    ).toHaveClass(VARIANT.danger)
  })

  test('renders success Button with mic on', async () => {
    vi.stubGlobal('navigator', {
      mediaDevices: {
        getUserMedia: vi.fn().mockResolvedValue({
          getTracks: (): MediaStreamTrack[] => [],
        } as unknown as MediaStream),
      },
    })

    const user = userEvent.setup()
    render(<Footer onChatClick={vi.fn()} onParticipantsClick={vi.fn()} />)

    await user.click(await screen.findByRole('button', { name: 'Microphone' }))

    expect(
      await screen.findByRole('button', { name: 'Microphone' })
    ).toHaveClass(VARIANT.success)
  })

  test('renders Chat button', async () => {
    render(<Footer onChatClick={vi.fn()} onParticipantsClick={vi.fn()} />)

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Chat' })).toHaveClass(
        VARIANT.naked
      )
    )
  })

  test('renders secondary Button with isChatActive', async () => {
    render(
      <Footer
        isChatActive
        onChatClick={vi.fn()}
        onParticipantsClick={vi.fn()}
      />
    )

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Chat' })).toHaveClass(
        VARIANT.secondary
      )
    )
  })

  test('calls onChatClick when Chat button is clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(
      <Footer onChatClick={handleClick} onParticipantsClick={handleClick} />
    )

    await waitFor(() =>
      user.click(screen.getByRole('button', { name: 'Chat' }))
    )

    expect(handleClick).toBeCalled()
  })

  test('renders participants button', () => {
    render(<Footer onChatClick={vi.fn()} onParticipantsClick={vi.fn()} />)

    expect(
      screen.getByRole('button', { name: 'Participants' })
    ).toBeInTheDocument()
  })

  test('renders secondary Button with isParticipantsActive', async () => {
    render(
      <Footer
        isParticipantsActive
        onChatClick={vi.fn()}
        onParticipantsClick={vi.fn()}
      />
    )

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Participants' })).toHaveClass(
        VARIANT.secondary
      )
    )
  })

  test('calls onParticipantsClick when participants button is clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(
      <Footer onChatClick={handleClick} onParticipantsClick={handleClick} />
    )

    await waitFor(() =>
      user.click(screen.getByRole('button', { name: 'Participants' }))
    )

    expect(handleClick).toBeCalled()
  })

  test('renders the Leave space button', async () => {
    render(<Footer onChatClick={vi.fn()} onParticipantsClick={vi.fn()} />)

    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Leave space' })
      ).toBeInTheDocument()
    )
  })
})
