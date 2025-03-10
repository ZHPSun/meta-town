import { render, screen, within } from '@testing-library/react'
import ColorPicker, { COLORS } from './ColorPicker'

describe('ColorPicker', () => {
  test.each(Object.keys(COLORS))('renders %s color Button', (color) => {
    render(<ColorPicker value="gray" onSelect={vi.fn()} />)

    expect(screen.getByRole('button', { name: color })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: color })).toHaveClass(
      COLORS[color]
    )
  })

  test('renders CircleCheck for selected color', () => {
    render(<ColorPicker value="gray" onSelect={vi.fn()} />)

    expect(
      within(screen.getByRole('button', { name: 'gray' })).getByLabelText(
        'gray Selected'
      )
    ).toBeInTheDocument()
  })

  test('renders Circle for unselected color', () => {
    render(<ColorPicker value="gray" onSelect={vi.fn()} />)

    expect(
      within(screen.getByRole('button', { name: 'pink' })).getByLabelText(
        'pink Option'
      )
    ).toBeInTheDocument()
  })

  test('calls onSelect with color when clicked', () => {
    const onSelect = vi.fn()

    render(<ColorPicker value="gray" onSelect={onSelect} />)

    const button = screen.getByRole('button', { name: 'pink' })
    button.click()

    expect(onSelect).toHaveBeenCalledWith('pink')
  })
})
