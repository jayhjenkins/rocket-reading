# Slice 1: Foundation & Minimal SR Engine

## Overview
App shell, minimal SR item model, one working mini-game, basic daily loop.

## Contents
- App boots to a "Welcome" screen.
- Parent can set child name and enter Co-Play mode.
- SR engine stores items locally (letter-sound cards, simple interval logic).
- One mini-game works: **Letter → Sound (Production)** – child hears a prompt, answers aloud, parent taps ✅/😬/❌.
- Interval updates: ✅ → 1 day, ❌ → review again today.
- App tracks 5 letter-sound items (e.g., /m/, /a/, /t/, /s/, /i/).
- Session runs for ~3 minutes, shows 5 items with basic SR scheduling.

## Why This Order
You need the SR engine + one working mini-game + parent grading to prove the core loop works. This is technically foundational, but it's also playable—a parent can sit down and see *something* happen.

## Validation Criteria
- **Technical:** SR item tracking, local storage, parent input flow work.
- **Pedagogical:** Can we confirm that parent grading + SR interval logic is plausible? (Even 5 letters is a signal.)
- **Fun:** Mascot greeting + simple feedback = minimal game feel, but non-zero.
