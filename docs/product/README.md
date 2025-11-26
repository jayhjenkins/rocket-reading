# Product Documentation

This directory contains all product management and design documentation for Rocket Reading.

## Directory Structure

### Core Documentation
- **00-SLICING-STRATEGY-OVERVIEW.md** - Complete build plan, slicing philosophy, and SDLC strategy (READ THIS FIRST)
- **FUTURE-ROADMAP.md** - Features and slices beyond Phase 1–5

### PRD Folder Organization
- **prd/** - Product Requirements Documents organized by phase
  - **00-SLICING-STRATEGY-OVERVIEW.md** - Root level: overall strategy document
  - **FUTURE-ROADMAP.md** - Root level: future features and roadmap
  - **phase-1/** - Foundation phase (Slices 1–2)
    - `PRD-Phase-1-Foundation.md` - Phase 1 goals, user stories, acceptance criteria
    - `slice-01-*.md` - Slice 1 overview
    - `slice-02-*.md` - Slice 2 overview
    - `implementations/` - Implementation plans (created during development)
  - **phase-2/** - World 1 completion (Slices 3–7)
    - `slice-03-*.md` through `slice-07-*.md` - Slice overviews
    - `implementations/` - Implementation plans
  - **phase-3/** - World 2 completion (Slices 8–11)
  - **phase-4/** - World 3 completion (Slices 12–14)
  - **phase-5/** - World 4 completion (Slices 15–17)

### Other Documentation
- **game-specs/** - Game mechanics, rules, and specifications
- **user-research/** - User research findings, interviews, studies
- **personas/** - User personas and stakeholder profiles
- **requirements/** - Detailed feature requirements and specifications
- **wireframes/** - UI/UX wireframes, prototypes, and mockups

## How to Use This Documentation

### Before Starting Any Phase or Slice

1. Read `/docs/product/prd/00-SLICING-STRATEGY-OVERVIEW.md` - understand the strategy and SDLC approach
2. Read `/docs/architecture/SYSTEM-ARCHITECTURE.md` - understand the architecture and existing systems
3. Read the phase PRD (e.g., `prd/phase-1/PRD-Phase-1-Foundation.md`) - understand phase goals
4. Read the slice overview (e.g., `prd/phase-1/slice-01-*.md`) - understand specific deliverables

### During Implementation

- Implementation plans go in `phase-X/implementations/slice-XX-implementation-plan.md`
- Update `/docs/architecture/SYSTEM-ARCHITECTURE.md` with architectural decisions and learnings
- All core logic should be platform-agnostic (Phase 1 is web; Phase 2+ are native)

### After Phase Completion

- Retrospective: What worked? What broke? What surprised us?
- Update `/docs/architecture/SYSTEM-ARCHITECTURE.md` with major learnings
- Create next phase PRD (e.g., `PRD-Phase-2-World-1.md`) for future phases
