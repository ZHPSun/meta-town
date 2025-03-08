import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Meeting, { VIEW } from './Meeting'

describe('Meeting', () => {
  test('renders map view IconButton', async () => {
    render(<Meeting />)

    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Map view' })
      ).toBeInTheDocument()
    )
  })

  test('renders meeting view IconButton', async () => {
    render(<Meeting />)

    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Meeting view' })
      ).toBeInTheDocument()
    )
  })

  test('renders MapView and does not render MeetingView by default', () => {
    render(<Meeting />)

    expect(screen.getByRole('region', { name: 'Map View' })).toBeInTheDocument()
    expect(
      screen.queryByRole('region', { name: 'Meeting View' })
    ).not.toBeInTheDocument()

    expect(screen.getByRole('presentation', { name: 'Meeting' })).toHaveClass(
      VIEW.map
    )
  })

  test('renders MeetingView when meeting view button is clicked', async () => {
    const user = userEvent.setup()
    render(<Meeting />)

    await waitFor(() =>
      user.click(screen.getByRole('button', { name: 'Meeting view' }))
    )

    expect(
      screen.getByRole('region', { name: 'Meeting View' })
    ).toBeInTheDocument()

    expect(
      screen.queryByRole('region', { name: 'Map View' })
    ).not.toBeInTheDocument()

    expect(screen.getByRole('presentation', { name: 'Meeting' })).toHaveClass(
      VIEW.meeting
    )
  })

  test('renders MapView when map view button is clicked', async () => {
    const user = userEvent.setup()
    render(<Meeting />)

    await waitFor(() =>
      user.click(screen.getByRole('button', { name: 'Meeting view' }))
    )

    await waitFor(() =>
      user.click(screen.getByRole('button', { name: 'Map view' }))
    )
    expect(screen.getByRole('region', { name: 'Map View' })).toBeInTheDocument()
    expect(
      screen.queryByRole('region', { name: 'Meeting View' })
    ).not.toBeInTheDocument()
  })
})
