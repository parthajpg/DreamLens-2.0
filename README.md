# DreamLens 2.0

> **Multilingual, AI-Powered Dream Interpretation & Private Reflection Platform**  
> Sovereign Dual-World Epistemology: Modern Cognitive Psychology & Sacred Hindu Mythology.

---

## Overview

**DreamLens 2.0** provides deep, grounded dream analysis through two distinct, unblended perspectives:

1. **Psychology Realm:** Neurocognitive (G. William Domhoff, Luigi De Gennaro) and classical psychoanalytic (Sigmund Freud) frameworks with strict empirical boundaries and emotional processing theories.
2. **Sacred Mythology Realm:** Traditional scriptural and cultural wisdom (*Agni Purāna* Chapter 229, Jagaddeva's *Svapnacintāmaṇi* c. 1175 CE) with cultural reverence, Sanskrit recensions, and Prahara-based nocturnal timing analysis.

DreamLens is built on the design philosophy of **Psychological Surrealism + Sacred Narrative Design**—an anti-AI-slop, editorial, and image-led experience featuring bespoke fine art, custom typography, and zero generic chatbot styling.

---

## Core Architectural Pillars

- **Zero User Accounts / Zero Authentication:** 100% friction-free anonymous access. No signups, logins, JWT tokens, session tracking, or backend user tables.
- **Local-Only Journal:** Dream entries and reflections remain strictly in device-local storage (IndexedDB / `localStorage`). Raw dream descriptions are never logged or stored on the backend.
- **Strict RAG Separation:** Isolated knowledge retrieval pipelines for Psychology and Sacred Mythology. Epistemologies are never conflated or cross-pollinated.
- **Verifiable Citations:** Every interpretation cites retrieved historical sources (text, chapter, author, context). No hallucinated citations.
- **Multilingual Support:** First-class support for English, Tamil (தமிழ்), and Tanglish across input and interpretation.
- **Safety Boundaries:** Does not diagnose medical or mental health conditions, reinforce psychosis, or present mythological interpretations as guaranteed fortune-telling.

---

## Visual & Editorial Design

- **Psychology Realm:** Subconscious ink navy (`#0B0F19`), cerebral slate, twilight indigo, and editorial serif display typography paired with surrealist architectural imagery.
- **Sacred Mythology Realm:** Temple sanctum bronze (`#1A120B`), aged parchment (`#F5E6CA`), terracotta, antique gold, and bespoke **Mordial** typography with ceremonial lotus dreamscapes.
- **Anti-AI-Slop Discipline:** No decorative promo pills, no generic SaaS status chips, no nested rounded cards—replaced by clean architectural geometry, baseline typography, and immersive full-page portals.

---

## Technology Stack

### Frontend
- **Framework:** React 18 with TypeScript & Vite
- **Styling:** Tailwind CSS with custom font systems (Mordial, Playfair Display, Cinzel, Noto Serif Tamil)
- **Icons & Motion:** Lucide React, Framer Motion
- **Storage:** Browser `localStorage` / IndexedDB

### Backend
- **Language / Runtime:** Java 21 (JDK 21/25)
- **Framework:** Spring Boot 3.3.5 (Web, Validation, Actuator)
- **AI Orchestration:** Dual-provider architecture supporting **Groq** (`llama-3.3-70b-versatile`) and **Google Gemini** with structured JSON output enforcement and deterministic RAG synthesis fallback.
- **Knowledge Retrieval:** Domain-isolated JSON chunk indexes from primary texts.

---

## Getting Started

### Prerequisites
- Node.js 18+ & npm
- Java JDK 21+ & Maven 3.9+
- (Optional) Groq API Key or Gemini API Key

### Backend Setup
```bash
cd backend

# Configure environment variables (optional: API key defaults to local RAG fallback)
export GROQ_API_KEY="your-groq-api-key"
# or create application-local.yml in backend/src/main/resources/

# Compile and run
mvn spring-boot:run
```
The backend starts on `http://localhost:8080`.

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
The frontend launches at `http://localhost:5173`.

---

## Project Structure

```
DreamLens-2.0/
├── backend/                  # Spring Boot 3.x Java 21 modular backend
│   ├── src/main/java/com/dreamlens/
│   │   ├── config/           # CORS & application configuration
│   │   ├── controller/       # REST API endpoints
│   │   ├── dto/              # Structured request/response models
│   │   └── service/          # Groq/Gemini orchestrator & RAG engine
│   └── src/main/resources/   # Application YAML configuration
├── frontend/                 # Vite + React + TypeScript frontend
│   ├── public/               # Bespoke artwork, fonts, and assets
│   └── src/
│       ├── components/       # Editorial views, portals, prahara clock, journal
│       ├── services/         # API client & local journal storage
│       └── types.ts          # Unified TypeScript domain definitions
├── knowledge-base/           # Curated primary psychological and mythological texts
│   └── processed/            # Structured, verified knowledge chunks
├── docs/                     # Product specs, architecture, roadmap, progress, decisions
└── images/                   # High-resolution source artwork
```

---

## License

Private & proprietary reflection platform. All rights reserved.
