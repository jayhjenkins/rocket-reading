# Audio Assets for Rocket Reading Phase 1

## Letter Sound Files

All letter sounds are critical for learning. These are the phoneme sounds (not letter names).

### Slice 1 (5 letters) - REQUIRED FOR LAUNCH

- `letter_m.mp3` - /m/ sound (as in "mat")
- `letter_a.mp3` - /a/ sound (as in "apple")
- `letter_t.mp3` - /t/ sound (as in "tap")
- `letter_s.mp3` - /s/ sound (as in "sun")
- `letter_i.mp3` - /i/ sound (as in "igloo")

### Slice 2 (Additional 7 letters) - NEEDED FOR PHASE 1 COMPLETION

- `letter_p.mp3` - /p/ sound (as in "pen")
- `letter_n.mp3` - /n/ sound (as in "nose")
- `letter_o.mp3` - /o/ sound (as in "orange")
- `letter_e.mp3` - /e/ sound (as in "egg")
- `letter_r.mp3` - /r/ sound (as in "red")
- `letter_d.mp3` - /d/ sound (as in "dog")
- `letter_l.mp3` - /l/ sound (as in "lion")

## Audio Specifications

### Format
- **Primary:** MP3 (128 kbps, 44.1 kHz)
- **Backup:** WAV (lossless archive)
- **Browser Compatibility:** OGG (fallback for Firefox)

### Duration
- 0.5–1.0 second per file (pure phoneme, not prolonged)

### Quality Requirements
- Clear, native speaker pronunciation
- No background noise
- Consistent volume across all files (normalized)
- Child-friendly delivery (warm, encouraging tone)

### Phoneme Standards
- **CORRECT:** Isolated phoneme sound (e.g., "/mmm/" for 'm')
- **INCORRECT:** Letter name (e.g., "em" for 'm') - DO NOT USE

### Testing Checklist
- [ ] Play in Chrome (desktop)
- [ ] Play in Firefox (desktop)
- [ ] Play in Safari (desktop)
- [ ] Play in iPad Safari
- [ ] Play in Chrome Android
- [ ] Volume normalized (similar across all files)
- [ ] No audible distortion or clipping
- [ ] Duration is 0.5–1.0 second

### File Size Target
- ~12 KB per MP3 file (128 kbps, 1 sec)
- Total Phase 1: ~144 KB for all 12 letters

## Delivery Instructions

1. Place all MP3 files in this directory (`src/assets/audio/`)
2. Ensure filenames match exactly: `letter_{letter}.mp3` (lowercase)
3. Test in browser before committing
4. Commit with message: `feat: add letter sound audio assets`

Example directory structure after completion:
```
src/assets/audio/
├── letter_m.mp3
├── letter_a.mp3
├── letter_t.mp3
├── letter_s.mp3
├── letter_i.mp3
├── letter_p.mp3
├── letter_n.mp3
├── letter_o.mp3
├── letter_e.mp3
├── letter_r.mp3
├── letter_d.mp3
└── letter_l.mp3
```
