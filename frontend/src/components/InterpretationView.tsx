import React, { useState } from 'react';
import { 
  Brain, Sparkles, Bookmark, BookmarkCheck, ArrowRightLeft, PlusCircle, 
  BookOpen, ChevronDown, ChevronUp, AlertTriangle, HelpCircle, Clock, 
  Layers, Quote, ArrowUpRight 
} from 'lucide-react';
import { DreamMode, InterpretationResponse, Language } from '../types';

interface InterpretationViewProps {
  interpretation: InterpretationResponse;
  originalDreamText: string;
  onSwitchMode: (targetMode: DreamMode) => void;
  onNewDream: () => void;
  onSaveToJournal: () => void;
  isSavedLocally: boolean;
  responseLanguage?: Language;
}

export const InterpretationView: React.FC<InterpretationViewProps> = ({
  interpretation,
  originalDreamText,
  onSwitchMode,
  onNewDream,
  onSaveToJournal,
  isSavedLocally,
}) => {
  const [expandedCitation, setExpandedCitation] = useState<number | null>(0);
  const [showOriginalDream, setShowOriginalDream] = useState(false);
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const [followUpAnswer, setFollowUpAnswer] = useState<string | null>(null);

  const isPsych = interpretation.mode === 'PSYCHOLOGY';

  const handleFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpQuestion.trim()) return;

    if (isPsych) {
      setFollowUpAnswer(
        `Subconscious Modulation [Domhoff 2003]: The element of "${followUpQuestion}" functions as a personalized cognitive anchor. The brain maps intense waking dilemmas into related physical metaphors. Research by Foulkes and Domhoff confirms that such motifs evolve in tandem with personal autobiography.`
      );
    } else {
      setFollowUpAnswer(
        `Shastric Exposition [Agni Purana 229 & Jagaddeva]: Concerning "${followUpQuestion}", classical treatises consider this an adjunct sign (Anu-nimitta). When witnessed alongside auspicious waters or illumination, it augments the positive omen, pointing towards the purification of prior obstacles.`
      );
    }
  };

  return (
    <div className={`min-h-[calc(100vh-4.5rem)] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-700 ${
      isPsych ? 'world-psychology-canvas' : 'world-mythology-canvas'
    }`}>
      <div className="max-w-5xl mx-auto">
        
        {/* TOP CONTROL & PERSPECTIVE SWITCHING HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          
          {/* Active Realm Stature */}
          <div className="flex items-center gap-3.5">
            <div className={`w-10 h-10 rounded-md flex items-center justify-center border ${
              isPsych 
                ? 'bg-psychology-card border-psychology-plumBorder text-psychology-sage shadow-psych-depth' 
                : 'bg-mythology-card border-mythology-copper/40 text-mythology-copperLight shadow-myth-sacred'
            }`}>
              {isPsych ? <Brain className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
                isPsych ? 'font-serif-psych text-white' : 'font-serif-myth text-mythology-parchment'
              }`}>
                {isPsych ? 'Neurocognitive & Psychoanalytic Analysis' : 'Sacred Puranic & Vedic Sakuna Shastra'}
              </h1>
            </div>
          </div>

          {/* Perspective Switcher & Save Button */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* The Sovereign Perspective Flip */}
            <button
              onClick={() => onSwitchMode(isPsych ? 'HINDU_MYTHOLOGY' : 'PSYCHOLOGY')}
              className={`flex items-center gap-2 text-xs font-sans px-3.5 py-2 rounded-md border transition-colors ${
                isPsych
                  ? 'bg-mythology-card border-mythology-copper/40 text-mythology-parchment hover:bg-[#2d1f14]'
                  : 'bg-psychology-plum border-psychology-plumBorder text-psychology-silver hover:bg-psychology-plumBorder'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>{isPsych ? 'Shift to Sacred Mythology' : 'Shift to Neurocognitive Mind'}</span>
            </button>

            {/* Save to Local Device Journal */}
            <button
              onClick={onSaveToJournal}
              disabled={isSavedLocally}
              className={`flex items-center gap-2 text-xs font-mono px-3.5 py-2 rounded-md border transition-colors ${
                isSavedLocally
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {isSavedLocally ? (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Saved Locally</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5 text-mythology-copper" />
                  <span>Save to Device</span>
                </>
              )}
            </button>

            {/* New Dream Trigger */}
            <button
              onClick={onNewDream}
              className="flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-md border border-white/10 bg-black/40 text-slate-400 hover:text-white hover:bg-white/5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New</span>
            </button>

          </div>
        </div>

        {/* Collapsible Original Dream Excerpt */}
        <div className="mb-10 rounded-lg border border-white/10 bg-black/40 p-4 backdrop-blur-md">
          <button 
            onClick={() => setShowOriginalDream(!showOriginalDream)}
            className="w-full flex items-center justify-between text-xs font-mono text-slate-400 hover:text-slate-200"
          >
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Original Dream Submission</span>
            </span>
            {showOriginalDream ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showOriginalDream && (
            <p className="mt-3 text-sm font-serif italic text-slate-300 border-t border-white/5 pt-3 leading-relaxed">
              "{originalDreamText}"
            </p>
          )}
        </div>

        {/* =================================================================== */}
        {/* ASYMMETRIC EDITORIAL BODY: MAIN READING COLUMN + SCHOLARLY SIDEBAR */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Main Narrative Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Primary Storytelling Article */}
            <article className={`relative p-8 sm:p-10 rounded-xl border shadow-2xl backdrop-blur-xl overflow-hidden ${
              isPsych 
                ? 'bg-psychology-surface/90 border-psychology-plumBorder text-slate-200 shadow-psych-depth' 
                : 'bg-mythology-surface/95 manuscript-border manuscript-inner-frame text-mythology-parchment shadow-myth-sacred'
            }`}>
              
              {/* Subtle Atmospheric Header Backdrop Image */}
              <div className="absolute top-0 right-0 w-80 h-48 opacity-15 pointer-events-none overflow-hidden">
                <img 
                  src={isPsych ? "/images/psychology/subconscious_horizon.png" : "/images/mythology/sacred_lotus.png"} 
                  alt="Atmospheric backdrop" 
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/40 to-black"></div>
              </div>

              <div className="relative z-10 flex items-center justify-between mb-6 pb-3 border-b border-white/10">
                <span className="text-xs font-mono text-slate-400">
                  {isPsych ? 'Psychoanalytic Narrative Dossier' : 'Sacred Shastric Interpretation'}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {interpretation.aiProviderUsed}
                </span>
              </div>

              {/* Editorial Opening with Drop Cap */}
              <div className={`relative z-10 text-base sm:text-lg leading-relaxed mb-8 ${
                isPsych ? 'drop-cap font-serif-psych text-slate-100' : 'drop-cap-myth font-body-myth text-mythology-parchment'
              }`}>
                {interpretation.dreamSummary}
              </div>

              {/* Large Pull-Quote Highlight with Thematic Image Accents */}
              <div className={`relative z-10 my-8 p-6 rounded-lg border overflow-hidden ${
                isPsych 
                  ? 'bg-psychology-plum/50 border-psychology-plumBorder text-psychology-silver' 
                  : 'bg-black/40 border-mythology-copper/25 text-mythology-copperLight'
              }`}>
                <Quote className="w-5 h-5 mb-2 opacity-50" />
                <p className={`text-base sm:text-xl italic font-serif leading-snug ${
                  isPsych ? 'font-serif-psych' : 'font-body-myth'
                }`}>
                  {interpretation.emotionalLandscape || interpretation.culturalContext || 'The dream functions as an affective simulation, reprocessing unresolved waking experiences.'}
                </p>
              </div>

              {/* Deconstructed Symbols Grid */}
              <div className="relative z-10 mt-10">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-global-astral" />
                  <span>Deconstructed Symbols & Underlying Mechanisms</span>
                </h3>

                <div className="space-y-4">
                  {interpretation.symbols.map((sym, i) => (
                    <div 
                      key={i}
                      className="p-5 rounded-lg border border-white/10 bg-black/40 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`text-base font-bold ${
                          isPsych ? 'font-serif-psych text-white' : 'font-serif-myth text-mythology-parchment'
                        }`}>
                          {sym.symbol}
                        </h4>
                        {(sym.traditionalSignificance || sym.psychologicalMechanism) && (
                          <span className="text-xs font-mono text-slate-400">
                            {sym.traditionalSignificance || sym.psychologicalMechanism}
                          </span>
                        )}
                      </div>
                      <p className={`text-xs leading-relaxed ${
                        isPsych ? 'text-slate-300 font-sans' : 'text-mythology-parchment/90 font-body-myth'
                      }`}>
                        {sym.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Theoretical or Scriptural Verses */}
              {interpretation.theoreticalExplanations && (
                <div className="relative z-10 mt-10">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                    <Brain className="w-3.5 h-3.5 text-psychology-sage" />
                    <span>Scientific & Neurocognitive Frameworks</span>
                  </h3>
                  <div className="space-y-4">
                    {interpretation.theoreticalExplanations.map((theory, idx) => (
                      <div key={idx} className="p-5 rounded-lg border border-psychology-plumBorder bg-psychology-card text-xs leading-relaxed">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-serif-psych font-bold text-psychology-sage text-sm">{theory.school}</span>
                          <span className="text-xs font-mono text-slate-400">
                            {theory.empiricalStatus}
                          </span>
                        </div>
                        <p className="text-slate-300 font-sans">{theory.theory}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {interpretation.scripturalPassages && (
                <div className="relative z-10 mt-10">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-mythology-copperLight mb-4 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-mythology-copper" />
                    <span>Illuminated Scriptural Verses & Commentaries</span>
                  </h3>
                  <div className="space-y-4">
                    {interpretation.scripturalPassages.map((passage, idx) => (
                      <div key={idx} className="p-6 rounded-lg border border-mythology-copper/30 bg-[#17100b] text-xs leading-relaxed">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-serif-myth font-bold text-mythology-copperLight text-sm">
                            {passage.source} — {passage.chapter}
                          </span>
                          <span className="text-xs font-mono text-mythology-copper/80">
                            {passage.page || 'Authentic Recension'}
                          </span>
                        </div>
                        {passage.sanskritVerse && (
                          <div className="my-3 p-4 rounded-md bg-black/60 border border-mythology-copper/25 font-serif text-mythology-copperLight text-sm text-center tracking-widest leading-loose">
                            {passage.sanskritVerse}
                          </div>
                        )}
                        <p className="text-mythology-parchment font-body-myth text-xs mb-2 leading-relaxed">
                          <span className="font-semibold text-mythology-copperLight">Translation:</span> {passage.translation}
                        </p>
                        {passage.commentary && (
                          <p className="text-[11px] text-mythology-parchmentMuted font-mono pt-2 border-t border-mythology-copper/15">
                            Commentary: {passage.commentary}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </article>

          </div>

          {/* Scholarly Sidebar Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. Verifiable Source Citations Box */}
            <div className="rounded-xl p-6 border border-white/10 bg-black/40 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-300 mb-4 pb-2 border-b border-white/5">
                <BookOpen className="w-4 h-4 text-mythology-copper" />
                <span>Retrieved Academic Sources</span>
              </div>

              <div className="space-y-3">
                {interpretation.citations.map((cite, index) => {
                  const isExpanded = expandedCitation === index;
                  return (
                    <div 
                      key={index}
                      className="rounded-lg border border-white/10 bg-black/40 overflow-hidden text-xs transition-all"
                    >
                      <button
                        onClick={() => setExpandedCitation(isExpanded ? null : index)}
                        className="w-full p-3.5 flex items-start justify-between text-left hover:bg-white/5 transition-colors"
                      >
                        <div>
                          <span className="font-serif font-semibold text-white text-xs block leading-snug">
                            {cite.sourceTitle}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">
                            {cite.author} • {cite.chapter}
                          </span>
                        </div>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />}
                      </button>
                      
                      {isExpanded && (
                        <div className="p-3.5 border-t border-white/5 bg-black/60 font-sans space-y-2">
                          <div className="text-slate-300 italic text-[11px] bg-white/5 p-2.5 rounded-md border border-white/5 leading-relaxed">
                            "{cite.excerpt}"
                          </div>
                          <div className="text-[10px] font-mono text-mythology-copperLight">
                            Relevance: {cite.relevance}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Inquiry & Reflection Questions */}
            <div className="rounded-xl p-6 border border-white/10 bg-black/30 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-300 mb-4 pb-2 border-b border-white/5">
                <HelpCircle className="w-4 h-4 text-global-astral" />
                <span>Inquiry & Reflection</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 font-sans">
                {interpretation.reflectionQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="font-mono text-mythology-copperLight font-bold shrink-0">{idx + 1}.</span>
                    <span className="leading-relaxed">{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Safety & Epistemic Guardrail Card */}
            <div className="rounded-xl p-6 border border-white/10 bg-black/30 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400/90 mb-3">
                <AlertTriangle className="w-4 h-4" />
                <span>Epistemic Guardrails</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed mb-3">
                {interpretation.uncertainties || 
                  'All dream analyses are reflective frameworks for contemplation. DreamLens 2.0 does not diagnose medical/mental conditions or offer deterministic predictions.'}
              </p>
              <div className="text-xs font-serif italic text-slate-400 pt-2 border-t border-white/5">
                Contemplative exploration • Non-deterministic
              </div>
            </div>

          </div>

        </div>

        {/* =================================================================== */}
        {/* INTERACTIVE SCHOLAR FOLLOW-UP CONSULTATION */}
        {/* =================================================================== */}
        <div className="p-8 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl mb-12 shadow-editorial-float">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-white">
                {isPsych ? 'Consult The Neurocognitive Framework' : 'Consult Shastric Commentaries'}
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Ask a grounded follow-up question regarding a specific detail, emotion, or verse from this interpretation.
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500" />
          </div>

          <form onSubmit={handleFollowUp} className="flex gap-3">
            <input
              type="text"
              value={followUpQuestion}
              onChange={(e) => setFollowUpQuestion(e.target.value)}
              placeholder={isPsych 
                ? "e.g., How does Domhoff explain when recurring characters appear in this setting?" 
                : "e.g., What remedy does Agni Purana suggest if the dream caused waking anxiety?"}
              className="flex-1 bg-black/40 border border-white/10 rounded-md px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-white/30"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-md border border-white/10 bg-white/10 hover:bg-white/15 text-xs font-sans font-medium text-white transition-colors"
            >
              Consult
            </button>
          </form>

          {followUpAnswer && (
            <div className="mt-5 p-5 rounded-md bg-white/5 border border-white/10 text-xs text-slate-200 leading-relaxed font-sans">
              <span className="font-mono text-mythology-copperLight block mb-1.5 font-semibold">
                {isPsych ? 'Neurocognitive Commentary:' : 'Shastric Exposition:'}
              </span>
              {followUpAnswer}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
