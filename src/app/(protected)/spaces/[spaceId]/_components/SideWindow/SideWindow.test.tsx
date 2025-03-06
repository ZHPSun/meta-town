import { render, screen, waitFor } from '@testing-library/react'
import { UserPlus, Contact } from 'lucide-react'
import Button from '@/components/Button'
import SideWindow from './SideWindow'

describe('SideWindow', () => {
  test('renders header', () => {
    render(
      <SideWindow
        onClose={vi.fn()}
        header={
          <>
            <span>Participants</span>
            <div className="flex">
              <Button>
                <UserPlus aria-label="Add user" />
              </Button>
              <Button>
                <Contact aria-label="Contact" />
              </Button>
            </div>
          </>
        }
      >
        Content
      </SideWindow>
    )
    expect(screen.getByText('Participants')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Add user' })).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Contact' })).toBeInTheDocument()
  })

  test('renders close button', async () => {
    render(
      <SideWindow onClose={vi.fn()} header="Side Window">
        Content
      </SideWindow>
    )

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
    )
  })

  test('renders children', () => {
    render(
      <SideWindow onClose={vi.fn()} header="Side Window">
        Content
      </SideWindow>
    )

    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
