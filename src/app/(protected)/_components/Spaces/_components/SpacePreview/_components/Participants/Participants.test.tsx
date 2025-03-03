import { render, screen } from '@testing-library/react'
import Participants from './Participants'
import { STATUS } from './_components/Indicator'

describe('Participant', () => {
  test('render Indicator', () => {
    render(<Participants count={0} />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  test('renders the count number', () => {
    render(<Participants count={0} />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  test('renders the online Indicator when count number is 0', () => {
    render(<Participants count={0} />)
    expect(screen.getByRole('status')).toHaveClass(STATUS.offline)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  test('renders the online Indicator when count number is large than 0', () => {
    render(<Participants count={1} />)
    expect(screen.getByRole('status')).toHaveClass(STATUS.online)
    expect(screen.getByText('1')).toBeInTheDocument()
  })
})
