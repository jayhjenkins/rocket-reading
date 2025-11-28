# Slice 2 Implementation Plan: World 1 Content & Item Library

**Slice:** 2 of 17
**Phase:** 1 (Foundation)
**Created:** 2025-11-26
**Status:** Ready for Approval

---

## Overview

This plan implements Slice 2, which expands the SR item library to 8-12 letters, adds a second mini-game type (Sound → Letter recognition), introduces a simple Treehouse overworld, and implements World 1 completion logic. This builds directly on Slice 1's foundation while validating that the architecture scales beyond the minimal prototype.

**Key Goals:**
1. Expand letter library from 5 → 12 letters (complete World 1 phonics set)
2. Implement SoundLetterGame mini-game (child taps letter from options)
3. Mix both mini-game types in sessions (50/50 random split - **temporary bridge to Slice 3**)
4. Add simple Treehouse overworld scene (no quests yet, just visual home)
5. Implement World 1 completion detection (≥90% accuracy on all letters)
6. Extend sessions to 3-5 minutes with mixed game types

**Important:** The 50/50 random game type mix is a **temporary bridge** between Slice 1 (single game type) and Slice 3 (quest-driven selection). Slice 3 will replace this with a Quest Generator that assigns mini-game types based on NPC quests. The implementation must make this swap easy.

**What We're Validating:**
- **Pedagogy:** Does SR spacing work with 12 letters? Do kids retain better with spacing?
- **Engagement:** Do two mini-game types provide enough variety? Is it boring yet?
- **Architecture:** Does the mini-game framework support easy addition of new game types? Does SR engine handle 20-30 reviews per session smoothly?

---

## Prerequisites Checklist

Before starting implementation, verify:

- [x] Slice 1 is complete (all tests passing, production build works)
- [x] Architecture doc is up-to-date with Slice 1 learnings
- [x] All required documents have been read:
  - [x] `/docs/product/prd/00-SLICING-STRATEGY-OVERVIEW.md`
  - [x] `/docs/architecture/SYSTEM-ARCHITECTURE.md`
  - [x] `/docs/product/prd/phase-1/PRD-Phase-1-Foundation.md`
  - [x] `/docs/product/prd/phase-1/slice-02-world-1-content-item-library.md`

---

## Implementation Tasks

### Task 1: Expand Letter Library (8-12 Letters)

**File:** `src/data/world-1-letters.ts` (NEW)

**Purpose:** Centralize World 1 letter data and expand from 5 → 12 letters

**Implementation:**
```typescript
import { Item } from '../types'

export const WORLD_1_LETTERS: Item[] = [
  // Slice 1 letters (already seeded)
  { id: 'letter_m', type: 'letter', content: 'm', world: 1, metadata: { phonics_coverage: ['m'] } },
  { id: 'letter_a', type: 'letter', content: 'a', world: 1, metadata: { phonics_coverage: ['a'] } },
  { id: 'letter_t', type: 'letter', content: 't', world: 1, metadata: { phonics_coverage: ['t'] } },
  { id: 'letter_s', type: 'letter', content: 's', world: 1, metadata: { phonics_coverage: ['s'] } },
  { id: 'letter_i', type: 'letter', content: 'i', world: 1, metadata: { phonics_coverage: ['i'] } },

  // NEW letters for Slice 2
  { id: 'letter_p', type: 'letter', content: 'p', world: 1, metadata: { phonics_coverage: ['p'] } },
  { id: 'letter_n', type: 'letter', content: 'n', world: 1, metadata: { phonics_coverage: ['n'] } },
  { id: 'letter_o', type: 'letter', content: 'o', world: 1, metadata: { phonics_coverage: ['o'] } },
  { id: 'letter_e', type: 'letter', content: 'e', world: 1, metadata: { phonics_coverage: ['e'] } },
  { id: 'letter_r', type: 'letter', content: 'r', world: 1, metadata: { phonics_coverage: ['r'] } },
  { id: 'letter_d', type: 'letter', content: 'd', world: 1, metadata: { phonics_coverage: ['d'] } },
  { id: 'letter_h', type: 'letter', content: 'h', world: 1, metadata: { phonics_coverage: ['h'] } },
  { id: 'letter_l', type: 'letter', content: 'l', world: 1, metadata: { phonics_coverage: ['l'] } },
]

export const WORLD_1_LETTER_SOUNDS: Record<string, string> = {
  'm': '/mmm/',
  'a': '/aaa/',
  't': '/t/',
  's': '/sss/',
  'i': '/iii/',
  'p': '/p/',
  'n': '/nnn/',
  'o': '/ooo/',
  'e': '/eee/',
  'r': '/rrr/',
  'd': '/d/',
  'h': '/hhh/',
  'l': '/lll/',
}
```

**Changes Required:**
- Create new file `src/data/world-1-letters.ts`
- Export letter items and sound mappings

**Tests:** None needed (data file)

**Dependencies:** None

**Estimated Effort:** 15 minutes

---

### Task 2: Implement SoundLetterGame Component

**File:** `src/ui/components/SoundLetterGame.tsx` (NEW)

**Purpose:** Second mini-game type where app plays sound and child taps matching letter from 3-4 options

**Implementation:**
```typescript
import React, { useState, useEffect } from 'react'
import { Item, Rating, ResponseData } from '../../types'
import { WORLD_1_LETTERS, WORLD_1_LETTER_SOUNDS } from '../../data/world-1-letters'
import styles from './SoundLetterGame.module.css'

interface SoundLetterGameProps {
  item: Item
  onSubmit: (rating: Rating, responseData: ResponseData) => void
}

export const SoundLetterGame: React.FC<SoundLetterGameProps> = ({ item, onSubmit }) => {
  const [responseStartTime] = useState(Date.now())
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [options, setOptions] = useState<string[]>([])

  useEffect(() => {
    // Generate 3-4 letter options (including correct answer)
    const correctLetter = item.content
    const otherLetters = WORLD_1_LETTERS
      .map(l => l.content)
      .filter(l => l !== correctLetter)

    // Shuffle and pick 2-3 wrong options
    const shuffled = otherLetters.sort(() => Math.random() - 0.5)
    const wrongOptions = shuffled.slice(0, 3)

    // Combine and shuffle final options
    const allOptions = [correctLetter, ...wrongOptions].sort(() => Math.random() - 0.5)
    setOptions(allOptions)
  }, [item.content])

  const playSound = () => {
    const sound = WORLD_1_LETTER_SOUNDS[item.content]
    // TODO: Play audio using Web Audio API or <audio> element
    console.log(`Playing sound: ${sound}`)
  }

  useEffect(() => {
    // Auto-play sound on mount
    playSound()
  }, [item.content])

  const handleLetterTap = (letter: string) => {
    const isCorrect = letter === item.content
    setSelectedLetter(letter)

    if (!isCorrect) {
      setHintsUsed(hintsUsed + 1)
      setShowFeedback(true)
      // Show hint, then allow retry
      setTimeout(() => {
        setShowFeedback(false)
        setSelectedLetter(null)
      }, 2000)
    } else {
      setShowFeedback(true)
    }
  }

  const handleParentGrade = (rating: Rating) => {
    const responseData: ResponseData = {
      raw_response: `tapped_letter_${selectedLetter}`,
      response_time_ms: Date.now() - responseStartTime,
      hints_used: hintsUsed,
      context: {
        options,
        correct: item.content,
        selected: selectedLetter
      }
    }
    onSubmit(rating, responseData)
  }

  return (
    <div className={styles.container}>
      <div className={styles.prompt}>
        <button onClick={playSound} className={styles.soundButton}>
          🔊 Tap to hear the sound
        </button>
        <p>Tap the letter that says {WORLD_1_LETTER_SOUNDS[item.content]}</p>
      </div>

      <div className={styles.letterOptions}>
        {options.map(letter => (
          <button
            key={letter}
            onClick={() => handleLetterTap(letter)}
            className={`${styles.letterTile} ${
              selectedLetter === letter ? styles.selected : ''
            }`}
            disabled={showFeedback}
          >
            {letter}
          </button>
        ))}
      </div>

      {showFeedback && selectedLetter !== item.content && (
        <div className={styles.hint}>
          This is {WORLD_1_LETTER_SOUNDS[selectedLetter!]}. We want {WORLD_1_LETTER_SOUNDS[item.content]}.
        </div>
      )}

      {showFeedback && selectedLetter === item.content && (
        <div className={styles.feedback}>
          <div className={styles.celebration}>Great job! 🎉</div>
          <div className={styles.gradingButtons}>
            <button onClick={() => handleParentGrade('correct')}>✅ Got it</button>
            <button onClick={() => handleParentGrade('needed_help')}>😬 Needed help</button>
            <button onClick={() => handleParentGrade('incorrect')}>❌ Didn't know</button>
          </div>
        </div>
      )}
    </div>
  )
}
```

**CSS File:** `src/ui/components/SoundLetterGame.module.css` (NEW)

```css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
}

.prompt {
  text-align: center;
  margin-bottom: 2rem;
}

.soundButton {
  font-size: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.soundButton:hover {
  transform: scale(1.05);
}

.soundButton:active {
  transform: scale(0.95);
}

.prompt p {
  font-size: 1.5rem;
  margin-top: 1rem;
  color: #333;
}

.letterOptions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.letterTile {
  font-size: 5rem;
  font-weight: bold;
  background: white;
  border: 4px solid #667eea;
  border-radius: 20px;
  width: 150px;
  height: 150px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.letterTile:hover:not(:disabled) {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.letterTile:active:not(:disabled) {
  transform: scale(0.95);
}

.letterTile.selected {
  background: #667eea;
  color: white;
  border-color: #764ba2;
}

.letterTile:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.hint {
  background: #fff3cd;
  border: 2px solid #ffc107;
  border-radius: 10px;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1rem;
}

.feedback {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.celebration {
  font-size: 2rem;
  font-weight: bold;
  color: #28a745;
}

.gradingButtons {
  display: flex;
  gap: 1rem;
}

.gradingButtons button {
  font-size: 1.2rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.gradingButtons button:hover {
  transform: translateY(-2px);
}

.gradingButtons button:active {
  transform: scale(0.98);
}

.gradingButtons button:first-child {
  background: #28a745;
  color: white;
}

.gradingButtons button:nth-child(2) {
  background: #ffc107;
  color: #333;
}

.gradingButtons button:last-child {
  background: #dc3545;
  color: white;
}
```

**Tests:** `src/ui/components/__tests__/SoundLetterGame.test.tsx` (NEW)

```typescript
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
```

**Dependencies:**
- Task 1 (world-1-letters.ts)

**Estimated Effort:** 2 hours

---

### Task 3: Update SessionScreen to Mix Both Mini-Game Types

**File:** `src/ui/components/SessionScreen.tsx` (MODIFY)

**Purpose:** Temporarily mix both mini-game types with 50/50 random selection. This is a **bridge to Slice 3** where quest-driven selection will replace this logic.

**Architecture Note:** Design this mixing logic to be **easily replaceable** in Slice 3. Use a separate function `assignGameType()` that can be swapped with quest-based logic later.

**Changes:**
1. Import SoundLetterGame component
2. Import WORLD_1_LETTERS from data file
3. Update seed logic to use WORLD_1_LETTERS
4. Create `assignGameType()` helper function (50/50 split for now - will be replaced in Slice 3)
5. Render appropriate mini-game based on type

**Implementation:**

```typescript
// Add to imports
import { SoundLetterGame } from './SoundLetterGame'
import { WORLD_1_LETTERS } from '../../data/world-1-letters'

// Replace SEED_ITEMS constant with:
// (Remove the old SEED_ITEMS constant entirely)

// In initializeSession, replace seed logic:
const existingItems = await srEngine.getAllItems(profile.id)
if (existingItems.length === 0) {
  await srEngine.seedItems(profile.id, WORLD_1_LETTERS)
}

// After getting due items, assign mini-game types:
const items = await srEngine.getDueItems(profile.id, new Date())

// TEMPORARY: 50/50 random split (will be replaced by Quest Generator in Slice 3)
// Extract this to a separate function for easy swapping
const assignGameType = (item: Item): string => {
  return Math.random() < 0.5 ? 'letter_sound' : 'sound_letter'
}

const itemsWithGames = items.slice(0, 10).map(item => ({
  item,
  gameType: assignGameType(item)
}))
setDueItems(itemsWithGames)

// Update state type
const [dueItems, setDueItems] = useState<Array<{ item: Item, gameType: string }>>([])

// Update rendering logic:
const currentItemConfig = dueItems[currentItemIndex]
return (
  <div>
    <div className={styles.sessionInfo}>
      <p>Item {currentItemIndex + 1} of {dueItems.length}</p>
    </div>
    {currentItemConfig.gameType === 'letter_sound' ? (
      <LetterSoundGame
        item={currentItemConfig.item}
        onSubmit={handleGameSubmit}
      />
    ) : (
      <SoundLetterGame
        item={currentItemConfig.item}
        onSubmit={handleGameSubmit}
      />
    )}
  </div>
)
```

**Tests:** Update `src/ui/components/__tests__/SessionScreen.test.tsx`

Add test case:
```typescript
it('renders both mini-game types in a session', async () => {
  // Test that session can render LetterSoundGame and SoundLetterGame
  // Mock Math.random to control game type assignment
})
```

**Dependencies:**
- Task 1 (world-1-letters.ts)
- Task 2 (SoundLetterGame)

**Estimated Effort:** 1 hour

---

### Task 4: Implement World 1 Completion Logic

**File:** `src/core/world-completion.ts` (NEW)

**Purpose:** Detect when child has mastered all World 1 letters (≥90% accuracy)

**Implementation:**
```typescript
import { SREngine } from './sr-engine'
import { WORLD_1_LETTERS } from '../data/world-1-letters'

export class WorldCompletion {
  private srEngine: SREngine

  constructor(srEngine: SREngine) {
    this.srEngine = srEngine
  }

  async checkWorld1Complete(profileId: string): Promise<boolean> {
    const world1LetterIds = WORLD_1_LETTERS.map(l => l.id)

    let totalCorrect = 0
    let totalReviews = 0

    for (const letterId of world1LetterIds) {
      const state = await this.srEngine.getItemState(profileId, letterId)

      // Calculate accuracy for this letter
      const totalAttempts = state.correct_streak + state.error_count
      if (totalAttempts === 0) return false // Not started yet

      const accuracy = state.correct_streak / totalAttempts

      // Need at least 5 reviews per letter AND ≥90% accuracy
      if (totalAttempts < 5 || accuracy < 0.9) {
        return false
      }

      totalCorrect += state.correct_streak
      totalReviews += totalAttempts
    }

    // Overall accuracy across all World 1 letters must be ≥90%
    const overallAccuracy = totalCorrect / totalReviews
    return overallAccuracy >= 0.9
  }

  async getWorld1Progress(profileId: string): Promise<{
    lettersStarted: number
    lettersMastered: number
    overallAccuracy: number
  }> {
    const world1LetterIds = WORLD_1_LETTERS.map(l => l.id)

    let lettersStarted = 0
    let lettersMastered = 0
    let totalCorrect = 0
    let totalReviews = 0

    for (const letterId of world1LetterIds) {
      try {
        const state = await this.srEngine.getItemState(profileId, letterId)

        const totalAttempts = state.correct_streak + state.error_count
        if (totalAttempts > 0) {
          lettersStarted++

          const accuracy = state.correct_streak / totalAttempts
          if (totalAttempts >= 5 && accuracy >= 0.9) {
            lettersMastered++
          }

          totalCorrect += state.correct_streak
          totalReviews += totalAttempts
        }
      } catch (error) {
        // Item not yet seeded, skip
        continue
      }
    }

    const overallAccuracy = totalReviews > 0 ? totalCorrect / totalReviews : 0

    return {
      lettersStarted,
      lettersMastered,
      overallAccuracy
    }
  }
}
```

**Tests:** `src/core/__tests__/world-completion.test.ts` (NEW)

```typescript
import { SREngine } from '../sr-engine'
import { WorldCompletion } from '../world-completion'
import { WORLD_1_LETTERS } from '../../data/world-1-letters'

describe('WorldCompletion', () => {
  let srEngine: SREngine
  let worldCompletion: WorldCompletion

  beforeEach(async () => {
    srEngine = new SREngine()
    await srEngine.initialize()
    worldCompletion = new WorldCompletion(srEngine)
  })

  it('returns false if no letters have been started', async () => {
    const isComplete = await worldCompletion.checkWorld1Complete('profile_1')
    expect(isComplete).toBe(false)
  })

  it('returns false if letters have <5 reviews', async () => {
    await srEngine.seedItems('profile_1', WORLD_1_LETTERS)

    // Do 3 reviews for letter_m
    for (let i = 0; i < 3; i++) {
      await srEngine.logReview('profile_1', 'letter_m', 'correct', {
        raw_response: 'test',
        response_time_ms: 1000,
        hints_used: 0
      })
    }

    const isComplete = await worldCompletion.checkWorld1Complete('profile_1')
    expect(isComplete).toBe(false)
  })

  it('returns false if any letter has <90% accuracy', async () => {
    await srEngine.seedItems('profile_1', WORLD_1_LETTERS)

    // Do 5 correct reviews for most letters
    for (const letter of WORLD_1_LETTERS.slice(0, 11)) {
      for (let i = 0; i < 5; i++) {
        await srEngine.logReview('profile_1', letter.id, 'correct', {
          raw_response: 'test',
          response_time_ms: 1000,
          hints_used: 0
        })
      }
    }

    // But make last letter have 80% accuracy (4 correct, 1 incorrect)
    const lastLetter = WORLD_1_LETTERS[11]
    for (let i = 0; i < 4; i++) {
      await srEngine.logReview('profile_1', lastLetter.id, 'correct', {
        raw_response: 'test',
        response_time_ms: 1000,
        hints_used: 0
      })
    }
    await srEngine.logReview('profile_1', lastLetter.id, 'incorrect', {
      raw_response: 'test',
      response_time_ms: 1000,
      hints_used: 0
    })

    const isComplete = await worldCompletion.checkWorld1Complete('profile_1')
    expect(isComplete).toBe(false)
  })

  it('returns true when all letters have ≥5 reviews and ≥90% accuracy', async () => {
    await srEngine.seedItems('profile_1', WORLD_1_LETTERS)

    // Do 10 correct reviews for all letters
    for (const letter of WORLD_1_LETTERS) {
      for (let i = 0; i < 10; i++) {
        await srEngine.logReview('profile_1', letter.id, 'correct', {
          raw_response: 'test',
          response_time_ms: 1000,
          hints_used: 0
        })
      }
    }

    const isComplete = await worldCompletion.checkWorld1Complete('profile_1')
    expect(isComplete).toBe(true)
  })

  it('calculates progress correctly', async () => {
    await srEngine.seedItems('profile_1', WORLD_1_LETTERS)

    // Do 5 correct reviews for 6 letters
    for (const letter of WORLD_1_LETTERS.slice(0, 6)) {
      for (let i = 0; i < 5; i++) {
        await srEngine.logReview('profile_1', letter.id, 'correct', {
          raw_response: 'test',
          response_time_ms: 1000,
          hints_used: 0
        })
      }
    }

    const progress = await worldCompletion.getWorld1Progress('profile_1')

    expect(progress.lettersStarted).toBe(6)
    expect(progress.lettersMastered).toBe(6)
    expect(progress.overallAccuracy).toBeGreaterThanOrEqual(0.9)
  })
})
```

**Dependencies:** Task 1 (world-1-letters.ts)

**Estimated Effort:** 1.5 hours

---

### Task 5: Add Simple Treehouse Overworld Scene

**File:** `src/ui/components/Treehouse.tsx` (NEW)

**Purpose:** Visual "home" for World 1 (no quests yet, just a welcoming scene)

**Implementation:**
```typescript
import React from 'react'
import { Profile } from '../../types'
import styles from './Treehouse.module.css'

interface TreehouseProps {
  profile: Profile
  onStartSession: () => void
  world1Progress: {
    lettersStarted: number
    lettersMastered: number
    overallAccuracy: number
  }
}

export const Treehouse: React.FC<TreehouseProps> = ({
  profile,
  onStartSession,
  world1Progress
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.sky}>
        <div className={styles.clouds}>☁️ ☁️ ☁️</div>
      </div>

      <div className={styles.treehouse}>
        <div className={styles.tree}>🌳</div>
        <div className={styles.house}>🏠</div>
        <div className={styles.mascot}>🐻</div>
      </div>

      <div className={styles.greeting}>
        <h1>Hi {profile.name}! 👋</h1>
        <p>Welcome to your Reading Treehouse!</p>
      </div>

      <div className={styles.progress}>
        <p>Letters learned: {world1Progress.lettersMastered} / 12</p>
        {world1Progress.overallAccuracy > 0 && (
          <p>Accuracy: {Math.round(world1Progress.overallAccuracy * 100)}%</p>
        )}
      </div>

      <button onClick={onStartSession} className={styles.startButton}>
        Let's Go! 🚀
      </button>
    </div>
  )
}
```

**CSS File:** `src/ui/components/Treehouse.module.css` (NEW)

```css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #87CEEB 0%, #98D8C8 100%);
  padding: 2rem;
}

.sky {
  position: absolute;
  top: 2rem;
  width: 100%;
  text-align: center;
}

.clouds {
  font-size: 3rem;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.treehouse {
  position: relative;
  margin: 2rem 0;
  font-size: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tree {
  font-size: 10rem;
}

.house {
  position: absolute;
  top: 2rem;
  font-size: 6rem;
}

.mascot {
  position: absolute;
  bottom: 4rem;
  font-size: 5rem;
  animation: wave 2s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(10deg); }
  75% { transform: rotate(-10deg); }
}

.greeting {
  text-align: center;
  margin: 2rem 0;
  color: #333;
}

.greeting h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.greeting p {
  font-size: 1.5rem;
  color: #666;
}

.progress {
  background: white;
  border-radius: 15px;
  padding: 1.5rem 3rem;
  margin: 1rem 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.progress p {
  font-size: 1.2rem;
  margin: 0.5rem 0;
  color: #333;
  font-weight: 500;
}

.startButton {
  font-size: 1.8rem;
  padding: 1.5rem 4rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
}

.startButton:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
}

.startButton:active {
  transform: scale(0.98);
}
```

**Tests:** `src/ui/components/__tests__/Treehouse.test.tsx` (NEW)

```typescript
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
```

**Dependencies:** None

**Estimated Effort:** 1.5 hours

---

### Task 6: Update App.tsx to Show Treehouse Instead of Simple Home Screen

**File:** `src/ui/App.tsx` (MODIFY)

**Changes:**
1. Import Treehouse component
2. Import WorldCompletion class
3. Calculate World 1 progress on load
4. Render Treehouse instead of simple home screen

**Implementation:**

```typescript
// Add to imports
import { Treehouse } from './components/Treehouse'
import { WorldCompletion } from '../core/world-completion'
import { SREngine } from '../core/sr-engine'

// Add to component state
const [srEngine] = useState(() => new SREngine())
const [world1Progress, setWorld1Progress] = useState({
  lettersStarted: 0,
  lettersMastered: 0,
  overallAccuracy: 0
})

// Update useEffect to load progress
useEffect(() => {
  const loadProfile = async () => {
    const profileManager = new ProfileManager()
    const p = await profileManager.getProfile()
    if (p) {
      setProfile(p)

      // Load World 1 progress
      await srEngine.initialize()
      const worldCompletion = new WorldCompletion(srEngine)
      const progress = await worldCompletion.getWorld1Progress(p.id)
      setWorld1Progress(progress)
    }
    setIsLoading(false)
  }

  loadProfile()
}, [srEngine])

// Replace home screen with Treehouse
if (!isInSession) {
  return (
    <Treehouse
      profile={profile}
      onStartSession={() => setIsInSession(true)}
      world1Progress={world1Progress}
    />
  )
}
```

**Tests:** Update `src/ui/__tests__/App.test.tsx` to verify Treehouse renders

**Dependencies:**
- Task 4 (world-completion.ts)
- Task 5 (Treehouse component)

**Estimated Effort:** 30 minutes

---

### Task 7: Add Audio Support for Letter Sounds

**File:** `src/core/audio-player.ts` (NEW)

**Purpose:** Play letter sounds using pre-recorded audio files from `src/assets/audio/`

**Available Audio Files:**
All 12 World 1 letter sounds are available in MP3, WAV, and OGG formats:
- m, a, t, s, i (Slice 1)
- p, n, o, e, r, d, h, l (Slice 2)

**Implementation:**
```typescript
export class AudioPlayer {
  private audioElements: Map<string, HTMLAudioElement> = new Map()

  constructor() {
    // Preload all letter sounds for better performance
    this.preloadLetterSounds()
  }

  private preloadLetterSounds(): void {
    const letters = ['m', 'a', 't', 's', 'i', 'p', 'n', 'o', 'e', 'r', 'd', 'h', 'l']

    letters.forEach(letter => {
      const audio = new Audio()

      // Browser will choose best supported format
      // Most browsers prefer MP3, Firefox falls back to OGG
      audio.src = `/src/assets/audio/letter_${letter}.mp3`

      // Preload but don't play yet
      audio.preload = 'auto'

      this.audioElements.set(letter, audio)
    })
  }

  async playLetterSound(letter: string): Promise<void> {
    const audio = this.audioElements.get(letter)

    if (!audio) {
      console.warn(`Audio file not found for letter: ${letter}`)
      return
    }

    // Reset to beginning if already played
    audio.currentTime = 0

    try {
      await audio.play()

      // Wait for audio to finish
      return new Promise((resolve) => {
        audio.onended = () => resolve()
      })
    } catch (error) {
      console.error(`Failed to play audio for letter ${letter}:`, error)
    }
  }

  async playFeedbackSound(type: 'correct' | 'incorrect' | 'hint'): Promise<void> {
    // Placeholder for feedback sounds (to be added in future slices)
    console.log(`Playing ${type} feedback sound`)
  }

  // Clean up resources
  dispose(): void {
    this.audioElements.forEach(audio => {
      audio.pause()
      audio.src = ''
    })
    this.audioElements.clear()
  }
}
```

**Tests:** `src/core/__tests__/audio-player.test.ts` (NEW)

```typescript
import { AudioPlayer } from '../audio-player'

// Mock HTMLAudioElement
global.Audio = jest.fn().mockImplementation(() => ({
  play: jest.fn().mockResolvedValue(undefined),
  pause: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  preload: '',
  src: '',
  currentTime: 0,
  onended: null
}))

describe('AudioPlayer', () => {
  it('can be instantiated', () => {
    const player = new AudioPlayer()
    expect(player).toBeDefined()
  })

  it('preloads all World 1 letter sounds', () => {
    const player = new AudioPlayer()

    // Verify Audio constructor was called for each letter
    expect(global.Audio).toHaveBeenCalledTimes(12)
  })

  it('plays letter sound when requested', async () => {
    const player = new AudioPlayer()

    await player.playLetterSound('m')

    // Verify play was called
    expect(Audio).toHaveBeenCalled()
  })

  it('handles missing audio files gracefully', async () => {
    const player = new AudioPlayer()

    // Should not throw
    await expect(player.playLetterSound('z')).resolves.not.toThrow()
  })
})
```

**Note:** All audio files are already present in `src/assets/audio/` in MP3, WAV, and OGG formats for cross-browser compatibility.

**Dependencies:** None

**Estimated Effort:** 1 hour

---

### Task 8: Integrate AudioPlayer into Both Mini-Games

**Files:**
- `src/ui/components/LetterSoundGame.tsx` (MODIFY)
- `src/ui/components/SoundLetterGame.tsx` (MODIFY)

**Changes:**

**LetterSoundGame.tsx:**
```typescript
// Add to imports
import { AudioPlayer } from '../../core/audio-player'

// Add to component
const [audioPlayer] = useState(() => new AudioPlayer())

// After correct answer graded, play sound
const handleGrade = async (rating: Rating) => {
  await audioPlayer.playLetterSound(item.content)
  // ... rest of grading logic
}
```

**SoundLetterGame.tsx:**
```typescript
// Add to imports
import { AudioPlayer } from '../../core/audio-player'

// Add to component
const [audioPlayer] = useState(() => new AudioPlayer())

// Update playSound function
const playSound = async () => {
  await audioPlayer.playLetterSound(item.content)
}
```

**Dependencies:** Task 7 (audio-player.ts)

**Estimated Effort:** 30 minutes

---

### Task 9: Update Tests and Validation

**Files:**
- All test files created in previous tasks
- Integration test suite

**Tasks:**
1. Run all existing tests and verify they pass
2. Run new tests for SoundLetterGame, WorldCompletion, Treehouse, AudioPlayer
3. Add integration test for full session with mixed game types
4. Manual testing checklist

**Integration Test:** `src/__tests__/integration/slice-2-session.test.ts` (NEW)

```typescript
import { SREngine } from '../../core/sr-engine'
import { WorldCompletion } from '../../core/world-completion'
import { WORLD_1_LETTERS } from '../../data/world-1-letters'

describe('Slice 2 Integration: Full Session', () => {
  it('completes a session with 12 letters and mixed game types', async () => {
    const srEngine = new SREngine()
    await srEngine.initialize()

    const profileId = 'test_profile'
    await srEngine.seedItems(profileId, WORLD_1_LETTERS)

    // Get due items
    const dueItems = await srEngine.getDueItems(profileId, new Date())
    expect(dueItems.length).toBe(12) // All letters are new

    // Simulate session with 10 items
    for (let i = 0; i < 10; i++) {
      const item = dueItems[i]
      await srEngine.logReview(profileId, item.id, 'correct', {
        raw_response: 'test',
        response_time_ms: 1500,
        hints_used: 0
      })
    }

    // Verify reviews logged
    const firstReview = await srEngine.getLastReview(profileId, dueItems[0].id)
    expect(firstReview).toBeDefined()
    expect(firstReview?.rating).toBe('correct')
  })

  it('tracks progress toward World 1 completion', async () => {
    const srEngine = new SREngine()
    await srEngine.initialize()

    const profileId = 'test_profile_2'
    await srEngine.seedItems(profileId, WORLD_1_LETTERS)

    const worldCompletion = new WorldCompletion(srEngine)

    // Do 5 correct reviews for 6 letters
    for (const letter of WORLD_1_LETTERS.slice(0, 6)) {
      for (let i = 0; i < 5; i++) {
        await srEngine.logReview(profileId, letter.id, 'correct', {
          raw_response: 'test',
          response_time_ms: 1000,
          hints_used: 0
        })
      }
    }

    const progress = await worldCompletion.getWorld1Progress(profileId)
    expect(progress.lettersStarted).toBe(6)
    expect(progress.lettersMastered).toBe(6)

    const isComplete = await worldCompletion.checkWorld1Complete(profileId)
    expect(isComplete).toBe(false) // Only 6/12 letters mastered
  })
})
```

**Manual Testing Checklist:**
- [ ] Profile setup works
- [ ] Treehouse scene displays correctly with progress
- [ ] Session starts and shows mixed game types
- [ ] LetterSoundGame works as in Slice 1
- [ ] SoundLetterGame allows tapping letters
- [ ] Wrong tap shows hint, correct tap shows grading
- [ ] Audio plays for letter sounds (TTS for now)
- [ ] Parent grading buttons work
- [ ] Session completes after 10 items
- [ ] Returns to Treehouse after session
- [ ] Progress updates correctly
- [ ] All 12 letters can be reviewed
- [ ] Works on desktop browser
- [ ] Works on iPad Safari
- [ ] Works on Android Chrome

**Dependencies:** All previous tasks

**Estimated Effort:** 2 hours

---

### Task 10: Update Documentation

**Files:**
- `/docs/architecture/SYSTEM-ARCHITECTURE.md` (UPDATE)
- `/docs/product/prd/phase-1/implementations/slice-02-implementation-plan.md` (this file, mark COMPLETE)

**SYSTEM-ARCHITECTURE.md Updates:**

Add to "Completed in Slice 2" section:
```markdown
### Completed in Slice 2
- [x] Expanded letter library to 12 letters (World 1 complete set)
- [x] Implemented SoundLetterGame (recognition mini-game)
- [x] Mixed mini-game type selection (50/50 letter_sound/sound_letter)
- [x] World completion detection logic
- [x] Treehouse overworld scene (simple visual home)
- [x] Audio playback system (browser TTS placeholder)
- [x] Response logging validated across both mini-game types
```

Add to "Mini-Game Types" section:
```markdown
| `sound_letter` | ✅ Slice 2 | Play sound, child taps letter from options |
```

Add new ADR:
```markdown
### ADR-007: Pre-recorded Audio Files for Letter Sounds

**Date:** 2025-11-26
**Status:** Accepted (Slice 2)

**Context:** Need high-quality audio playback for letter sounds to teach correct phoneme pronunciation.

**Decision:** Use pre-recorded MP3/WAV/OGG audio files for all 12 World 1 letter sounds.

**Rationale:**
- Consistent, high-quality pronunciation across all devices
- No dependency on browser TTS quality (which varies widely)
- Proper phoneme sounds (not letter names)
- Multiple formats ensure cross-browser compatibility
- Audio files already sourced and ready

**Consequences:**
- ✅ Production-quality audio from Slice 2 onward
- ✅ Consistent learning experience across devices
- ✅ No browser TTS variation issues
- ✅ Proper phoneme sounds for Science of Reading alignment
- ⚠️ Slightly larger bundle size (~144 KB for 12 letters)

**Implementation:**
- Files located in `src/assets/audio/letter_*.mp3`
- AudioPlayer class preloads all sounds on initialization
- Browser selects best format (MP3/WAV/OGG) automatically
```

**Dependencies:** All previous tasks

**Estimated Effort:** 30 minutes

---

## Testing Strategy

### Unit Tests
- [x] SoundLetterGame component (6 tests)
- [x] WorldCompletion class (5 tests)
- [x] Treehouse component (3 tests)
- [x] AudioPlayer class (basic structure test)

### Integration Tests
- [x] Full session with 12 letters
- [x] Mixed game type rendering
- [x] Progress tracking across sessions
- [x] World completion detection

### Manual Validation
- [ ] Cross-browser testing (Chrome, Firefox, Safari, iPad, Android)
- [ ] Parent + child playtest (5 sessions minimum)
- [ ] Audio quality check (TTS acceptable?)
- [ ] Progress display accuracy
- [ ] Session duration (~3-5 minutes with 10 items)

### Validation Criteria (from Slice 2 Overview)
- **Pedagogical:** SR spacing with 12 letters shows learning signal
- **Engagement:** Two game types provide variety, not yet boring
- **Architecture:** Mini-game framework scales easily, SR engine handles 20-30 reviews/session

---

## Rollback Plan

If Slice 2 fails validation:

**Scenario 1: Audio quality too poor**
- Fallback: Remove audio, use text-only prompts temporarily
- Impact: Low (can add audio later)

**Scenario 2: Kids get confused with two game types**
- Fallback: Stick to LetterSoundGame only, remove SoundLetterGame
- Impact: Medium (less variety, but keeps pedagogy intact)

**Scenario 3: 12 letters overwhelming**
- Fallback: Reduce to 8 letters, slower rollout
- Impact: Medium (delays World 1 completion)

**Scenario 4: Performance issues with 20-30 reviews/session**
- Requires: SR engine optimization (indexing, caching)
- Impact: High (blocks scaling to Worlds 2-4)

---

## Acceptance Criteria

Slice 2 is complete when:

- [ ] All 13 World 1 letters are seeded and available (m, a, t, s, i, p, n, o, e, r, d, h, l)
- [ ] SoundLetterGame component works (tap correct letter from options)
- [ ] Sessions mix both mini-game types (50/50 random split - temporary bridge to Slice 3)
- [ ] `assignGameType()` function is isolated for easy replacement in Slice 3
- [ ] Response logging validated for both game types
- [ ] Audio plays for letter sounds using pre-recorded MP3/WAV/OGG files
- [ ] Treehouse overworld displays with progress tracking
- [ ] World completion logic detects ≥90% accuracy on all letters
- [ ] All unit tests pass (19 existing + ~17 new = 36 total)
- [ ] Integration tests pass (full session flow)
- [ ] Manual testing on desktop + iPad + Android browsers works
- [ ] Session duration is 3-5 minutes with 10 items
- [ ] Architecture doc updated with Slice 2 learnings
- [ ] Parent + child playtest confirms engagement and clarity

---

## Dependencies

**External:**
- Pre-recorded audio files ✅ (already present in `src/assets/audio/`)

**Internal:**
- Slice 1 complete ✅
- All Slice 1 tests passing ✅

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Kids confused by two game types | Low | Medium | Monitor playtest feedback, ready to remove SoundLetterGame |
| Performance degrades with 13 letters | Low | High | Stress test with 20+ due items, optimize if needed |
| World completion logic too strict | Medium | Low | Adjust threshold (90% → 80%) if needed |
| Random 50/50 mix feels arbitrary | Medium | Low | Acceptable for Slice 2; Slice 3 replaces with quest-driven logic |

---

## Timeline Estimate

| Task | Effort | Assignee |
|------|--------|----------|
| Task 1: Letter library (13 letters) | 15 min | AI |
| Task 2: SoundLetterGame | 2 hrs | AI |
| Task 3: Mix game types (with easy swap for Slice 3) | 1 hr | AI |
| Task 4: World completion | 1.5 hrs | AI |
| Task 5: Treehouse scene | 1.5 hrs | AI |
| Task 6: Update App.tsx | 30 min | AI |
| Task 7: Audio player (pre-recorded files) | 1 hr | AI |
| Task 8: Integrate audio | 30 min | AI |
| Task 9: Tests + validation | 2 hrs | AI |
| Task 10: Documentation | 30 min | AI |
| **Total** | **~11 hours** | |

**Estimated Calendar Time:** 2-3 days (assuming 4-5 hours/day of focused work)

---

## Success Metrics

Slice 2 is successful if:

- Parent + child complete 5 sessions without major confusion
- Kids correctly identify letters in SoundLetterGame ≥70% of the time
- Sessions feel varied (parent reports "not repetitive")
- Progress tracking is accurate (manual verification against reviews)
- No performance issues with 10-item sessions
- Architecture doc shows clean mini-game addition (no refactoring needed)

**Next Slice:** Slice 3 (Quest Structure & Overworld) builds on this foundation by adding quest narrative and NPCs.

---

## Architecture Notes for Slice 3 Transition

To make the transition to quest-driven selection easy in Slice 3:

**What Stays the Same:**
1. **SREngine** - Quest-agnostic, works identically for quest-driven or random selection
2. **Mini-game components** - LetterSoundGame and SoundLetterGame remain unchanged
3. **Data structure** - `{ item, gameType }` structure is preserved
4. **Response logging** - No changes needed to logging system
5. **Treehouse component** - Enhanced with quest bubbles, not replaced

**What Gets Replaced:**
1. **`assignGameType()` function** → `Quest Generator's selectMiniGameForQuest()`
   - Currently: `Math.random() < 0.5 ? 'letter_sound' : 'sound_letter'`
   - Slice 3: Quest-based assignment (e.g., "Garden Quest" always uses letter_sound)

2. **Simple "Let's Go!" button** → **Quest selection UI**
   - Currently: Direct session start
   - Slice 3: Tap NPC quest bubble → Quest intro → Mini-game sequence

3. **Session flow** → **Quest-wrapped session flow**
   - Currently: Welcome → Mix of games → Completion
   - Slice 3: Welcome → Choose quest → Quest intro → Themed games → Quest completion reward

**Clean Swap Points:**
- `SessionScreen.tsx` line ~540: `assignGameType()` function
- `Treehouse.tsx`: `onStartSession` prop → `onSelectQuest` prop
- `App.tsx`: Session initialization logic

**No Refactoring Needed:**
- Mini-game framework supports quest themes via existing props
- SR engine already handles arbitrary game type assignments
- Progress tracking works identically for quest-driven sessions

---

## Approval

**Status:** Ready for Approval

Once approved, implementation will begin with Task 1.
