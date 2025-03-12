import { render, screen } from '@testing-library/react'
import Character from './Character'

describe('Character', () => {
  test('renders nothing if avatar is not legit Lucide icon name', () => {
    const { container } = render(<Character avatar="some invalid name" />)

    expect(container).toBeEmptyDOMElement()
  })

  test('renders avatar as character', async () => {
    render(<Character avatar="dog" />)

    expect(await screen.findByLabelText('dog')).toBeInTheDocument()
  })
})
