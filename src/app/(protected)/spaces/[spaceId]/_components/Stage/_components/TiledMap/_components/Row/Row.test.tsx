import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  test('passes onMouseOver to gridcells', async () => {
    const onMouseOver = vi.fn()
    const user = userEvent.setup()

    render(<Row y={3} columns={2} onMouseOver={onMouseOver} />)

    await user.hover(screen.getByRole('gridcell', { name: '0, 3' }))

    expect(onMouseOver).toHaveBeenCalledWith(0, 3)
  })
})
