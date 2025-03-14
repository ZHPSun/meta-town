import { render, screen } from '@testing-library/react'
import Row from './Row'

describe('Row', () => {
  test('renders row', () => {
    render(<Row y={3} columns={2} />)

    expect(screen.getByRole('row', { name: '3' })).toBeInTheDocument()
  })

  test('renders gridcells', () => {
    render(<Row y={3} columns={2} />)

    expect(screen.getAllByRole('gridcell')).toHaveLength(2)
  })

  test('passes onEdit to gridcells', () => {
    const onEdit = vi.fn()

    render(<Row y={3} columns={2} onEdit={onEdit} />)

    expect(screen.getAllByRole('button')).toHaveLength(2)
  })
})
