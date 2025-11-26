# Rocket Reading: Future Roadmap

This document captures features, slices, and explorations that lie beyond the initial 17-slice plan (Worlds 1–4). As the core game is validated through test users and team feedback, we'll define and sequence these future slices.

---

## Roadmap Buckets

### 1. Worlds 5+ (Scope & Sequence Expansion)
### 2. Adventure Mode (Child-Only Play)
### 3. Real-World Missions & Offline Integration
### 4. Parent Dashboard & Analytics (Advanced)
### 5. Family & Account Management
### 6. Accessibility & Inclusive Design
### 7. Teacher Mode & Classroom Features
### 8. Personalization & Content Expansion
### 9. Advanced Game Features & Mini-Games
### 10. Platform & Technical Expansion
### 11. Data & Learning Science
### 12. Community & Social Features

---

## 1. Worlds 5+ (Scope & Sequence Expansion)

### **World 5: Long Vowels & Vowel Teams**
**Pedagogical goal:** Extended vowel patterns and vowel digraphs (ai, ee, oa, etc.).

Potential slices:
- **Slice 18:** World 5 mini-games (long vowel decoding + vowel team recognition).
- **Slice 19:** World 5 quests + overworld.
- **Slice 20:** World 5 decodable books.

**Notes:**
- World 5 is "optional/advanced" in the spec, but test user feedback may drive timeline.
- Consider whether to introduce this before or after validating World 4 extensively.

### **World 6+: Suffixes, Prefixes, Morphology**
**Pedagogical goal:** Basic word structure (adding -s, -ed, -ing; common prefixes un-, re-).

Potential slices:
- **Slice 21–23:** Similar to Worlds 5 (mini-games → quests → books).

**Notes:**
- Significantly more complex SR (now dealing with word families, morpheme dependencies).
- Consider whether SR engine needs refactoring to handle morphological relationships.

### **World 7+: Fluency & Comprehension Focus**
**Pedagogical goal:** Longer texts, varied sentence structures, deeper comprehension.

Potential slices:
- Build longer micro-books (5–10 pages).
- Introduce more complex comprehension questions.
- Begin to move beyond phonics-first toward "reading for meaning."

---

## 2. Adventure Mode (Child-Only Play)

**Current state:** Slices 1–17 focus on Co-Play (parent grading).

### **Slice A1: Adventure Mode Foundation**
**What:** Child-only play with inferred grading (correct/incorrect taps, reaction time, hints usage).

**Contents:**
- Toggle in settings: "Always Co-Play," "Child-Only," or "Mixed."
- Adventure mode inference logic:
  - Correct tap → assume ✅.
  - Incorrect tap → assume ❌.
  - Hesitation + hint requests → assume 😬.
  - Long reaction times → treat conservatively.
- Voice recognition (optional) for spoken responses (e.g., letter sounds, word reading).
- Restrict Adventure mode to items already mastered in Co-Play (avoid teaching in child-only mode).

**Risk:** Inference may overestimate or underestimate competence. Validate accuracy by comparing Adventure inferences vs. Co-Play parent grades on same items.

### **Slice A2: Voice Recognition for Adventure Mode**
**What:** Automatic detection of child's spoken responses (letter sounds, word decoding).

**Contents:**
- Integrate speech recognition (iOS Speech Framework, or cloud API).
- Confidence thresholds for grading:
  - High confidence → ✅.
  - Medium confidence → 😬.
  - Low confidence → ❌.
- Fallback to tap-based grading if voice fails.

**Risk:** Accuracy varies by accent, background noise, age. Requires extensive testing with target age group.

### **Slice A3: Adventure Mode Parent Nudges & Transition Rules**
**What:** Parent reminders to co-play; rules for when kids should stay in Adventure mode.

**Contents:**
- Parent setting: "Remind me to co-play X times per week."
- Rules:
  - "If accuracy drops below 80%, suggest co-play session."
  - "New letters/patterns always taught in co-play."
  - "Can use Adventure mode for maintenance practice."
- Parent-facing report: "Adventure mode accuracy vs. co-play accuracy for same items."

---

## 3. Real-World Missions & Offline Integration

**Current state:** Slices 1–17 include a single "real-world mission" at session end (e.g., "Find the letter S at home").

### **Slice R1: Expanded Real-World Missions Library**
**What:** 3–5 mission types that extend learning beyond the app.

**Potential missions:**
- "Find 3 words that start with /s/ in a book at home. Point to them; parent says 'Good!'"
- "Write the letter M on paper 5 times. Parent checks: is it recognizable?"
- "Read a food label to find the word 'and.' Can you read it?"
- "Spell your name with magnetic letters. Say each sound."

**Contents:**
- Mission library per world (different missions for World 1 vs. World 2).
- Logged by parent (✅ completed, ❌ skipped).
- Parent dashboard: "Real-world practice this week: 4/5 missions completed."

### **Slice R2: Parent Co-Play Scripts & Prompts**
**What:** In-app guidance for parents during sessions (reduce parent overwhelm).

**Contents:**
- Subtle tooltips during Co-Play:
  - "Let them answer for 5 seconds before helping."
  - "If they hesitate, it might be a 'needed help.'"
  - "If they guess, it's okay—mark ❌ and move on."
- Session summary: "You did great! Here's what worked: you let them think, and they got 3 right."

### **Slice R3: Family Reading Recommendations**
**What:** Suggest real books that match child's current decoding level.

**Contents:**
- Integration with book databases (e.g., Guided Reading Level, Lexile).
- Parent dashboard: "Your child can now read CVC words. Try these books: [list]."
- Manual curation of book lists per world.

---

## 4. Parent Dashboard & Analytics (Advanced)

**Current state:** Slice 5 includes basic dashboard (progress, weak items, suggestions).

### **Slice D1: Detailed Progress Reports**
**What:** Historical trends, mastery curves, learning velocity.

**Contents:**
- Graphs:
  - "Letter-sound knowledge over time" (% mastered by week).
  - "Session frequency" (line chart of days played per week).
  - "Item mastery timeline" (which items mastered when).
- Export: PDF report for sharing with teacher or specialist.

### **Slice D2: Comparative Analytics**
**What:** How is this child progressing compared to age peers? (Privacy-aware, aggregate data only.)

**Contents:**
- "Your child has mastered 12 letters in 4 weeks. Average for age: 8–10 letters in 4 weeks. Great progress!"
- *Note: Requires aggregate, privacy-safe data collection.*

### **Slice D3: Prescriptive Recommendations**
**What:** AI-driven suggestions for parent action (based on child's weak items).

**Contents:**
- "Your child struggles with /r/ sounds. Here are 5 activities: [list]."
- "Try a co-play session focused on /r/ next time."
- "Practice these words at home: run, red, robot."

### **Slice D4: Specialist/Teacher Export**
**What:** Detailed data export for speech therapists, teachers, or specialists.

**Contents:**
- CSV export of all item-level data (item, rating, date, interval).
- Summary report: "Strength areas: [X]. Struggle areas: [Y]."
- *Requires parental consent & privacy safeguards.*

---

## 5. Family & Account Management

**Current state:** Slices 1–17 assume a single child per parent account.

### **Slice F1: Multiple Child Profiles**
**What:** One parent account, multiple children (siblings).

**Contents:**
- Parent gate: "Add a child" form (name, age, interests).
- Dashboard shows a dropdown to switch between children.
- Each child has independent SR data and progress.
- Parent can compare sibling progress (e.g., "Emma has mastered 15 letters; Alex has mastered 10").

**Architecture:** Requires multi-profile data model and careful privacy scoping.

### **Slice F2: Family Invite & Co-Parent Sync**
**What:** Multiple parents can manage one child (e.g., mom + dad, mom + grandma).

**Contents:**
- Parent A creates account, adds child.
- Parent A invites Parent B via email.
- Both parents can:
  - Play co-play sessions.
  - View dashboard.
  - Set real-world missions.
- Shared data: SR items, progress, family names (My World).

**Privacy:** Requires careful consent flows and data-sharing policies.

### **Slice F3: Teacher/Specialist Access**
**What:** Parent grants read-only dashboard access to teacher or speech therapist.

**Contents:**
- Parent generates a "read-only link" with expiration date.
- Teacher can view detailed progress but not change settings.
- Teacher can add notes (visible to parent).

---

## 6. Accessibility & Inclusive Design

**Current state:** Slices 1–17 include basic accessibility (large touch targets, high contrast, dyslexia-friendly font option).

### **Slice Acc1: Dyslexia-Friendly Font & Styling**
**What:** Toggle for alternative fonts (e.g., OpenDyslexic) + adjustable font size + adjustable spacing.

**Contents:**
- Settings: Font style (default / OpenDyslexic / Dyslexie / etc.).
- Settings: Font size (small / medium / large / extra large).
- Settings: Letter spacing & line spacing adjustments.

### **Slice Acc2: Text-to-Speech (TTS) for All Reading Content**
**What:** Tap a word/sentence → hear it read aloud.

**Contents:**
- Every word/sentence card includes a speaker icon.
- Child can tap to hear word/sentence read by clear, age-appropriate voice.
- Settings: Voice choice, speech rate.

### **Slice Acc3: Motor Accessibility**
**What:** Reduce fine-motor demands for children with motor delays.

**Contents:**
- Toggle: "Easy Mode" (larger touch targets, no drag required, simple taps only).
- Reduce multi-touch gestures; simplify to single tap.
- Extra time allowances for selections.

### **Slice Acc4: Hearing Accessibility**
**What:** Visual + vibration alternatives to audio feedback.

**Contents:**
- Toggle: Mute audio, or replace with:
  - Visual feedback (animations, color changes).
  - Haptic feedback (phone vibration).
  - Captions for all audio content.

### **Slice Acc5: Neurodiversity Support (ADHD, Autism)**
**What:** Features to reduce overwhelm and sensory load.

**Contents:**
- Toggle: "Quiet Mode" (no animations, minimal sound, solid colors only).
- Toggle: "Stim-friendly Mode" (allow free-play fidget games, less structured).
- Adjustable session length (some kids do better with 3-min bursts; others 20-min blocks).

---

## 7. Teacher Mode & Classroom Features

**Current state:** Slices 1–17 designed for home use; teachers mentioned as secondary use case.

### **Slice T1: Classroom Mode Foundation**
**What:** Teacher can manage multiple students on shared iPad or laptop.

**Contents:**
- Teacher login (separate account type).
- Add students: name, age, current world.
- Each student has a profile + independent SR data.
- Quick-switch between students (tap student name on home screen).

### **Slice T2: Teacher Dashboard**
**What:** Overview of all students' progress + class-level insights.

**Contents:**
- Table: Student name, current world, % mastered, weak items.
- Graphs: Class average mastery by skill (letter-sounds, decoding, etc.).
- Filter: Show only struggling students, or only advanced students.
- Export: Class progress report for administrator.

### **Slice T3: Teacher Assignment of Focus Quests**
**What:** Teacher can set custom learning goals per student.

**Contents:**
- Teacher dashboard: "Create Focus Quest" button.
- Select skill (e.g., "Letter /sh/") and student(s).
- App prioritizes that skill in next sessions.
- Completion tracked in teacher dashboard.

### **Slice T4: Classroom Pacing & Curriculum Alignment**
**What:** Map Rocket Reading worlds to classroom curriculum standards.

**Contents:**
- Admin panel: Align World 1–4 to state literacy standards (Fountas & Pinnell, Guided Reading Levels, etc.).
- Teacher can see: "This student has completed standards X, Y, Z; working on standard Q."
- Recommendations for complementary classroom activities.

---

## 8. Personalization & Content Expansion

**Current state:** Slice 7 includes basic My World (family names, pet names, favorites).

### **Slice P1: Photo Integration for My World**
**What:** Parents can upload photos of family members, pets, places.

**Contents:**
- My World form: Optional photo upload for each family member, pet, favorite place.
- During quests and micro-books, child sees photos (no decoding required, but emotional connection).
- Example: "Here's Luna, your dog. Help Luna find her bed."

### **Slice P2: Custom Sentence Generation**
**What:** Parents write custom sentences using decodable vocabulary.

**Contents:**
- My World form: "Write a sentence about your family or pet."
- System checks decodability:
  - "Grandma bakes pies." → Check: Grandma (irregular, new tricky word), bakes (decodable), pies (decodable). Flag: Grandma is not yet decodable; wait until World 4.
  - "Luna is on the bed." → Check: All decodable (or already taught). ✅ Approved.
- Approved sentences enter SR mix automatically.

### **Slice P3: Interest-Based Content Theming**
**What:** Quests and mini-games are themed around child's interests.

**Contents:**
- My World: Child interests (trucks, dinosaurs, princesses, space, animals, sports, etc.).
- Quest generator uses interests:
  - Child loves trucks → "Organize the trucks in the parking lot by size" → word reading quest using vehicle-themed graphics.
  - Child loves dinosaurs → "Help the dinosaurs find their cave" → word reading quest with dinosaur scenes.

### **Slice P4: Expanded Micro-Book Personalization**
**What:** Generate custom books using child's data and interests.

**Contents:**
- System auto-generates micro-books:
  - Title: "[Child's name]'s Day"
  - Content: Sentences with child's interests, family names, pet names.
  - Example: "Mia and Luna play. They run. Luna is fast."

---

## 9. Advanced Game Features & Mini-Games

**Current state:** Slices 1–17 include 9 core mini-game types.

### **Slice G1: Mini-Game Variety Pack**
**What:** 3–4 additional mini-game types to prevent fatigue.

**Potential games:**
- **Match the Sound:** Words flash on screen; child taps the one that rhymes with a target sound.
- **Build-a-Sentence:** Child drags words into sentence frames (e.g., "I see a ___").
- **Rhyme Sort:** Child drags words into rhyming families.
- **Sound Sequencing:** Child hears a word, taps the sounds in order (e.g., c-a-t).

### **Slice G2: Difficulty Scaling & Accessibility**
**What:** Each mini-game can adjust difficulty based on performance.

**Contents:**
- Easy: Fewer choices, longer time, helpful hints.
- Normal: 3–4 choices, standard time, hints after 1 mistake.
- Hard: 4+ choices, faster pace, minimal hints.
- System auto-adjusts based on accuracy (if >95%, offer harder mode; if <70%, suggest easier).

### **Slice G3: Mini-Game "Combos" & Streak Bonuses**
**What:** Get bonus points/rewards for consecutive correct answers.

**Contents:**
- "You got 5 in a row! 🌟"
- Bonuses (visual/audio, no extrinsic rewards):
  - 3 streak: NPC exclaims "Nice!"
  - 5 streak: Animation (confetti, character dance).
  - 10 streak: Unlock a special scene or story bit.

### **Slice G4: Multiplayer / Friendly Competition (Optional)**
**What:** If classroom mode is built, add optional friendly competition.

**Contents:**
- "Race mode:" Two students complete word-reading challenges side-by-side (on two devices).
- Leaderboard: "Emma mastered 15 letters this week; you mastered 12. Great effort!"
- *Note: Carefully designed to encourage, not shame. Optional & configurable.*

---

## 10. Platform & Technical Expansion

**Current state:** Slices 1–17 assume iPad first, offline-first, local storage.

### **Slice Tech1: Cloud Sync & Backup**
**What:** SR data syncs to server; accessible on multiple devices; backup is safe.

**Contents:**
- Parent account on server (Firebase, AWS, or custom backend).
- On login, sync local SR data with cloud.
- If app crashes, data recovers from cloud backup.
- Parent can access dashboard on web or mobile.

**Privacy:** Requires strong encryption, COPPA compliance, transparent data policy.

### **Slice Tech2: Web Dashboard**
**What:** Parent can view dashboard on desktop/web browser.

**Contents:**
- Web app (React, Vue, etc.) mirrors iPad dashboard.
- Parent can view progress, trigger focus quests, manage My World from browser.
- Works on any device.

### **Slice Tech3: Cross-Platform Support (Android, Web)**
**What:** Expand beyond iPad to Android tablets and web browsers.

**Contents:**
- Port app from Swift/SwiftUI to React Native or Flutter.
- Test extensively on Android devices.
- Adapt touch/UI for different screen sizes.

**Risk:** Significant re-engineering effort. Assess ROI based on target market.

### **Slice Tech4: Offline-First with Smart Caching**
**What:** Pre-cache multiple worlds; work seamlessly offline for weeks.

**Contents:**
- Download Worlds 1–4 assets ahead of time.
- Queue syncs when online.
- Graceful degradation if offline (app works, but dashboard updates delayed).

---

## 11. Data & Learning Science

**Current state:** Slices 1–17 validate SR mechanics + pedagogical signals in small-scale testing.

### **Slice Data1: Learning Outcome Tracking**
**What:** Long-term study on whether Rocket Reading users outperform control group on standardized tests.

**Contents:**
- Recruit test group of 50–100 children (ages 3–5).
- Randomize: intervention (Rocket Reading) vs. control (no app, or alternative app).
- Administer pre/post assessments (DIBELS, PPVT, etc.).
- Analyze: Does intervention group show larger gains in phonological awareness, decoding, fluency?

**Timeline:** 6–12 months of study, several months of analysis.

### **Slice Data2: Retention Study**
**What:** Does spacing actually improve long-term retention for this age group?

**Contents:**
- Compare two groups:
  - Group A: Spaced repetition (Rocket Reading default).
  - Group B: Massed practice (same items, daily, no spacing).
- Measure: Accuracy on items 4 weeks after last exposure.
- Hypothesis: Group A > Group B.

**Timeline:** 8 weeks of intervention, 4 weeks of follow-up.

### **Slice Data3: Engagement & Parent Satisfaction Survey**
**What:** Quantify engagement and parent perception.

**Contents:**
- Surveys after Slices 6, 11, 17 (after each world).
- Questions:
  - "How often does your child ask to play Rocket Reading?" (frequency).
  - "Do you trust the app's learning signals?" (parent confidence).
  - "How much time does your child spend?" (actual vs. recommended).
  - "Would you recommend to a friend?" (NPS).

---

## 12. Community & Social Features (Optional)

**Current state:** Slices 1–17 are designed for privacy; no social features.

### **Consideration: Closed Parent Community**
**What:** Parents can share tips, celebrate milestones (with privacy controls).

**Concerns:**
- Privacy & COPPA compliance (children's data is sensitive).
- Moderation burden.
- Feature creep vs. core mission.

**Decision:** TBD based on user feedback. If many parents ask for community, explore in Slice C1. Otherwise, deprioritize.

### **Slice C1: Parent Tips & Stories (Read-Only)**
**What:** If community is pursued, start with curated, read-only content.

**Contents:**
- In-app blog/tips:
  - "5 Ways to Practice Phonics at Home."
  - "Parent Success Story: Emma's Journey" (anonymous, curated by team).
- No user-generated content initially (reduces moderation).

---

## Prioritization Framework

When picking the next slice to build, consider:

1. **Impact on core mission:** Does it improve learning or engagement?
2. **Unblocking dependencies:** Does it unblock other features?
3. **Test user feedback:** What do parents/kids ask for most?
4. **Complexity vs. ROI:** Is the effort worth the gain?

### Likely Priority Order (After Slice 17)

1. **Slice A1 (Adventure Mode Foundation)** – High-impact for busy parents.
2. **Slice D1 (Detailed Progress Reports)** – High-impact for parent confidence.
3. **Slice F1 (Multiple Child Profiles)** – Enables family growth.
4. **Slice R1 (Expanded Real-World Missions)** – Extends learning beyond app.
5. **Slice 18 (World 5)** – Depends on test user feedback demand.
6. **Slice Tech1 (Cloud Sync)** – Improves reliability & data safety.

---

## How to Use This Document

1. **Before starting Slice 18:** Review this roadmap to prioritize next features.
2. **During implementation:** If user feedback suggests a feature from this list, update the prioritization.
3. **Quarterly planning:** Revisit every quarter; move features up/down based on new data.
4. **Iteration:** Some features may be cut (e.g., multiplayer if it doesn't fit the vision). That's okay.

---

## Future Review Dates

- **After Slice 6 (World 1 complete):** Assess whether World 2 should be built as-is, or whether user feedback requires pivots.
- **After Slice 11 (World 2 complete):** Decide whether to build World 3 next, or pivot to Adventure Mode / Classroom Mode.
- **After Slice 17 (World 4 complete):** Review entire roadmap; prioritize the next 5 slices.

---

## Document History

- **2025-11-26:** Initial brainstorming. Roadmap created with 12 buckets and ~40+ potential future slices.
