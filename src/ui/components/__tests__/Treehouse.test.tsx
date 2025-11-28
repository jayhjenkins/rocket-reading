import { render, screen, fireEvent } from '@testing-library/react'
import { Treehouse } from '../Treehouse'
import { Profile } from '../../../types'

const mockProfile: Profile = {
  id: 'profile_1',
  name: 'Alex',
  age: 4,
  created_at: new Date(),
  current_world: 1
}

describe('Treehouse', () => {
  it('renders child name in greeting', () => {
    const onStartSession = jest.fn()
    const progress = { lettersStarted: 5, lettersMastered: 3, overallAccuracy: 0.85 }

    render(<Treehouse profile={mockProfile} onStartSession={onStartSession} world1Progress={progress} />)

    expect(screen.getByText(/Hi Alex!/)).toBeInTheDocument()
  })

  it('displays progress correctly', () => {
    const onStartSession = jest.fn()
    const progress = { lettersStarted: 8, lettersMastered: 6, overallAccuracy: 0.92 }

    render(<Treehouse profile={mockProfile} onStartSession={onStartSession} world1Progress={progress} />)

    expect(screen.getByText('Letters learned: 6 / 12')).toBeInTheDocument()
    expect(screen.getByText('Accuracy: 92%')).toBeInTheDocument()
  })

  it('calls onStartSession when button clicked', () => {
    const onStartSession = jest.fn()
    const progress = { lettersStarted: 0, lettersMastered: 0, overallAccuracy: 0 }

    render(<Treehouse profile={mockProfile} onStartSession={onStartSession} world1Progress={progress} />)

    fireEvent.click(screen.getByText(/Let's Go!/))

    expect(onStartSession).toHaveBeenCalled()
  })
})
