import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { VARIANT } from '@/components/Button'
import Space from './page'

describe('Space', () => {
  test('renders Header', () => {
    render(<Space />)

    expect(
      screen.getByRole('button', { name: 'All-Hands' })
    ).toBeInTheDocument()
  })

  test('renders Stage', () => {
    render(<Space />)

    expect(screen.getByRole('grid', { name: 'Tiled Map' })).toBeInTheDocument()
  })

  test('renders Footer', () => {
    render(<Space />)

    expect(
      screen.getByLabelText('Participant Status: Available')
    ).toBeInTheDocument()
  })

  test('toggles ChatSideWindow', async () => {
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

  test('renders Meeting', () => {
    render(<Space />)

    expect(screen.getByRole('region', { name: 'Map View' })).toBeInTheDocument()
  })
})
