# DreamLens 2.0 — Implementation Roadmap

## Phase 1: Project Setup & Knowledge Base Foundation
- [ ] Initialize Git repository and verify `.gitignore`.
- [ ] Setup Spring Boot backend modular project structure (Maven/Gradle with JDK 21/25).
- [ ] Setup React + TypeScript + Vite frontend application.
- [ ] Inspect knowledge-base source documents and build automated extraction scripts:
  - [ ] Extract and verify text from Freud's *The Interpretation of Dreams*.
  - [ ] Extract and verify text from Domhoff's *The Scientific Study of Dreams*.
  - [ ] Extract and verify text from De Gennaro's *The Functional Role of Dreaming in Emotional Processes*.
  - [ ] Inspect Agni Purana PDF and identify Chapter 229 dream interpretation sections.
  - [ ] Scrape or ingest online *Swapna Chintamani* text with source attribution.
- [ ] Verify local PostgreSQL & pgvector connectivity.

## Phase 2: RAG Pipeline & Database Schema
- [ ] Configure PostgreSQL with `pgvector` extension.
- [ ] Implement database schema (`knowledge_chunks` with HNSW vector index).
- [ ] Build chunking, cleaning, and metadata preservation pipeline.
- [ ] Implement embedding generator (Gemini Embedding / Local / HuggingFace).
- [ ] Ingest Psychology books into `PSYCHOLOGY` collection with verified chunk counts.
- [ ] Ingest Hindu Mythology texts into `HINDU_MYTHOLOGY` collection with verified chunk counts.
- [ ] Build retrieval service with semantic similarity, metadata filtering, and citation builder.

## Phase 3: AI Provider Service & Orchestration
- [ ] Implement `AIProvider` interface with Gemini and Groq adapters.
- [ ] Configure environment variables for API keys, timeouts, and rate limits.
- [ ] Implement structured JSON prompt engine with citation enforcement.
- [ ] Build fallback and retry logic (Gemini primary -> Groq fallback).
- [ ] Create multilingual translation and prompt adaptation (English, Tamil, Tanglish).
- [ ] Implement `DreamInterpretationService` orchestrator and REST controllers.

## Phase 4: Frontend Development & Immersive UI
- [ ] Configure Tailwind CSS with dual-theme color tokens and typography.
- [ ] Implement Landing Page with the two entry portals ("Explore the Mind" vs. "Explore the Beyond").
- [ ] Build Dream Input Screen (Dream description, emotion tags, language selectors).
- [ ] Build Mode-specific Cinematic Loading Experience.
- [ ] Build Editorial Interpretation Screen with:
  - [ ] Structured section cards
  - [ ] Verified source citation cards (expandable source excerpts)
  - [ ] Perspective switcher (preserving dream state)
  - [ ] Follow-up questions flow
- [ ] Implement private, device-local Dream Journal (IndexedDB):
  - [ ] Save locally
  - [ ] Search & filter entries
  - [ ] Delete single entry / clear all data
  - [ ] Privacy banner & local storage disclosures

## Phase 5: Verification, Polish & End-to-End Testing
- [ ] End-to-end testing of Psychology interpretations with citations.
- [ ] End-to-end testing of Hindu Mythology interpretations with citations.
- [ ] Verification of Tamil and Tanglish output naturalness.
- [ ] Accessibility & responsive audits (mobile + desktop).
- [ ] Security, rate limiting, and input sanitation verification.
- [ ] Production build verification for both backend and frontend.
