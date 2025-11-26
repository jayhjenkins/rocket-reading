# Image Assets for Rocket Reading Phase 1

## Overview

**Phase 1 uses a CODE-FIRST approach for UI elements.** Most visual elements (buttons, letter tiles, icons, backgrounds) are rendered with CSS/React, NOT images.

**Images are ONLY needed for:**
1. Mascot character (4 poses)
2. Future: NPCs and micro-book illustrations (Phase 2+)

---

## What You Need to Provide

### MASCOT CHARACTER (4 poses - CRITICAL for Phase 1)

Friendly character that appears throughout the app. This is the ONLY image asset required for Slice 1 launch.

**Sizes:**
- **Standard (1x):** 300×300 px
- **High-DPI (2x):** 600×600 px

**Required Poses:**

#### 1. Neutral Pose
- **File:** `mascot_neutral.png` / `mascot_neutral@2x.png`
- **Use:** Home screen, session screens (appears consistently)
- **Expression:** Standing naturally, friendly/calm expression
- **Mood:** Welcoming, approachable

#### 2. Greeting Pose
- **File:** `mascot_greeting.png` / `mascot_greeting@2x.png`
- **Use:** Welcome screen ("Hi [child's name]!")
- **Expression:** Waving, excited, welcoming
- **Mood:** Enthusiastic, inviting

#### 3. Celebrating Pose
- **File:** `mascot_celebrating.png` / `mascot_celebrating@2x.png`
- **Use:** Positive feedback, session completion
- **Expression:** Jumping, cheering, arms raised, big smile
- **Mood:** Joyful, proud, encouraging

#### 4. Encouraging Pose
- **File:** `mascot_encouraging.png` / `mascot_encouraging@2x.png`
- **Use:** When child needs help or gets item wrong
- **Expression:** Supportive, gentle (thumbs up, nod, warm smile)
- **Mood:** Patient, kind, non-judgmental (NOT disappointed)

**Design Requirements:**
- **Format:** PNG with transparent background (RGBA, no white backgrounds)
- **Style:** Cartoon, colorful, age-appropriate (2.5–5 years)
- **Consistency:** All 4 poses should clearly be the same character
- **Color palette:** Bright, warm colors (suggest primary colors or pastels)
- **File size target:** < 50 KB per PNG (optimize for web)
- **Safe area:** Character fits within 280×280 px center (leave 10px margin for shadows/effects)

**Character Design Notes:**
- Friendly animal or creature (e.g., rocket ship with eyes, owl, friendly monster, robot)
- Simple, clear silhouette (recognizable at small sizes)
- Expressive eyes (main way to convey emotion)
- Avoid scary/aggressive features (sharp teeth, angry expressions)
- Consider brand identity (this character will be everywhere!)

---

## What You DON'T Need to Provide

These are ALL rendered with CSS/React code (no images needed):

### ❌ Buttons (Code-Based)
- Grading buttons (✅ Got it, 😬 Needed help, ❌ Didn't know)
- All button states (hover, pressed, disabled)
- Implemented with CSS + Unicode emoji

### ❌ Letter Tiles (Code-Based)
- 12 letter tiles for Sound → Letter mini-game
- Rendered as styled text in React components
- Colors/styling via CSS

### ❌ UI Icons (Code-Based)
- Navigation icons (home, back, etc.)
- Feedback icons (checkmark, speaker, etc.)
- Using Unicode emoji or inline SVG

### ❌ Backgrounds (Code-Based)
- Welcome screen background (CSS gradient)
- Session screen background (CSS gradient)
- All page transitions (CSS animations)

### ❌ Animations (Code-Based)
- Button press/hover effects (CSS transitions)
- Page transitions (CSS fade/slide)
- Letter bounce effects (CSS keyframes)

---

## Delivery Instructions

### File Naming Convention
```
mascot_neutral.png       (300×300 px)
mascot_neutral@2x.png    (600×600 px)
mascot_greeting.png      (300×300 px)
mascot_greeting@2x.png   (600×600 px)
mascot_celebrating.png   (300×300 px)
mascot_celebrating@2x.png (600×600 px)
mascot_encouraging.png   (300×300 px)
mascot_encouraging@2x.png (600×600 px)
```

### Where to Place Files
```
src/assets/images/
├── mascot_neutral.png
├── mascot_neutral@2x.png
├── mascot_greeting.png
├── mascot_greeting@2x.png
├── mascot_celebrating.png
├── mascot_celebrating@2x.png
├── mascot_encouraging.png
└── mascot_encouraging@2x.png
```

### Quality Checklist
- [ ] All PNG files have transparent backgrounds (RGBA)
- [ ] @2x versions are exactly 2× size of 1x versions
- [ ] File sizes are optimized (< 50 KB per file)
- [ ] Character is centered in canvas (10px margin on all sides)
- [ ] All 4 poses are clearly the same character
- [ ] Colors are consistent across all poses
- [ ] No white backgrounds or drop shadows baked into files
- [ ] Expressions match intended mood (neutral, greeting, celebrating, encouraging)

### How to Test
1. Place files in `src/assets/images/`
2. Import in React component:
   ```tsx
   import mascotNeutral from '@/assets/images/mascot_neutral.png'
   import mascotNeutral2x from '@/assets/images/mascot_neutral@2x.png'

   <img
     src={mascotNeutral}
     srcSet={`${mascotNeutral} 1x, ${mascotNeutral2x} 2x`}
     alt="Mascot character"
     width={300}
     height={300}
   />
   ```
3. View on desktop, tablet, iPad to verify quality
4. Commit with message: `feat: add mascot character images (4 poses)`

---

## Total File Count

**Phase 1 (Slice 1 minimum):**
- 8 PNG files (4 poses × 2 sizes)

**Future Phases:**
- NPCs (characters for each world location)
- Micro-book illustrations
- Optional: Custom icons if Unicode/SVG don't suffice

---

## Size Budget

**Phase 1 Image Budget:** < 400 KB total
- Mascot (8 files): ~300 KB (4 poses × 2 sizes × ~40 KB each)
- Leaves room for future assets

**Why This Matters:**
- Faster load times (< 2 seconds on mobile)
- Better user experience
- Works on slow connections

---

## Design Inspiration & Style Guide

### Suggested Character Types
- **Rocket ship with eyes** (fits "Rocket Reading" brand)
- **Friendly owl** (wisdom, learning)
- **Cute robot** (tech-friendly, approachable)
- **Friendly monster/creature** (Sesame Street vibes)

### Color Palette Suggestions
- **Primary:** Bright blues, greens, yellows (high energy)
- **Accent:** Warm oranges, pinks (friendly, inviting)
- **Avoid:** Dark colors, grays, harsh reds (too serious)

### References
- Duolingo mascot (simple, expressive, friendly)
- Sesame Street characters (colorful, approachable)
- PBS Kids mascots (age-appropriate, educational)

---

## Questions?

If you need clarification on:
- Character design direction
- Specific expressions/poses
- Technical specs

Reach out before starting work. We want to get this right the first time!

---

## Future Assets (Not Needed Yet)

These will be requested in later phases:

### Phase 2+ (World 1):
- NPC characters (Beaver, Duck, Luna the dog)
- Location backgrounds (optional)

### Phase 3+ (Worlds 2-4):
- Additional NPCs
- Micro-book illustrations

**For now:** Focus ONLY on the mascot (4 poses, 8 files). Everything else is code!
