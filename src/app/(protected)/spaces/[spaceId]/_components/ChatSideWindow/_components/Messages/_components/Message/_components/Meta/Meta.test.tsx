import { render, screen } from '@testing-library/react'
import Meta from './Meta'

describe('Meta', () => {
  test('renders name', () => {
    render(<Meta name="Display Name" time="4 minutes ago" />)

    expect(screen.getByText('Display Name')).toBeInTheDocument()
  })

  test('renders time', () => {
    render(<Meta name="Display Name" time="4 minutes ago" />)

    expect(screen.getByText('4 minutes ago')).toBeInTheDocument()
  })
})
