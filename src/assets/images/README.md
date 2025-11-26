# Image Assets for Rocket Reading Phase 1

## Asset Categories

### 1. MASCOT (4 poses required)

Friendly character that appears throughout the app. Provide in standard (1x) and high-DPI (2x) versions.

**Standard (1x):** 300×300 px
**High-DPI (2x):** 600×600 px

#### Required Poses:
- `mascot_neutral.png` / `mascot_neutral@2x.png`
  - Standing naturally, friendly expression
  - Used on home screen and session screens

- `mascot_greeting.png` / `mascot_greeting@2x.png`
  - Waving or friendly greeting pose
  - Used on welcome screen ("Hi [child's name]!")

- `mascot_celebrating.png` / `mascot_celebrating@2x.png`
  - Jumping, cheering, or happy pose
  - Used for positive feedback and session completion

- `mascot_encouraging.png` / `mascot_encouraging@2x.png`
  - Supportive, gentle pose (thumbs up, nod, smile)
  - Used when child needs help or gets item wrong

**Requirements:**
- Format: PNG with transparent background (RGBA)
- Style: Cartoon, colorful, age-appropriate (2.5–5 years)
- No white backgrounds, no drop shadows in file itself

### 2. GRADING BUTTONS (3 button types, 3 states each)

Parent taps these to grade child's response. Provide standard (1x) and high-DPI (2x).

**Standard:** 150×60 px
**High-DPI (2x):** 300×120 px

#### Button Set 1: Got It (✅) - GREEN
- `btn_correct.png` / `btn_correct@2x.png` - Default state
- `btn_correct_hover.png` / `btn_correct_hover@2x.png` - Hover state (slightly darker or outlined)
- `btn_correct_pressed.png` / `btn_correct_pressed@2x.png` - Pressed state (darker, inset)

#### Button Set 2: Needed Help (😬) - ORANGE
- `btn_help.png` / `btn_help@2x.png` - Default state
- `btn_help_hover.png` / `btn_help_hover@2x.png` - Hover state
- `btn_help_pressed.png` / `btn_help_pressed@2x.png` - Pressed state

#### Button Set 3: Didn't Know (❌) - RED
- `btn_wrong.png` / `btn_wrong@2x.png` - Default state
- `btn_wrong_hover.png` / `btn_wrong_hover@2x.png` - Hover state
- `btn_wrong_pressed.png` / `btn_wrong_pressed@2x.png` - Pressed state

**Requirements:**
- Format: PNG with transparent background
- Include emoji/icon + text label on button
- Text: Bold, large (24–28 pt)
- Corner radius: 10 px (rounded, friendly)
- Minimum touch target: 48×48 px
- Include label text: "Got it", "Needed help", "Didn't know"

### 3. LETTER TILES (12 letters for Slice 2)

Used in Sound → Letter mini-game. Child taps correct letter.

**Standard:** 120×120 px
**High-DPI (2x):** 240×240 px

**Format:** PNG (transparent background) OR SVG (scalable - preferred)

**Files (one per letter):**
- `letter_tile_m.png` / `letter_tile_m@2x.png`
- `letter_tile_a.png` / `letter_tile_a@2x.png`
- `letter_tile_t.png` / `letter_tile_t@2x.png`
- `letter_tile_s.png` / `letter_tile_s@2x.png`
- `letter_tile_i.png` / `letter_tile_i@2x.png`
- `letter_tile_p.png` / `letter_tile_p@2x.png`
- `letter_tile_n.png` / `letter_tile_n@2x.png`
- `letter_tile_o.png` / `letter_tile_o@2x.png`
- `letter_tile_e.png` / `letter_tile_e@2x.png`
- `letter_tile_r.png` / `letter_tile_r@2x.png`
- `letter_tile_d.png` / `letter_tile_d@2x.png`
- `letter_tile_l.png` / `letter_tile_l@2x.png`

**Requirements:**
- Lowercase letters (phonemic focus, not uppercase)
- Font: Clear, sans-serif (Arial, Verdana, or custom friendly font)
- Each letter in unique, bright color (color-coded for recognition)
- Minimum font size: 80 pt when displayed in app
- Rounded corners recommended (friendly look)
- No shadow in file itself (can be added via CSS)

### 4. UI ICONS (5–8 icons needed)

Small navigation and feedback icons.

**Standard:** 48×48 px
**High-DPI (2x):** 96×96 px

**Format:** PNG (transparent) or SVG (preferred, scalable)

#### Required Icons:
- `icon_home.png` / `icon_home@2x.png` - Home/back navigation
- `icon_back.png` / `icon_back@2x.png` - Go back button
- `icon_speaker.png` / `icon_speaker@2x.png` - Audio/sound indicator
- `icon_checkmark.png` / `icon_checkmark@2x.png` - Success/correct indicator

**Requirements:**
- Simple, clear designs
- High contrast for accessibility
- Consistent stroke width
- No fills (outline style preferred) or solid fills

### 5. BACKGROUNDS (2 required, 3 recommended)

Scene/mood setting for different screens.

**Format:** PNG (2000×1500 px) or SVG (scalable)

#### Required:
- `bg_welcome.png` - Welcome/home screen
  - Colorful, inviting, space/rocket theme
  - Current design uses gradient: purple (#667eea) to pink (#764ba2)
  - Can be CSS gradient (preferred) or image

- `bg_session.png` - During session/mini-game
  - Calm, less busy (focus should be on letter)
  - Current design uses same gradient as welcome
  - Can be CSS gradient (preferred) or subtle pattern image

#### Optional (for future phases):
- `bg_world1.png` - World 1 scene (Slice 3)
- `bg_world2.png` - World 2 scene (Slice 8)
- `bg_world3.png` - World 3 scene (Slice 12)

**Requirements:**
- High resolution (suitable for desktop and tablet)
- Accessible on all screen sizes (use CSS media queries)
- Optimized for web (< 200 KB per image)
- Optional: Subtle texture/pattern (avoid busy designs that distract from content)

### 6. FONTS (Optional but Recommended)

If using custom fonts for letters or UI:
- Webfont file (WOFF2 preferred)
- Example: `font_letter.woff2` (for displaying letters)
- Example: `font_ui.woff2` (for button text)

## Summary Checklist

### Slice 1 (Minimum to launch)
- [ ] Mascot: 4 poses × 2 sizes = 8 files
- [ ] Grading buttons: 3 types × 3 states × 2 sizes = 18 files
- [ ] Backgrounds: 2 × 1 size = 2 files (or CSS gradients)
- [ ] UI icons: 3–4 × 2 sizes = 6–8 files
- [ ] Letter tiles: NOT NEEDED YET (Slice 2)

**Total for Slice 1: ~32–36 image files**

### Slice 2 (Complete Phase 1)
- [ ] Letter tiles: 12 letters × 2 sizes = 24 files (or 12 SVGs)
- [ ] Additional mascot animations (optional)

**Total for Phase 1: ~56–60 image files**

## Delivery Instructions

1. Create subdirectories as needed (e.g., `images/buttons/`, `images/letters/`)
2. Use consistent naming: lowercase, underscores, descriptive names
3. For 2x versions, suffix with `@2x` (e.g., `mascot_neutral@2x.png`)
4. All PNG files must have transparent backgrounds (RGBA)
5. Test images in browser across different screen sizes
6. Commit with message: `feat: add image assets for Phase 1`

Example directory structure after completion:
```
src/assets/images/
├── mascot_neutral.png
├── mascot_neutral@2x.png
├── mascot_greeting.png
├── mascot_greeting@2x.png
├── mascot_celebrating.png
├── mascot_celebrating@2x.png
├── mascot_encouraging.png
├── mascot_encouraging@2x.png
├── btn_correct.png
├── btn_correct@2x.png
├── btn_correct_hover.png
├── btn_correct_hover@2x.png
├── btn_correct_pressed.png
├── btn_correct_pressed@2x.png
├── btn_help.png
├── btn_help@2x.png
├── [btn_help hover/pressed variations]
├── btn_wrong.png
├── btn_wrong@2x.png
├── [btn_wrong hover/pressed variations]
├── icon_home.png
├── icon_home@2x.png
├── icon_back.png
├── icon_back@2x.png
├── icon_speaker.png
├── icon_speaker@2x.png
├── icon_checkmark.png
├── icon_checkmark@2x.png
├── bg_welcome.png
└── bg_session.png
```

## Design Consistency Notes

- **Color Palette:** Use consistent colors across mascot, buttons, and backgrounds
- **Typography:** Consistent font family for all UI text (e.g., Arial, Verdana, or custom webfont)
- **Spacing:** Buttons should have consistent padding/margin
- **Accessibility:** High contrast (WCAG AA minimum), clear shapes, avoid color-only differentiation
- **Responsiveness:** Test on desktop (1920×1080), tablet (1024×768), and mobile (480×800)
