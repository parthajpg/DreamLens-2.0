# DreamLens 2.0 — Implementation Roadmap

## Phase 1: Project Setup & Knowledge Base Foundation
- [x] Initialize Git repository and verify `.gitignore`.
- [x] Setup Spring Boot backend modular project structure (Maven/Gradle with JDK 21/25).
- [x] Setup React + TypeScript + Vite frontend application.
- [x] Inspect knowledge-base source documents and build automated extraction scripts:
  - [x] Extract and verify text from Freud's *The Interpretation of Dreams*.
  - [x] Extract and verify text from Domhoff's *The Scientific Study of Dreams*.
  - [x] Extract and verify text from De Gennaro's *The Functional Role of Dreaming in Emotional Processes*.
  - [x] Inspect Agni Purana PDF and identify Chapter 229 dream interpretation sections.
  - [x] Scrape or ingest online *Swapna Chintamani* text with source attribution.
- [ ] Verify local PostgreSQL & pgvector connectivity.

## Phase 2: RAG Pipeline & Database Schema
- [ ] Configure PostgreSQL with `pgvector` extension.
- [ ] Implement database schema (`knowledge_chunks` with HNSW vector index).
- [x] Build chunking, cleaning, and metadata preservation pipeline.
- [ ] Implement embedding generator (Gemini Embedding / Local / HuggingFace).
- [x] Ingest Psychology books into `PSYCHOLOGY` collection with verified chunk counts.
- [x] Ingest Hindu Mythology texts into `HINDU_MYTHOLOGY` collection with verified chunk counts.
- [x] Build retrieval service with semantic similarity, metadata filtering, and citation builder.

## Phase 3: AI Provider Service & Orchestration
- [x] Implement `AIProvider` interface with Gemini and Groq adapters.
- [x] Configure environment variables for API keys, timeouts, and rate limits.
- [x] Implement structured JSON prompt engine with citation enforcement.
- [x] Build fallback and retry logic (Gemini primary -> Groq fallback).
- [x] Create multilingual translation and prompt adaptation (English, Tamil, Tanglish).
- [x] Implement `DreamInterpretationService` orchestrator and REST controllers.

## Phase 4: Frontend Development & Immersive UI
- [x] Configure Tailwind CSS with dual-theme color tokens and typography.
- [x] Implement Landing Page with the two entry portals ("Explore the Mind" vs. "Explore the Beyond").
- [x] Build Dream Input Screen (Dream description, emotion tags, language selectors).
- [x] Build Mode-specific Cinematic Loading Experience.
- [x] Build Editorial Interpretation Screen with:
  - [x] Structured section cards
  - [x] Verified source citation cards (expandable source excerpts)
  - [x] Perspective switcher (preserving dream state)
  - [x] Follow-up questions flow
- [x] Implement private, device-local Dream Journal (IndexedDB / localStorage):
  - [x] Save locally
  - [x] Search & filter entries
  - [x] Delete single entry / clear all data
  - [x] Privacy banner & local storage disclosures
- [x] Anti-AI-slop design cleanup (eliminated decorative capsules, pills, glowing status badges, and bulbous nesting).

## Phase 5: Verification, Polish & End-to-End Testing
- [x] End-to-end testing of Psychology interpretations with citations.
- [x] End-to-end testing of Hindu Mythology interpretations with citations.
- [x] Verification of Tamil and Tanglish output naturalness.
- [x] Accessibility & responsive audits (mobile + desktop).
- [x] Production build verification for both backend and frontend.
