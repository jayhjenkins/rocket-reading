# Rocket Reading: System Architecture

**Version:** 0.1 (Initial Draft)
**Last Updated:** 2025-11-26
**Status:** Pre-Phase 1 (skeleton, to be populated during implementation)

---

## Overview

This is the **single source of truth** for all technical decisions, data models, system designs, and architectural patterns in Rocket Reading. This document is a **living document** that grows and evolves as we build each slice.

**Important:** AI agents must read this document before working on any slice. Update this document immediately when making architectural decisions during implementation.

---

## Document Status

### Completed Sections
- None yet (pre-Phase 1)

### To Be Completed in Phase 1 (Slices 1–2)
- [ ] Technology stack decisions
- [ ] Platform and build system setup
- [ ] Core data models (Item, Profile, Review)
- [ ] SR Engine architecture
- [ ] Mini-game framework design
- [ ] Response logging specification
- [ ] Local storage strategy
- [ ] Testing framework setup

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

### Phase 1 Technology Stack

**Backend/Core Logic:**
- Language: TBD (Python, Node.js, Go, or Rust) — prioritize developer velocity
- Framework: TBD
- Database: TBD (SQLite for offline, PostgreSQL for backend if cloud sync later)

**Phase 1 Frontend (Web):**
- Framework: TBD (React, Vue, Svelte, or vanilla JS)
- Styling: TBD (Tailwind, Bootstrap, or custom CSS)
- Build tool: TBD (Vite, Webpack, or other)

**Local Storage (Phase 1):**
- Browser storage: IndexedDB or SQLite (via wasm)
- Optional: Electron for desktop app feel during testing

**Rationale:** Web tech allows rapid UI iteration. Users can test in browser (desktop, iPad, Android). No native compilation required.

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

### Key Libraries & Dependencies
(To be documented as dependencies are added)

### Build System
(To be documented in Phase 1)

### Development Environment
(To be documented in Phase 1)

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

**Status:** To be implemented in Slice 1

**Key Responsibilities:**
- Maintain item library (letters, words, sentences, tricky words)
- Track review state per item (last_seen, interval, ease, streak, etc.)
- Compute daily "due" items
- Update intervals based on review ratings (✅/😬/❌)
- Support multiple item types (letters, words, sentences, tricky words)

**API (preliminary):**
```
// To be refined during implementation
getDueItems(profileId: string, date: Date) -> Item[]
logReview(profileId: string, itemId: string, rating: Rating) -> void
getItemStatus(profileId: string, itemId: string) -> ItemState
getWeakItems(profileId: string) -> Item[]
```

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
  ease_factor: number         // Anki-style ease
  correct_streak: number
  error_count: number
  status: "new" | "learning" | "maturing" | "mastered" | "maintenance"
}
```

**Algorithm:**
- Start with simplified Anki-style algorithm
- New item: 1 day → 3 days → graduated
- Mature item: interval *= 2–3 on success, reset on failure
- Details to be refined during Slice 1 implementation

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

**Status:** To be implemented in Slice 1 (one mini-game), expanded over phases

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
| `letter_sound` | Slice 1 | Show letter, child says sound, parent grades |
| `sound_letter` | Slice 2 | Play sound, child taps letter |
| `same_different` | Slice 4 | Play two sounds, child taps same/different |
| `first_sound` | Slice 4 | Play word, child taps matching first letter |
| `blend_word` | Slice 8 | Drag letter tiles, blend into word |
| `read_word` | Slice 8 | Show word, child reads, parent grades |
| `read_sentence` | Slice 11 | Show sentence, child reads, parent grades fluency |
| `blend_complex` | Slice 12 | Blend with digraphs/multi-phoneme patterns |
| `tricky_word` | Slice 15 | Recognize irregular high-frequency words |

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

## Data Storage

### Local Storage Strategy

**Primary Storage:** (TBD in Phase 1)

**Options:**
- Core Data (iOS native)
- SQLite (portable, testable)
- Realm (mobile-first)
- File-based JSON (simple, debuggable)

**Decision:** TBD in Phase 1

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

(To be added as major architectural decisions are made)

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

- **2025-11-26:** Initial skeleton created (pre-Phase 1)
- **(Future entries will be added as implementation progresses)**

---

## Questions & Clarifications

If anything in this document is unclear or needs elaboration:
1. Add a comment or question in the relevant section
2. Discuss with human during implementation planning
3. Update document with clarification after decision is made

**This is a living document. Keep it current, and it will keep the architecture sane.**
