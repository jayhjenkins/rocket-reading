import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SoundLetterGame } from '../SoundLetterGame'
import { Item } from '../../../types'

const mockItem: Item = {
  id: 'letter_s',
  type: 'letter',
  content: 's',
  world: 1,
  metadata: { phonics_coverage: ['s'] }
}

describe('SoundLetterGame', () => {
  it('renders letter options', () => {
    const onSubmit = jest.fn()
    render(<SoundLetterGame item={mockItem} onSubmit={onSubmit} />)

    const tiles = screen.getAllByRole('button').filter(b =>
      b.textContent && b.textContent.length === 1
    )
    expect(tiles).toHaveLength(4) // 1 correct + 3 wrong
  })

  it('includes correct letter in options', () => {
    const onSubmit = jest.fn()
    render(<SoundLetterGame item={mockItem} onSubmit={onSubmit} />)

    expect(screen.getByText('s')).toBeInTheDocument()
  })

  it('shows hint when wrong letter is tapped', async () => {
    const onSubmit = jest.fn()
    render(<SoundLetterGame item={mockItem} onSubmit={onSubmit} />)

    // Find a wrong letter (not 's')
    const tiles = screen.getAllByRole('button').filter(b =>
      b.textContent && b.textContent.length === 1 && b.textContent !== 's'
    )

    fireEvent.click(tiles[0])

    await waitFor(() => {
      expect(screen.getByText(/This is/)).toBeInTheDocument()
    })
  })

  it('shows grading buttons when correct letter is tapped', async () => {
    const onSubmit = jest.fn()
    render(<SoundLetterGame item={mockItem} onSubmit={onSubmit} />)

    const sTile = screen.getByText('s')
    fireEvent.click(sTile)

    await waitFor(() => {
      expect(screen.getByText('✅ Got it')).toBeInTheDocument()
      expect(screen.getByText('😬 Needed help')).toBeInTheDocument()
      expect(screen.getByText('❌ Didn\'t know')).toBeInTheDocument()
    })
  })

  it('logs response data when parent grades', async () => {
    const onSubmit = jest.fn()
    render(<SoundLetterGame item={mockItem} onSubmit={onSubmit} />)

    const sTile = screen.getByText('s')
    fireEvent.click(sTile)

    await waitFor(() => {
      expect(screen.getByText('✅ Got it')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('✅ Got it'))

    expect(onSubmit).toHaveBeenCalledWith('correct', expect.objectContaining({
      raw_response: 'tapped_letter_s',
      response_time_ms: expect.any(Number),
      hints_used: 0,
      context: expect.objectContaining({
        correct: 's',
        selected: 's'
      })
    }))
  })

  it('tracks hints when wrong letters are tapped', async () => {
    const onSubmit = jest.fn()
    render(<SoundLetterGame item={mockItem} onSubmit={onSubmit} />)

    // Tap wrong letter first
    const tiles = screen.getAllByRole('button').filter(b =>
      b.textContent && b.textContent.length === 1 && b.textContent !== 's'
    )
    fireEvent.click(tiles[0])

    // Wait for hint to clear
    await waitFor(() => {
      expect(screen.queryByText(/This is/)).not.toBeInTheDocument()
    }, { timeout: 3000 })

    // Now tap correct letter
    const sTile = screen.getByText('s')
    fireEvent.click(sTile)

    await waitFor(() => {
      expect(screen.getByText('✅ Got it')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('✅ Got it'))

    expect(onSubmit).toHaveBeenCalledWith('correct', expect.objectContaining({
      hints_used: 1
    }))
  })
})
