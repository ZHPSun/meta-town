import { render, screen } from '@testing-library/react'
import Row from './Row'

describe('Row', () => {
  test('renders row', () => {
    render(<Row y={3} columns={40} />)

    expect(screen.getByRole('row', { name: '3' })).toBeInTheDocument()
  })

  test('renders gridcells', () => {
    render(<Row y={3} columns={40} />)

    expect(screen.getAllByRole('gridcell')).toHaveLength(40)
  })
})
