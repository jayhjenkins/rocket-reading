import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LetterSoundGame } from '../LetterSoundGame'
import { Item } from '../../../types'

describe('LetterSoundGame', () => {
  const mockItem: Item = {
    id: 'letter_m',
    type: 'letter',
    content: 'm',
    world: 1,
    metadata: { phonics_coverage: ['m'] }
  }

  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the letter prominently', () => {
    render(
      <LetterSoundGame item={mockItem} onSubmit={mockOnSubmit} />
    )
    expect(screen.getByText('m')).toBeInTheDocument()
  })

  it('should show prompt text', () => {
    render(
      <LetterSoundGame item={mockItem} onSubmit={mockOnSubmit} />
    )
    expect(screen.getByText(/What sound does this letter make?/i)).toBeInTheDocument()
  })

  it('should have three grading buttons after response', async () => {
    render(
      <LetterSoundGame item={mockItem} onSubmit={mockOnSubmit} />
    )

    // Simulate child saying sound (in real app, parent would pause and then grade)
    // For now, just check grading buttons appear
    const correctBtn = screen.getByRole('button', { name: /Got it/i })
    const helpBtn = screen.getByRole('button', { name: /Needed help/i })
    const wrongBtn = screen.getByRole('button', { name: /Didn't know/i })

    expect(correctBtn).toBeInTheDocument()
    expect(helpBtn).toBeInTheDocument()
    expect(wrongBtn).toBeInTheDocument()
  })

  it('should call onSubmit with correct rating when parent grades', async () => {
    render(
      <LetterSoundGame item={mockItem} onSubmit={mockOnSubmit} />
    )

    const correctBtn = screen.getByRole('button', { name: /Got it/i })
    fireEvent.click(correctBtn)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('correct', expect.objectContaining({
        raw_response: expect.any(String),
        response_time_ms: expect.any(Number),
        hints_used: 0
      }))
    })
  })

  it('should log response time', async () => {
    jest.useFakeTimers()

    const { rerender } = render(
      <LetterSoundGame item={mockItem} onSubmit={mockOnSubmit} />
    )

    // Advance time by 2 seconds
    jest.advanceTimersByTime(2000)

    const correctBtn = screen.getByRole('button', { name: /Got it/i })
    fireEvent.click(correctBtn)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('correct', expect.objectContaining({
        response_time_ms: expect.any(Number) // Should be ~2000ms
      }))
    })

    jest.useRealTimers()
  })
})
