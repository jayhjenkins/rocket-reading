# Slice 16: World 4 Quest Structure & Overworld

## Overview
Wrap World 4 tricky words + sentence reading in quests, unlock Town locations.

## Contents
- Overworld expands with 3 new locations:
  1. **Town Square** – Sign reading quest: "Read the shop signs to find what you need!" → Sentence Reading mini-game.
  2. **Grandma's Kitchen** – Recipe quest: "Read the recipe and help Grandma cook!" → Sentence Reading (sentences like "Mix the eggs." "Stir the pot.").
  3. **Library** – Book quest: "Read all the book titles and find the right one!" → Sentence Reading + comprehension.
- Quest generator pulls due sentences and tricky words, wraps them in real-world contexts (shops, cooking, reading).
- World state persists: shops open, kitchen fills with food, library gets organized.
- Sessions are ~10–15 minutes (mixing maintenance items from Worlds 1–3 + World 4 sentences + tricky words).
- New NPC interactions are more narrative-driven (Grandma, shopkeeper, librarian) with brief dialogue using sentences kids can read.

## Why This Order
World 4 is pedagogically about **reading fluently in context**, not isolated skills. Quests grounded in real scenarios (cooking, shopping, reading) show kids that decoding leads to *doing things*. This validates that the game loop supports narrative depth.

## Validation Criteria
- **Fun:** Do real-world quests (cooking, shopping) feel more grown-up and engaging?
- **Pedagogy:** Do contextualized sentences help kids understand meaning better than isolated words/sentences?
- **Architecture:** Does the quest generator handle narrative context + sentence SR cleanly?
