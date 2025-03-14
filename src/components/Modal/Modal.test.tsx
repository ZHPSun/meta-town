import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from './Modal'

describe('Modal', () => {
  test('renders modal with provided children', () => {
    render(
      <Modal onClose={vi.fn()} title="Test Title">
        Modal Content
      </Modal>
    )

    expect(
      screen.getByRole('heading', { name: 'Test Title' })
    ).toBeInTheDocument()
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  test('renders overlay', () => {
    render(
      <Modal onClose={vi.fn()} title="Test Title">
        Test
      </Modal>
    )

    expect(screen.getByRole('presentation')).toBeInTheDocument()
  })

  test('renders Header', () => {
    render(
      <Modal onClose={vi.fn()} title="Test Title">
        Test
      </Modal>
    )

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  test('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()

    const user = userEvent.setup()

    render(
      <Modal onClose={onClose} title="Test Title">
        Test
      </Modal>
    )

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalled()
  })

  test('renders nothing when there is no portal root', () => {
    // eslint-disable-next-line testing-library/no-node-access
    document.body.removeChild(document.getElementById('modal-root')!)

    const { container } = render(
      <Modal onClose={vi.fn()} title="Test Title">
        Test
      </Modal>
    )
    expect(container).toBeEmptyDOMElement()
  })
})
