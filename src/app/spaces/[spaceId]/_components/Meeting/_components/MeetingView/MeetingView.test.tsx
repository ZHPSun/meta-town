import { render, screen } from '@testing-library/react'
import MeetingView from './MeetingView'

describe('MeetingView', () => {
  test('renders Meeting View', () => {
    render(<MeetingView />)

    expect(
      screen.getByRole('region', { name: 'Meeting View' })
    ).toBeInTheDocument()
  })
})
