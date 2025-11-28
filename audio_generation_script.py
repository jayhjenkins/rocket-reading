#!/usr/bin/env python3
"""
Generate short phoneme-based letter-sound files using the ElevenLabs Text-to-Speech API.

- One core phoneme per letter (Science of Reading style, *sound* not letter name)
- Formats: MP3, WAV, OGG (Opus)
- Sample rates / bitrates:
    - MP3: 44.1 kHz, 128 kbps  (mp3_44100_128)
    - WAV: 44.1 kHz, 16-bit PCM (wrapped locally from pcm_44100)
    - OGG: Opus 48 kHz, 128 kbps (opus_48000_128; saved with .ogg extension)
- Output filenames:
    - /Users/jay/Documents/rocketreading/src/assets/audio/letter_{letter}.{ext}
      e.g. letter_m.mp3, letter_m.wav, letter_m.ogg
"""

import os
from pathlib import Path
import wave

from elevenlabs.client import ElevenLabs
from elevenlabs import VoiceSettings

# ========= CONFIGURE THESE FIRST =========

ELEVENLABS_API_KEY = "sk_693d6c1a57e90725d0b2f07d478897ed5782dc617f6f94d4"

# Pick a voice from your ElevenLabs Voice Library and paste its voice_id here.
# Example from docs: "Rachel" voice_id = "21m00Tcm4TlvDq8ikWAM"   [oai_citation:1‡ElevenLabs](https://elevenlabs.io/docs/api-reference/voices/get?utm_source=chatgpt.com)
VOICE_ID = "21m00Tcm4TlvDq8ikWAM" # Rachel

# Use a model that supports SSML phoneme tags (for forcing pronunciation)  [oai_citation:2‡ElevenLabs](https://help.elevenlabs.io/hc/en-us/articles/16712320194577-How-can-I-force-a-certain-pronunciation-of-a-word-or-name?utm_source=chatgpt.com)
MODEL_ID = "eleven_turbo_v2"

# Base directory for your game audio assets
OUTPUT_DIR = Path("/Users/jay/Documents/rocketreading/src/assets/audio")

# ========================================

# Letter → how to generate its sound
# mode:
#   - "cmu"     = use CMU Arpabet phoneme tag
#   - "cmu_alt" = CMU tag, but marked separately (for /o/ so you can tweak later)
#   - "text"    = plain text like "mmm", "ssss", "puh", "tuh"
LETTER_PHONEMES = {
    # Vowels – phoneme tags
    # "a": {"mode": "cmu",     "cmu": "AE", "example": "apple"},   # /æ/
    # "e": {"mode": "cmu",     "cmu": "EH", "example": "egg"},     # /ɛ/
    # "i": {"mode": "cmu",     "cmu": "IH", "example": "igloo"},   # /ɪ/
    # Short "o" – start with AA; you can change to AO if you prefer that sound
    # "o": {"mode": "cmu_alt", "cmu": "AA", "example": "orange"},  # /ɑ/ as in "hot"

    # Consonants – text-based prompts
    # "m": {"mode": "text", "text": "mmm",   "example": "mat"},
    # "p": {"mode": "text", "text": "pu.",   "example": "pen"},    # explicitly "puh"
    # "d": {"mode": "text", "text": "duh",   "example": "dog"},    # explicitly "duh"
    "h": {"mode": "text", "text": "hhhuh",  "example": "hot"},
    # "l": {"mode": "text", "text": "luh.",   "example": "low"},
    # "r": {"mode": "text", "text": "rrr",   "example": "red"},
}

# Output formats:
#   - MP3: 44.1 kHz, 128 kbps
#   - WAV: 22.05 kHz PCM (non-Pro compatible)
#   - OGG: Opus 48 kHz, 128 kbps
OUTPUT_FORMATS = {
    "mp3": {
        "output_format": "mp3_44100_128",
        "extension": ".mp3",
    },
    "wav": {
        "output_format": "pcm_22050",   # allowed on Free/Starter
        "extension": ".wav",
        "sample_rate": 22050,
    },
    "ogg": {
        "output_format": "opus_48000_128",
        "extension": ".ogg",
    },
}

# SSML templates

# Generic CMU-phoneme template (vowels, etc.)
CMU_SSML_TEMPLATE = """
<speak>
  <break time="0.10s" />
  <phoneme alphabet="cmu-arpabet" ph="{cmu}">{letter}</phoneme>
  <break time="0.20s" />
</speak>
""".strip()

# Plain-text template (for "mmm", "ssss", "puh", "tuh", etc.)
TEXT_SSML_TEMPLATE = """
<speak>
  <break time="0.10s" />
  {text}
  <break time="0.20s" />
</speak>
""".strip()


def save_pcm_as_wav(
    pcm_bytes: bytes,
    wav_path: Path,
    sample_rate: int,
    num_channels: int = 1,
    sample_width: int = 2,
) -> None:
    """
    Wrap raw PCM bytes from ElevenLabs into a proper WAV container.
    """
    wav_path.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(wav_path), "wb") as wf:
        wf.setnchannels(num_channels)
        wf.setsampwidth(sample_width)  # 16-bit = 2 bytes
        wf.setframerate(sample_rate)
        wf.writeframes(pcm_bytes)


def generate_letter_audio():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    client = ElevenLabs(api_key=ELEVENLABS_API_KEY)

    for letter, cfg in LETTER_PHONEMES.items():
        mode = cfg["mode"]

        # Build SSML per-letter based on mode
        if mode in ("cmu", "cmu_alt"):
            cmu = cfg["cmu"]
            ssml_text = CMU_SSML_TEMPLATE.format(cmu=cmu, letter=letter)
            debug_desc = cmu + (" (alt)" if mode == "cmu_alt" else "")
        elif mode == "text":
            text = cfg["text"]
            ssml_text = TEXT_SSML_TEMPLATE.format(text=text)
            debug_desc = text
        else:
            raise ValueError(f"Unknown mode for letter {letter}: {mode}")

        print(f"Generating audio for letter '{letter}' ({debug_desc} as in '{cfg['example']}')")

        # Generate each output format
        for fmt_name, fmt_cfg in OUTPUT_FORMATS.items():
            output_format = fmt_cfg["output_format"]
            ext = fmt_cfg["extension"]

            print(f"  -> Format {fmt_name} ({output_format})")

            # Streaming response (iterator of chunks)
            response = client.text_to_speech.convert(
                voice_id=VOICE_ID,
                model_id=MODEL_ID,
                output_format=output_format,
                text=ssml_text,
                voice_settings=VoiceSettings(
                    stability=0.9,          # high = more consistent, less expressive
                    similarity_boost=0.8,   # stick close to base voice timbre
                    style=0.0,              # no dramatic acting
                    use_speaker_boost=True, # clearer, louder
                ),
            )

            base_name = f"letter_{letter}{ext}"
            dest_path = OUTPUT_DIR / base_name

            if fmt_name == "wav":
                # Collect PCM chunks and wrap as WAV
                chunks = []
                for chunk in response:
                    if chunk:
                        chunks.append(chunk)
                pcm_bytes = b"".join(chunks)

                # Guard against "blank" / ultra-short outputs
                if not pcm_bytes or len(pcm_bytes) < 500:
                    print(f"     WARNING: very short WAV data for {letter}, skipping save.")
                    continue

                sample_rate = fmt_cfg.get("sample_rate", 22050)
                save_pcm_as_wav(pcm_bytes, dest_path, sample_rate=sample_rate)
            else:
                # Stream mp3 / ogg directly to file
                dest_path.parent.mkdir(parents=True, exist_ok=True)
                with open(dest_path, "wb") as f:
                    for chunk in response:
                        if chunk:
                            f.write(chunk)

                # Simple sanity check on obviously tiny files
                try:
                    size_bytes = dest_path.stat().st_size
                    if size_bytes < 1500:  # heuristic threshold
                        print(
                            f"     WARNING: {dest_path.name} is very small "
                            f"({size_bytes} bytes); may be too short or silent."
                        )
                except FileNotFoundError:
                    print(f"     WARNING: output file not found for {dest_path.name}")

            print(f"     Saved: {dest_path}")

    print("\nDone. All letter sound files generated.")


if __name__ == "__main__":
    if "PASTE_YOUR_API_KEY_HERE" in ELEVENLABS_API_KEY:
        raise SystemExit(
            "Please edit the script and set ELEVENLABS_API_KEY and VOICE_ID first."
        )
    if "PASTE_YOUR_VOICE_ID_HERE" in VOICE_ID:
        raise SystemExit(
            "Please edit the script and set VOICE_ID to a valid ElevenLabs voice_id."
        )

    generate_letter_audio()