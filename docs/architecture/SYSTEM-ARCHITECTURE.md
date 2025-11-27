# Rocket Reading: System Architecture

**Version:** 0.2 (Slice 1 Complete)
**Last Updated:** 2025-11-26
**Status:** Phase 1 in progress (Slice 1 complete)

---

## Overview

This is the **single source of truth** for all technical decisions, data models, system designs, and architectural patterns in Rocket Reading. This document is a **living document** that grows and evolves as we build each slice.

**Important:** AI agents must read this document before working on any slice. Update this document immediately when making architectural decisions during implementation.

---

## Document Status

### Completed in Slice 1
- [x] Technology stack decisions (React, TypeScript, Vite, Jest)
- [x] Platform and build system setup (Web-first with Vite)
- [x] Core data models (Item, ItemState, Profile, Review, ResponseData)
- [x] SR Engine architecture (massed+spaced hybrid, IndexedDB)
- [x] Mini-game framework design (abstract class + LetterSoundGame)
- [x] Response logging specification (detailed ResponseData capture)
- [x] Local storage strategy (IndexedDB for offline-first)
- [x] Testing framework setup (Jest + React Testing Library + fake-indexeddb)

### To Be Completed in Future Slices
- [ ] Quest Generator implementation (Slice 3)
- [ ] Additional mini-game types (Slices 2-17)
- [ ] Personalization Engine (Slice 7)
- [ ] Parent Dashboard (Slice 5)
- [ ] Multi-profile support (Slice F1)

---

## Technology Stack

### Platform Strategy

**Phase 1 (Quick Feedback):** Web browser (desktop/tablet)
- Fastest iteration on core logic
- Easy to test with real users remotely
- Minimal platform-specific concerns

**Phase 2+ (Production Platforms):**
- iPad (iOS/iPadOS) — primary target
- Android tablet (future, post-iPad validation)
- Web as secondary/progressive web app (future)

**Rationale:** Build platform-agnostic backend logic + interchangeable UI layers. Web first allows rapid validation of core SR + quest generation + mini-games before investing in native platform work.

### Architecture: Backend-Driven, UI-Agnostic

**Core Logic (Platform-Agnostic):**
- SR engine (scheduling, interval updates, review logging)
- Quest generator (item bundling, theme mapping)
- Personalization engine (decodability checks, name injection)
- Data models (Items, Reviews, Profiles)

**UI Layer (Swappable):**
- Phase 1: Web (React, Vue, or vanilla JS)
- Phase 2+: iPad (SwiftUI)
- Phase 3+: Android (Kotlin/Jetpack Compose)

**Principle:** Core logic is platform-agnostic. UI is thin and focused on rendering + capture. All business logic lives in core systems.

### Phase 1 Technology Stack (✅ Decided in Slice 1)

**Core Logic & Frontend:**
- **Language:** TypeScript (type safety, excellent DX, broad ecosystem)
- **Frontend Framework:** React 18 (component model, strong testing support, reusable for React Native later)
- **Build Tool:** Vite 7.2 (fast HMR, modern ESM-based, excellent DX)
- **Styling:** CSS Modules (scoped styles, no runtime overhead, simple mental model)

**Local Storage:**
- **Primary:** IndexedDB (browser-native, offline-first, structured queries)
- **Polyfill for Tests:** fake-indexeddb (enables Jest testing without browser)

**Testing:**
- **Framework:** Jest 29 (industry standard, excellent React support)
- **React Testing:** React Testing Library 16 (best practices for component testing)
- **Environment:** jsdom (simulates browser for Jest)

**Rationale:**
- TypeScript catches errors early, improves maintainability
- React ecosystem is mature, well-documented, widely used
- Vite provides instant feedback during development (sub-second HMR)
- IndexedDB supports complex queries needed for SR scheduling
- CSS Modules avoid global namespace pollution while keeping styling simple
- Jest + RTL enforce testing best practices

### Phase 2+ Technology Stack (Native Platforms)

**iPad (iOS/iPadOS):**
- Language: Swift
- Framework: SwiftUI
- Build: Xcode

**Android (if pursued):**
- Language: Kotlin
- Framework: Jetpack Compose
- Build: Android Studio

**Note:** Native platforms reuse the same core logic (SR engine, quest generator, etc.) but with platform-specific UI implementations.

### Key Libraries & Dependencies (Slice 1)

**Production Dependencies:**
- `react@18.3.1` - UI framework
- `react-dom@18.3.1` - React DOM renderer
- `typescript@5.9.3` - Type system
- `vite@7.2.4` - Build tool
- `@vitejs/plugin-react@5.1.1` - React support for Vite

**Development Dependencies:**
- `jest@29.7.0` - Test runner
- `ts-jest@29.4.5` - TypeScript support for Jest
- `@testing-library/react@16.3.0` - React component testing
- `@testing-library/jest-dom@6.9.1` - DOM matchers for Jest
- `@testing-library/user-event@14.6.1` - User interaction simulation
- `jest-environment-jsdom@29.7.0` - Browser environment for tests
- `fake-indexeddb@6.2.5` - IndexedDB polyfill for tests
- `identity-obj-proxy@3.0.0` - CSS module mocking for tests

### Build System (Slice 1)

**Build Configuration:** `vite.config.ts`
- Uses `@vitejs/plugin-react` for Fast Refresh
- Dev server on port 3000 with auto-open
- Production builds to `dist/` directory
- CSS modules auto-detected via `*.module.css` naming

**TypeScript Configuration:** `tsconfig.json`
- Target: ES2020
- JSX: react-jsx (new JSX transform)
- Strict mode enabled
- Module resolution: node

**Test Configuration:** `jest.config.js`
- Preset: ts-jest
- Environment: jsdom
- Matches: `**/__tests__/**/*.test.{ts,tsx}`
- Setup: `src/setupTests.ts` (loads polyfills)
- Coverage: src/**/*.{ts,tsx} (excludes tests)

### Development Environment (Slice 1)

**Required:**
- Node.js 23.3.0 (or compatible)
- npm 10.9.0

**Scripts:**
- `npm run dev` - Start Vite dev server (http://localhost:3000)
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode

**Hot Module Replacement:**
- Vite provides instant HMR for React components
- Changes reflect in browser within 100ms
- State preservation during HMR when possible

---

## System Components

### Architecture Overview: Platform-Agnostic Core + Swappable UI

```
Phase 1 (Web) / Phase 2+ (Native):

┌──────────────────────────────────────────────────────────────┐
│  PRESENTATION LAYER (Swappable UI)                           │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Phase 1: Web UI (React/Vue)                                 │
│  ├─ Welcome Screen                                           │
│  ├─ Session View (mini-game rendering)                       │
│  ├─ Parent Dashboard UI                                      │
│  └─ Parent Settings (My World form)                          │
│                                                               │
│  Phase 2+: iPad UI (SwiftUI)                                 │
│  Phase 3+: Android UI (Jetpack Compose)                      │
│                                                               │
└──────────────────────────────────────────────────────────────┘
              ↓ (API calls / state updates)
┌──────────────────────────────────────────────────────────────┐
│  BUSINESS LOGIC LAYER (Platform-Agnostic Core)              │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Core Systems:                                               │
│  ├─ SR Engine                                                │
│  │  ├─ Scheduler (next_due calculation)                      │
│  │  ├─ Review Logger (rating → interval update)              │
│  │  └─ Item Store (CRUD)                                     │
│  │                                                            │
│  ├─ Quest Generator                                          │
│  │  ├─ Due Items Query                                       │
│  │  ├─ Theme/NPC Mapper                                      │
│  │  └─ Mini-Game Selector                                    │
│  │                                                            │
│  ├─ Personalization Engine                                   │
│  │  ├─ Decodability Checker                                  │
│  │  └─ Content Injection                                     │
│  │                                                            │
│  └─ Response Logger                                          │
│     └─ Captures all response data for future inference       │
│                                                               │
└──────────────────────────────────────────────────────────────┘
              ↓ (reads/writes)
┌──────────────────────────────────────────────────────────────┐
│  DATA LAYER (Persistent Storage)                             │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Phase 1: IndexedDB / SQLite (browser) - offline-first      │
│  Phase 2+: Local DB + cloud sync (TBD)                       │
│                                                               │
│  Stores:                                                      │
│  ├─ Items (letters, words, sentences, tricky words)          │
│  ├─ Profiles (child data)                                    │
│  ├─ Reviews (history + response data)                        │
│  ├─ ItemState (sr intervals, streaks, etc.)                  │
│  ├─ MyWorldData (family, pets, favorites)                    │
│  └─ Sessions (metadata about each session)                   │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

**Key Principle:** All business logic is in the core layer. UI layers are thin and focused on rendering + capturing user input. This allows us to:
- Iterate quickly on web UI during Phase 1
- Swap in native UIs in Phase 2+ without rewriting core logic
- Easy to test core logic independently of UI

---

## Core Systems

### 1. SR Engine (Spaced Repetition)

**Purpose:** Schedule item reviews, log responses, update intervals based on performance.

**Status:** ✅ Implemented in Slice 1

**Implementation:** `src/core/sr-engine.ts` (SREngine class)

**Key Responsibilities:**
- Maintain item library (letters, words, sentences, tricky words)
- Track review state per item (last_seen, interval, ease, streak, etc.)
- Compute daily "due" items
- Update intervals based on review ratings (✅/😬/❌)
- Support multiple item types (letters, words, sentences, tricky words)

**API (✅ Implemented):**
```typescript
class SREngine {
  async initialize(): Promise<void>
  async seedItems(profileId: string, items: Item[]): Promise<void>
  async getDueItems(profileId: string, date: Date): Promise<Item[]>
  async logReview(profileId: string, itemId: string, rating: Rating, responseData: ResponseData): Promise<void>
  async getItemState(profileId: string, itemId: string): Promise<ItemState>
  async updateItemState(profileId: string, state: ItemState): Promise<void>
  async getAllItems(profileId: string): Promise<Item[]>
  async getLastReview(profileId: string, itemId: string): Promise<Review | undefined>
}
```

**Storage Implementation:**
- Uses IndexedDB with three object stores:
  - `items` - Item library (keyPath: 'id')
  - `item_states` - Per-profile state tracking (keyPath: 'id' as composite `${profileId}_${itemId}`)
  - `reviews` - Review history with response data (keyPath: 'id')
- Indexes on `profile_id` and `next_due` for efficient queries
- All operations return Promises for async consistency

**Data Models:**
```typescript
// Preliminary - to be refined during implementation

interface Item {
  id: string
  type: "letter" | "word" | "sentence" | "tricky_word"
  content: string  // "m", "cat", "The dog is big.", "said"
  metadata: {
    phonics_coverage?: string[]  // ["m"], ["c", "a", "t"], etc.
    world: number                // 1, 2, 3, 4
    is_personalized?: boolean
  }
}

interface Review {
  id: string
  profile_id: string
  item_id: string
  timestamp: Date
  rating: "correct" | "needed_help" | "incorrect"
  response_data: ResponseData  // CRITICAL for future Adventure Mode
  mode: "co_play" | "adventure"
}

interface ResponseData {
  raw_response: string        // What child did (tap coords, voice input, etc.)
  response_time_ms: number    // Reaction time
  hints_used: number          // Number of hints requested
  context?: object            // Mini-game specific context
}

interface ItemState {
  item_id: string
  profile_id: string
  last_seen: Date
  next_due: Date
  interval_days: number
  ease_factor?: number        // Optional: Anki-style ease (Phase 2+)
  correct_streak: number
  error_count: number
  status: "new" | "learning" | "maturing" | "mastered" | "maintenance"
  learning_threshold_met: boolean  // Has item graduated from massed practice?
}
```

**Algorithm: Massed + Spaced Hybrid**

Combines massed practice (early learning) with spaced practice (long-term retention). Optimized for ages 2.5–5.

**Phase 1: Massed Practice (Learning)**
- New items need **3 correct in a row** before graduating to spaced intervals
- During learning: `interval = 0` (show again in same session)
- Items mixed within session to avoid boredom (not "m, m, m" but "m, a, t, m, a, s, m...")
- ❌ or 😬 → reset or reduce streak, show again same session

**Phase 2: Spaced Practice (Retention)**
- After 3 consecutive ✅ → `interval = 1 day` (graduated!)
- Subsequent ✅ → `interval *= 2` (max 30 days)
- ❌ → `interval = 1 day`, reset to learning
- 😬 → `interval *= 0.5` (min 1 day)

**Example Progression:**
```
Day 1, Session 1:
  Show /m/ → ✅ (streak=1, interval=0) → show again same session
  Show /m/ → ✅ (streak=2, interval=0) → show again same session
  Show /m/ → ✅ (streak=3, interval=1) → GRADUATED! Move to spacing

Day 2: Show /m/ → ✅ (interval=3 days)
Day 5: Show /m/ → ✅ (interval=6 days)
Day 11: Show /m/ → ✅ (interval=12 days)
Day 23: Show /m/ → ✅ (interval=24 days)
Day 47: Show /m/ → ✅ (interval=30 days, capped)
```

**Rationale:**
- Ages 2-5 need multiple exposures before encoding (massed practice)
- Spacing too early leads to forgetting before consolidation
- 3-correct threshold balances confidence-building with efficiency
- 30-day cap prevents items from being buried too long at this age
- Simpler than full SM-2 (easier to debug, validate with real kids)

**Storage:**
- Local-first (offline capable)
- Sync strategy: TBD (likely Phase 2+)

---

### 2. Quest Generator

**Purpose:** Convert due SR items into themed quests with NPCs, mini-games, and narrative.

**Status:** To be implemented in Slice 3

**Key Responsibilities:**
- Query SR engine for due items
- Group items by skill/world (e.g., all CVC words for Beaver Bridge)
- Select appropriate mini-game(s) for item types
- Assign NPC and quest narrative theme
- Generate quest sequence (2–4 mini-games chained together)

**API (preliminary):**
```
generateDailyQuests(profileId: string, date: Date) -> Quest[]
```

**Data Models:**
```typescript
// Preliminary - to be refined during implementation

interface Quest {
  id: string
  world: number
  npc: NPC
  narrative: string           // "The bridge is broken! Help me fix it!"
  mini_games: MiniGameConfig[]
  items: Item[]               // SR items to be reviewed in this quest
}

interface MiniGameConfig {
  type: "letter_sound" | "sound_letter" | "blend_word" | "read_word" | "read_sentence" | ...
  items: Item[]               // Subset of quest items for this mini-game
  theme: string               // Visual/narrative theme
}
```

**Logic:**
- Item type → mini-game mapping (e.g., letter items → "letter_sound" or "sound_letter")
- World → location/NPC mapping (e.g., World 2 → Beaver Bridge)
- Ensure variety (don't repeat same mini-game type 3x in a row)

---

### 3. Mini-Game Framework

**Purpose:** Pluggable system for implementing various mini-game types with consistent response logging and grading interface.

**Status:** ✅ Implemented in Slice 1 (LetterSoundGame complete)

**Implementation:**
- Abstract base class: `src/core/mini-game.ts` (MiniGame)
- First mini-game: `src/ui/components/LetterSoundGame.tsx`

**Key Responsibilities:**
- Display mini-game UI based on config
- Capture child's response (tap, voice, drag, etc.)
- **Log detailed response data (CRITICAL for Adventure Mode)**
- Display parent grading interface (Co-Play mode)
- Submit rating + response data to SR engine

**Mini-Game Types:**
(To be implemented incrementally across slices)

| Type | Introduced | Description |
|------|------------|-------------|
| `letter_sound` | ✅ Slice 1 | Show letter, child says sound, parent grades |
| `sound_letter` | Slice 2 | Play sound, child taps letter |
| `same_different` | Slice 4 | Play two sounds, child taps same/different |
| `first_sound` | Slice 4 | Play word, child taps matching first letter |
| `blend_word` | Slice 8 | Drag letter tiles, blend into word |
| `read_word` | Slice 8 | Show word, child reads, parent grades |
| `read_sentence` | Slice 11 | Show sentence, child reads, parent grades fluency |
| `blend_complex` | Slice 12 | Blend with digraphs/multi-phoneme patterns |
| `tricky_word` | Slice 15 | Recognize irregular high-frequency words |

**LetterSoundGame Implementation (Slice 1):**
- **UI Approach:** Code-based (CSS gradients + Unicode emoji, no image files)
- **Grading Buttons:** ✅ Got it / 😬 Needed help / ❌ Didn't know
- **Response Logging:** Captures response_time_ms, raw_response, hints_used
- **Styling:** CSS Modules with purple gradient background, responsive layout
- **Accessibility:** Proper button labels, disabled states during submission
- **Testing:** 5 comprehensive tests (render, grading, timing, interaction)

**API (preliminary):**
```
interface MiniGame {
  render(config: MiniGameConfig) -> void
  captureResponse() -> ResponseData
  showGradingUI() -> void  // Co-Play mode only
  submitReview(rating: Rating, responseData: ResponseData) -> void
}
```

**Response Logging (CRITICAL):**

**Every mini-game must log:**
```typescript
interface ResponseData {
  raw_response: string        // What child did (JSON or string)
  response_time_ms: number    // Milliseconds from prompt to response
  hints_used: number          // Number of hints child requested
  context?: object            // Mini-game specific data (e.g., options shown)
}
```

**Why this matters:**
- Co-Play: Parent provides rating; response data is supplemental
- Adventure Mode (future): Inference engine uses response data to infer rating
- Enables building Adventure Mode without refactoring Co-Play code

**Validation:**
- By end of Slice 3, audit all mini-games for consistent response logging
- If inconsistent, refactor immediately (while codebase is small)

---

### 4. Personalization Engine (My World)

**Purpose:** Inject family names, pet names, favorite topics into narrative, quests, and SR content.

**Status:** To be implemented in Slice 7

**Key Responsibilities:**
- Store family/pet/favorite data (parent-configured)
- Check decodability of personal names/words
- Inject personal data into quests, NPCs, micro-books
- Manage personal SR items (e.g., "Luna is on the mat" sentence)

**API (preliminary):**
```
setMyWorldData(profileId: string, data: MyWorldData) -> void
getPersonalizedItems(profileId: string, world: number) -> Item[]
checkDecodability(text: string, knownPhonics: string[]) -> DecodabilityResult
```

**Data Models:**
```typescript
interface MyWorldData {
  family: FamilyMember[]      // Mom, Dad, Grandma, etc.
  pets: Pet[]                 // Luna (dog), Coco (cat), etc.
  favorites: string[]         // trucks, dinosaurs, soccer, etc.
  places: string[]            // park, beach, Grandma's house, etc.
}

interface DecodabilityResult {
  is_decodable: boolean
  irregular_parts?: string[]  // Which parts aren't decodable yet
}
```

**Decodability Rules:**
- World 1: No decoding yet (narrative/visual only)
- World 2: CVC words only
- World 3: CVC + digraphs/blends
- World 4: CVC + digraphs + tricky words
- Check name/word against current world's phonics coverage before using in SR

---

### 5. Parent Dashboard

**Purpose:** Show parent progress, weak items, learning signals, and actionable suggestions.

**Status:** To be implemented in Slice 5

**Key Responsibilities:**
- Query SR engine for item states
- Compute weak items (high error rate, low streak)
- Display progress graphs
- Suggest focus areas and real-world practice

**API (preliminary):**
```
getDashboardData(profileId: string) -> DashboardData
```

**Data Models:**
```typescript
interface DashboardData {
  overview: {
    sessions_this_week: number
    avg_session_length_minutes: number
  }
  skills: SkillStrand[]
  weak_items: Item[]
  suggestions: string[]
}

interface SkillStrand {
  name: string              // "Letter-Sound Knowledge", "Blending & Decoding", etc.
  status: "strong" | "growing" | "needs_practice"
  details: string           // "Strong: m, a, t, s. Growing: p, i."
}
```

---

### 6. Profile Management

**Purpose:** Create and persist child profiles with localStorage abstraction.

**Status:** ✅ Implemented in Slice 1

**Implementation:** `src/core/profile-manager.ts` (ProfileManager class)

**Key Responsibilities:**
- Create new child profiles
- Retrieve existing profile
- Check if profile exists
- Handle profile persistence in localStorage

**API:**
```typescript
class ProfileManager {
  async createProfile(name: string, age: number): Promise<Profile>
  async getProfile(): Promise<Profile | null>
  async hasProfile(): Promise<boolean>
}
```

**Storage:**
- Uses localStorage key: `rocketreading_profile`
- Single profile per device (Slice 1)
- Future: Multi-profile support (Slice F1)

**UI Components:**
- `ProfileSetup.tsx` - Profile creation form
- `App.tsx` - Profile loading on app start
- Both components use ProfileManager abstraction (no direct localStorage access)

---

## Data Storage

### Local Storage Strategy

**Primary Storage:** IndexedDB (✅ Decided in Slice 1)

**Implementation Details:**
- Database: `rocketreading_db` (version 1)
- Three object stores: `items`, `item_states`, `reviews`
- Composite keys using string concatenation (e.g., `${profileId}_${itemId}`)
- Indexes on `profile_id` and `next_due` for query performance
- All operations wrapped in Promises for async consistency

**Key Requirements:**
- Offline-first (app works without internet)
- Fast queries for due items (indexed by next_due date)
- Reliable (no data loss on crash)
- Testable (can mock/reset for tests)

### Data Migration Strategy
(To be established during Phase 1)

### Backup & Sync
**Phase 1:** Local only, no sync
**Future (Phase 3+):** Cloud sync (Firebase, AWS, or custom backend)

---

## Testing Strategy

### Unit Tests
**Target Coverage:** 80%+ for core systems

**Critical Systems to Test:**
- SR Engine (interval calculations, due item queries)
- Quest Generator (item grouping, mini-game selection)
- Personalization (decodability checks)

**Framework:** (TBD in Phase 1)

### Integration Tests
**Target Coverage:** Happy path + 2–3 edge cases per mini-game

**Test Scenarios:**
- Complete session flow (welcome → quest → mini-games → closure)
- Parent grading flow
- SR updates after reviews

**Framework:** (TBD in Phase 1)

### Validation Tests
**Purpose:** Verify slice acceptance criteria

**Test Types:**
- Pedagogy: Does SR spacing work? (compare spaced vs. massed in test data)
- Architecture: Performance benchmarks (session load time < 2s, etc.)
- Engagement: Manual testing with test users

---

## Design Patterns & Conventions

### Code Organization
(To be established during Phase 1)

### Naming Conventions
(To be established during Phase 1)

### Error Handling
(To be established during Phase 1)

### Logging & Debugging
(To be established during Phase 1)

---

## Performance Considerations

### Target Metrics
- Session load time: < 2 seconds
- Mini-game transition: < 500ms
- SR query (due items): < 100ms
- UI responsiveness: 60fps

### Optimization Strategies
(To be documented as needed during implementation)

---

## Security & Privacy

### Data Protection
- COPPA-compliant (no personal identifiers from child)
- Parent account required (child uses nickname + avatar)
- All data stored locally (Phase 1)
- No third-party trackers or ads

### Privacy Requirements
- Minimal data collection
- Parent consent for any cloud sync (future)
- Transparent data policy
- No open social features

---

## Known Limitations & Technical Debt

(To be documented as discovered during implementation)

---

## Architecture Decision Records (ADRs)

### ADR-001: Web-First Development with React + TypeScript + Vite

**Date:** 2025-11-26
**Status:** Accepted (Slice 1)

**Context:** Need to choose technology stack for Phase 1 rapid iteration and user validation.

**Decision:** Use React 18 + TypeScript + Vite for web-first development.

**Rationale:**
- TypeScript provides type safety and catches errors early
- React has mature ecosystem, excellent testing tools, and is reusable for React Native later
- Vite provides instant HMR (<100ms) for fast iteration
- Web deployment allows remote testing without native builds
- Proven stack with strong community support

**Consequences:**
- ✅ Fast iteration during Phase 1
- ✅ Easy to test with users remotely (any browser)
- ✅ Strong typing prevents runtime errors
- ⚠️ Will need platform-specific UI for native apps later (planned)

**Alternatives Considered:**
- Vue/Svelte (less mature React Native path)
- Vanilla JS (no type safety)
- Native-first (slower iteration, harder to test remotely)

---

### ADR-002: IndexedDB for Local Storage

**Date:** 2025-11-26
**Status:** Accepted (Slice 1)

**Context:** Need offline-first storage for SR state, reviews, and profiles.

**Decision:** Use IndexedDB as primary local storage mechanism.

**Rationale:**
- Browser-native, no external dependencies
- Supports structured queries (crucial for "due items" queries)
- Offline-first by default
- Works across all modern browsers
- Testable with fake-indexeddb polyfill

**Consequences:**
- ✅ Offline-capable from day one
- ✅ Fast queries with indexes
- ✅ Testable without browser
- ⚠️ Async API requires Promise handling everywhere
- ⚠️ Compound keys require workaround (using string concatenation)

**Alternatives Considered:**
- localStorage (too simple, no queries)
- SQLite via wasm (adds complexity, larger bundle)
- File-based JSON (no query support)

---

### ADR-003: CSS Modules for Styling

**Date:** 2025-11-26
**Status:** Accepted (Slice 1)

**Context:** Need scoped styling without global namespace pollution.

**Decision:** Use CSS Modules for component styling.

**Rationale:**
- Scoped styles prevent naming collisions
- No runtime overhead (build-time transformation)
- Simple mental model (just CSS)
- Vite supports out of the box
- No learning curve for standard CSS

**Consequences:**
- ✅ Clean separation of styles per component
- ✅ No global namespace issues
- ✅ Standard CSS (easy to understand)
- ⚠️ Slightly more verbose imports

**Alternatives Considered:**
- Tailwind (more dependencies, utility-first learning curve)
- Styled-components (runtime overhead)
- Global CSS (namespace pollution)

---

### ADR-004: Jest + React Testing Library for Testing

**Date:** 2025-11-26
**Status:** Accepted (Slice 1)

**Context:** Need comprehensive testing for SR engine, components, and integration flows.

**Decision:** Use Jest 29 + React Testing Library for all testing.

**Rationale:**
- Jest is industry standard with excellent React support
- RTL enforces testing best practices (user-centric tests)
- fake-indexeddb enables testing IndexedDB code without browser
- jsdom simulates browser environment
- Fast test execution (<2s for full suite)

**Consequences:**
- ✅ Comprehensive test coverage (19 tests passing)
- ✅ Tests run in CI/CD without browser
- ✅ Encourages user-centric testing patterns
- ⚠️ Setup complexity for IndexedDB polyfill

**Alternatives Considered:**
- Vitest (newer, less mature)
- Cypress (slower, E2E focus)
- No testing framework (unacceptable)

---

### ADR-005: Massed + Spaced Hybrid SR Algorithm

**Date:** 2025-11-26
**Status:** Accepted (Slice 1)

**Context:** Ages 2-5 need multiple exposures before memory consolidation. Pure spaced repetition causes early forgetting.

**Decision:** Use massed practice (3 correct in a row, interval=0) before graduating to spaced intervals.

**Rationale:**
- Young children (2-5) need massed practice for initial learning
- 3-correct threshold balances confidence with efficiency
- Spacing after graduation ensures long-term retention
- Simpler than full SM-2 (easier to validate with real kids)
- 30-day cap prevents items from being buried too long

**Consequences:**
- ✅ Better suited for ages 2-5 than pure spaced repetition
- ✅ Reduces early frustration (items repeat until mastered)
- ✅ Simpler algorithm (easier to debug and explain to parents)
- ⚠️ More reviews required initially (intended trade-off)

**Alternatives Considered:**
- Pure spaced repetition (not suitable for ages 2-5)
- Full SM-2 algorithm (too complex for this age group)
- Fixed intervals (ignores individual learning patterns)

---

### ADR-006: ProfileManager Abstraction Layer

**Date:** 2025-11-26
**Status:** Accepted (Slice 1 refactor)

**Context:** Components were directly accessing localStorage, violating DRY and making future multi-profile support harder.

**Decision:** Create ProfileManager class to abstract all profile storage operations.

**Rationale:**
- Single source of truth for profile management
- Easier to test (mock ProfileManager vs localStorage)
- Future multi-profile support requires this abstraction anyway
- Consistent with SREngine pattern (abstraction over storage)
- Eliminates duplicate localStorage key strings

**Consequences:**
- ✅ Cleaner component code
- ✅ Easier to test
- ✅ Foundation for multi-profile support (Slice F1)
- ⚠️ Small refactor required (completed in Slice 1)

**Alternatives Considered:**
- Direct localStorage in components (rejected - violates DRY)
- Global state manager (overkill for single profile)

---

### ADR Template:
```markdown
## ADR-XXX: [Decision Title]

**Date:** YYYY-MM-DD
**Status:** Proposed | Accepted | Superseded
**Context:** What problem are we solving?
**Decision:** What did we decide?
**Rationale:** Why did we decide this?
**Consequences:** What are the trade-offs?
**Alternatives Considered:** What else did we consider?
```

---

## Future Considerations

### Phase 2+ Features
- Cloud sync & backup
- Multiple child profiles
- Adventure Mode (child-only inference)
- Voice recognition for spoken responses
- Teacher mode & classroom features

### Scalability
- How will architecture handle 200+ SR items per child?
- How will quest generator scale to 10+ mini-game types?
- How will personalization handle complex decodability rules?

(To be addressed in future phases)

---

## Maintenance

### How to Update This Document

**When to update:**
- After completing each slice (document learnings)
- When making architectural decisions (document ADRs)
- When discovering technical debt (document limitations)
- When performance issues arise (document optimizations)

**Who updates:**
- AI agents: Document technical decisions made during implementation
- Human: Review and approve major architectural changes

**Review Cadence:**
- After each slice: Quick update (5–10 minutes)
- After each phase: Deep review (1–2 hours)

---

## Document History

- **2025-11-26 (morning):** Initial skeleton created (pre-Phase 1)
- **2025-11-26 (evening):** Slice 1 complete - updated with full implementation details:
  - Technology stack finalized (React + TypeScript + Vite + Jest)
  - SR Engine implemented with IndexedDB
  - Mini-game framework created with LetterSoundGame
  - Profile management system implemented
  - Session flow completed
  - 6 ADRs documented (tech stack, storage, styling, testing, SR algorithm, ProfileManager)
  - 19 tests passing
  - Production build successful (152kB JS + 4.5kB CSS)

---

## Questions & Clarifications

If anything in this document is unclear or needs elaboration:
1. Add a comment or question in the relevant section
2. Discuss with human during implementation planning
3. Update document with clarification after decision is made

**This is a living document. Keep it current, and it will keep the architecture sane.**
