# Slice 11: Micro-Sentence SR (Epoch 2 Transition)

## Overview
Add sentence-level SR items + sentence reading mini-game to set up for World 3.

## Contents
- Expand SR engine to support a new item type: **Micro-Sentences** (2–5 words, fully decodable, simple syntax).
- New mini-game: **Sentence Reading** – App shows a short sentence (e.g., "The cat is big"); child reads aloud; parent grades fluency (Smooth / Choppy / Needed help).
- Create ~20 micro-sentence SR items using World 2 vocabulary + high-frequency words (the, is, a, my, and).
- Mix into World 2 quests: sessions now have word-level items + sentence-level items together.
- Completion logic: child can move to World 3 once they've mastered 30 CVC words + read 5 micro-sentences with ≥90% accuracy.
- Parent dashboard updated to show "Sentence Reading" as a new skill strand.

## Why This Order
This is an **architectural milestone**—you're moving from Epoch 1 (units & words) to Epoch 2 (micro-sentences) as defined in the spec. It's a safe transition because World 2 vocabulary is familiar. Testing it here means World 3+ can assume sentences work.

## Validation Criteria
- **Pedagogical:** Do kids apply word knowledge to sentences? Does SR spacing help sentence fluency?
- **Architecture:** Does adding a new item type break the SR engine?
- **Engagement:** Do sentences feel like progress, or overwhelming?
