# Phase 1 PRD: Foundation (Slices 1–2)

**Phase:** 1 of 5
**Slices Covered:** 1–2
**Timeline Estimate:** 2–3 weeks
**Status:** Ready for Implementation

---

## Phase Overview

**Goal:** Prove the core SR engine + parent grading + minimal game loop work together. Establish foundational architecture that supports all future slices. **Phase 1 is web-based for rapid iteration.**

**Platform Note:** Phase 1 is built as a web app (browser-based) to enable:
- Fast iteration on core logic without native platform compilation
- Easy remote testing with real users (any device with browser)
- Platform-agnostic core logic that's ready for iPad/Android UI swaps in Phase 2+

**What We're Building:**
- Web app shell with welcome screen and basic navigation
- Minimal SR engine (items, intervals, reviews)
- One working mini-game: Letter → Sound (Production)
- Parent grading interface (✅/😬/❌)
- Response logging (critical for future Adventure Mode)
- Second mini-game: Sound → Letter (Recognition)
- Full letter-sound item library (8–12 letters)
- **All core logic is platform-agnostic** (can be reused for iPad/Android later)

**What We're Validating:**
1. **Pedagogical:** Does spaced repetition show learning signal for letter-sounds?
2. **Engagement:** Is the parent grading interface intuitive? Do parents/kids engage?
3. **Architecture:** Is the foundation solid enough to support 15 more slices?

---

## User Stories

### Parent User Stories

#### P1.1: Parent Account & Child Setup
**As a** parent
**I want to** set up my child's profile (name, age)
**So that** the app can personalize the experience and track progress

**Acceptance Criteria:**
- [ ] Parent can enter child's name (nickname, no full legal name required)
- [ ] Parent can enter child's age (2.5–6 years, dropdown or stepper)
- [ ] App saves profile locally
- [ ] Profile persists across app restarts
- [ ] Only one profile supported in Phase 1 (multi-profile in future)

---

#### P1.2: Parent Co-Play Session
**As a** parent
**I want to** sit with my child during a learning session
**So that** I can help them learn letter sounds effectively

**Acceptance Criteria:**
- [ ] Session starts with friendly welcome: "Hi [child's name]!"
- [ ] Parent sees subtle banner: "Today: X reviews + Y new letters"
- [ ] Mini-game presents letter, child answers aloud
- [ ] Parent sees clear grading buttons: ✅ (Got it), 😬 (Needed help), ❌ (Didn't know)
- [ ] Parent can tap grading buttons easily (large touch targets)
- [ ] Session flows smoothly (no lag between items)

---

#### P1.3: Parent Grading Guidance
**As a** parent
**I want to** understand what each grading button means
**So that** I can grade accurately

**Acceptance Criteria:**
- [ ] First session shows brief tooltip: "✅ means confident, quick answer"
- [ ] Tooltip for 😬: "Hesitated or needed a hint"
- [ ] Tooltip for ❌: "Didn't know or guessed wrong"
- [ ] Tooltips can be dismissed and re-shown in settings
- [ ] Tooltips are concise (1 sentence each)

---

#### P1.4: Session Completion
**As a** parent
**I want to** see a clear end to the session
**So that** I know we're done and can stop

**Acceptance Criteria:**
- [ ] After X items (5–10 in Phase 1), session ends
- [ ] Friendly closure message: "You grew your reading power today!"
- [ ] "Done" button returns to home screen
- [ ] Session duration: ~3–5 minutes for Phase 1

---

### Child User Stories

#### C1.1: Welcoming Experience
**As a** child
**I want to** see a friendly mascot greet me by name
**So that** I feel excited to play

**Acceptance Criteria:**
- [ ] Mascot character appears on welcome screen
- [ ] Mascot says: "Hi [child's name]!" (text + optional voice)
- [ ] Bright, colorful, age-appropriate visuals
- [ ] Large "Let's Go!" button to start session

---

#### C1.2: Letter-Sound Mini-Game
**As a** child
**I want to** see a letter and try to say its sound
**So that** I can learn letter-sound correspondences

**Acceptance Criteria:**
- [ ] Large lowercase letter centered on screen
- [ ] Friendly mascot on side (visual anchor)
- [ ] App prompts: "What sound does this letter make?"
- [ ] Child says sound aloud (no typing/tapping from child yet)
- [ ] After parent grades, app plays letter sound: "/mmm/" with animation
- [ ] Positive feedback for all ratings (no shaming on ❌)

---

#### C1.3: Sound-Letter Mini-Game
**As a** child
**I want to** tap the letter that matches a sound I hear
**So that** I can recognize letters from their sounds

**Acceptance Criteria:**
- [ ] App says: "Tap the letter that says /s/."
- [ ] 3–4 letter tiles appear on screen (large, colorful)
- [ ] Child taps a tile
- [ ] Correct tap: Tile bounces, mascot cheers, sound plays
- [ ] Incorrect tap: Gentle shake, hint: "This is /m/. We want /s/."
- [ ] Parent still grades (✅/😬/❌) based on hesitation, hints, etc.

---

## Technical Requirements

### TR1: Web App Shell & Navigation
- [ ] Web app loads in browser (desktop/tablet/mobile browsers work)
- [ ] Welcome screen shows child's name + mascot greeting
- [ ] "Start Session" button transitions to session view
- [ ] Session view shows mini-games sequentially
- [ ] Session end view shows completion message + "Done" button
- [ ] "Done" button returns to home screen
- [ ] Basic navigation (single-page app or simple routing)
- [ ] Works on desktop, tablet, iPad, and Android browsers
- [ ] Responsive design (adapts to different screen sizes)
- [ ] **Note:** This is NOT a native iPad app yet; it's a web app. Native iPad app comes in Phase 2.

### TR2: SR Engine (Massed + Spaced Hybrid)
- [ ] Item model: `{ id, type, content, world, metadata }`
- [ ] ItemState model: `{ item_id, profile_id, last_seen, next_due, interval_days, correct_streak, error_count, status, learning_threshold_met }`
- [ ] Review model: `{ id, profile_id, item_id, timestamp, rating, response_data, mode }`
- [ ] `getDueItems(profileId, date)` function returns items where `next_due <= date` OR `interval_days = 0` (due in same session)
- [ ] `logReview(profileId, itemId, rating, responseData)` function updates ItemState
- [ ] **Massed + Spaced Hybrid Algorithm** (optimized for ages 2.5–5):
  - **Learning Phase (Massed Practice):**
    - New item needs **3 consecutive ✅** to graduate
    - During learning: `interval = 0` (show again in same session)
    - Items mixed within session to avoid boredom
    - ❌ → `interval = 0`, `correct_streak = 0` (show again)
    - 😬 → `interval = 0`, `correct_streak = max(0, streak - 1)` (show again)
  - **Spacing Phase (After Graduation):**
    - 3rd consecutive ✅ → `interval = 1 day`, `learning_threshold_met = true`
    - Subsequent ✅ → `interval *= 2` (max 30 days)
    - ❌ → `interval = 1 day`, reset to learning
    - 😬 → `interval *= 0.5` (min 1 day)
- [ ] Seed data: 5 letters in Slice 1 (/m/, /a/, /t/, /s/, /i/)
- [ ] Seed data: 8–12 letters in Slice 2 (add /p/, /n/, /o/, /e/, /r/, etc.)
- [ ] **Session Design:** Mix items in queue (e.g., "m, a, t, m, a, s, m..." not "m, m, m, a, a, a...")
- [ ] **Rationale:** Young learners need multiple exposures (massed practice) before spacing kicks in. Research shows massed → spaced hybrid works better for ages 2-5 than pure spacing.

### TR3: Response Logging (CRITICAL)
**Every mini-game must log detailed response data:**
- [ ] `ResponseData` model:
  ```typescript
  {
    raw_response: string,       // e.g., "tapped_letter_s" or "said_muh"
    response_time_ms: number,   // milliseconds from prompt to response
    hints_used: number,         // 0, 1, 2, etc.
    context?: object            // mini-game specific (e.g., options shown)
  }
  ```
- [ ] Letter → Sound mini-game logs:
  - `raw_response`: "parent_graded" (no child input to log yet)
  - `response_time_ms`: time from prompt to parent tap
  - `hints_used`: 0 (no hint system in Slice 1)
- [ ] Sound → Letter mini-game logs:
  - `raw_response`: "tapped_letter_[x]" where [x] is the letter child tapped
  - `response_time_ms`: time from audio prompt to child tap
  - `hints_used`: 0 or 1 (if wrong, show hint; log it)
  - `context`: `{ options: ["m", "a", "s", "t"], correct: "s" }`
- [ ] Response data is saved with every review
- [ ] **Validation:** By end of Slice 2, audit that all mini-games log consistently

### TR4: Mini-Game Framework
- [ ] Abstract `MiniGame` interface or base class
- [ ] Implements:
  - `render(config)`: Display UI
  - `captureResponse()`: Get child's response
  - `showGradingUI()`: Display parent buttons (Co-Play only)
  - `submitReview(rating, responseData)`: Send to SR engine
- [ ] Two concrete implementations:
  1. `LetterSoundMiniGame` (Slice 1)
  2. `SoundLetterMiniGame` (Slice 2)
- [ ] Mini-games are pluggable (easy to add new types in future slices)

### TR5: Parent Grading Interface
- [ ] Three large buttons at bottom of screen: ✅, 😬, ❌
- [ ] Buttons are at least 2cm tall (easy to tap)
- [ ] Buttons have clear labels: "Got it", "Needed help", "Didn't know"
- [ ] Tap triggers immediate feedback (button press animation)
- [ ] Rating is logged to SR engine
- [ ] Next item appears immediately after grading

### TR6: Local Data Storage (Browser-Based)
- [ ] Profile data persists across browser restarts (IndexedDB or localStorage)
- [ ] SR items persist (don't reset on browser refresh)
- [ ] Review history persists
- [ ] Storage implementation: (TBD during implementation—IndexedDB or SQLite via wasm)
- [ ] Offline-first: App works without internet connection
- [ ] No cloud sync in Phase 1 (local browser storage only)
- [ ] **Note:** Phase 2 may require backend + cloud sync for multi-device support

### TR7: Audio & Visual Feedback
- [ ] Letter sounds play clearly (/m/, /a/, /t/, etc.)
- [ ] Mascot animations for positive feedback (smile, cheer)
- [ ] Gentle animations for incorrect responses (no harsh sounds or visuals)
- [ ] Letter animations (bounce, glow) when correct
- [ ] All audio is COPPA-safe (no third-party trackers)

### TR8: Testing (Web-Based)
- [ ] Unit tests for SR engine (platform-independent):
  - `getDueItems` returns correct items
  - `logReview` updates intervals correctly
  - Edge cases: first review, multiple ❌ in a row, etc.
- [ ] Integration tests for mini-games:
  - Complete flow: render → response → grading → submit → next item
  - Both mini-game types
- [ ] E2E tests (browser automation):
  - Parent can complete a 5-item session in browser
  - Session persists after browser refresh
  - Grading buttons work on desktop and tablet browsers
- [ ] Manual testing checklist:
  - Works on desktop browser (Chrome, Firefox, Safari)
  - Works on iPad browser (Safari)
  - Works on Android browser (Chrome)
  - Data persists across browser refresh
  - SR intervals update correctly

---

## API Contracts

### SR Engine APIs

```typescript
// Get items due for review
function getDueItems(profileId: string, date: Date): Item[]

// Log a review and update item state
function logReview(
  profileId: string,
  itemId: string,
  rating: "correct" | "needed_help" | "incorrect",
  responseData: ResponseData
): void

// Get current state of an item
function getItemState(profileId: string, itemId: string): ItemState

// Seed initial items (for testing/setup)
function seedItems(items: Item[]): void
```

### Mini-Game Framework APIs

```typescript
interface MiniGame {
  // Render the mini-game UI
  render(config: MiniGameConfig): void

  // Capture child's response (tap, voice, drag, etc.)
  captureResponse(): Promise<ResponseData>

  // Show parent grading interface (Co-Play only)
  showGradingUI(): void

  // Submit review to SR engine
  submitReview(rating: Rating, responseData: ResponseData): void
}

interface MiniGameConfig {
  type: string           // "letter_sound", "sound_letter", etc.
  item: Item             // The SR item to review
  theme?: string         // Visual theme (future)
}
```

---

## Data Models

### Item
```typescript
interface Item {
  id: string                    // Unique ID (e.g., "letter_m", "word_cat")
  type: "letter" | "word" | "sentence" | "tricky_word"
  content: string               // "m", "cat", "The dog is big.", "said"
  world: number                 // 1, 2, 3, 4
  metadata: {
    phonics_coverage?: string[] // ["m"], ["c", "a", "t"], etc.
    is_personalized?: boolean   // false in Phase 1
  }
}
```

### ItemState
```typescript
interface ItemState {
  item_id: string
  profile_id: string
  last_seen: Date               // When was it last reviewed?
  next_due: Date                // When should it be reviewed next?
  interval_days: number         // Current spacing interval
  ease_factor?: number          // Anki-style ease (optional in Phase 1)
  correct_streak: number        // Consecutive ✅ ratings
  error_count: number           // Total ❌ ratings
  status: "new" | "learning" | "maturing" | "mastered" | "maintenance"
}
```

### Review
```typescript
interface Review {
  id: string
  profile_id: string
  item_id: string
  timestamp: Date
  rating: "correct" | "needed_help" | "incorrect"
  response_data: ResponseData
  mode: "co_play" | "adventure"  // Always "co_play" in Phase 1
}
```

### ResponseData (CRITICAL)
```typescript
interface ResponseData {
  raw_response: string          // What child did (tap coords, voice, etc.)
  response_time_ms: number      // Reaction time from prompt to response
  hints_used: number            // Number of hints requested
  context?: object              // Mini-game specific data
}
```

### Profile
```typescript
interface Profile {
  id: string
  name: string                  // Child's nickname
  age: number                   // 2.5–6
  created_at: Date
  current_world: number         // 1 in Phase 1
}
```

---

## Acceptance Criteria (Phase 1 Complete)

### Slice 1 Complete When:
- [ ] Web app loads successfully in browser (Chrome, Firefox, Safari)
- [ ] Works on desktop, tablet, iPad, and Android browsers
- [ ] Parent can create child profile
- [ ] Session shows 5 letter-sound items with parent grading
- [ ] SR engine updates intervals correctly (validated with tests)
- [ ] Response logging works for Letter → Sound mini-game
- [ ] Session completes and returns to home screen
- [ ] Data persists across browser refresh (no loss)
- [ ] **Core logic is platform-agnostic** (ready to be reused for native iPad/Android apps later)

### Slice 2 Complete When:
- [ ] SR engine supports 8–12 letter items
- [ ] Second mini-game (Sound → Letter) is implemented
- [ ] Session mixes both mini-game types (based on SR due items)
- [ ] Response logging works for Sound → Letter mini-game
- [ ] Parent can complete a 5-minute session with 10–12 items on any browser
- [ ] All unit + integration tests pass
- [ ] Works cross-browser (Chrome, Firefox, Safari, iPad Safari, Chrome Android)
- [ ] Manual validation: Parent + child can complete session without confusion

### Phase 1 Complete When:
- [ ] All Slice 1 + Slice 2 criteria are met
- [ ] Architecture doc is updated with:
  - Technology stack decision (web framework choices)
  - SR engine implementation details (platform-agnostic)
  - Mini-game framework design (platform-agnostic)
  - Data storage strategy (browser-based)
  - **Platform separation strategy:** How core logic is isolated from UI
- [ ] Code is committed to git with clear commit messages
- [ ] Core logic is tested and validated to be platform-agnostic
- [ ] Retrospective is conducted: What worked? What surprised us?
- [ ] Demo to stakeholders shows:
  - Smooth session flow (web)
  - Accurate SR interval updates
  - Parent grading is intuitive
  - Works across browser types (desktop, iPad, Android)
  - **Ready to build native iPad app on top of this core logic** (Phase 2)

---

## Validation Strategy

### Pedagogical Validation
**Question:** Does spaced repetition show a learning signal?

**Method:**
1. Simulate 2 weeks of daily sessions with test data
2. Compare accuracy on:
   - Items reviewed with spacing (1 day → 3 days → 7 days)
   - Items reviewed with massed practice (daily for 2 weeks)
3. Hypothesis: Spaced items should retain better after 1 week break

**Metric:** % accuracy on post-test after 1 week delay

### Engagement Validation
**Question:** Is the parent grading interface intuitive?

**Method:**
1. Conduct 3–5 parent playtests (remote or in-person)
2. Ask parents:
   - "Did you understand what each button meant?"
   - "Was grading easy or frustrating?"
   - "Would you use this daily?"
3. Observe: Do parents hesitate or tap wrong buttons?

**Metric:** % of parents who rate grading as "easy" or "very easy"

### Architecture Validation
**Question:** Is the foundation solid for 15 more slices?

**Method:**
1. Code review: Is SR engine testable and extensible?
2. Performance test: Can SR engine handle 50 items? 100 items?
3. Review response logging: Is it consistent across mini-games?

**Metrics:**
- SR query time (getDueItems): < 100ms
- Mini-game transition time: < 500ms
- Test coverage for SR engine: ≥80%

---

## Dependencies

### External Dependencies
- Audio assets for letter sounds (/m/, /a/, /t/, /s/, /i/, /p/, /n/, /o/, /e/, /r/)
- Mascot character design + animations
- Icon/button assets for grading UI

### Internal Dependencies
- None (Phase 1 is the foundation)

---

## Risks & Mitigations

### Risk 1: SR interval algorithm doesn't work for this age group
**Likelihood:** Medium
**Impact:** High (invalidates entire approach)
**Mitigation:**
- Validate early with test data simulation
- Be prepared to simplify algorithm (e.g., fixed intervals instead of adaptive)
- By end of Slice 2, have data showing spacing helps or doesn't

### Risk 2: Parent grading is inconsistent
**Likelihood:** Medium
**Impact:** Medium (SR data is noisy)
**Mitigation:**
- Provide clear tooltips and guidance
- Test with real parents early
- Accept some noise; focus on relative trends (not absolute accuracy)

### Risk 3: Technology stack choice doesn't support future needs
**Likelihood:** Low
**Impact:** High (expensive to change later)
**Mitigation:**
- Document rationale for tech stack decision
- Choose stack that supports: offline storage, audio, animations, future cross-platform
- Prototype 2–3 mini-games before committing

### Risk 4: Response logging is inconsistent or incomplete
**Likelihood:** Medium
**Impact:** High (expensive to retrofit in 15 slices)
**Mitigation:**
- Make response logging a checklist item for every mini-game
- By end of Slice 2, audit both mini-games for consistency
- If inconsistent, refactor immediately (while only 2 mini-games exist)

---

## Open Questions

1. **Web Framework:** React, Vue, Svelte, or vanilla JS?
   - Decision needed before Slice 1 implementation begins
   - Prioritize: fast iteration, good testing tools, responsive design

2. **Backend Language:** Python (Flask/Django), Node.js (Express), Go, or Rust?
   - Decision needed before Slice 1 implementation begins
   - Prioritize: developer velocity, easy to test core logic independently

3. **Browser Storage:** IndexedDB, SQLite (via wasm), or localStorage + JSON?
   - Decision needed before Slice 1 implementation begins
   - Must support: offline-first, large data (100+ items), fast queries

4. **Audio:** Pre-recorded sounds or browser TTS?
   - Pre-recorded preferred for quality + consistency
   - TTS may be evaluated later for personalization (e.g., custom names)

5. **Testing Framework:** Jest, Vitest, Mocha, or other?
   - Decision needed before writing first tests
   - Must support: unit tests, integration tests, E2E (browser automation)

---

## Success Metrics

### Phase 1 is Successful If:
- [ ] Parent + child can complete a 5-minute session in web browser without confusion
- [ ] Session works on desktop, iPad, and Android browsers (no native app needed)
- [ ] SR intervals update correctly (validated with tests + manual inspection)
- [ ] Response logging is consistent across both mini-games
- [ ] Core logic is proven to be platform-agnostic (ready for native UI layer)
- [ ] Architecture doc is updated with platform separation strategy
- [ ] Team is confident moving to Phase 2 (World 1 completion)
- [ ] Team has plan for building native iPad app on top of this core logic

**Estimated Completion:** 2–3 weeks from start of Slice 1

**Next Platform:** After Phase 1 validation, native iPad app can be built (Phase 2+) reusing all core logic from web version

---

## Next Steps After Phase 1

1. Conduct Phase 1 retrospective
2. Update `SYSTEM-ARCHITECTURE.md` with learnings
3. Create `PRD-Phase-2-World-1.md` (Slices 3–7)
4. Begin Slice 3 implementation (Quest Structure & Overworld)

---

## Document History

- **2025-11-26:** Initial PRD created (Phase 1, Slices 1–2)
