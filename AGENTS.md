# AGENTS.md — Permanent Project Instructions & Constraints

## 1. Project Overview & Identity
- **Product Name:** DreamLens 2.0
- **Core Mission:** Multilingual, AI-powered dream interpretation and private reflection platform providing two sovereign, cited perspectives:
  1. **Psychology:** Scientific, neurocognitive (Domhoff, De Gennaro) and classical psychoanalytic (Freud) insights with strict empirical boundaries.
  2. **Hindu Mythology:** Traditional scriptural and cultural wisdom (Agni Purana, Swapna Chintamani) with cultural reverence and scriptural citations.
- **Multilingual Support:** English, Tamil, and conversational Tanglish (independently selectable for input and response).
- **Core UX Philosophy:** Cinematic, immersive, editorial dual-world journey—NOT a generic chatbot or light/dark toggle.

## 2. Core Architectural & Product Constraints
- **Zero Authentication / Zero User Accounts:** Absolutely no user registration, login, JWT, sessions, password management, or user tables in the database. 100% friction-free anonymous access.
- **Local-Only Dream Journal:** Optional device-local storage (IndexedDB / localStorage in browser). Never persist raw dream texts or personal identifiers on the backend database or in server logs.
- **Strict RAG Separation:** Independent vector collections and retrieval pipelines for Psychology and Hindu Mythology. Never blend or conflate the two contexts.
- **Grounding & Verifiable Citations:** Every interpretation must cite retrieved sources (book title, author, chapter, page). Never hallucinate or fabricate citations. Disclose when source data is unavailable.
- **Safety Boundaries:** Never diagnose mental health conditions, reinforce psychosis or paranoia, or present mythological interpretations as guaranteed future predictions.

## 3. Technology Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Lucide icons, Framer Motion (or lightweight CSS animations).
- **Backend:** Java (JDK 21/25) with Spring Boot 3.x (Modular Monolith).
- **Database:** PostgreSQL with `pgvector` extension.
- **AI Providers:** Dual-provider architecture supporting Google Gemini and Groq with automatic fallback, rate limiting, and structured JSON outputs.
- **Design Skill:** Impeccable principles applied for distinct visual identities.

## 4. Session Initialization Protocol (MANDATORY)
Whenever a new agent session begins or after context resets/restarts:
1. **Read `AGENTS.md`** (this file) completely.
2. **Read relevant docs in `docs/`:** `docs/PRODUCT.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN.md`.
3. **Read `docs/PROGRESS.md` and `docs/ROADMAP.md`** to know the current phase and exact next action.
4. **Inspect current codebase and Git status** to verify the true implementation state.
5. **Never restart from scratch** because conversation history is missing. Resume the next unfinished approved task immediately.

## 5. Continuous Progress Management Protocol
After every meaningful development step:
1. Verify the implementation (build, test, or run check).
2. Update the corresponding task checklist in `docs/ROADMAP.md`.
3. Update `docs/PROGRESS.md` (current phase, completed items, active tasks, blockers, exact next action).
4. Record significant architectural/product decisions in `docs/DECISIONS.md`.
5. Keep documentation strictly synchronized with the actual codebase.
6. Make incremental Git commits at verified milestones.
7. Never commit or log API keys, secrets, or sensitive credentials.
