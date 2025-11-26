# Slice 7: Personalization Infrastructure (My World)

## Overview
Parent can configure family names, pet names, favorite topics, and the system injects them into World 1 content (non-SR, narrative only).

## Contents
- Parent gate: "Set up My World" form where parents enter:
  - Family/friends: Mom, Dad, Grandma, siblings, etc.
  - Pets: name, type (dog, cat, fish).
  - Favorites: trucks, dinosaurs, soccer, etc.
- System stores this data locally.
- World 1 content adapts:
  - NPC names can use family names (e.g., "Grandma the gardener").
  - Micro-books get personalized: "Luna the dog helps the beaver" → "Luna is your dog's name."
  - Treehouse has photos/avatars of family members (visual, no decoding).
- **Critical:** Personalization does *not* enter SR items yet (World 1 has no sentence decoding, so no decodability checks needed). It's purely narrative/visual.
- Quests stay data-driven (SR items stay generic), but scene flavor uses personal data.

## Why This Order
You're testing the infrastructure for *injecting* personal data without changing the SR logic. World 1 doesn't use personal names in decoding, so it's a safe place to prove the system works. When World 2 arrives, you'll add decodability checks + sentence templates with personal slots.

## Validation Criteria
- **Engagement:** Do personalized narratives make kids care more?
- **Architecture:** Can you swap in personal names without breaking quest generation?
- **Parent experience:** Is the My World form easy to use?
