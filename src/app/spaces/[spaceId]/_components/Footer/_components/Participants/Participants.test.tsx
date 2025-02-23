import { render, screen } from '@testing-library/react'
import Participants from './Participants'

describe('Participants', () => {
  test('renders Button', () => {
    render(<Participants count={0} status="online" />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  test('renders online status', () => {
    render(<Participants count={0} status="online" />)

    expect(
      screen.getByLabelText('Participant Status: Available')
    ).toBeInTheDocument()
  })

  test('renders offline status', () => {
    render(<Participants count={0} status="offline" />)

    expect(
      screen.getByLabelText('Participant Status: Unavailable')
    ).toBeInTheDocument()
  })

  test('renders user count', () => {
    render(<Participants count={10} status="online" />)

    expect(screen.getByText(10)).toBeInTheDocument()
  })
})
