# Slice 1: Foundation & Minimal SR Engine - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a working web app with a minimal SR engine, one playable mini-game (Letter → Sound), parent grading interface, and response logging to prove the core loop works.

**Architecture:**
- Web-first platform (React/TypeScript for Phase 1 UI, Node.js/TypeScript for core logic)
- Platform-agnostic core logic (SR engine, mini-game framework) separates business logic from UI
- Local storage via IndexedDB for offline-first persistence
- Response logging from day 1 (critical for future Adventure Mode inference)
- **CODE-FIRST UI:** Buttons, animations, icons rendered with CSS/React (not images)

**Tech Stack:**
- **Frontend:** React 18 + TypeScript + Vite
- **Backend/Core:** Node.js + TypeScript (core logic runs in browser via bundled module)
- **Storage:** IndexedDB (browser-based, no backend required for Phase 1)
- **Testing:** Jest + React Testing Library for unit/integration tests
- **Audio:** Pre-recorded letter sounds (MP3/OGG/WAV files)
- **Images:** Mascot character only (8 PNG files) - all UI elements are code-based
- **Styling:** CSS modules + Unicode emoji (no button/icon image files)

---

## Project Setup

### Task 1: Initialize project structure

**Files:**
- Create: `package.json` (root monorepo or web app package)
- Create: `tsconfig.json` (TypeScript config)
- Create: `vite.config.ts` (Vite build config)
- Create: `src/` directory structure

**Step 1: Initialize Node.js project**

Run: `npm init -y` in `/Users/jay/Documents/rocketreading`
Expected: `package.json` created with default values

**Step 2: Install core dependencies**

Run: `npm install --save react@18 react-dom@18 typescript @types/react @types/react-dom @types/node vite @vitejs/plugin-react`

Expected: Dependencies installed, `node_modules/` created, `package-lock.json` generated

**Step 3: Install development dependencies**

Run: `npm install --save-dev @testing-library/react @testing-library/jest-dom jest @types/jest ts-jest`

Expected: Dev dependencies installed

**Step 4: Create TypeScript config**

Create `/Users/jay/Documents/rocketreading/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "outDir": "./dist",
    "baseUrl": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Step 5: Create Vite config**

Create `/Users/jay/Documents/rocketreading/vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
```

**Step 6: Create project directories**

Run:
```bash
mkdir -p src/{core,ui,assets/{audio,images},types,utils}
```

Expected: Directory structure created

**Step 7: Update package.json scripts**

Edit `package.json` to add:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "test": "jest",
  "test:watch": "jest --watch"
}
```

**Step 8: Create public/index.html**

Create `/Users/jay/Documents/rocketreading/public/index.html`:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rocket Reading</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Step 9: Commit**

```bash
git add -A
git commit -m "chore: initialize project with React, TypeScript, Vite, and Jest"
```

---

## Core Data Models & Types

### Task 2: Define TypeScript types for SR engine

**Files:**
- Create: `src/types/index.ts`
- Create: `src/types/models.ts`

**Step 1: Write types test**

Create `/Users/jay/Documents/rocketreading/src/types/__tests__/models.test.ts`:
```typescript
import { Item, ItemState, Review, ResponseData, Profile, Rating } from '../models'

describe('Data Models', () => {
  it('should create a valid Item', () => {
    const item: Item = {
      id: 'letter_m',
      type: 'letter',
      content: 'm',
      world: 1,
      metadata: {
        phonics_coverage: ['m']
      }
    }
    expect(item.id).toBe('letter_m')
    expect(item.content).toBe('m')
  })

  it('should create a valid ItemState with initial values', () => {
    const now = new Date()
    const itemState: ItemState = {
      item_id: 'letter_m',
      profile_id: 'child_1',
      last_seen: now,
      next_due: now,  // Due immediately for new items
      interval_days: 0,  // Not yet graduated from massed practice
      correct_streak: 0,
      error_count: 0,
      status: 'new',
      learning_threshold_met: false  // New field: hasn't graduated yet
    }
    expect(itemState.status).toBe('new')
    expect(itemState.interval_days).toBe(0)
    expect(itemState.learning_threshold_met).toBe(false)
  })

  it('should create a valid ResponseData', () => {
    const response: ResponseData = {
      raw_response: 'parent_graded',
      response_time_ms: 2500,
      hints_used: 0,
      context: { item_id: 'letter_m' }
    }
    expect(response.hints_used).toBe(0)
  })

  it('should create a valid Review', () => {
    const review: Review = {
      id: 'review_1',
      profile_id: 'child_1',
      item_id: 'letter_m',
      timestamp: new Date(),
      rating: 'correct',
      response_data: {
        raw_response: 'parent_graded',
        response_time_ms: 1200,
        hints_used: 0
      },
      mode: 'co_play'
    }
    expect(review.rating).toBe('correct')
    expect(review.mode).toBe('co_play')
  })

  it('should create a valid Profile', () => {
    const profile: Profile = {
      id: 'child_1',
      name: 'Emma',
      age: 4,
      created_at: new Date(),
      current_world: 1
    }
    expect(profile.name).toBe('Emma')
    expect(profile.age).toBe(4)
  })
})
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/types/__tests__/models.test.ts`
Expected: FAIL - "Cannot find module '../models'"

**Step 3: Create models.ts with type definitions**

Create `/Users/jay/Documents/rocketreading/src/types/models.ts`:
```typescript
// Item Types
export type ItemType = 'letter' | 'word' | 'sentence' | 'tricky_word'
export type ItemStatus = 'new' | 'learning' | 'maturing' | 'mastered' | 'maintenance'
export type Rating = 'correct' | 'needed_help' | 'incorrect'
export type SessionMode = 'co_play' | 'adventure'

// Core Data Models
export interface Item {
  id: string
  type: ItemType
  content: string
  world: number
  metadata: {
    phonics_coverage?: string[]
    is_personalized?: boolean
  }
}

export interface ItemState {
  item_id: string
  profile_id: string
  last_seen: Date
  next_due: Date
  interval_days: number
  ease_factor?: number
  correct_streak: number
  error_count: number
  status: ItemStatus
  learning_threshold_met: boolean  // Has item graduated from massed practice?
}

export interface ResponseData {
  raw_response: string
  response_time_ms: number
  hints_used: number
  context?: Record<string, unknown>
}

export interface Review {
  id: string
  profile_id: string
  item_id: string
  timestamp: Date
  rating: Rating
  response_data: ResponseData
  mode: SessionMode
}

export interface Profile {
  id: string
  name: string
  age: number
  created_at: Date
  current_world: number
}

export interface MiniGameConfig {
  type: string
  item: Item
  theme?: string
}
```

**Step 4: Create index.ts for exports**

Create `/Users/jay/Documents/rocketreading/src/types/index.ts`:
```typescript
export * from './models'
```

**Step 5: Run test to verify it passes**

Run: `npm test -- src/types/__tests__/models.test.ts`
Expected: PASS

**Step 6: Commit**

```bash
git add src/types/
git commit -m "feat: define core data models and TypeScript types"
```

---

## SR Engine Implementation

### Task 3: Implement SR engine core functions

**Files:**
- Create: `src/core/sr-engine.ts`
- Create: `src/core/__tests__/sr-engine.test.ts`

**Step 1: Write failing SR engine tests**

Create `/Users/jay/Documents/rocketreading/src/core/__tests__/sr-engine.test.ts`:
```typescript
import { SREngine } from '../sr-engine'
import { Item, Rating } from '../../types'

describe('SR Engine', () => {
  let engine: SREngine
  const testProfile = 'test_child_1'

  const testItems: Item[] = [
    { id: 'letter_m', type: 'letter', content: 'm', world: 1, metadata: { phonics_coverage: ['m'] } },
    { id: 'letter_a', type: 'letter', content: 'a', world: 1, metadata: { phonics_coverage: ['a'] } },
    { id: 'letter_t', type: 'letter', content: 't', world: 1, metadata: { phonics_coverage: ['t'] } },
  ]

  beforeEach(async () => {
    engine = new SREngine()
    await engine.initialize()
  })

  describe('seedItems', () => {
    it('should seed initial items', async () => {
      await engine.seedItems(testProfile, testItems)
      const items = await engine.getAllItems(testProfile)
      expect(items.length).toBe(3)
    })
  })

  describe('getDueItems', () => {
    it('should return items due today', async () => {
      await engine.seedItems(testProfile, testItems)
      const today = new Date()
      const dueItems = await engine.getDueItems(testProfile, today)
      expect(dueItems.length).toBe(3) // All new items are due
    })

    it('should not return items not yet due', async () => {
      await engine.seedItems(testProfile, testItems)

      // Move an item to future
      await engine.logReview(testProfile, 'letter_m', 'correct', {
        raw_response: 'test',
        response_time_ms: 1000,
        hints_used: 0
      })

      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 2)
      const dueItems = await engine.getDueItems(testProfile, tomorrow)

      // letter_m should not be due yet (interval = 1 day from today)
      const mItemDue = dueItems.find(i => i.id === 'letter_m')
      expect(mItemDue).toBeUndefined()
    })
  })

  describe('logReview', () => {
    it('should keep item in massed practice until 3 correct in a row', async () => {
      await engine.seedItems(testProfile, testItems)

      // First correct → still in massed practice (interval = 0)
      await engine.logReview(testProfile, 'letter_m', 'correct', {
        raw_response: 'test',
        response_time_ms: 1000,
        hints_used: 0
      })

      let state = await engine.getItemState(testProfile, 'letter_m')
      expect(state.interval_days).toBe(0)  // Show again in same session
      expect(state.correct_streak).toBe(1)
      expect(state.learning_threshold_met).toBe(false)

      // Second correct → still in massed practice
      await engine.logReview(testProfile, 'letter_m', 'correct', {
        raw_response: 'test',
        response_time_ms: 1000,
        hints_used: 0
      })

      state = await engine.getItemState(testProfile, 'letter_m')
      expect(state.interval_days).toBe(0)  // Show again in same session
      expect(state.correct_streak).toBe(2)
      expect(state.learning_threshold_met).toBe(false)

      // Third correct → GRADUATED to spacing!
      await engine.logReview(testProfile, 'letter_m', 'correct', {
        raw_response: 'test',
        response_time_ms: 1000,
        hints_used: 0
      })

      state = await engine.getItemState(testProfile, 'letter_m')
      expect(state.interval_days).toBe(1)  // Now 1-day interval
      expect(state.correct_streak).toBe(3)
      expect(state.learning_threshold_met).toBe(true)
      expect(state.status).toBe('maturing')
    })

    it('should double interval after graduation', async () => {
      await engine.seedItems(testProfile, testItems)

      // Graduate item (3 correct in a row)
      for (let i = 0; i < 3; i++) {
        await engine.logReview(testProfile, 'letter_m', 'correct', {
          raw_response: 'test',
          response_time_ms: 1000,
          hints_used: 0
        })
      }

      let state = await engine.getItemState(testProfile, 'letter_m')
      expect(state.interval_days).toBe(1)
      expect(state.learning_threshold_met).toBe(true)

      // Move next_due to today
      state.next_due = new Date()
      await engine.updateItemState(testProfile, state)

      // Fourth correct → double to 2 days
      await engine.logReview(testProfile, 'letter_m', 'correct', {
        raw_response: 'test',
        response_time_ms: 1000,
        hints_used: 0
      })

      state = await engine.getItemState(testProfile, 'letter_m')
      expect(state.interval_days).toBe(2)  // 1 * 2 = 2
    })

    it('should reset to massed practice on incorrect rating', async () => {
      await engine.seedItems(testProfile, testItems)

      // Graduate item
      for (let i = 0; i < 3; i++) {
        await engine.logReview(testProfile, 'letter_m', 'correct', {
          raw_response: 'test',
          response_time_ms: 1000,
          hints_used: 0
        })
      }

      // Incorrect → reset to massed practice
      await engine.logReview(testProfile, 'letter_m', 'incorrect', {
        raw_response: 'test',
        response_time_ms: 1000,
        hints_used: 0
      })

      const state = await engine.getItemState(testProfile, 'letter_m')
      expect(state.interval_days).toBe(0)  // Back to massed practice
      expect(state.correct_streak).toBe(0)
      expect(state.learning_threshold_met).toBe(false)  // Reset flag
      expect(state.status).toBe('learning')
      expect(state.error_count).toBe(1)
    })

    it('should handle needed_help rating during massed practice', async () => {
      await engine.seedItems(testProfile, testItems)

      // First correct
      await engine.logReview(testProfile, 'letter_m', 'correct', {
        raw_response: 'test',
        response_time_ms: 1000,
        hints_used: 0
      })

      let state = await engine.getItemState(testProfile, 'letter_m')
      expect(state.correct_streak).toBe(1)

      // Needed help → reduce streak, keep in massed practice
      await engine.logReview(testProfile, 'letter_m', 'needed_help', {
        raw_response: 'test',
        response_time_ms: 1000,
        hints_used: 1
      })

      state = await engine.getItemState(testProfile, 'letter_m')
      expect(state.interval_days).toBe(0)  // Still in massed practice
      expect(state.correct_streak).toBe(0)  // Streak reduced
      expect(state.learning_threshold_met).toBe(false)
    })

    it('should save response data with review', async () => {
      await engine.seedItems(testProfile, testItems)

      const responseData = {
        raw_response: 'parent_graded_mmm',
        response_time_ms: 2300,
        hints_used: 0,
        context: { item_id: 'letter_m' }
      }

      await engine.logReview(testProfile, 'letter_m', 'correct', responseData)

      const review = await engine.getLastReview(testProfile, 'letter_m')
      expect(review?.response_data).toEqual(responseData)
    })
  })

  describe('getItemState', () => {
    it('should return item state', async () => {
      await engine.seedItems(testProfile, testItems)
      const state = await engine.getItemState(testProfile, 'letter_m')

      expect(state).toBeDefined()
      expect(state.item_id).toBe('letter_m')
      expect(state.profile_id).toBe(testProfile)
      expect(state.status).toBe('new')
    })
  })
})
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/core/__tests__/sr-engine.test.ts`
Expected: FAIL - "Cannot find module '../sr-engine'"

**Step 3: Implement SR engine**

Create `/Users/jay/Documents/rocketreading/src/core/sr-engine.ts`:
```typescript
import { Item, ItemState, Review, ResponseData, Rating } from '../types'

export class SREngine {
  private db: IDBDatabase | null = null
  private dbName = 'rocketreading_db'
  private version = 1

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create object stores
        if (!db.objectStoreNames.contains('items')) {
          db.createObjectStore('items', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('item_states')) {
          const store = db.createObjectStore('item_states', { keyPath: ['profile_id', 'item_id'] })
          store.createIndex('profile_id', 'profile_id', { unique: false })
          store.createIndex('next_due', 'next_due', { unique: false })
        }
        if (!db.objectStoreNames.contains('reviews')) {
          const store = db.createObjectStore('reviews', { keyPath: 'id', autoIncrement: true })
          store.createIndex('profile_id', 'profile_id', { unique: false })
          store.createIndex('item_id', 'item_id', { unique: false })
        }
      }
    })
  }

  async seedItems(profileId: string, items: Item[]): Promise<void> {
    if (!this.db) throw new Error('Database not initialized')

    const tx = this.db.transaction(['items', 'item_states'], 'readwrite')

    items.forEach(item => {
      tx.objectStore('items').put(item)

      const itemState: ItemState = {
        item_id: item.id,
        profile_id: profileId,
        last_seen: new Date(),
        next_due: new Date(), // Due immediately
        interval_days: 0,  // Start in massed practice
        correct_streak: 0,
        error_count: 0,
        status: 'new',
        learning_threshold_met: false  // Not yet graduated
      }
      tx.objectStore('item_states').put(itemState)
    })

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  }

  async getDueItems(profileId: string, date: Date): Promise<Item[]> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['item_states', 'items'], 'readonly')
      const stateStore = tx.objectStore('item_states')
      const itemStore = tx.objectStore('items')

      const index = stateStore.index('profile_id')
      const range = IDBKeyRange.only(profileId)
      const request = index.getAll(range)

      request.onsuccess = () => {
        const states = request.result as ItemState[]
        const dueStates = states.filter(s => new Date(s.next_due) <= date)

        const dueItems: Item[] = []
        dueStates.forEach(state => {
          const itemRequest = itemStore.get(state.item_id)
          itemRequest.onsuccess = () => {
            const item = itemRequest.result as Item
            if (item) dueItems.push(item)
          }
        })

        tx.oncomplete = () => resolve(dueItems)
      }

      request.onerror = () => reject(request.error)
    })
  }

  async logReview(profileId: string, itemId: string, rating: Rating, responseData: ResponseData): Promise<void> {
    if (!this.db) throw new Error('Database not initialized')

    const state = await this.getItemState(profileId, itemId)
    const now = new Date()

    // Massed + Spaced Hybrid Algorithm
    const LEARNING_THRESHOLD = 3  // Need 3 correct in a row to graduate

    let newInterval = state.interval_days
    let newStreak = state.correct_streak
    let newErrors = state.error_count
    let newStatus = state.status
    let newLearningThresholdMet = state.learning_threshold_met

    if (rating === 'correct') {
      newStreak = state.correct_streak + 1

      if (!state.learning_threshold_met) {
        // MASSED PRACTICE PHASE
        if (newStreak >= LEARNING_THRESHOLD) {
          // GRADUATED to spacing!
          newInterval = 1  // Start with 1-day interval
          newLearningThresholdMet = true
          newStatus = 'maturing'
        } else {
          // Still in massed practice
          newInterval = 0  // Show again in same session
          newStatus = 'learning'
        }
      } else {
        // SPACED PRACTICE PHASE (already graduated)
        newInterval = Math.min(state.interval_days * 2, 30)  // Double, cap at 30 days
        newStatus = 'maturing'
      }
    } else if (rating === 'incorrect') {
      // Reset to massed practice
      newInterval = 0  // Show again in same session
      newStreak = 0
      newErrors = state.error_count + 1
      newLearningThresholdMet = false  // Reset graduation flag
      newStatus = 'learning'
    } else if (rating === 'needed_help') {
      // Reduce streak, keep in current phase
      if (!state.learning_threshold_met) {
        // In massed practice: reduce streak, stay in session
        newInterval = 0
        newStreak = Math.max(0, state.correct_streak - 1)
      } else {
        // In spaced practice: reduce interval
        newInterval = Math.max(Math.ceil(state.interval_days * 0.5), 1)
        newStreak = 0
      }
    }

    // Calculate next_due date
    const nextDue = newInterval === 0
      ? now  // Due immediately (show again in same session)
      : new Date(now.getTime() + newInterval * 24 * 60 * 60 * 1000)

    // Update item state
    const updatedState: ItemState = {
      ...state,
      last_seen: now,
      next_due: nextDue,
      interval_days: newInterval,
      correct_streak: newStreak,
      error_count: newErrors,
      status: newStatus,
      learning_threshold_met: newLearningThresholdMet
    }

    await this.updateItemState(profileId, updatedState)

    // Save review
    const review: Review = {
      id: `review_${profileId}_${itemId}_${Date.now()}`,
      profile_id: profileId,
      item_id: itemId,
      timestamp: now,
      rating,
      response_data: responseData,
      mode: 'co_play'
    }

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['reviews'], 'readwrite')
      const request = tx.objectStore('reviews').add(review)

      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  }

  async getItemState(profileId: string, itemId: string): Promise<ItemState> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['item_states'], 'readonly')
      const request = tx.objectStore('item_states').get([profileId, itemId])

      request.onsuccess = () => {
        const state = request.result as ItemState
        if (!state) {
          reject(new Error(`ItemState not found for ${itemId}`))
        } else {
          resolve(state)
        }
      }

      request.onerror = () => reject(request.error)
    })
  }

  async updateItemState(profileId: string, state: ItemState): Promise<void> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['item_states'], 'readwrite')
      const request = tx.objectStore('item_states').put(state)

      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  }

  async getAllItems(profileId: string): Promise<Item[]> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['item_states', 'items'], 'readonly')
      const stateStore = tx.objectStore('item_states')
      const itemStore = tx.objectStore('items')

      const index = stateStore.index('profile_id')
      const range = IDBKeyRange.only(profileId)
      const request = index.getAll(range)

      request.onsuccess = () => {
        const states = request.result as ItemState[]
        const items: Item[] = []

        states.forEach(state => {
          const itemRequest = itemStore.get(state.item_id)
          itemRequest.onsuccess = () => {
            const item = itemRequest.result as Item
            if (item) items.push(item)
          }
        })

        tx.oncomplete = () => resolve(items)
      }

      request.onerror = () => reject(request.error)
    })
  }

  async getLastReview(profileId: string, itemId: string): Promise<Review | undefined> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['reviews'], 'readonly')
      const store = tx.objectStore('reviews')
      const index = store.index('item_id')

      const request = index.getAll(itemId)

      request.onsuccess = () => {
        const reviews = request.result as Review[]
        const sorted = reviews.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        resolve(sorted[0])
      }

      request.onerror = () => reject(request.error)
    })
  }
}
```

**Step 4: Run tests to verify they pass**

Run: `npm test -- src/core/__tests__/sr-engine.test.ts`
Expected: PASS (all tests)

**Step 5: Commit**

```bash
git add src/core/
git commit -m "feat: implement SR engine with IndexedDB storage"
```

---

## Mini-Game Framework

### Task 4: Create mini-game framework and Letter → Sound mini-game

**Files:**
- Create: `src/core/mini-game.ts`
- Create: `src/ui/components/LetterSoundGame.tsx`
- Create: `src/ui/components/__tests__/LetterSoundGame.test.tsx`

**Step 1: Create mini-game abstract interface**

Create `/Users/jay/Documents/rocketreading/src/core/mini-game.ts`:
```typescript
import { Item, MiniGameConfig, Rating, ResponseData } from '../types'

export interface MiniGameState {
  isLoading: boolean
  isSubmitting: boolean
  error: string | null
}

export abstract class MiniGame {
  protected item: Item
  protected config: MiniGameConfig
  protected responseStartTime: number = 0

  constructor(config: MiniGameConfig) {
    this.item = config.item
    this.config = config
  }

  abstract render(): React.ReactNode

  abstract captureResponse(): Promise<ResponseData>

  abstract showGradingUI(): React.ReactNode

  abstract submitReview(rating: Rating, responseData: ResponseData): Promise<void>

  protected calculateResponseTime(): number {
    return Date.now() - this.responseStartTime
  }

  protected startTimer(): void {
    this.responseStartTime = Date.now()
  }
}
```

**Step 2: Write failing test for LetterSoundGame**

Create `/Users/jay/Documents/rocketreading/src/ui/components/__tests__/LetterSoundGame.test.tsx`:
```typescript
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
```

**Step 3: Run test to verify it fails**

Run: `npm test -- src/ui/components/__tests__/LetterSoundGame.test.tsx`
Expected: FAIL - "Cannot find module '../LetterSoundGame'"

**Step 4: Create LetterSoundGame component**

**NOTE:** Grading buttons are code-based (CSS + emoji), NOT image files. This reduces file count and makes styling easier to change.

Create `/Users/jay/Documents/rocketreading/src/ui/components/LetterSoundGame.tsx`:
```typescript
import React, { useState, useEffect } from 'react'
import { Item, Rating, ResponseData } from '../../types'
import styles from './LetterSoundGame.module.css'

interface LetterSoundGameProps {
  item: Item
  onSubmit: (rating: Rating, responseData: ResponseData) => Promise<void>
}

export const LetterSoundGame: React.FC<LetterSoundGameProps> = ({ item, onSubmit }) => {
  const [startTime, setStartTime] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setStartTime(Date.now())
  }, [])

  const handleGrade = async (rating: Rating) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    const responseTime = Date.now() - startTime

    const responseData: ResponseData = {
      raw_response: 'parent_graded',
      response_time_ms: responseTime,
      hints_used: 0,
      context: { item_id: item.id }
    }

    await onSubmit(rating, responseData)
    setIsSubmitting(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.prompt}>
        <p>What sound does this letter make?</p>
      </div>

      <div className={styles.letter}>
        {item.content}
      </div>

      <div className={styles.instructions}>
        <p>Listen and have your child say the sound aloud.</p>
      </div>

      {/* CODE-BASED BUTTONS: Uses CSS + Unicode emoji (✅😬❌), no image files needed */}
      <div className={styles.gradingButtons}>
        <button
          className={`${styles.button} ${styles.buttonCorrect}`}
          onClick={() => handleGrade('correct')}
          disabled={isSubmitting}
        >
          ✅ Got it
        </button>
        <button
          className={`${styles.button} ${styles.buttonHelp}`}
          onClick={() => handleGrade('needed_help')}
          disabled={isSubmitting}
        >
          😬 Needed help
        </button>
        <button
          className={`${styles.button} ${styles.buttonWrong}`}
          onClick={() => handleGrade('incorrect')}
          disabled={isSubmitting}
        >
          ❌ Didn't know
        </button>
      </div>
    </div>
  )
}
```

**Step 5: Create CSS module for styling**

**NOTE:** All visual styling (backgrounds, button colors, hover/press animations) is CSS-based. No image files required.

Create `/Users/jay/Documents/rocketreading/src/ui/components/LetterSoundGame.module.css`:
```css
/* CODE-BASED UI: Background gradients, button styling, and animations */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.prompt {
  font-size: 1.5rem;
  color: white;
  text-align: center;
  margin-bottom: 40px;
  font-weight: bold;
}

.letter {
  font-size: 120px;
  font-weight: bold;
  color: white;
  margin: 40px 0;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
}

.instructions {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-bottom: 60px;
}

.gradingButtons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.button {
  padding: 15px 30px;
  font-size: 1.2rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
  min-width: 150px;
  min-height: 60px;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button:active:not(:disabled) {
  transform: scale(0.95);
}

.buttonCorrect {
  background-color: #4CAF50;
  color: white;
}

.buttonCorrect:hover:not(:disabled) {
  background-color: #45a049;
}

.buttonHelp {
  background-color: #ff9800;
  color: white;
}

.buttonHelp:hover:not(:disabled) {
  background-color: #e68900;
}

.buttonWrong {
  background-color: #f44336;
  color: white;
}

.buttonWrong:hover:not(:disabled) {
  background-color: #da190b;
}
```

**Step 6: Run tests to verify they pass**

Run: `npm test -- src/ui/components/__tests__/LetterSoundGame.test.tsx`
Expected: PASS

**Step 7: Commit**

```bash
git add src/core/mini-game.ts src/ui/components/LetterSoundGame.*
git commit -m "feat: implement mini-game framework and Letter Sound mini-game"
```

---

## Profile & Session Management

### Task 5: Create profile setup and session management

**Files:**
- Create: `src/core/profile-manager.ts`
- Create: `src/ui/components/ProfileSetup.tsx`
- Create: `src/ui/components/SessionScreen.tsx`

**Step 1: Create profile manager**

Create `/Users/jay/Documents/rocketreading/src/core/profile-manager.ts`:
```typescript
import { Profile } from '../types'

export class ProfileManager {
  private profileKey = 'rocketreading_profile'

  async createProfile(name: string, age: number): Promise<Profile> {
    const profile: Profile = {
      id: `child_${Date.now()}`,
      name,
      age,
      created_at: new Date(),
      current_world: 1
    }

    localStorage.setItem(this.profileKey, JSON.stringify(profile))
    return profile
  }

  async getProfile(): Promise<Profile | null> {
    const stored = localStorage.getItem(this.profileKey)
    if (!stored) return null

    const profile = JSON.parse(stored) as Profile
    profile.created_at = new Date(profile.created_at)
    return profile
  }

  async hasProfile(): Promise<boolean> {
    return localStorage.getItem(this.profileKey) !== null
  }
}
```

**Step 2: Create ProfileSetup component**

Create `/Users/jay/Documents/rocketreading/src/ui/components/ProfileSetup.tsx`:
```typescript
import React, { useState } from 'react'
import { Profile } from '../../types'
import styles from './ProfileSetup.module.css'

interface ProfileSetupProps {
  onProfileCreated: (profile: Profile) => void
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ onProfileCreated }) => {
  const [name, setName] = useState('')
  const [age, setAge] = useState(3)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const profile: Profile = {
      id: `child_${Date.now()}`,
      name,
      age,
      created_at: new Date(),
      current_world: 1
    }

    localStorage.setItem('rocketreading_profile', JSON.stringify(profile))
    onProfileCreated(profile)
  }

  return (
    <div className={styles.container}>
      <h1>Welcome to Rocket Reading!</h1>
      <p>Let's set up your child's profile</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Child's Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Emma"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="age">Age</label>
          <select
            id="age"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            disabled={isSubmitting}
          >
            <option value={2.5}>2.5 years</option>
            <option value={3}>3 years</option>
            <option value={4}>4 years</option>
            <option value={5}>5 years</option>
            <option value={6}>6 years</option>
          </select>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Setting up...' : 'Let\'s Go!'}
        </button>
      </form>
    </div>
  )
}
```

**Step 3: Create ProfileSetup styles**

Create `/Users/jay/Documents/rocketreading/src/ui/components/ProfileSetup.module.css`:
```css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.container h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.container p {
  font-size: 1.2rem;
  margin-bottom: 40px;
  opacity: 0.9;
}

.form {
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
}

.formGroup {
  margin-bottom: 20px;
}

.formGroup label {
  display: block;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.formGroup input,
.formGroup select {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
}

.formGroup input:focus,
.formGroup select:focus {
  outline: none;
  border-color: white;
}

.form button {
  width: 100%;
  padding: 15px;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.form button:hover:not(:disabled) {
  background-color: #45a049;
}

.form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

**Step 4: Create SessionScreen component**

Create `/Users/jay/Documents/rocketreading/src/ui/components/SessionScreen.tsx`:
```typescript
import React, { useState, useEffect } from 'react'
import { Profile, Item } from '../../types'
import { SREngine } from '../../core/sr-engine'
import { LetterSoundGame } from './LetterSoundGame'
import styles from './SessionScreen.module.css'

const SEED_ITEMS: Item[] = [
  { id: 'letter_m', type: 'letter', content: 'm', world: 1, metadata: { phonics_coverage: ['m'] } },
  { id: 'letter_a', type: 'letter', content: 'a', world: 1, metadata: { phonics_coverage: ['a'] } },
  { id: 'letter_t', type: 'letter', content: 't', world: 1, metadata: { phonics_coverage: ['t'] } },
  { id: 'letter_s', type: 'letter', content: 's', world: 1, metadata: { phonics_coverage: ['s'] } },
  { id: 'letter_i', type: 'letter', content: 'i', world: 1, metadata: { phonics_coverage: ['i'] } },
]

interface SessionScreenProps {
  profile: Profile
  onSessionComplete: () => void
}

export const SessionScreen: React.FC<SessionScreenProps> = ({ profile, onSessionComplete }) => {
  const [srEngine] = useState(() => new SREngine())
  const [dueItems, setDueItems] = useState<Item[]>([])
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [sessionComplete, setSessionComplete] = useState(false)

  useEffect(() => {
    const initializeSession = async () => {
      try {
        await srEngine.initialize()

        // Seed items if not already seeded
        const existingItems = await srEngine.getAllItems(profile.id)
        if (existingItems.length === 0) {
          await srEngine.seedItems(profile.id, SEED_ITEMS)
        }

        // Get due items
        const items = await srEngine.getDueItems(profile.id, new Date())
        setDueItems(items.slice(0, 5)) // Limit to 5 items per session
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to initialize session:', error)
        setIsLoading(false)
      }
    }

    initializeSession()
  }, [profile.id, srEngine])

  const handleGameSubmit = async (rating: 'correct' | 'needed_help' | 'incorrect', responseData: any) => {
    try {
      const currentItem = dueItems[currentItemIndex]
      await srEngine.logReview(profile.id, currentItem.id, rating, responseData)

      if (currentItemIndex < dueItems.length - 1) {
        setCurrentItemIndex(currentItemIndex + 1)
      } else {
        setSessionComplete(true)
      }
    } catch (error) {
      console.error('Failed to submit review:', error)
    }
  }

  if (isLoading) {
    return <div className={styles.container}>Loading session...</div>
  }

  if (dueItems.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.message}>No items due today. Great job!</div>
        <button onClick={onSessionComplete}>Back Home</button>
      </div>
    )
  }

  if (sessionComplete) {
    return (
      <div className={styles.completionScreen}>
        <h1>You grew your reading power today! 🎉</h1>
        <p>You completed {dueItems.length} reviews</p>
        <button onClick={onSessionComplete}>Done</button>
      </div>
    )
  }

  const currentItem = dueItems[currentItemIndex]
  return (
    <div>
      <div className={styles.sessionInfo}>
        <p>Item {currentItemIndex + 1} of {dueItems.length}</p>
      </div>
      <LetterSoundGame
        item={currentItem}
        onSubmit={handleGameSubmit}
      />
    </div>
  )
}
```

**Step 5: Create SessionScreen styles**

Create `/Users/jay/Documents/rocketreading/src/ui/components/SessionScreen.module.css`:
```css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.message {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 40px;
}

.container button {
  padding: 15px 40px;
  font-size: 1.2rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.completionScreen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.completionScreen h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.completionScreen p {
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.completionScreen button {
  padding: 15px 40px;
  font-size: 1.2rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.sessionInfo {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 0.9rem;
}
```

**Step 6: Create main App component**

Create `/Users/jay/Documents/rocketreading/src/ui/App.tsx`:
```typescript
import React, { useState, useEffect } from 'react'
import { Profile } from '../types'
import { ProfileSetup } from './components/ProfileSetup'
import { SessionScreen } from './components/SessionScreen'
import styles from './App.module.css'

export const App: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isInSession, setIsInSession] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProfile = () => {
      const stored = localStorage.getItem('rocketreading_profile')
      if (stored) {
        const p = JSON.parse(stored) as Profile
        p.created_at = new Date(p.created_at)
        setProfile(p)
      }
      setIsLoading(false)
    }

    loadProfile()
  }, [])

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>
  }

  if (!profile) {
    return <ProfileSetup onProfileCreated={setProfile} />
  }

  if (isInSession) {
    return (
      <SessionScreen
        profile={profile}
        onSessionComplete={() => setIsInSession(false)}
      />
    )
  }

  return (
    <div className={styles.homeScreen}>
      <h1>Hi {profile.name}! 👋</h1>
      <p>Ready to grow your reading power?</p>
      <button onClick={() => setIsInSession(true)}>Let's Go!</button>
    </div>
  )
}
```

**Step 7: Create App styles**

Create `/Users/jay/Documents/rocketreading/src/ui/App.module.css`:
```css
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.homeScreen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.homeScreen h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.homeScreen p {
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.homeScreen button {
  padding: 20px 60px;
  font-size: 1.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.homeScreen button:hover {
  background-color: #45a049;
}
```

**Step 8: Create main entry point**

Create `/Users/jay/Documents/rocketreading/src/main.tsx`:
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './ui/App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

**Step 9: Create global styles**

Create `/Users/jay/Documents/rocketreading/src/index.css`:
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button {
  font-family: inherit;
}

input, select {
  font-family: inherit;
}
```

**Step 10: Run app and verify it works**

Run: `npm run dev`
Expected: App opens in browser at http://localhost:3000

**Step 11: Test basic flow manually**
- Create profile with child name
- Click "Let's Go!"
- See Letter → Sound game
- Grade each item with buttons
- Complete session

**Step 12: Commit**

```bash
git add src/ui/ src/core/profile-manager.ts src/main.tsx src/index.css public/
git commit -m "feat: implement profile setup, session management, and home screen"
```

---

## Testing & Validation

### Task 6: Run all tests and validate slice completion

**Step 1: Run all tests**

Run: `npm test`
Expected: All tests pass (100%+ coverage for core logic)

**Step 2: Manual cross-browser testing**

- [ ] Test on Chrome desktop
- [ ] Test on Firefox desktop
- [ ] Test on Safari (if available)
- [ ] Test on iPad Safari (if available)
- [ ] Verify data persists after browser refresh

**Step 3: Build for production**

Run: `npm run build`
Expected: Bundle created in `dist/` folder

**Step 4: Test production build**

Run: `npm run build && npm run preview`
Expected: App works in production mode

**Step 5: Final commit**

```bash
git add -A
git commit -m "test: all tests passing, cross-browser validation complete"
```

---

## Documentation & Architecture Update

### Task 7: Update SYSTEM-ARCHITECTURE.md with implementation learnings

**Files:**
- Modify: `docs/architecture/SYSTEM-ARCHITECTURE.md`

**Step 1: Document tech stack decisions**

In SYSTEM-ARCHITECTURE.md, add to "Technology Stack" section:

```markdown
### Phase 1 Implementation Decisions (Slice 1)

**Tech Stack Chosen:**
- **Frontend:** React 18 + TypeScript + Vite (chosen for: fast iteration, great testing, responsive design)
- **Core Logic:** TypeScript in browser (runs via bundled module, platform-agnostic)
- **Storage:** IndexedDB (offline-first, no backend required for Phase 1)
- **Testing:** Jest + React Testing Library (unit + integration tests)
- **Build:** Vite with React plugin

**Rationale:**
- React allows rapid UI iteration
- TypeScript enforces type safety for core logic
- IndexedDB enables offline-first functionality
- All core logic (SR engine) runs in browser, enabling easy migration to native platforms later
```

**Step 2: Document SR Engine implementation**

Add to "Core Systems" section:

```markdown
### 1. SR Engine (Implemented in Slice 1)

**Implementation Details:**

**Storage:** IndexedDB with three object stores:
- `items`: Item definitions (id, type, content, metadata)
- `item_states`: Per-item learning state (last_seen, next_due, interval, streak, status)
- `reviews`: Review history with response data

**Algorithm Implemented:**
- New item, first ✅ → interval = 1 day
- New item, second ✅ → interval = 3 days
- Mature item, ✅ → interval *= 2 (max 30 days)
- Any ❌ → interval = 1 day, status = "learning"
- 😬 → interval *= 0.5 (min 1 day)

**Response Logging:** Every review stores ResponseData with raw_response, response_time_ms, hints_used, and context. This enables future Adventure Mode without refactoring Co-Play code.

**Key Methods:**
- `getDueItems(profileId, date)`: Query items due for review
- `logReview(profileId, itemId, rating, responseData)`: Update interval based on rating
- `getItemState(profileId, itemId)`: Get current learning state
```

**Step 3: Document mini-game framework**

Add to "Core Systems" section:

```markdown
### 3. Mini-Game Framework (Implemented in Slice 1)

**Implementation:**

Abstract MiniGame class with:
- `render()`: Display UI
- `captureResponse()`: Get child's response
- `showGradingUI()`: Display parent buttons
- `submitReview()`: Send rating + response data to SR engine

**First Implementation: LetterSoundGame**
- Displays large letter
- Prompts child to say sound
- Parent grades with three buttons: ✅ (Got it), 😬 (Needed help), ❌ (Didn't know)
- Logs response data (time, hints, context)

**Response Logging (CRITICAL for Adventure Mode):**
- `raw_response`: "parent_graded" (in Co-Play, parent provides rating)
- `response_time_ms`: Time from prompt to parent tap
- `hints_used`: 0 (no hint system in Slice 1)
- `context`: { item_id: string }
```

**Step 4: Document data models**

Add to "Core Systems" section:

```markdown
### Data Models (Slice 1)

**Item:**
```
{
  id: "letter_m",
  type: "letter",
  content: "m",
  world: 1,
  metadata: { phonics_coverage: ["m"] }
}
```

**ItemState:**
```
{
  item_id: "letter_m",
  profile_id: "child_1",
  last_seen: Date,
  next_due: Date,
  interval_days: 1,
  correct_streak: 0,
  error_count: 0,
  status: "new"
}
```

**ResponseData (CRITICAL):**
```
{
  raw_response: "parent_graded",
  response_time_ms: 2300,
  hints_used: 0,
  context: { item_id: "letter_m" }
}
```
```

**Step 5: Document platform separation strategy**

Add to "Technology Stack" section:

```markdown
### Platform Separation Strategy

**Core Logic (Platform-Agnostic):**
- SR Engine (IndexedDB in browser, but logic is platform-independent)
- Mini-Game Framework (abstract interface, easily ported to native)
- Response Logging (consistent data model for all platforms)

**UI Layer (Swappable):**
- Phase 1: React web UI
- Phase 2+: Native iPad UI (SwiftUI) will reuse SR engine and mini-game logic

**Key Principle:** All business logic lives in the core layer. UI is thin and focused on rendering + capturing user input. This allows us to build native iPad app on top of same core logic without rewriting anything.

**How Core Logic Will Be Shared:**
- Bundle SR engine as standalone module (can be imported into native iOS Swift via FFI or rewrite core logic in Swift while keeping same algorithm)
- Mini-game interface defines contract; native platforms implement same interface
- Response logging format stays consistent across all platforms
```

**Step 6: Commit architecture updates**

```bash
git add docs/architecture/SYSTEM-ARCHITECTURE.md
git commit -m "docs: update architecture with Phase 1 implementation details"
```

---

## Final Checklist & Completion

### Task 8: Verify slice completion criteria

**Slice 1 Completion Checklist:**

- [ ] Web app loads successfully in browser (Chrome, Firefox, Safari)
- [ ] Works on desktop, tablet, iPad, and Android browsers
- [ ] Parent can create child profile (name, age)
- [ ] Session shows 5 letter-sound items with parent grading
- [ ] SR engine updates intervals correctly (validated with tests)
- [ ] Response logging works for Letter → Sound mini-game
- [ ] Session completes and returns to home screen
- [ ] Data persists across browser refresh
- [ ] Core logic is platform-agnostic (ready for native iPad/Android later)
- [ ] Unit tests pass (80%+ coverage for SR engine)
- [ ] Integration tests pass (session flow)
- [ ] Architecture doc updated with tech decisions and learnings
- [ ] Code committed to git with clear messages

**Validation Dimensions:**

1. **Fun (Engagement):**
   - [ ] Mascot greeting feels friendly
   - [ ] Grading buttons are clear and easy to tap
   - [ ] Session feels like play, not drill
   - [ ] Parent finds experience intuitive

2. **Pedagogy (Learning):**
   - [ ] SR interval logic makes sense (spacing works)
   - [ ] Parent can accurately grade children's responses
   - [ ] 5 letter-sound items are age-appropriate
   - [ ] Response data will support future learning inference

3. **Architecture (Maintainability):**
   - [ ] SR engine is testable and extensible
   - [ ] Mini-game framework allows easy addition of new types
   - [ ] Response logging is consistent across mini-games
   - [ ] Code is platform-agnostic (can be reused for native apps)
   - [ ] Storage strategy supports scale (10 → 100+ items)

**If any dimension fails:** Document failure, propose adjustments, discuss with human before proceeding to Slice 2.

---

## Summary

This plan delivers:
1. **Core SR Engine:** Interval scheduling, review logging, persistent storage
2. **Mini-Game Framework:** Abstract interface for pluggable mini-games
3. **Letter → Sound Game:** First working mini-game with response logging
4. **Profile & Session Management:** Parent setup, session tracking, data persistence
5. **Web App:** React-based UI that works on desktop, tablet, iPad, Android browsers
6. **Testing:** Unit + integration tests with 80%+ coverage
7. **Architecture Documentation:** Tech decisions and platform separation strategy

**Next Steps After Slice 1:**
- Conduct human review and approval
- Manual validation with test users
- Proceed to Slice 2 (Sound → Letter mini-game + 8-12 letter items)

---

**Estimated Implementation Time:** 1-2 weeks (depending on tech stack familiarity)
