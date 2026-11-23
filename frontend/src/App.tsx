import { useState, useEffect } from 'react';
import { DreamMode, Language, InterpretationResponse, JournalEntry } from './types';
import { Navbar } from './components/Navbar';
import { MainLandingView } from './components/MainLandingView';
import { LandingView } from './components/LandingView';
import { PsychologyLandingView } from './components/PsychologyLandingView';
import { MythologyLandingView } from './components/MythologyLandingView';
import { DreamInputView } from './components/DreamInputView';
import { CinematicLoadingView } from './components/CinematicLoadingView';
import { InterpretationView } from './components/InterpretationView';
import { JournalDrawer } from './components/JournalDrawer';
import { interpretDream } from './services/api';
import { journalStorage } from './services/journalStorage';

export function App() {
  // Navigation & View
  const [currentView, setCurrentView] = useState<'MAIN_LANDING' | 'LANDING' | 'PSYCHOLOGY_LANDING' | 'MYTHOLOGY_LANDING' | 'INPUT' | 'LOADING' | 'INTERPRETATION'>('MAIN_LANDING');
  const [activeMode, setActiveMode] = useState<DreamMode | null>(null);
  const [globalLanguage, setGlobalLanguage] = useState<Language>('ENGLISH');
  const [isJournalOpen, setIsJournalOpen] = useState(false);

  // Current Dream Session State (Preserved across perspective switches)
  const [currentDreamId, setCurrentDreamId] = useState<string>('');
  const [dreamText, setDreamText] = useState('');
  const [emotionalState, setEmotionalState] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');
  const [inputLanguage, setInputLanguage] = useState<Language>('ENGLISH');
  const [responseLanguage, setResponseLanguage] = useState<Language>('ENGLISH');

  // Interpretations cache for the current dream
  const [interpretations, setInterpretations] = useState<{
    psychology?: InterpretationResponse;
    mythology?: InterpretationResponse;
  }>({});

  // Journal Entries
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [isSavedLocally, setIsSavedLocally] = useState(false);

  // Load journal from localStorage on mount
  useEffect(() => {
    setJournalEntries(journalStorage.getEntries());
  }, []);

  // Sync global language with response language
  const handleSelectLanguage = (lang: Language) => {
    setGlobalLanguage(lang);
    setResponseLanguage(lang);
  };

  // Select Mode from Landing or Navbar
  const handleSelectMode = (mode: DreamMode) => {
    setActiveMode(mode);
    if (currentView === 'LANDING') {
      if (mode === 'HINDU_MYTHOLOGY') {
        setCurrentView('MYTHOLOGY_LANDING');
      } else {
        setCurrentView('PSYCHOLOGY_LANDING');
      }
    } else if (currentView === 'INTERPRETATION') {
      handleSwitchPerspective(mode);
    } else {
      if (mode === 'HINDU_MYTHOLOGY') {
        setCurrentView('MYTHOLOGY_LANDING');
      } else {
        setCurrentView('PSYCHOLOGY_LANDING');
      }
    }
  };

  // Submit Dream from Input Form
  const handleSubmitDream = async (params: {
    dreamText: string;
    emotionalState: string;
    additionalContext: string;
    inputLanguage: Language;
    responseLanguage: Language;
  }) => {
    if (!activeMode) return;

    setDreamText(params.dreamText);
    setEmotionalState(params.emotionalState);
    setAdditionalContext(params.additionalContext);
    setInputLanguage(params.inputLanguage);
    setResponseLanguage(params.responseLanguage);

    const newId = 'dream-' + Date.now();
    setCurrentDreamId(newId);
    setInterpretations({});
    setIsSavedLocally(false);

    setCurrentView('LOADING');

    try {
      const response = await interpretDream({
        dreamText: params.dreamText,
        mode: activeMode,
        inputLanguage: params.inputLanguage,
        responseLanguage: params.responseLanguage,
        emotionalState: params.emotionalState,
        additionalContext: params.additionalContext,
      });

      setInterpretations(prev => ({
        ...prev,
        [activeMode === 'PSYCHOLOGY' ? 'psychology' : 'mythology']: response
      }));
      setCurrentView('INTERPRETATION');
    } catch (e) {
      console.error('Failed to interpret dream', e);
      setCurrentView('INPUT');
    }
  };

  // Switch Perspective while preserving the dream context
  const handleSwitchPerspective = async (targetMode: DreamMode) => {
    if (targetMode === activeMode) return;

    setActiveMode(targetMode);

    // If we already have the interpretation cached for this perspective, display immediately!
    const cached = targetMode === 'PSYCHOLOGY' ? interpretations.psychology : interpretations.mythology;
    if (cached) {
      return;
    }

    // Otherwise, generate interpretation for the other perspective with the same dream!
    setCurrentView('LOADING');
    try {
      const response = await interpretDream({
        dreamText,
        mode: targetMode,
        inputLanguage,
        responseLanguage,
        emotionalState,
        additionalContext,
      });

      setInterpretations(prev => ({
        ...prev,
        [targetMode === 'PSYCHOLOGY' ? 'psychology' : 'mythology']: response
      }));
      setCurrentView('INTERPRETATION');
    } catch (e) {
      console.error('Failed to switch perspective', e);
      setCurrentView('INTERPRETATION');
    }
  };

  // Save current dream to local journal
  const handleSaveToJournal = () => {
    if (!dreamText) return;

    const entry: JournalEntry = {
      id: currentDreamId || 'dream-' + Date.now(),
      createdAt: new Date().toISOString(),
      dreamText,
      emotionalState,
      additionalContext,
      inputLanguage,
      responseLanguage,
      interpretations,
    };

    const updated = journalStorage.saveEntry(entry);
    setJournalEntries(updated);
    setIsSavedLocally(true);
  };

  // Reset to Main Landing Horizon
  const handleResetToHome = () => {
    setCurrentView('MAIN_LANDING');
    setActiveMode(null);
  };

  // Start New Dream
  const handleNewDream = () => {
    setDreamText('');
    setEmotionalState('');
    setAdditionalContext('');
    setInterpretations({});
    setIsSavedLocally(false);
    setCurrentView('INPUT');
  };

  // Revisit dream from Journal
  const handleSelectJournalEntry = (entry: JournalEntry, targetMode: DreamMode) => {
    setCurrentDreamId(entry.id);
    setDreamText(entry.dreamText);
    setEmotionalState(entry.emotionalState || '');
    setAdditionalContext(entry.additionalContext || '');
    setInputLanguage(entry.inputLanguage);
    setResponseLanguage(entry.responseLanguage);
    setInterpretations(entry.interpretations);
    setActiveMode(targetMode);
    setIsSavedLocally(true);
    setIsJournalOpen(false);
    setCurrentView('INTERPRETATION');
  };

  const currentInterpretation = activeMode === 'PSYCHOLOGY' 
    ? interpretations.psychology 
    : interpretations.mythology;

  return (
    <div className="min-h-screen bg-[#08080a] text-slate-100 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        mode={activeMode}
        onSelectMode={handleSelectMode}
        language={globalLanguage}
        onSelectLanguage={handleSelectLanguage}
        onOpenJournal={() => setIsJournalOpen(true)}
        journalCount={journalEntries.length}
        onResetToHome={handleResetToHome}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'MAIN_LANDING' && (
          <MainLandingView
            onEnter={() => setCurrentView('LANDING')}
            onSelectMode={(mode) => {
              setActiveMode(mode);
              if (mode === 'HINDU_MYTHOLOGY') {
                setCurrentView('MYTHOLOGY_LANDING');
              } else {
                setCurrentView('PSYCHOLOGY_LANDING');
              }
            }}
            language={globalLanguage}
          />
        )}

        {currentView === 'LANDING' && (
          <LandingView
            onSelectMode={handleSelectMode}
            language={globalLanguage}
            onBackToIntro={() => setCurrentView('MAIN_LANDING')}
          />
        )}

        {currentView === 'PSYCHOLOGY_LANDING' && (
          <PsychologyLandingView
            onEnter={() => setCurrentView('INPUT')}
            onBack={() => {
              setCurrentView('LANDING');
              setActiveMode(null);
            }}
            language={globalLanguage}
          />
        )}

        {currentView === 'MYTHOLOGY_LANDING' && (
          <MythologyLandingView
            onEnter={() => setCurrentView('INPUT')}
            onBack={() => {
              setCurrentView('LANDING');
              setActiveMode(null);
            }}
            language={globalLanguage}
          />
        )}

        {currentView === 'INPUT' && activeMode && (
          <DreamInputView
            mode={activeMode}
            onBack={() => {
              if (activeMode === 'HINDU_MYTHOLOGY') {
                setCurrentView('MYTHOLOGY_LANDING');
              } else {
                setCurrentView('PSYCHOLOGY_LANDING');
              }
            }}
            onSubmit={handleSubmitDream}
            initialDreamText={dreamText}
            initialEmotion={emotionalState}
            initialContext={additionalContext}
            defaultLanguage={globalLanguage}
          />
        )}

        {currentView === 'LOADING' && activeMode && (
          <CinematicLoadingView mode={activeMode} />
        )}

        {currentView === 'INTERPRETATION' && currentInterpretation && activeMode && (
          <InterpretationView
            interpretation={currentInterpretation}
            originalDreamText={dreamText}
            onSwitchMode={handleSwitchPerspective}
            onNewDream={handleNewDream}
            onSaveToJournal={handleSaveToJournal}
            isSavedLocally={isSavedLocally}
            responseLanguage={responseLanguage}
          />
        )}
      </main>

      {/* Private Device-Local Journal Drawer */}
      <JournalDrawer
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        entries={journalEntries}
        onDeleteEntry={(id) => {
          const updated = journalStorage.deleteEntry(id);
          setJournalEntries(updated);
          if (currentDreamId === id) setIsSavedLocally(false);
        }}
        onClearAll={() => {
          journalStorage.clearAll();
          setJournalEntries([]);
          setIsSavedLocally(false);
        }}
        onSelectEntry={handleSelectJournalEntry}
      />

    </div>
  );
}
export default App;
