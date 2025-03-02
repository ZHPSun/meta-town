import { render, screen } from '@testing-library/react'
import UserInfo from './UserInfo'
import MuteIndicator from './_components/MuteIndicator'

describe('UserInfo', () => {
  test('renders username', () => {
    render(<UserInfo />)

    expect(screen.getByText('Jack')).toBeInTheDocument()
  })

  test('renders mic off icon', () => {
    render(
      <UserInfo>
        <MuteIndicator isMuted />
      </UserInfo>
    )

    expect(screen.getByLabelText('Muted')).toBeInTheDocument()
  })
})
