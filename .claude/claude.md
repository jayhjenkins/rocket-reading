# Rocket Reading: AI Development Guidelines

## Project Overview

Rocket Reading is a reading game for ages 2.5–5 that uses spaced repetition and Science-of-Reading aligned phonics to teach early decoding. It wraps Anki-style flashcards in cozy, story-driven quests with persistent world state.

**Core Philosophy:** "Anki for toddlers wrapped in a cozy, story-driven reading adventure."

**Platform Strategy:**
- **Phase 1:** Web browser (desktop/tablet) for rapid iteration and user feedback
- **Phase 2+:** Native platforms (iPad primary, Android future)
- **Architecture:** Platform-agnostic core logic + swappable UI layers

**Why Web-First?**
- Fastest iteration on core SR engine, quest generator, and mini-games
- Easy remote testing with real users (any device with a browser)
- No platform-specific compilation/deployment overhead
- Can test on iPad/Android browsers during Phase 1 if needed
- Native platforms reuse the same core logic

---

## CRITICAL: Read This Before Any Work

### Required Reading Order (Every Time)

Before working on ANY slice or task, you must read these documents in this order:

1. **`/docs/product/prd/00-SLICING-STRATEGY-OVERVIEW.md`**
   - Understand the slicing philosophy, validation dimensions, and SDLC strategy
   - Review the phase/slice you're about to work on

2. **`/docs/architecture/SYSTEM-ARCHITECTURE.md`**
   - Understand existing systems, data models, APIs, and patterns
   - This is the single source of truth for technical decisions

3. **Phase PRD** (e.g., `/docs/product/prd/PRD-Phase-1-Foundation.md`)
   - Understand user stories, acceptance criteria, and phase goals

4. **Slice Overview** (e.g., `/docs/product/prd/slice-01-foundation-minimal-sr-engine.md`)
   - Understand specific deliverables and validation criteria for this slice

---

## MANDATORY GATES: You Must Not Skip These

### GATE 1: No Implementation Without an Approved Plan

**Before writing ANY code:**

1. Read the four required documents above
2. Use `superpowers:writing-plans` to generate an implementation plan
3. Save to `/docs/implementation/slice-XX-implementation-plan.md`
4. **STOP and wait for human approval**
5. Only after approval: Begin implementation

**Why:** Plans created with full context are better than plans created before understanding the problem. Human review catches architectural issues early.

### GATE 2: No Moving to Next Slice Without Completing Current Slice

**Before moving to the next slice:**

- [ ] All implementation tasks from the plan are complete
- [ ] All test cases pass
- [ ] Validation criteria from slice overview are met (fun + pedagogy + architecture)
- [ ] `SYSTEM-ARCHITECTURE.md` is updated with any learnings or changes
- [ ] Implementation plan is committed to git
- [ ] Human has approved moving forward

**Why:** Incomplete slices accumulate technical debt and invalidate future validation.

### GATE 3: No Moving to Next Phase Without Retrospective

**Before moving to the next phase:**

- [ ] All slices in current phase are complete
- [ ] Phase retrospective is conducted
- [ ] `SYSTEM-ARCHITECTURE.md` is updated with major learnings
- [ ] Next phase PRD exists and is approved
- [ ] Human has approved moving forward

**Why:** Phases are architectural milestones. Skipping retrospectives means repeating mistakes.

---

## Phase & Slice Readiness Criteria

### Phase is "Ready to Work" When:
- [ ] Phase PRD exists in `/docs/product/prd/PRD-Phase-X-[Name].md`
- [ ] System Architecture doc is up-to-date with all systems from previous phases
- [ ] All dependencies from previous phases are complete
- [ ] Acceptance criteria are clearly defined
- [ ] Test validation strategy is documented

### Slice is "Ready to Implement" When:
- [ ] Implementation plan exists in `/docs/implementation/slice-XX-implementation-plan.md`
- [ ] Implementation plan has been reviewed and approved by human
- [ ] All dependencies from previous slices are complete
- [ ] Test cases are defined
- [ ] Validation criteria from slice overview are clear

### Slice is "Complete" When:
- [ ] All implementation tasks are done
- [ ] All test cases pass
- [ ] Validation criteria from slice overview are met (fun + pedagogy + architecture)
- [ ] System Architecture doc is updated with learnings
- [ ] Implementation plan is committed to git
- [ ] Demo/validation session with test users (if applicable)

---

## Workflow: Your Step-by-Step Process

### Before Starting a Phase:
1. Review previous phase learnings (if applicable)
2. Verify `SYSTEM-ARCHITECTURE.md` is up-to-date
3. Read phase PRD: `/docs/product/prd/phase-X/PRD-Phase-X-[Name].md`
4. Confirm phase is "Ready to Work" (checklist above)

### Before Starting Each Slice:
1. **Read required documents** (in order listed above):
   - `/docs/product/prd/00-SLICING-STRATEGY-OVERVIEW.md` (slicing philosophy + SDLC)
   - `/docs/architecture/SYSTEM-ARCHITECTURE.md` (current systems)
   - `/docs/product/prd/phase-X/PRD-Phase-X-[Name].md` (phase goals)
   - `/docs/product/prd/phase-X/slice-XX-*.md` (slice details)
2. **Generate implementation plan:**
   - Use `superpowers:writing-plans`
   - Include: file-by-file tasks, dependencies, test plan, validation checklist
   - Save to `/docs/product/prd/phase-X/implementations/slice-XX-implementation-plan.md`
3. **STOP: Wait for human approval** ⛔
4. After approval: Proceed with implementation

### During Slice Implementation:
1. Follow implementation plan tasks sequentially
2. Write tests as you go (per plan)
3. If you discover architectural decisions or new patterns:
   - Document them immediately in `SYSTEM-ARCHITECTURE.md`
   - Alert the human if it's a significant change
4. Commit frequently with clear, descriptive messages
5. If you get stuck or blocked:
   - Document the blocker
   - Propose 2–3 alternatives
   - Ask human for guidance

### After Slice Completion:
1. Run all tests (unit + integration + validation)
2. Validate against slice's three dimensions:
   - **Fun:** Would kids/parents find this engaging?
   - **Pedagogy:** Does this teach what it's supposed to teach?
   - **Architecture:** Is this maintainable and extensible?
3. Update `SYSTEM-ARCHITECTURE.md` with any changes or learnings
4. Commit implementation plan to git
5. **STOP: Wait for human to approve moving forward** ⛔
6. After approval: Move to next slice or phase

### After Phase Completion:
1. Conduct retrospective with human:
   - What worked well?
   - What broke or surprised us?
   - What would we do differently?
2. Update `SYSTEM-ARCHITECTURE.md` with major learnings
3. Review next phase PRD (or wait for human to create it)
4. Celebrate! 🎉

---

## Critical Architectural Requirements

### 1. Response Logging (Non-Negotiable)

**Every mini-game must log detailed response data from Slice 1 onward:**
```
{
  item_id: string,
  raw_response: string,        // What did child do? (tap x/y, said "cat", etc.)
  response_time_ms: number,     // Reaction time
  hints_used: number,           // How many hints?
  timestamp: Date,
  mode: "co_play" | "adventure"
}
```

**Why:** This enables Adventure Mode (child-only inference) to be built later as a separate inference service, without refactoring Co-Play code.

**Validation:** By end of Slice 3, audit that all mini-games log consistently. If not, refactor immediately while codebase is small.

### 2. Three Validation Dimensions

Every slice must validate three things:
1. **Fun (Engagement):** Would kids want to play this? Would parents trust it?
2. **Pedagogy (Learning):** Does it teach what it's supposed to teach?
3. **Architecture (Maintainability):** Is it clean, testable, and extensible?

If a slice fails on any dimension, it's not complete.

### 3. Co-Play First, Adventure Mode Later

- Slices 1–17 are Co-Play mode only (parent grading)
- Adventure Mode (child-only inference) comes in future slices
- Don't build Adventure Mode yet, but ensure response logging supports it

---

## Communication Expectations

### When to Ask for Human Input:

1. **Before implementing without a plan** (mandatory gate)
2. **When architectural decisions are needed** (e.g., "Should we use SQLite or Core Data?")
3. **When you discover a blocker** (e.g., "This approach won't work because...")
4. **When you need to make trade-offs** (e.g., "We can do X fast but messy, or Y slow but clean")
5. **Before moving to next slice** (mandatory gate)
6. **When you're unsure** (better to ask than guess)

### How to Ask:

- Present the problem clearly
- Propose 2–3 alternatives with trade-offs
- Make a recommendation if you have one
- Wait for human decision before proceeding

### What NOT to Do:

- ❌ Start coding without an approved implementation plan
- ❌ Skip reading required documents
- ❌ Move to next slice without completing current slice
- ❌ Make major architectural decisions without human input
- ❌ Ignore test failures or validation criteria
- ❌ Leave `SYSTEM-ARCHITECTURE.md` out of date

---

## Testing Philosophy

### Test as You Build
- Write unit tests for core logic (SR engine, quest generator, etc.)
- Write integration tests for mini-game flows
- Write validation tests for slice acceptance criteria

### Test Coverage Expectations
- Core systems (SR engine, quest generator): 80%+ coverage
- Mini-games: Integration tests for happy path + 2–3 edge cases
- Data models: Unit tests for all mutations

### Manual Validation
- Demo each slice to human after implementation
- Get feedback from test users when applicable
- Iterate based on feedback before marking slice complete

---

## Tech Stack & Conventions

**Phase 1 (Web-First Development):**
- **Backend/Core Logic:** TBD (Python, Node.js, Go, or Rust)
- **Frontend:** TBD (React, Vue, Svelte, or vanilla JS)
- **Storage:** IndexedDB or SQLite (browser) - offline-first
- **Target:** Web browser (accessible on desktop, tablet, iPad, Android during testing)

**Phase 2+ (Native Platforms):**
- **iPad:** Swift + SwiftUI
- **Android:** Kotlin + Jetpack Compose
- **Core Logic:** Reused from Phase 1 (all business logic is platform-agnostic)

**Key Systems (Platform-Agnostic):**
- SR Engine (spaced repetition scheduling)
- Quest Generator (generates quests from due SR items)
- Mini-Game Framework (pluggable mini-game types)
- Personalization Engine (My World content injection)

**UI Layers (Swappable):**
- Phase 1: Web UI
- Phase 2+: Native UIs (iPad/Android)

**Conventions:** (To be established in SYSTEM-ARCHITECTURE.md as you build)

---

## When Things Go Wrong

### If You Realize the Approach Won't Work:
1. Stop immediately (don't keep digging)
2. Document why it won't work
3. Propose 2–3 alternative approaches
4. Ask human for guidance
5. Update implementation plan if needed

### If Tests Are Failing:
1. Don't move forward until they pass
2. Debug systematically (use `superpowers:systematic-debugging` if needed)
3. Update tests if they're wrong (but be sure they're wrong first)
4. Ask human if you're stuck

### If You're Behind Schedule:
1. Communicate early (don't hide it)
2. Identify what's blocking you
3. Propose what can be cut or simplified
4. Get human approval before cutting scope

---

## Summary: Your Core Responsibilities

1. **Read before you code** (required docs in order)
2. **Plan before you implement** (use `superpowers:writing-plans`)
3. **Wait for approval** (mandatory gates)
4. **Test as you go** (unit + integration + validation)
5. **Update architecture doc** (keep it current)
6. **Validate all three dimensions** (fun + pedagogy + architecture)
7. **Communicate when stuck** (early and often)
8. **Don't skip gates** (they exist for a reason)

---

## Quick Reference: Document Locations

### Root Strategy Documents (Start Here)
- **Slicing Strategy:** `/docs/product/prd/00-SLICING-STRATEGY-OVERVIEW.md` ← READ THIS FIRST
- **Architecture:** `/docs/architecture/SYSTEM-ARCHITECTURE.md`
- **Future Roadmap:** `/docs/product/prd/FUTURE-ROADMAP.md`

### Phase-Based Documents
Each phase has its own folder with PRD, slice overviews, and implementation plans:

**Phase 1 (Foundation):**
- PRD: `/docs/product/prd/phase-1/PRD-Phase-1-Foundation.md`
- Slices: `/docs/product/prd/phase-1/slice-01-*.md`, `/docs/product/prd/phase-1/slice-02-*.md`
- Implementation Plans: `/docs/product/prd/phase-1/implementations/slice-XX-implementation-plan.md`

**Phase 2 (World 1):**
- Slices: `/docs/product/prd/phase-2/slice-03-*.md` through `/docs/product/prd/phase-2/slice-07-*.md`
- Implementation Plans: `/docs/product/prd/phase-2/implementations/slice-XX-implementation-plan.md`

**Phase 3 (World 2):**
- Slices: `/docs/product/prd/phase-3/slice-08-*.md` through `/docs/product/prd/phase-3/slice-11-*.md`
- Implementation Plans: `/docs/product/prd/phase-3/implementations/slice-XX-implementation-plan.md`

**Phase 4 (World 3):**
- Slices: `/docs/product/prd/phase-4/slice-12-*.md` through `/docs/product/prd/phase-4/slice-14-*.md`
- Implementation Plans: `/docs/product/prd/phase-4/implementations/slice-XX-implementation-plan.md`

**Phase 5 (World 4):**
- Slices: `/docs/product/prd/phase-5/slice-15-*.md` through `/docs/product/prd/phase-5/slice-17-*.md`
- Implementation Plans: `/docs/product/prd/phase-5/implementations/slice-XX-implementation-plan.md`

---

## Questions?

If anything is unclear, ask the human. These guidelines exist to make your work better, not harder. When in doubt, err on the side of asking rather than guessing.

**Good luck building Rocket Reading! 🚀📚**
