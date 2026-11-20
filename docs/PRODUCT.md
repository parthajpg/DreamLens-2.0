# DreamLens 2.0 — Product Requirements Document (PRD)

<!-- impeccable:product-schema 1 -->

## 1. Product Vision & Positioning
DreamLens 2.0 is a multilingual, AI-powered dream interpretation and journaling platform offering two sovereign, independent perspectives:
1. **Psychology:** Explores dreams through empirical scientific research (neurocognitive theory, emotional processing) and classical psychoanalytic perspectives.
2. **Hindu Mythology:** Explores dreams through traditional Vedic, Puranic, and cultural texts (Agni Purana, Swapna Chintamani).

DreamLens 2.0 is designed as a cinematic, editorial journey into two distinct visual and philosophical worlds rather than a conventional chat box.

## 2. Target Users & Operating Context
- **Audience:** Individuals exploring, reflecting upon, and recording their dreams across scientific, reflective, and spiritual traditions.
- **Languages:** English, Tamil, and conversational Tanglish. Input and response languages are independently selectable.
- **Operating Context:** Highly private, reflective morning/nighttime usage across desktop and mobile screens.

## 3. Core Features & Capabilities

### 3.1 Friction-Free Anonymous Access
- **No Registration or Login:** Zero user accounts, passwords, or authentication barriers. Users can interpret dreams immediately upon landing.
- **Local-Only Journaling:** Optional device-local storage (IndexedDB/LocalStorage). Dreams are only saved upon explicit user action. Users can search, filter, export, delete individual entries, or clear all history. Clear disclosures explain that local data stays on their device.

### 3.2 Dual-Perspective Interpretation Experience
- **Exclusive World View:** Only one perspective is viewed at a time to prevent muddy syncretism.
- **Seamless Perspective Switching:** Users can toggle between Psychology and Hindu Mythology while preserving the original dream text and context.
- **Source-Grounded Citations:** Every interpretation includes explicit citations (book, chapter, page/section). When source material is absent, this limitation is clearly stated.

### 3.3 Multilingual Engine
- Full support for English, Tamil, and Tanglish.
- Natural, conversational Tanglish syntax reflecting actual spoken Tamil rather than robotic machine translations.
- Accurate preservation of scriptural titles and scientific terms across languages.

### 3.4 Structured Output Formats
- **Psychology Output:**
  - Dream Overview & Psychological Archetype
  - Emotional Landscape & Affective Processing
  - Significant Dream Symbols (non-universal, context-dependent)
  - Theoretical Explanations (Neurocognitive vs Psychoanalytic)
  - Reflection Questions for Waking Life
  - Scientific References & Document Citations
  - Identified Uncertainties
- **Hindu Mythology Output:**
  - Dream Overview & Traditional Sakuna Context
  - Traditional Symbolic Significance
  - Scriptural Interpretations & Passages (e.g., Agni Purana Ch. 229)
  - Cultural & Temporal Context (Prahara/timing of dream)
  - Counter-Interpretations / Traditional Nuances
  - Authentic Scriptural Citations

### 3.5 Ethics, Safety & Privacy
- **Privacy:** No permanent server-side dream storage. No dream texts in application logs or analytics.
- **Clinical Boundaries:** Explicit disclaimer that DreamLens does not provide medical or psychiatric diagnoses.
- **Safety Handling:** Empathetic supportive guidance and crisis resources if severe distress, self-harm, or trauma is detected.
- **Non-Fatalistic Mythological Framing:** Cultural interpretations are presented as traditional reflections, never deterministic predictions of future events.
