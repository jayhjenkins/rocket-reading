# Rocket Reading: Vertical Slice Strategy & Build Plan

## Overview

This document is the anchor for our incremental build plan. We're constructing Rocket Reading as a series of **17 vertical slices** that collectively deliver a complete, pedagogically-sound reading game across 4 worlds, while validating three critical dimensions at each step: **fun (engagement), learning (pedagogy), and architecture (maintainability)**.

---

## The Slicing Philosophy

### Why Vertical Slices?

Rather than building horizontally (e.g., "build the entire SR engine, then all the mini-games, then all the quests"), we're slicing **vertically** — each slice is a complete, playable increment that tests the full loop:

- Child opens app → completes a session → learns something → has fun → world changes.

This approach gives us:
1. **Early validation** – By Slice 6, you have a fully-playable World 1 that proves the fun + pedagogy + architecture work together.
2. **Architectural confidence** – Each slice tests the foundation before the next layer. If World 3 breaks the quest generator, you know it early.
3. **Continuous integration** – Every slice is a working game, not a half-built feature. Test users can play and give feedback throughout.

### The Three Validation Dimensions

Each slice validates these three pillars:

#### **1. Engagement (Fun)**
- Does the game framing (quests, characters, world persistence) keep kids engaged?
- Are mini-games fun or just drilling?
- Do kids want to return?

#### **2. Pedagogy (Learning)**
- Does the SR spacing actually improve retention?
- Do kids apply skills (e.g., CVC decoding → reading sentences)?
- Are parent dashboard signals accurate and actionable?

#### **3. Architecture (Maintainability)**
- Do new mini-game types integrate smoothly into the quest generator?
- Does adding new item types (words, sentences, tricky words) break the SR engine?
- Can personalization be injected without refactoring the entire system?
- Does the system scale (10 items → 50 items → 200 items)?

**Every slice must succeed on all three dimensions before proceeding.**

---

## The 17 Slices at a Glance

### **Phase 1: Foundation (Slices 1–2)**
| Slice | Title                          | Key Deliverable                                 | Validates                                |
| ----- | ------------------------------ | ----------------------------------------------- | ---------------------------------------- |
| 1     | Foundation & Minimal SR Engine | 5-letter game with parent grading & SR tracking | SR engine, parent input, basic game loop |
| 2     | World 1 Content & Item Library | 8–12 letters, two mini-game types               | Letter-sound learning with spacing       |

### **Phase 2: World 1 Completion (Slices 3–7)**
| Slice | Title | Key Deliverable | Validates |
|-------|-------|-----------------|-----------|
| 3 | World 1 Quest Structure & Overworld | 3–4 locations, 1 NPC each, quests wrap mini-games | Quest generator, world state, game framing |
| 4 | World 1 Phonological Awareness Mini-Games | Same/Different, First Sound games | Phonological awareness integration, variety |
| 5 | Parent Dashboard & Learning Signals | Dashboard showing weak items, progress, suggestions | Parent trust, data accuracy |
| 6 | World 1 Micro-Books (Read-Aloud Stories) | 3–5 read-aloud micro-books using familiar letters | Narrative engagement, story prep |
| 7 | Personalization Infrastructure (My World) | Parent form to set family names, pets, favorites | Personal data injection without breaking SR |

### **Phase 3: World 2 Completion (Slices 8–11)**
| Slice | Title | Key Deliverable | Validates |
|-------|-------|-----------------|-----------|
| 8 | World 2 Foundation – CVC Decoding Mini-Games | ~40 CVC words, Blend + Word Reading mini-games | Decoding (blending phonemes → words) |
| 9 | World 2 Quest Structure & Overworld | 3 locations (Beaver Bridge, Duck Pond, Luna's Bed) | Quest scaling with more items/complexity |
| 10 | World 2 Decodable Micro-Books | 3–5 readable CVC micro-books | Connected text reading, book system scalability |
| 11 | Micro-Sentence SR (Epoch 2 Transition) | ~20 micro-sentences, Sentence Reading mini-game | Epoch 1 → Epoch 2 transition, sentence SR |

### **Phase 4: World 3 Completion (Slices 12–14)**
| Slice | Title | Key Deliverable | Validates |
|-------|-------|-----------------|-----------|
| 12 | World 3 Foundation – Digraphs & Blends | ~30 CCVC/CVCC words, Blend Complex Words mini-game | Multi-phoneme patterns, increased complexity |
| 13 | World 3 Quest Structure & Overworld | 3 locations (Forest Path, Robot Factory, Boat Dock) | Quest scaling with mixed-complexity items |
| 14 | World 3 Decodable Micro-Books | 3–5 books with digraph/blend vocabulary | Pattern application in connected text |

### **Phase 5: World 4 Completion (Slices 15–17)**
| Slice | Title | Key Deliverable | Validates |
|-------|-------|-----------------|-----------|
| 15 | World 4 Foundation – Tricky Words & Sentences | ~15 tricky words, ~40–50 sentences | Tricky word integration, sentence-heavy mix |
| 16 | World 4 Quest Structure & Overworld | 3 locations (Town Square, Kitchen, Library) | Real-world narrative contexts, fluency focus |
| 17 | World 4 Decodable Micro-Books | 3–5 books with tricky words + sentences | Fluent reading of multi-sentence narratives |

---

## Phase Breakdown & Dependencies

### **Phase 1: Foundation (Slices 1–2)**
- **Goal:** Prove the SR engine + parent grading + minimal game loop work.
- **Duration:** ~2–3 weeks of development.
- **Validation gates:**
  - SR scheduling produces measurable learning signal (spaced > massed).
  - Parent grading UI is intuitive.
  - App doesn't crash with 5 items.

### **Phase 2: World 1 Completion (Slices 3–7)**
- **Depends on:** Phase 1 (SR engine + parent input working).
- **Goal:** Prove phonological awareness can be taught, personalization works, and the game framing boosts engagement.
- **Duration:** ~4–5 weeks.
- **Validation gates:**
  - Kids master 8–12 letters with ≥90% accuracy in ~2–4 weeks.
  - Quest framing + world state don't break SR logic.
  - Parent dashboard signals match observed learning.
  - Personalization injects without refactoring.

**At the end of Phase 2, you have a complete, playable World 1 ready for test users.**

### **Phase 3: World 2 Completion (Slices 8–11)**
- **Depends on:** Phase 2 (personalization infrastructure, quest generator, micro-book system).
- **Goal:** Prove decoding (blending CVC words) + sentence-level SR work, validate Epoch 1 → Epoch 2 transition.
- **Duration:** ~5–6 weeks.
- **Validation gates:**
  - Kids blend CVC words and decode them in isolation (>90% accuracy on 30 words).
  - Kids read simple CVC micro-books with comprehension.
  - Sentences integrate into quests without overwhelming kids.
  - World 1 items properly shift to maintenance (not crowding World 2).

**At the end of Phase 3, you have a complete World 1 + World 2 game ready for extended testing.**

### **Phase 4: World 3 Completion (Slices 12–14)**
- **Depends on:** Phase 3 (SR engine scaling, quest generator, book system).
- **Goal:** Prove multi-phoneme patterns (digraphs/blends) integrate smoothly and increase complexity doesn't overwhelm.
- **Duration:** ~4–5 weeks.
- **Validation gates:**
  - Kids blend CCVC/CVCC words (>90% accuracy on 20 pattern-based words).
  - Complexity step-up is natural, not frustrating.
  - Quest generator handles mixed item types (CVC + CCVC + letters in maintenance).

**At the end of Phase 4, you have Worlds 1–3 complete and proven.**

### **Phase 5: World 4 Completion (Slices 15–17)**
- **Depends on:** Phase 4 (SR engine for multiple item types, quest generator robustness).
- **Goal:** Prove tricky words + sentence fluency work, validate that kids read fluently in context.
- **Duration:** ~5–6 weeks.
- **Validation gates:**
  - Kids recognize tricky words when taught explicitly (>90% accuracy on 15 words).
  - Sentence SR spacing improves fluency.
  - Real-world narratives (cooking, shopping, reading) feel more grown-up and engaging.
  - Kids read multi-sentence books with comprehension.

**At the end of Phase 5, you have a complete, tested 4-world game that proves the full pedagogical journey.**

---

## Item Type & Mini-Game Progression

### Item Types by Slice

| Item Type | Introduced | Notes |
|-----------|------------|-------|
| **Letter-Sound** | Slice 1 | Single grapheme (/m/, /a/, sh, th). Core of World 1. |
| **Word (CVC)** | Slice 8 | Decodable CVC words (cat, mat, dog). Core of World 2. |
| **Sentence (Micro)** | Slice 11 | 2–5 words, fully decodable. Epoch 2 transition. |
| **Letter Pattern (Digraph/Blend)** | Slice 12 | Multi-phoneme units (sh, st, pl). Core of World 3. |
| **Word (CCVC/CVCC)** | Slice 12 | Words using digraphs/blends (ship, stop). |
| **Tricky Word** | Slice 15 | Irregular high-frequency words (the, said). Core of World 4. |
| **Sentence (Full)** | Slice 15 | Longer sentences with varied syntax. Epoch 3 transition. |

### Mini-Game Types by Slice

| Mini-Game | Type | Introduced | Notes |
|-----------|------|------------|-------|
| **Letter → Sound (Production)** | Recognition | Slice 1 | Child hears prompt, says sound; parent grades. |
| **Sound → Letter (Recognition)** | Recognition | Slice 2 | App says sound; child taps letter. |
| **Blend the Word** | Blending | Slice 8 | Child drags letter tiles, app segments, blends. |
| **Word Reading (Isolated)** | Reading | Slice 8 | Large word shown; child reads aloud. |
| **Blend Complex Words** | Blending | Slice 12 | 4–5 tiles with multi-phoneme patterns. |
| **Same/Different (Sounds)** | Phonological Awareness | Slice 4 | Child taps whether two sounds are same/different. |
| **First Sound** | Phonological Awareness | Slice 4 | App plays word; child taps matching letter. |
| **Sentence Reading** | Reading | Slice 11 | Sentence shown; child reads aloud; parent grades fluency. |
| **Tricky Word Recognition** | Recognition | Slice 15 | Tricky word shown; parent tells child word; child repeats. |

---

## Success Metrics by Slice

### Pedagogical Metrics

Each slice tracks:
- **Item mastery rate:** % of items reaching ≥90% accuracy.
- **Retention:** Spacing interval growth (do kids maintain learned items over longer periods?).
- **Application:** Can kids apply skills to new contexts? (e.g., CVC words → micro-books)

### Engagement Metrics

- **Session frequency:** Do kids/parents return (4–6 days/week)?
- **Session length:** Do sessions hit target (~10 min)?
- **Quest completion:** % of started quests completed.
- **Free-play usage:** Do kids use optional fun games, or skip to end?

### Architectural Metrics

- **Performance:** Load times, responsiveness, memory usage.
- **Data integrity:** SR data consistency, backup/sync reliability.
- **Quest generation success:** % of auto-generated quests that are coherent & difficulty-appropriate.
- **Scalability:** Can the system handle 3× items without performance drop?

---

## Architectural Assumptions & Risks

### Core Assumptions

1. **SR spacing works at this age.** We assume kids ages 2.5–5 can benefit from spaced repetition (even simplified).
   - *Risk:* If data shows no learning signal, entire foundation fails.
   - *Mitigation:* Validate by Slice 2. If spacing doesn't help, pivot to simpler interval logic.

2. **Parent grading is feasible.** We assume parents can reliably grade children's responses (✅/😬/❌).
   - *Risk:* Parents inconsistent or ignore grading.
   - *Mitigation:* Slice 5 (dashboard) shows impact of parent grading. If parents see results, adoption increases.

3. **Quest generator can handle complexity.** As item types grow (letters → words → sentences → tricky words), we assume the quest generator stays clean.
   - *Risk:* By Slice 15, generator becomes a spaghetti mess of conditionals.
   - *Mitigation:* Each phase (1–5) stress-tests the generator. If it breaks, refactor before next phase.

4. **Personalization doesn't require deep decodability checking.** Slice 7 tests narrative-only personalization. Slice 15+ requires SR-aware personalization (checking if a name is decodable).
   - *Risk:* Decodability checks become complex and slow.
   - *Mitigation:* Slice 7 separates concern. By Slice 15, decodability rules are well-defined.

5. **Response logging supports future Adventure Mode without refactoring Co-Play.** Every mini-game must log detailed response data from Slice 1 onward: `(raw_response, response_time_ms, hints_used, timestamp)`. This enables Adventure Mode (child-only inference) to be built later as a separate inference service, without modifying Co-Play code.
   - *Risk:* If response logging is inconsistent or missing, retrofitting later will require touching every mini-game (expensive, high regression risk).
   - *Mitigation:* Slice 1 establishes response logging as a core requirement. By end of Slice 3, audit that all mini-games log consistently. If not, refactor while codebase is small. This is non-negotiable.

### Rollback Plan

If a slice fails validation:
- **Small failure (e.g., "kids find Same/Different boring"):** Cut the feature; simplify Slice 4.
- **Medium failure (e.g., "quest generator can't handle 3 item types"):** Refactor generator architecture, add tests, retry.
- **Large failure (e.g., "SR spacing doesn't work"):** Major pivot; revisit pedagogical foundations.

---

## SDLC & Documentation Strategy

### Overview

We use a **hybrid documentation approach** optimized for AI-driven development that balances clarity with flexibility. This prevents over-documentation while maintaining architectural integrity.

### The Three-Document Strategy

#### **1. System Architecture Document** (living document)
**Location:** `/docs/architecture/SYSTEM-ARCHITECTURE.md`

**Purpose:** Single source of truth for all technical decisions, data models, and system designs.

**Contents:**
- Core systems (SR engine, quest generator, mini-game framework, personalization engine)
- Data models (items, profiles, sessions, world state)
- Key interfaces and APIs
- Technology stack decisions
- Design patterns and conventions

**Maintenance:** Updated after each slice based on learnings. This is a **living document** that grows with the project.

**Why:** AI agents read this before working on any slice. It prevents reinventing the wheel and maintains consistency across all slices.

#### **2. Phase-Level PRDs** (5 total, not 17)
**Location:** `/docs/product/prd/PRD-Phase-X-[Name].md`

**Purpose:** Define goals, user stories, and acceptance criteria for a complete phase (3–5 slices).

**Documents:**
- `PRD-Phase-1-Foundation.md` (Slices 1–2)
- `PRD-Phase-2-World-1.md` (Slices 3–7)
- `PRD-Phase-3-World-2.md` (Slices 8–11)
- `PRD-Phase-4-World-3.md` (Slices 12–14)
- `PRD-Phase-5-World-4.md` (Slices 15–17)

**Contents:**
- User stories for the entire phase
- Acceptance criteria for phase completion
- API contracts for new systems introduced in this phase
- Test cases for phase validation
- What's NEW in this phase (references architecture doc for existing systems)

**Why:** Phases are natural groupings of related work. AI can read one PRD and implement multiple slices. Less boilerplate than 17 individual PRDs.

#### **3. Just-In-Time Implementation Plans** (AI-generated per slice)
**Location:** `/docs/implementation/slice-XX-implementation-plan.md`

**Purpose:** Detailed, file-by-file implementation plan created right before building each slice.

**Contents:**
- Specific tasks broken down (file by file)
- Exact code locations and changes
- Dependencies on existing systems (references architecture doc)
- Test plan for this slice
- Validation checklist

**Created:** Generated by AI using `superpowers:writing-plans` based on: slice overview + phase PRD + architecture doc.

**Why:** AI writes this when it has maximum context. You review/approve, then AI implements. This is "just enough detail, just in time."

---

### Phase & Slice Readiness Criteria

#### **Phase is "Ready to Work" when:**
- [ ] Phase PRD exists in `/docs/product/prd/PRD-Phase-X-[Name].md`
- [ ] System Architecture doc is up-to-date with all systems from previous phases
- [ ] All dependencies from previous phases are complete
- [ ] Acceptance criteria are clearly defined
- [ ] Test validation strategy is documented

#### **Slice is "Ready to Implement" when:**
- [ ] Implementation plan exists in `/docs/implementation/slice-XX-implementation-plan.md`
- [ ] Implementation plan has been reviewed and approved
- [ ] All dependencies from previous slices are complete
- [ ] Test cases are defined
- [ ] Validation criteria from slice overview are clear

#### **Slice is "Complete" when:**
- [ ] All implementation tasks are done
- [ ] All test cases pass
- [ ] Validation criteria from slice overview are met (fun + pedagogy + architecture)
- [ ] System Architecture doc is updated with learnings
- [ ] Implementation plan is committed to git
- [ ] Demo/validation session with test users (if applicable)

---

### Workflow: From Phase to Slice to Code

#### **Before Starting a Phase:**
1. Review previous phase learnings
2. Update `SYSTEM-ARCHITECTURE.md` based on what you learned
3. Create phase PRD: `PRD-Phase-X-[Name].md`
4. Review and approve phase PRD

#### **Before Starting Each Slice:**
1. AI reads:
   - Slice overview (`/docs/product/prd/slice-XX-*.md`)
   - Phase PRD (`/docs/product/prd/PRD-Phase-X-[Name].md`)
   - System Architecture doc (`/docs/architecture/SYSTEM-ARCHITECTURE.md`)
2. AI generates implementation plan using `superpowers:writing-plans`
3. **Review and approve implementation plan** (mandatory gate)
4. Only after approval: Begin implementation

#### **During Slice Implementation:**
1. Follow implementation plan tasks sequentially
2. Write tests as you go (per plan)
3. Update architecture doc if you discover new patterns or make architectural decisions
4. Commit frequently with clear messages

#### **After Slice Completion:**
1. Run all tests (unit + integration + validation)
2. Validate against slice's three dimensions (fun + pedagogy + architecture)
3. Update `SYSTEM-ARCHITECTURE.md` with any changes or learnings
4. Commit implementation plan to git
5. Demo to stakeholders (if applicable)
6. Mark slice as complete
7. Move to next slice or phase

#### **After Phase Completion:**
1. Retrospective: Did the architecture hold up? What broke? What surprised you?
2. Update `SYSTEM-ARCHITECTURE.md` with major learnings
3. Review next phase PRD (or create it)
4. Celebrate! 🎉

---

### Mandatory Gates (AI Agents Must Not Skip)

**GATE 1: No implementation without an approved implementation plan.**
- AI must generate implementation plan using `superpowers:writing-plans`
- Human must review and approve
- Only then can AI write code

**GATE 2: No moving to next slice without completing current slice.**
- All validation criteria must be met
- System Architecture doc must be updated
- Tests must pass

**GATE 3: No moving to next phase without phase retrospective.**
- Review what worked, what didn't
- Update architecture doc with learnings
- Validate that all slices in phase are complete

---

### Why This Strategy Works for AI Development

1. **Architecture doc is the AI's memory** – It reads this first to understand existing systems
2. **Phase PRDs give goals, not prescriptive steps** – AI figures out "how" based on context
3. **Implementation plans are AI-generated just-in-time** – Informed by latest architecture, not stale
4. **You don't over-document** – Things that will change aren't locked in prematurely
5. **Living architecture doc prevents chaos** – Single source of truth that grows with project
6. **Mandatory gates prevent shortcuts** – Forces planning before coding, validation before moving on

---

## How to Use This Document

1. **First-time reading:** Start with "The Slicing Philosophy" section to understand *why* we're building this way.
2. **Quick reference:** Use "The 17 Slices at a Glance" table to see the roadmap.
3. **Phase planning:** Before starting a new phase, read the "Phase Breakdown & Dependencies" section.
4. **Detailed slice info:** Read the corresponding slice file in `/prd/slice-XX-*.md`.
5. **Risk management:** Review "Architectural Assumptions & Risks" before starting each phase.

---

## Next Steps

Once you're ready to start implementation:

1. **Pick Slice 1** and create a detailed PRD + architecture doc (use `superpowers:writing-plans`).
2. **Set up tech stack** (platform, build tools, SR engine library, etc.).
3. **Build Slice 1**, test thoroughly, and get feedback from a small group of parents/kids.
4. **Iterate on Slice 1** until it passes all three validation dimensions.
5. **Move to Slice 2**, reusing architecture from Slice 1.

At any point, if a slice fails validation, revisit the assumptions and adjust the next slices accordingly.

---

## Document History

- **2025-11-26:** Initial brainstorming session. All 17 slices defined. Strategy document created.
