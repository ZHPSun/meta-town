import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { VARIANT } from '@/components/Button'
import Footer from './Footer'

describe('Footer', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('renders the Main menu button', () => {
    render(<Footer />)

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
    render(<Footer />)

    await user.click(await screen.findByRole('button', { name: 'Camera' }))

    expect(screen.getByLabelText('Video Feed')).toBeInTheDocument()
  })

  test('renders video ButtonConfigurable', async () => {
    render(<Footer />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Camera' })).toBeInTheDocument()
    })
  })

  test('renders danger Button with camera off', async () => {
    render(<Footer />)

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
    render(<Footer />)

    await user.click(await screen.findByRole('button', { name: 'Camera' }))

    expect(await screen.findByRole('button', { name: 'Camera' })).toHaveClass(
      VARIANT.success
    )
  })

  test('renders microphone ButtonConfigurable', async () => {
    render(<Footer />)

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Microphone' })
      ).toBeInTheDocument()
    })
  })

  test('renders danger Button with mic off', async () => {
    render(<Footer />)

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
    render(<Footer />)

    await user.click(await screen.findByRole('button', { name: 'Microphone' }))

    expect(
      await screen.findByRole('button', { name: 'Microphone' })
    ).toHaveClass(VARIANT.success)
  })

  test('renders the Chat button', async () => {
    render(<Footer />)

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Chat' })).toBeInTheDocument()
    )
  })

  test('renders participants', () => {
    render(<Footer />)

    expect(
      screen.getByLabelText('Participant Status: Available')
    ).toBeInTheDocument()
  })

  test('renders the Leave space button', async () => {
    render(<Footer />)

    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Leave space' })
      ).toBeInTheDocument()
    )
  })
})
