_(Working Title – Pre-K Reading Game for iPad)_

---
## **1. Product Vision**

**Tagline:**

_Anki for toddlers wrapped in a cozy, story-driven reading adventure._

**Core Idea:**

A parent-and-child friendly iPad game that uses **true spaced repetition** and **Science-of-Reading aligned phonics** to turn 2.5-5-year-olds into confident early decoders—by embedding flashcard-like retrieval in satisfying quests, personal stories, and a persistent world that changes as they read.

To the engine, it’s a smart SR system.

To the kid, it’s:

> “I help my dog Luna cross the river, fix bridges for beavers, plant a garden, and read little stories about my family.”

---

## **2. Target Users & Modes**

### **2.1 Children**

- **Primary:** Ages 2.5–5 (late toddler → Pre-K).
- **Secondary:** 5–6-year-olds who are still learning to decode.

Constraints:
- Limited working memory and emerging phonemic awareness.
- Pre-readers or emergent readers.
- Short attention spans, developing fine motor skills.
### **2.2 Adults**
- Parents/caregivers (at home).
- Optionally teachers (classroom/iPad cart).

Adults need:
- A **clear role**: co-player / tutor, not passive spectator.
- Confidence that it’s **evidence-based** and safe.
- Quick visibility into progress and weaknesses.
### **2.3 Modes**
1. **Co-Play “Tutor Mode” (default recommended)**
    - Parent sits with child.
    - Child answers aloud / points; parent taps grading: ✅ / 😬 / ❌.
    - Used for highest efficacy and to mirror proven “Anki-dads” workflow.
2. **Child-Only “Adventure Mode”**
    - Same SR & quest spine.
    - App infers correctness from behavior (answers, time, hints).
    - Used when parent is busy; still constrained to decodable content.
  

Parent can toggle per session or per profile.

---
## **3. Pedagogical Foundations (“Why”)**

### **3.1 Science of Reading**
- Reading comprehension ≈ **Decoding × Language Comprehension** (Simple View of Reading).
- Early app focus is **decoding & word recognition** strands of Scarborough’s Reading Rope:
    - Phonological & phonemic awareness.
    - Grapheme–phoneme correspondence (GPC).
    - Blending & decoding.
    - Orthographic mapping (bonding spelling–sound–meaning in memory).
### **3.2 Synthetic / Systematic Phonics**
- Explicit, cumulative sequence of GPCs, progressing from:
    - Simple CVC → blends & digraphs → more complex patterns.
- No guessing from pictures/first letter (“three-cueing”).
- Decodable texts aligned with taught patterns.

### **3.3 Spaced Repetition & Retrieval Practice**
- Repeated, spaced retrieval → stronger long-term retention vs. massed drill.
- Spacing intervals adapt based on success (like Anki).
- Retrieval (trying to recall) beats simple re-exposure.

We implement **true SR**:
- Each letter/word/sentence is an item with its own review schedule.
- Days/weeks between reviews stretch for strong items and shrink for weak ones.
### **3.4 Cognitive Load & UI Coherence**
- Working memory is limited; decoding is already heavy.
- Minimize extraneous visual/audio noise.
- Single clear task per screen, actions congruent with reading skills.
- No “platforming” difficulty: you win/lose because of reading, not twitch skill.

### **3.5 Motivation & Rewards**
- Avoid over-reliance on tangible/extrinsic rewards that undermine intrinsic motivation.
- Prioritize:
    - Progress, story, competence (“I can read!”).
    - Gentle collection (stickers, journal pages).
    - Personal relevance (family names, beloved dog, favorite interests).
### **3.6 Parent as Partner**
- Co-play sessions emulate the most successful “Anki dad” patterns:
    - Daily micro-sessions, parent grading, environment reading.
- App provides:
    - Co-play scripts and prompts.
    - Parent dashboard with actionable data.
    - Real-world “missions” to apply reading off-screen.

---
## **4. Game Structure & Core Loops**

At a high level:

> **Overworld map → choose a quest → complete a series of mini-games powered by SR cards → world changes (bridge fixed, garden grows, etc.).**

### **4.1 Overworld**
- A simple, friendly map for early worlds:
    - **Treehouse** (home base).
    - **Meadow & Garden.**
    - **Forest & Beaver Bridge.**
    - **Duck Pond.**
    - **River & Boat Dock.**
    - Later: Mountain, Cave, Town, Farm etc.
- Each area has NPCs:
    - A beaver, ducks, a gardener, the child’s dog **Luna**, “Grandma,” etc.
- Daily, 1–3 characters display **quest bubbles**:
    - “The bridge is broken!”
    - “The ducks are mixed up!”
    - “Luna lost her bed!”

### **4.2 Daily Core Loop (Per Session)**
One session ≈ 5–15 minutes, 4–6 days/week.
1. **Warm Welcome (30–60 sec)**
    - Mascot and NPC(s) greet child by name: “Hi, Maya!”
    - Parent sees a subtle banner:
        > “Today: 12 reviews + 2 new sounds + 1 tiny story.”
    - Option to choose Co-Play vs Adventure mode.
2. **Quest Selection (30–60 sec)**
    - Kid taps one character with a quest bubble.
    - Example: Beaver at the river: “My bridge broke! Can you help me pick the right planks?”
    - Under the hood:
        - Quest generator pulls appropriate **due SR items** for that skill (e.g., CVC words) and themes them as planks.
3. **Quest Sequence (5–10 min)**
    A quest is 2–4 mini-games chained together, each reviewing several SR items.
    For each mini-game:
    - **Prompt**: In-world goal (“Find the right plank so I don’t fall!”).
    - **Actions**: Child interacts (tap/drag/choose) using reading skills.
    - **Outcome**: World changes (bridge segment added, ducks sorted, garden planted).
    - SR engine:
        - Logs item, success/latency/hints.
        - Updates SR intervals accordingly.
4. **New Learning Encounter (2–5 min)**
    - After review-heavy mini-games, the NPC or mascot introduces **1–3 new items**:
        - New letter sound.
        - New decodable word.
        - New sentence frame.        
    - This is explicit instruction:
        - “This is the letter sh. It says /sh/ like in ship.”
    - Followed by **immediate practice** mini-game using those items.
5. **Application: Micro-Book or Story Card (2–4 min)**
    - Session culminates in reading a **micro-sentence card** or a tiny decodable “page” story.
    - Text is short, mostly decodable; may use **personal vocabulary** (Luna, Mom, Grandma).
    - Example micro-story (for a child with a dog named Luna):
        - Page 1: “Luna is on the bed.”
        - Page 2: “I hug Luna.”
        - Page 3: “Luna is my dog."
    - Child reads; parent or app checks; world adds this book to the treehouse bookshelf.
6. **Real-World Mission + Closure (30–60 sec)**
    - 1 offline mission appears:
        > “Today, can you find the letter S on something at home? Let your child circle it with their finger.”
    - App celebrates:
        - “You grew your reading power today!”
    - Offers:
        - **Stop** (recommended).
        - Optional short **free-play zone** (non-SR, light games like coloring letters).

### **4.3 Making It a Game, Not Just Cards**
What makes it genuinely game-like:
- **Goal-driven quests**: Each SR batch is wrapped in a goal: fix, rescue, sort, find, plant, explore.
- **World state persistence**:
    - Bridges stay fixed.
    - Garden plants grow over days.
    - Treehouse bookshelf fills with books the child has “read.”
- **Characters & narrative**:
    - Child helps recurring characters (beaver, ducks, Luna the dog, Grandma).
    - Later worlds: short, simple overarching plots (“Help Luna find all her favorite places.”).
- **Mini-game mechanics**:
    - Choosing the right plank, duck, bed, seed, or boat.
    - Building passwords for robots.
    - Unlocking doors by reading a sign.

The child experiences a **world that changes because they read**, not a static stack of cards.

---
## **5. Curriculum & Progression**

### **5.1 World-Based Scope & Sequence**

**World 1 – Sounds & Shapes (Foundations)**
- Age: ~2.5–4+.
- Goals:
    - Solid letter–sound knowledge for a starting consonant/vowel set.
    - Basic phonological awareness games (same/different, first sound).
- Content:
    - 8–12 high-utility letters: m, a, t, s, p, i, n, o, etc.
    - Oral sound games (without letters initially).
- Quests:
    - Garden seed sorting by sound.
    - Feeding the “Sound Monster” the correct-sound items.
- Text:
    - No decoding yet; micro-books read **to** the child by the app/parent.

**World 2 – CVC Builder (First Real Decoding)**
- Goals:
    - Blend 2–3 phonemes into CVC words.
    - Recognize & read common CVC words.
- Content:
    - Extend letter set: e, r, l, h, c, d, f, u, g, b, etc.
    - Build word bank of ~30–40 decodable CVCs.
- Quests:
    - **Beaver Bridge** – planks with CVC words; choose the word that matches the picture/need.
    - **Duck Pond** – herd ducks whose word starts/ends with target sound.
    - **Luna’s Bed** – pick the word representing where Luna is (mat, bed, rug).
    
- Micro-books:
    - Word-level pages (“cat,” “dog,” “sun”) plus 2–3-word captions.
  
**World 3 – Digraphs, Blends & More Patterns**
- Goals:
    - Introduce common digraphs (sh, ch, th) and consonant blends (st, pl, tr).
    - Decode CCVC/CVCC words.
- Content:
    - Digraphs: sh, ch, th, wh.
    - A set of CCVC/CVCC words (ship, fish, stop, clap, etc.).
- Quests:
    - **Robot Passwords** – build correct words from letter tiles to open doors.
    - **Forest Path Signs** – read “shop,” “ship,” “shed” to choose correct path.
- Micro-books:
    - Very short sentences: “The ship is red.” “I wish for fish.”

**World 4 – Early Sentences & “Tricky” Words**
- Goals:
    - Read short decodable sentences.
    - Introduce limited high-frequency “tricky” words (I, the, is, to, you, my, said).
- Content:
    - Known phonics patterns used in sentences.
    - Explicit teaching of “tricky” words: which part is decodable, which is irregular.
- Quests:
    - **Town Signs** – read “The dog is big,” tap matching scene.
    - **Grandma’s Kitchen** – read simple recipes: “Mix the egg,” “Stir the pot.”
- Micro-books:
    - 1–3 sentence pages with supported vocab and personal names where possible.

**World 5+ – Expansion & Flexibility (Optional / Advanced)**
- Goals:
    - Long vowels & common vowel teams (ai, ee, oa)
    - Slightly richer sentences and tiny stories.
    - Early “set for variability” (flex near-sounding decodings to familiar words).
- Quests:
    - **Mountain Cave** – decode signs with longer words to navigate.
    - **Boat Trip with Grandpa** – read simple directions (“Go to the dock”).
### **5.2 Sentence SR Epochs (When to Introduce Sentences as Cards)**

We adapt your Fluent-Forever insight to Pre-K via three epochs:
#### **Epoch 1 – Units & Words Only (Worlds 1–early 2)**
- SR items:
    - Letter–sound cards.
    - Phonological awareness tasks (non-written).
    - Single CVC words (once a minimal set of letters is known).
- Sentences:
    - Only in **read-aloud** mode; child is not required to decode whole sentences.

**Exit Criteria:**
- Child decodes ≈30–40 common CVC words in isolation with ≥90–95% accuracy.
- Blending is relatively smooth (not letter-by-letter for every word).
#### **Epoch 2 – Micro-Sentence SR (late World 2–World 3)**
- SR mix:
    - 50–70% word-level.
    - 30–50% **micro-sentences** (2–5 words).
- Sentences:
    - Fully or almost fully decodable with known patterns + a small set of “tricky” words.
    - Use repeated frames: “I see a __.” “My dog is __.”
- Child is asked to **read** these micro-sentences; comprehension is checked with simple taps (matching picture, etc.).
#### **Epoch 3 – Sentence-Dominant SR (World 4+)** 
- SR mix:
    - Word-level items mostly in maintenance (long intervals).
    - Majority of daily reps are sentences and micro-story “pages” (4–8 words).
- Sentences:
    - Slightly varied syntax (questions, “and,” “because” rarely).
    - More varied vocabulary, but still mostly decodable.    
- Some cards are **two- or three-sentence micro-stories**

This progression preserves cognitive load while letting you do Fluent-Forever style “full chunk” learning as early as it’s realistic.

---
## **6. Personalization & “My World” Content**

We want the Fluent-Forever benefits: **personal, meaningful sentences** and vocabulary.
### **6.1 Core Rules for Personalization**
1. **Decodability First**
    - A word or name can only be a decoding target when its spelling is mostly covered by the child’s current phonics knowledge.
    - Others may exist as images + spoken words, but not as “read this” in SR.
2. **Sentence Templates (Frames) Over Custom Prose**
    - We define a library of sentence templates that:
        - Are short.
        - Fit a controlled syntax.
        - Use known phonics and a small set of tricky words.
    - Examples:
        - “I see a [NOUN].”
        - “My [FAMILY] is [ADJECTIVE].”
        - “[NAME] is on the [OBJECT].”
        - “The [PET] is in the [PLACE].”
3. **Personal nouns/objects only plugged into appropriate slots**
    - The system checks spelling vs. known GPCs and either:
        - Allows as decodable.
        - Marks as “tricky” (if mostly regular but with irreguar chunk).
        - Uses only for **non-decode** contexts if too advanced.
### **6.2 Parent “My World Deck” Builder**

In the parent area (behind gate), adults can configure:
- **Family & Friends:**
    - Names: Mom, Dad, Grandma, Grandpa, Aunt Meg, etc.
    - Relationship types: mother, father, grandma, etc.
    - Optional photos (for fun decks).
- **Pets & Animals:**
    - Names: Luna (dog), Coco (cat), etc.
    - Type: dog, cat, fish, etc.
    - Photos (for fun decks)
- **Favorite Things/Topics:**
    - Trucks, dinosaurs, soccer, princesses, space, etc.
    - Specific objects: boat, bed, bike, car.
- **Places:**
    - Home, park, beach, Grandma’s house, etc.
  
For each entry, the parent can optionally add **sentences**:
- “Grandma bakes pies.”
- “Luna is on my bed.”
- “I ride my bike.”

The system:
- Runs a **decodability check**:
    - If fully decodable given current phonics:
        - Eligible for decoding SR (word-level + sentence-level).
    - If partially decodable:
        - It can be taught as a “tricky” word (when appropriate).
    - If too complex:
        - Only used as spoken word/caption in fun mode, not as decode target.
### **6.3 Personalized Sentences in Gameplay**

Examples:
1. **Luna’s Bed Quest**
    - The child’s dog is Luna.
    - Mini-game:
        - Three beds labeled “mat,” “bed,” “rug.”
        - Micro-sentence: “Luna is on the mat.”
        - Kid reads sentence, then must tap the correct bed scene to place Luna.
    - Items:
        - Word-level SR for mat, bed, rug.
        - Sentence SR for “Luna is on the mat.”
2. **Grandma’s Kitchen Quest**
    - Family data: Grandma, pies, eggs.
    - Mini-game:
        - Sentences: “Grandma bakes pies.” “I help Grandma.”
        - Child reads; then taps image of Grandma baking vs Grandma reading.
    - This uses **My World** content but only if decodable.
3. **Truck Lover Kid**
    - Interests: trucks, cars, bus.
    - Sentence frame: “I see a [vehicle].”
    - SR items:
        - “I see a bus.” “I see a car.” “I see a truck.”        
    - Quests:
        - Parking lot: read sentence, drive correct vehicle into spotlight.

SR sees these as just more items. The kid sees **their life** in the sentences.

### **6.4 Personalization in World Elements**

  Beyond explicit SR cards:
- NPC skins can use family/pet names (Grandpa as the fisherman, Luna as the “companion”).
- Bookshelf can contain “A Day With Luna” or “At Grandma’s House” micro-books generated from templates.
- Garden objects can reflect favorites (“Plant truck-shaped flowers” as a quest reward, visually, even if the text reads simpler words like “red” or “big”).
---
## **7. Spaced Repetition Engine (Technical Design)**
### **7.  Item Types**
- **Letter items** – single grapheme (a, m, sh, th).
- **Word items** – decodable words (dog, mat, ship).
- **Sentence items** – micro-sentences/micro-stories.
- **Tricky word items** – high-frequency words with partial irregularities (said, the).

Each item has:
- ID, type, associated world.
- Phonics coverage metadata (which GPCs it uses).
- Personalization flags (Is this My World content?).

SR state per item:
- last_seen_date
- interval_days
- ease_factor (optional)
- correct_streak
- error_count
- status (learning, maturing, mastered, maintenance)

### **7.2 Rating & Interval Updates**
Per trial, we record one of three ratings:
- **✅ Got it** – confident, independent response.
- **😬 Needed help** – partial or slow, with hints/prompting.
- **❌ Didn’t know** – incorrect or no response.

Update logic (Anki-like but simplified)
- New item:
    - First ✅ → interval 1 day.
    - Second ✅ → interval 3 days.
- Mature item:
    - ✅ → interval *= 2–3 (bounded).
        
    - 😬 → interval = max(1, interval * 0.5) + mark as “struggling.”
        
    - ❌ → reset to very short (later in session + 1 day) & status back to “learning.”
### **7.3 Daily Selection**

For each session:
- Compute “due” items (next_due <= today).
- Cap by:
    - Age-adjusted target (e.g., 8–10 items for younger, 12–20 for older).
    - Type mix (letters/words/sentences per epoch).
- Group items into **quest-compatible bundles**:
    - E.g., all CVC words for Beaver Bridge; all /sh/ items for Duck Pond.
Quests are generated by mapping bundles into appropriate mini-game templates.
---
## **8. Card Types & Mini-Game Mechanics**

All mini-games are:
- One primary task per screen.    
- Large touch targets, simple gestures (tap/drag).
- Immediate feedback on every action
### **8.1 Letter → Sound (Production)**

**UI:**
- Big lowercase letter centered (/m/).
- Friendly mascot on side.
- Three large buttons at bottom for rating (in Co-Play).

**Flow – Co-Play:**
1. App: “What sound does this letter make?”
2. Child says sound aloud.
3. Parent taps:
    - ✅ if correct.
    - 😬 if hesitant/partial.        
    - ❌ if wrong.
4. App animates the letter, plays pure sound (/mmm/), and optionally a keyword image (only as support, not for guessing).
  
**Adventure Mode:**
- Instead of parent grading, child is offered 3 “sound icons” (/m/, /s/, /a/) to tap; accuracy/time feed into inferred rating.
**Mini-Game Embedding:**
- Shown as seed labeling: put the correct “sound seed” into the right jar, etc.

### **8.2 Sound → Letter (Recognition)**  
**UI:**
- 3–4 letter tiles across screen.
- Visual theme: eggs in nest, signposts, etc.

**Flow:**
1. App: “Tap the letter that says /s/.”
2. Child taps a tile.
    - Correct: tile bounces, NPC happy.
    - Incorrect: gentle shake, hint: “This is m. We want /sss/.”
3. Parent or engine logs rating.

Embedded as:
- Duck Pond: ducks labeled with letters; you herd the right letter duck.
### **8.3 Blend the Word (Build & Read)**

**UI:**
- 3 or 4 empty boxes.
- Letter tiles scattered or given in a row.
- Picture or context for the word appears only after attempt.

**Flow:**
1. App: “Let’s build the word ‘mat’.”
    - Co-Play: parent may read prompt; child hears segmented sounds.
2. Child drags m, a, t into boxes.
3. As each tile is placed, sound plays (/m/, /a/, /t/).
4. Once complete:
    - App slowly blends: /m/–/a/–/t/ → “mat.”
5. Child is asked to repeat the whole word.
6. Parent grades; or in Adventure, the game then asks them to choose matching picture from 2–3 options.

Embedded as:
- Robot Password tiles: building correct password words to open doors.
### **8.4 Word Reading (Isolated)**

**UI:**
- Large word in center (“ship”).
- Optional small “?” button for child-requested hint (segmenting).

**Flow:**
1. App: “What does this word say?”
2. Co-Play: child reads; parent grades.
3. Adventure Mode:
    - Child can speak (if voice rec is on) or
    - Must choose matching picture after reading or after a prompt to “say it, then tap.”
4. App gives corrective feedback:
    - Segments sounds, highlights letters as they’re sounded, then says the word naturally.
  
Embedded as:
- Beaver Bridge: choose correct plank from a few options.
- Boat Dock: pick which boat has the word that matches a picture.
### **8.5 Sentence & Micro-Story Reading**

**UI:**
- Simple line(s) of text at center, high-contrast.
- Illustration appears only after attempt or aligned with comprehension question.

**Flow:**
1. App: “Read this sentence.”
2. Child reads aloud.
3. Co-Play: parent taps a fluency rating:
    - Smooth, Choppy, Needed help.
4. Adventure: voice rec + tapping comprehension.

**Examples:**
- “Luna is on the bed.”
- “Grandma bakes pies.”
**Comprehension Task:**
- After reading “The dog is red.”:
    - Show red and blue dog; ask child to tap red dog.  

Embedded as:
- Town Scenes: choose correct scene after reading sign or sentence.
- Kitchen: follow a simple “recipe” by reading short sentences.
### **8.6 Non-Core Fun Mini-Games (No New SR Content)**

Optional “free play” zone after session:
- Letter coloring.
- Tracing letters with generous path recognition.
- Simple memory games using **already mastered** words/letters.

These _do not_ feed new data into SR or introduce new target items.

---
## **9. UX & Interaction Design (Kid + Parent)**
### **9.1 Kid UX Principles**
- Big tappable areas (≥2cm).
- Bright, solid colors; high contrast.
- Icons supported by voice labels.
- Minimal text outside of learning content.
- One main action per screen.

### **9.2 Gestures & Input**

- Primary: **single tap**.
- Secondary: simple drag with snap-to-target.
- No multi-step gestures (no pinch, double-tap required).
- Multi-touch tolerated:
    - Parent guiding child’s hand, siblings tapping at same time → gracefully handled; ignore stray touches when not relevant.

### **9.3 Feedback**
- Immediate visual & audio feedback for every tap:
    - Buttons “squish” or glow.
    - Sounds for taps (pleasant, not hyper).
- Positive reinforcement:
    - “Nice try!” “You did it!” “Almost, let’s try again!”    
- Errors:
    - Soft, non-punitive (“Oops, this one says /mmm/. Listen again.”).
    - Hints appear after 1–2 errors.
---
## **10. Session Length, Pacing & Guardrails**
- Default daily target: **10 minutes** (configurable 5–15 by parent).
- App gently ends SR core after target time:
    - “You grew your reading power today! Want to do some silly games, or be done?”
- Encourage **consistency over duration**:
    - Parent messages: “Best results come from a little every day, like brushing teeth.”

Mood/fatigue check-in (Co-Play):
- Mid-session, subtle prompt to parent:
    - “How’s it going?” Happy, Getting Tired
- If “Tired,” next mini-game is last; session wraps.
---
## **11. Mastery, Assessment & Parent Dashboard**

### **11.1 Item Mastery**

An item is **mastered** when:
- Reviewed ≥N times (e.g., 4–6).
- Last 3–4 reviews are ✅ with intervals ≥7 days.
- Accuracy ≥90–95%.

Mastered items:
- Move to **maintenance pool** with much longer intervals (30+ days).
- Rarely appear, mostly for long-term retention.
### **11.2 Skill/World Mastery**
  
Per world, we define “can do” goals. Example World 2:
- “Can decode at least 30 CVC words at high accuracy.”
- “Can read 3 micro-books built from CVC words with few errors.”
  
Periodic **checkpoint quests**:
- Contain a representative sample of items.
- If performance < threshold:
    - World remains “In progress.”
    - SR engine prioritizes weak items.
- If threshold met:
    - World flagged “Complete.”
    - New area unlocks on the map.

### **11.3 Parent Dashboard**

Accessible from home screen, behind parent gate.
  
Shows:
- **Overview**:
    - Days played this week, average session length.
- **Skill strands** (aligned loosely to Reading Rope lower strands):
    - Letter–sound Knowledge.
    - Blending & Decoding.
    - Tricky Words.
    - Sentence Reading.
- Each with simple status:
    - “Strong,” “Growing,” “Needs extra practice.”
- **Examples of struggles**:
    - “Often misses: sh, ch, words beginning with st-.”
- **My World usage**:
    - “Luna appears in 3 books; reading accuracy for Luna sentences: 92%.”
- **Suggestions**:
    - “Practice /sh/ with these words: ship, shop, fish. Try finding them in books or on signs.”

Optionally, parent can:
- View recently read micro-books.
- Trigger a “focus quest” on a specific grapheme or word.

---

## **12. Co-Play & Solo Play Design**

### **12.1 Co-Play (Tutor) Mode**
- Designed to replicate “Anki-dad” sessions:
    - Parent is SR judge.
    - Child answers aloud.
- App gives **explicit parent guidance**:
    - “Let them answer. If they hesitate a lot, mark ‘Needed help’.”
    - Short tooltips: “If they keep guessing, pause and model the sound.”
### **12.2 Adventure (Child-Only) Mode**
- Same quests, items, and worlds.
- Grading inferred from:
    - Correct vs. incorrect taps.
    - Reaction times.
    - Hints usage.    
- We err on the side of caution:
    - Many hesitations or errors → treat as 😬 or ❌.
    - Avoid giving artificially inflated mastery.

### **12.3 Transition Between Modes**
- Parent can set:
    - “Always start in Co-Play.”
    - “Let my child start in Adventure, but show me a reminder to co-play a few times per week.”
- App occasional nudge:
    - “This weekend, try a Co-Play session so we can check how smoothly they’re reading.”
---
## **13. Safety, Privacy & Ethics**

- COPPA-compliant:
    - Parent account; child uses nickname and avatar.
    - Minimal data collection, no personal identifiers from child.
- No ads, no third-party trackers.
- No open social features (no chat, no sharing).
- All external links and purchases behind parent gate.

**Screen time:**
- Parent can set maximum daily usage.
- If limit reached:
    - “That’s enough screen time for today—great work! See you tomorrow."

**Sensory design:**
- Avoids strobe-like flashing.
- Volume-balanced; parents can mute or reduce audio in settings.
- Option for dyslexia-friendly font.
---
## **14. Technical & Content Architecture (High Level)**

- **Platform:** iPad first (Swift/SwiftUI or React Native/Unity—implementation detail).
- **Offline-first:**
    - SR data stored locally, syncs when online.
    - Next few worlds cached ahead of time.
- **SR Engine:**
    - Central module exposing:
        - getDueItems(profileId, date)
        - logReview(profileId, itemId, rating)
        - getWeakAreas(profileId)
- **Quest Generator:**
    - Takes SR item bundles + world context + personalization data.
    - Returns:
        - A sequence of mini-game configs with items attached.
- **Content Pipelines:**
    - Phonics scope & sequence definition (data-driven).
    - Sentence templates & decodability checks.
    - Personalization content injection.
---
## **15. Example: A Complete Session Walkthrough**


**Profile:**
- Child: Maya, 4.
- Loves: trucks & dogs.
- My World: Dog named Luna, Grandma, Grandpa.
- Currently in late World 2 (CVC) → early Epoch 2 for sentences.

**SR Due Items Today (simplified):**
- Letters: sh, m, a, t.
- Words: mat, map, dog, cat, bus, bed, rug, ship.
- Sentences: “I see a dog.” “Luna is on the mat.”

### **Step-by-Step**
1. **Welcome**
    - Mascot: “Hi Maya! Let’s grow your reading superpower!”        
    - Parent sees: “Due: 10 words, 2 letters, 2 sentences.” 
2. **Quest Choice: Beaver Bridge**
    - Beaver: “My bridge broke! Can you help me grab the right planks?”
    - Quest generator assigns CVC words mat, map, bus, bed, rug.
3. **Mini-Game 1 – Plank Choice (Word Reading)**
    - Scene: river, broken bridge.
    - Three planks float by, each with a word.
    - App: “Read this word. Then tap the plank that says ‘mat’.”
    - Maya reads; taps plank.
    - Parent grades (Co-Play) or system infers.
    - Correct → plank slots into bridge; beaver cheers; item mat rated ✅.
4. **Mini-Game 2 – Bus Dock (Word Reading)**
    - Boat dock with bus/cars.
    - Sentence prompt: “Tap the word that says bus.”
    - Similar flow for bus, bed, rug    
5. **New Learning – Letter sh**
    - Mascot: “This is sh. It says /sh/ like in ship.”
    - Demo animations, mouth articulation.
    - Quick practice: child taps picture that starts with /sh/ (ship vs dog vs map).
6. **Mini-Game 3 – Duck Pond (Sound → Word)**
    - Ducks with word bubbles: ship, map, mop.
    - App: “Find the duck whose word starts with /sh/.”
    - Child taps ship duck; app segments /sh/–/i/–/p/.
    - SR logs first trials for ship.
7. **Micro-Sentence Reading**
    - Treehouse scene.
    - Card: “Luna is on the mat.”
    - Maya reads; parent taps ✅.
    - App: “Great! Where is Luna?”
    - Two pictures: Luna on bed, Luna on mat.
    - Maya taps mat.
    - Book “Luna’s Nap” unlocked in bookshelf.   
8. **Real-World Mission**
    - “Today, can you find the word dog or cat in a book or on a box? Let Maya try to read it.”
    - Closure: “You fixed the bridge and read about Luna. Reading power leveled up!”
9. **End / Optional Free Play**
    - Suggestive: “You’re done for today!”
    - Option: simple coloring page of Luna & beaver (no new SR items).

---

This document now encodes:

- The pedagogical spine (SoR + SR + Anki-dads).
- The **game** loop (quests, world changes, NPCs, mini-games).
- Sentence progression (word → micro-sentence → sentence-heavy).
- Fluent-Forever style personalization with strong decodability guardrails.
- Co-play vs child-only mechanics.
- Mastery, assessment, safety, and technical outlines.