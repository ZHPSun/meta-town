import { render, screen, waitFor } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  test('renders the Main menu button', () => {
    render(<Footer />)

    expect(screen.getByRole('link', { name: 'Meta Town' })).toBeInTheDocument()
  })

  test('renders video ButtonConfigurable', async () => {
    render(<Footer />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Camera' })).toBeInTheDocument()
    })
  })

  test('renders microphone ButtonConfigurable', async () => {
    render(<Footer />)

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Microphone' })
      ).toBeInTheDocument()
    })
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
