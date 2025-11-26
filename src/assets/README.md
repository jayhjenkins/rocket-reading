# Rocket Reading Phase 1 Media Assets

This directory contains all media assets (audio, images, animations) needed for Phase 1 (Slices 1–2).

## Quick Start

1. **Audio:** See `audio/README.md` → Add letter sound MP3 files
2. **Images:** See `images/README.md` → Add mascot, buttons, backgrounds, icons
3. **Animations:** See `animations/README.md` → Add optional animations (GIFs, sprites)

## Directory Structure

```
src/assets/
├── audio/                 # Letter sound files (.mp3)
│   ├── README.md
│   └── letter_*.mp3      # 12 files total (m, a, t, s, i, p, n, o, e, r, d, l)
├── images/               # Visual assets (.png, .svg)
│   ├── README.md
│   ├── mascot_*.png      # 4 poses × 2 sizes (8 files)
│   ├── btn_*.png         # Grading buttons (18 files)
│   ├── icon_*.png        # UI icons (8 files)
│   ├── letter_tile_*.png # Letter tiles for Slice 2 (24 files)
│   └── bg_*.png          # Backgrounds (2 files)
└── animations/           # Animated assets (.gif, .mp4)
    ├── README.md
    └── anim_*.gif        # Optional animations (2–4 files)
```

## Phase 1 Media Summary

### CODE-FIRST APPROACH ✅

**Phase 1 uses CSS/React for most UI elements (not images).** This reduces file count, speeds up development, and makes the app more maintainable.

**Images ONLY needed for:** Mascot character (4 poses, 8 PNG files)

**Rendered with code:** Buttons, letter tiles, icons, backgrounds, animations

---

### Slice 1 (Foundation - LAUNCH PRIORITY)

**Audio Required:**
- 5 letter sounds: m, a, t, s, i ✅ (uploaded)

**Images Required:**
- Mascot (4 poses × 2 sizes): neutral, greeting, celebrating, encouraging (8 PNG files)

**Code-Based (NO images needed):**
- ✅ Grading buttons (CSS + emoji)
- ✅ UI icons (Unicode emoji or SVG)
- ✅ Backgrounds (CSS gradients)
- ✅ Animations (CSS keyframes)

### Slice 2 (Foundation - Phase 1 Completion)

**Audio Required:**
- 7 additional letter sounds: p, n, o, e, r, d, l (total 12 letters)
- Currently have: 10 of 12 ✅ (missing: d, l)

**Images Required:**
- None (mascot from Slice 1 reused)

**Code-Based (NO images needed):**
- ✅ Letter tiles (styled text in React)
- ✅ All animations (CSS)

## File Requirements

### Audio Files
- **Format:** MP3 (primary), WAV (backup), OGG (fallback)
- **Bitrate:** 128 kbps
- **Duration:** 0.5–1 second
- **Quality:** Clear, native speaker, no background noise
- **Size:** ~12 KB per file

### Image Files
- **Format:** PNG (transparent background) or SVG (scalable)
- **Sizes:** Provide 1x (standard) and 2x (high-DPI) versions for PNG
- **Transparency:** RGBA (no white backgrounds)
- **Color Palette:** Bright, colorful, age-appropriate (2.5–5 years)
- **Accessibility:** High contrast, clear shapes

### Animation Files
- **Format:** GIF, MP4, or CSS animation (preferred)
- **Duration:** 0.5–2 seconds
- **Frame Rate:** 24–30 fps
- **Size:** < 100 KB per animation

## Naming Conventions

**Audio:**
```
letter_{letter}.mp3       # e.g., letter_m.mp3
```

**Images:**
```
mascot_{pose}.png         # e.g., mascot_greeting.png
mascot_{pose}@2x.png      # High-DPI version
btn_{type}.png            # e.g., btn_correct.png
btn_{type}_{state}.png    # e.g., btn_correct_hover.png
icon_{name}.png           # e.g., icon_home.png
letter_tile_{letter}.png  # e.g., letter_tile_m.png
bg_{location}.png         # e.g., bg_welcome.png
```

**Animations:**
```
anim_{component}.gif      # e.g., anim_mascot_celebration.gif
```

## Testing Checklist

Before committing media files:

### Audio
- [ ] All files play in Chrome (desktop)
- [ ] All files play in Firefox (desktop)
- [ ] All files play in Safari (desktop)
- [ ] All files play in iPad Safari
- [ ] All files play in Chrome Android
- [ ] Volume is consistent across all files
- [ ] No distortion or clipping
- [ ] Duration matches spec (0.5–1.0 sec)

### Images
- [ ] All PNG files have transparent backgrounds
- [ ] 2x versions are 2× size of 1x versions
- [ ] File sizes are optimized (< 50 KB per image)
- [ ] Images display correctly on desktop, tablet, mobile
- [ ] Colors match design spec

### Animations
- [ ] Animations play smoothly (24–30 fps)
- [ ] Duration matches spec
- [ ] File sizes are optimized (< 100 KB)
- [ ] Animations test in all target browsers

## Integration with App

Media files are imported in React components:

```typescript
// Audio
const audioUrl = require('@/assets/audio/letter_m.mp3')
new Audio(audioUrl).play()

// Images
import mascotNeutral from '@/assets/images/mascot_neutral.png'
import mascotNeutral2x from '@/assets/images/mascot_neutral@2x.png'

<img src={mascotNeutral} srcSet={`${mascotNeutral} 1x, ${mascotNeutral2x} 2x`} />

// Alternatively, use CSS/Vite imports
import buttonCorrect from '@/assets/images/btn_correct.png?url'
```

## Size Budget

**Phase 1 Total Media Size Target: < 1 MB**

- Audio (12 letters): ~144 KB (MP3)
- Images (~50 files): ~800 KB (PNG, optimized)
- Animations (optional): ~50 KB (GIF)

**Total: ~1 MB**

This ensures fast load times on mobile networks (< 2 second load time).

## Adding Media

### Step 1: Navigate to appropriate directory
```bash
cd src/assets/audio  # or images/ or animations/
```

### Step 2: Add your media files
```bash
# Audio example
cp ~/Downloads/letter_m.mp3 .

# Image example
cp ~/Downloads/mascot_greeting.png .
cp ~/Downloads/mascot_greeting@2x.png .
```

### Step 3: Verify files
```bash
ls -lah  # Check file sizes and names
```

### Step 4: Commit
```bash
git add src/assets/
git commit -m "feat: add media assets - mascot, buttons, letter sounds"
```

## Questions?

Refer to the README in each subdirectory:
- `audio/README.md` → Audio specifications and checklist
- `images/README.md` → Image specifications and checklist
- `animations/README.md` → Animation specifications and recommendations

## Next Steps

1. **Slice 1 (Launch):** Add audio (5 letters) + images (mascot, buttons, backgrounds, icons)
2. **Slice 2:** Add audio (7 more letters) + letter tiles
3. **Polish:** Add animations (optional but recommended)
