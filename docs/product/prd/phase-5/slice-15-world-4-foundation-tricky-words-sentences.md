# Slice 15: World 4 Foundation – Tricky Words & Sentence Expansion

## Overview
Introduce explicit "tricky" word items + expand micro-sentence SR library for sentence-heavy practice.

## Contents
- Add a new SR item type: **Tricky Words** (high-frequency words with irregular patterns: I, the, is, to, you, my, said, was, etc.).
- New mini-game: **Tricky Word Recognition** – App shows a tricky word; parent tells the child the word (or child attempts to decode the decodable part); child repeats; parent grades confidence.
- Expand micro-sentence SR items to ~40–50 sentences using:
  - CVC + digraph/blend words from Worlds 2–3.
  - High-frequency tricky words (the, is, a, my, and, to, you, I).
  - Simple syntax: "The cat is big." "I see a fish." "You run fast."
- Sessions mix Word Reading + Sentence Reading + Tricky Word Recognition + World 1–3 reviews in maintenance.
- Completion logic: child can move to World 5 once they've mastered 15+ tricky words + read 10 sentences with ≥90% accuracy.
- Parent dashboard updated to show "Tricky Words" and "Sentence Reading Fluency" as skill strands.

## Why This Order
This is an **instructional pivot**—you're shifting from "learn the rules" (phonics) to "apply the rules + memorize exceptions" (tricky words + fluent sentence reading). Testing this transition with sentences you've already built (Slice 11) de-risks the architecture. Tricky words need their own mini-game because they violate the decodability assumption.

## Validation Criteria
- **Pedagogical:** Can kids recognize tricky words when taught explicitly? Does sentence SR spacing work for fluency?
- **Architecture:** Does a new "Tricky Word" item type integrate without breaking the engine?
- **Engagement:** Do kids see sentences as progress toward "real reading," or are they overwhelmed?
