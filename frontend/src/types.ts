export type DreamMode = 'PSYCHOLOGY' | 'HINDU_MYTHOLOGY';

export type Language = 'ENGLISH' | 'TAMIL' | 'TANGLISH';

export interface DreamSymbol {
  symbol: string;
  meaning: string;
  traditionalSignificance?: string;
  psychologicalMechanism?: string;
}

export interface ScripturalPassage {
  source: string;
  chapter: string;
  page?: string;
  sanskritVerse?: string;
  translation: string;
  commentary?: string;
}

export interface TheoreticalExplanation {
  school: string; // e.g., "Neurocognitive Continuity Hypothesis (Domhoff)" or "Psychoanalytic (Freud)"
  theory: string;
  empiricalStatus: 'EMPIRICAL_RESEARCH' | 'THEORETICAL_MODEL' | 'CLASSICAL_PSYCHOANALYSIS';
}

export interface Citation {
  sourceTitle: string;
  author: string;
  chapter: string;
  page?: string | number;
  excerpt: string;
  relevance: string;
}

export interface InterpretationResponse {
  mode: DreamMode;
  responseLanguage: Language;
  dreamSummary: string;
  emotionalLandscape?: string;
  symbols: DreamSymbol[];
  theoreticalExplanations?: TheoreticalExplanation[];
  scripturalPassages?: ScripturalPassage[];
  culturalContext?: string;
  wakingLifeConnections?: string;
  reflectionQuestions: string[];
  uncertainties?: string;
  citations: Citation[];
  timestamp: string;
  processingTimeMs: number;
  aiProviderUsed: 'Google Gemini' | 'Groq (Llama 3.3)' | 'DreamLens RAG Engine';
}

export interface JournalEntry {
  id: string;
  createdAt: string;
  dreamText: string;
  emotionalState?: string;
  additionalContext?: string;
  inputLanguage: Language;
  responseLanguage: Language;
  interpretations: {
    psychology?: InterpretationResponse;
    mythology?: InterpretationResponse;
  };
}
