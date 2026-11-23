# DreamLens 2.0 — Architecture & Design Decisions Record

## ADR-001: Zero User Authentication & Device-Local Storage
- **Date:** 2026-11-20
- **Status:** Approved
- **Context:** Dream analysis involves deeply personal, private, and sensitive subconscious thoughts. Traditional SaaS login flows create psychological friction and privacy risks.
- **Decision:** Absolutely no user accounts, passwords, sessions, or backend user tables. All journal entries are stored strictly on the user's browser device (IndexedDB/localStorage) and only upon explicit user save action. The backend operates completely statelessly regarding user identities.
- **Consequences:** Maximizes user trust and zero-friction onboarding. Users must be educated that their saved dreams will not synchronize across devices.

## ADR-002: Modular Monolith vs. Microservices
- **Date:** 2026-11-20
- **Status:** Approved
- **Context:** The system needs RAG retrieval, AI orchestration, and REST APIs. A microservices architecture would introduce excessive operational overhead and network latency.
- **Decision:** Build a single Spring Boot modular monolith with clear package boundaries (`ingestion`, `rag`, `ai`, `controller`).
- **Consequences:** Simple deployment, fast local execution, unified configuration, low maintenance cost.

## ADR-003: Dual Knowledge Collections in PostgreSQL pgvector
- **Date:** 2026-11-20
- **Status:** Approved
- **Context:** Psychology and Hindu Mythology represent distinct philosophical domains with their own terminology, authorities, and interpretive models. Blending vector spaces risks syncretic hallucinations.
- **Decision:** Maintain separate collection partitions/filters in PostgreSQL `knowledge_chunks` table (`collection_type = 'PSYCHOLOGY'` vs `'HINDU_MYTHOLOGY'`). Inquiries to one mode never query or retrieve from the other.
- **Consequences:** Ensures pristine epistemological separation and accurate citations.

## ADR-004: Dual AI Providers with Automatic Fallback (Gemini + Groq)
- **Date:** 2026-11-20
- **Status:** Approved
- **Context:** Reliance on a single AI provider creates vulnerabilities to rate limits, outages, and regional latency spikes.
- **Decision:** Implement an abstraction layer supporting primary provider Google Gemini (Flash / Pro) with instant fallback to Groq (Llama 3.3 70B Versatile).
- **Consequences:** High reliability, resilience against provider downtime, sub-second fallback capabilities.

## ADR-005: Visual Identity Overhaul: Psychological Surrealism + Sacred Narrative Design
- **Date:** 2026-11-23
- **Status:** Approved
- **Context:** Initial UI felt too generic, card-heavy, and reminiscent of template-like AI websites. The application needed a distinct, emotionally immersive visual identity that honors the sovereign depth of both neurocognitive psychology and traditional Hindu scriptural oneiromancy.
- **Decision:** Adopt the "Psychological Surrealism + Sacred Narrative Design" design language.
  - Establish a 3-layer color hierarchy (Global Petrol, Psychology Ink Navy/Plum/Sage, Mythology Temple Umber/Parchment/Copper).
  - Implement sovereign typography systems: Cormorant Garamond for Psychology; Rozha One and Lora for Hindu Mythology; Plus Jakarta Sans for global UI.
  - Introduce bespoke editorial visual assets (surrealist subconscious compositions, sacred celestial yantras, and Prahara cosmic watch indicators).
  - Shift interpretation views into asymmetric, high-craft editorial reading formats rather than generic AI cards.
- **Consequences:** Elevates DreamLens into an unforgettable, museum-grade editorial web experience with authentic cultural and scientific gravitas.

## ADR-006: Anti-AI-Slop Editorial Design System Refactoring
- **Date:** 2026-11-23
- **Status:** Approved
- **Context:** The application retained decorative residue typical of AI SaaS templates: pill-shaped badge kickers above headings, generic status indicators with glowing dots, nested rounded-full containers, excessive border-radius (`rounded-3xl` nested inside `rounded-2xl`), and decorative microcopy capsules.
- **Decision:** Apply Impeccable craft floor and distill directives:
  1. Eliminate all decorative pill-shaped badges, kickers, and capsules (including promotional badges above hero headlines).
  2. Transition to editorial typography hierarchy: simple unboxed headers, clean baseline tabs with crisp active border lines, and authentic hairline dividers.
  3. Replace bulbous radii with architectural geometry: `rounded-xl` for primary portals/sections, `rounded-lg` for cards, and `rounded-md` for interactive controls.
  4. Redesign emotional tags and metadata as understated text chips and subtle labels rather than glowing capsules.
  5. Remove all generic SaaS status indicators (e.g. "Grounded RAG retrieval active" green dot pills) in favor of quiet, authentic editorial statements.
- **Consequences:** Replaces pseudo-luxury template clichés with sophisticated editorial restraint, allowing imagery and typography to lead the experience.
