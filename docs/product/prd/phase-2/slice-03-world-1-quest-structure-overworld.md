# Slice 3: World 1 Quest Structure & Overworld

## Overview
Wrap World 1 mini-games in quests + add basic world persistence.

## Contents
- Overworld now has 3–4 simple locations: **Treehouse, Garden, Meadow, Forest.**
- Each location has **one NPC** (e.g., mascot, gardener, squirrel).
- Each NPC has **one repeating quest** (e.g., "Help sort seeds by sound" → runs the Letter → Sound mini-game).
- Quest generator: pulls appropriate **due SR items** for that skill (e.g., letter-sounds) and themes them as a quest.
- **World state persistence:** When you complete a quest, something small changes (e.g., "Garden has one more seed planted"; visual counter or simple animation).
- Sessions now follow the full loop: Welcome → Choose quest → Mini-games → Completion reward → Closure.
- Still ~5–10 minute sessions, but now wrapped in game narrative.

## Why This Order
This is where it *feels* like a game, not a drill. The SR items are still the same (12 letters), but now they're embedded in quests with characters and world persistence. You validate that the "game" framing doesn't break the SR logic, and that kids find it more engaging.

## Validation Criteria
- **Fun:** Does the quest framing + world change make it feel like a game? Do kids want to come back?
- **Pedagogical:** Does wrapping SR in quests affect learning outcomes? (Should be neutral or positive.)
- **Architecture:** Does the quest generator work? Does world state persistence cause issues?
