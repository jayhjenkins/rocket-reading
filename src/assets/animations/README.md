# Animation Assets for Rocket Reading Phase 1

## Overview

Animations add delight and visual feedback to the app. These are **optional for Slice 1** but recommended for engagement.

## Recommended Animations

### 1. Mascot Celebration Animation

**Purpose:** When session completes or child gets item correct, mascot celebrates

**Specifications:**
- **Format:** GIF (animated) or sprite sheet (PNG) or MP4 (video)
- **Duration:** 1–2 seconds
- **Frame Rate:** 24–30 fps
- **Size:** 300×300 px (standard) or 600×600 px (high-DPI)
- **File:** `anim_mascot_celebration.gif` or `anim_mascot_celebration.png` (sprite)
- **Content:** Jump, spin, wave, or other celebratory motion

### 2. Letter Bounce Animation

**Purpose:** When child gives correct answer, letter bounces for visual feedback

**Specifications:**
- **Format:** GIF (animated) or CSS animation (preferred)
- **Duration:** 0.5–1 second
- **Frame Rate:** 24–30 fps
- **Size:** 120×120 px (letter display area)
- **File:** `anim_letter_bounce.gif`
- **Content:** Subtle bounce (up, down) with slight scale change

### 3. Button Press Animation

**Purpose:** Visual feedback when parent taps grading button

**Specifications:**
- **Format:** CSS animation (preferred, no file needed)
- **Duration:** 0.2–0.3 seconds
- **Content:** Button scale down slightly (0.98x), then back to normal
- **Alternative:** Can provide sprite sheet if CSS animation not available

### 4. Page Transition Animation

**Purpose:** Smooth fade between screens

**Specifications:**
- **Format:** CSS animation (preferred, no file needed)
- **Duration:** 0.3–0.5 seconds
- **Content:** Fade in/out of new screen

## Implementation Notes

### CSS Animations (Preferred)

Most animations can be implemented in CSS without asset files:

```css
@keyframes letterBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes buttonPress {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.98); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### GIF/Sprite Implementation

If providing GIF or sprite sheet:

1. **GIF Format:**
   - Use online tool to create animated GIF
   - Keep file size < 100 KB
   - Test playback in all browsers

2. **Sprite Sheet Format:**
   - Combine animation frames into single PNG (e.g., 5 frames × 300×300 = 1500×300 px)
   - Use CSS background-position to animate frames
   - File size target: < 50 KB

## Delivery Checklist (Optional)

- [ ] Mascot celebration animation (1–2 sec)
- [ ] Letter bounce animation (0.5–1 sec)
- [ ] Button press animation (CSS preferred)
- [ ] Page transition animation (CSS preferred)
- [ ] Test animations in all target browsers
- [ ] Ensure < 100 KB total for all animated assets

## If Not Provided

If animated assets are not provided, the app will still work with **CSS-based animations only** (no file dependencies). The following will use CSS:

- Button press feedback (scale)
- Page transitions (fade)
- Letter highlight (color change)

The following would benefit from animated assets but can work with static images:

- Mascot celebration (can show static celebrating image instead)
- Letter bounce (can show bouncing via CSS, looks less natural)

## Directory Structure

```
src/assets/animations/
├── anim_mascot_celebration.gif
├── anim_letter_bounce.gif
└── [optional: sprite sheets or MP4 files]
```

## Recommendation for Phase 1

For **Slice 1 launch**, animations are optional. Priority order:

1. **Critical (Slice 1):** Audio + images (mascot, buttons, backgrounds)
2. **High Priority (Slice 2):** Letter tiles + animations
3. **Nice to Have:** Sprite sheets or custom animations

Focus on audio and static images first to meet launch deadline. Animations can be added in Slice 2 or as polish pass.
