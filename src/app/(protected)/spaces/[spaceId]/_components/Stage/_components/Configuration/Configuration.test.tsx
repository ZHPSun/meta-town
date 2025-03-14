import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { VARIANT } from '@/components/Button'
import Configuration from './Configuration'

describe('Configuration', () => {
  test('renders drapable configuration dialog', () => {
    render(<Configuration onClose={vi.fn()} onConfig={vi.fn()} />)

    expect(
      screen.getByRole('dialog', { name: 'Configuration' })
    ).toBeInTheDocument()

    fireEvent.mouseDown(screen.getByRole('dialog', { name: 'Configuration' }), {
      target: screen.getByRole('dialog', { name: 'Configuration' }),
    })

    fireEvent.mouseMove(document, {
      clientX: 50,
      clientY: 100,
    })

    fireEvent.mouseUp(document)

    expect(screen.getByRole('dialog', { name: 'Configuration' })).toHaveStyle(
      'position: fixed; left: 50px; top: 100px'
    )
  })

  test('calls onConfig with walls on click walls config button', async () => {
    const onConfig = vi.fn()

    const user = userEvent.setup()

    render(<Configuration onClose={vi.fn()} onConfig={onConfig} />)

    await user.click(await screen.findByRole('button', { name: 'wall' }))

    expect(onConfig).toHaveBeenCalledWith('walls')
  })

  test('renders walls config button', async () => {
    render(<Configuration onClose={vi.fn()} onConfig={vi.fn()} />)

    expect(
      await screen.findByRole('button', { name: 'wall' })
    ).toBeInTheDocument()

    expect(await screen.findByRole('button', { name: 'wall' })).toHaveClass(
      VARIANT.secondary
    )
  })

  test('renders selected walls config button', async () => {
    render(
      <Configuration onClose={vi.fn()} onConfig={vi.fn()} config="walls" />
    )

    expect(await screen.findByRole('button', { name: 'wall' })).toHaveClass(
      VARIANT.success
    )
  })

  test('calls onClose on click close button', async () => {
    const onClose = vi.fn()

    const user = userEvent.setup()

    render(<Configuration onClose={onClose} onConfig={vi.fn()} />)

    await user.click(await screen.findByRole('button', { name: 'Close' }))

    expect(onClose).toHaveBeenCalled()
  })

  test('renders nothing when there is no portal root', () => {
    // eslint-disable-next-line testing-library/no-node-access
    document.body.removeChild(document.getElementById('modal-root')!)

    const { container } = render(
      <Configuration onClose={vi.fn()} onConfig={vi.fn()} />
    )

    expect(container).toBeEmptyDOMElement()
  })
})
