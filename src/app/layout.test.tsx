import { render, screen } from '@testing-library/react'
import RootLayout from './layout'

describe('RootLayout', () => {
  test('sets the correct lang attribute and renders children', () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
      { container: document }
    )

    expect(document.documentElement).toHaveAttribute('lang', 'en')
    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })
})
