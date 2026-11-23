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
        `Cognitive Association [Domhoff 2003 & De Gennaro 2019]: The motif of "${followUpQuestion}" acts as a memory consolidation anchor. Neurocognitive continuity indicates that waking emotional concerns are transposed into autobiographical dream imagery during REM sleep, depotentiating affective tension rather than signaling pathology.`
      );
    } else {
      setFollowUpAnswer(
        `Shastric Exposition [Agni Purana 229 & Jagaddeva]: Concerning "${followUpQuestion}", classical treatises consider this an adjunct sign (Anu-nimitta). When witnessed alongside auspicious waters or illumination, it augments the positive omen, pointing towards the purification of prior obstacles.`
      );
    }
  };

  return (
    <div className={`min-h-[calc(100vh-4.5rem)] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-700 ${
      isPsych 
        ? 'bg-[#EEF3F5] text-[#273D4C]' 
        : 'world-mythology-canvas text-slate-100'
    }`}>
      <div className="max-w-5xl mx-auto">
        
        {/* TOP CONTROL & PERSPECTIVE SWITCHING HEADER */}
        <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 pb-6 border-b ${
          isPsych ? 'border-[#C6DCE1]' : 'border-white/10'
        }`}>
          
          {/* Active Realm Stature */}
          <div className="flex items-center gap-3.5">
            <div className={`w-10 h-10 rounded-md flex items-center justify-center border ${
              isPsych 
                ? 'bg-[#FAFDFE] border-[#C6DCE1] text-[#273D4C] shadow-sm' 
                : 'bg-mythology-card border-mythology-copper/40 text-mythology-copperLight shadow-myth-sacred'
            }`}>
              {isPsych ? <Brain className="w-5 h-5 text-[#273D4C]" /> : <Sparkles className="w-5 h-5" />}
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl tracking-tight ${
                isPsych 
                  ? 'font-serif-psych font-normal text-[#273D4C]' 
                  : 'font-serif-myth font-bold text-mythology-parchment'
              }`}>
                {isPsych ? 'Psychological Reflection & Analysis' : 'Sacred Puranic & Vedic Sakuna Shastra'}
              </h1>
            </div>
          </div>

          {/* Perspective Switcher & Save Button */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* The Sovereign Perspective Flip */}
            <button
              onClick={() => onSwitchMode(isPsych ? 'HINDU_MYTHOLOGY' : 'PSYCHOLOGY')}
              className={`flex items-center gap-2 text-xs px-3.5 py-2 rounded-md border transition-colors cursor-pointer ${
                isPsych
                  ? 'bg-white border-[#C6DCE1] text-[#273D4C] hover:bg-[#E7E4E1] font-sans-psych font-medium shadow-sm'
                  : 'bg-psychology-surface border-psychology-border text-psychology-silver hover:bg-psychology-card font-sans'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>{isPsych ? 'Shift to Sacred Mythology' : 'Shift to Neurocognitive Mind'}</span>
            </button>

            {/* Save to Local Device Journal */}
            <button
              onClick={onSaveToJournal}
              disabled={isSavedLocally}
              className={`flex items-center gap-2 text-xs px-3.5 py-2 rounded-md border transition-colors cursor-pointer ${
                isSavedLocally
                  ? isPsych
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-sans-psych font-medium'
                    : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 font-mono'
                  : isPsych
                    ? 'bg-white border-[#C6DCE1] text-[#273D4C] hover:bg-[#E7E4E1] font-sans-psych font-medium shadow-sm'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white font-mono'
              }`}
            >
              {isSavedLocally ? (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Saved Locally</span>
                </>
              ) : (
                <>
                  <Bookmark className={`w-3.5 h-3.5 ${isPsych ? 'text-[#668F9C]' : 'text-mythology-copper'}`} />
                  <span>Save to Device</span>
                </>
              )}
            </button>

            {/* New Dream Trigger */}
            <button
              onClick={onNewDream}
              className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-md border transition-colors cursor-pointer ${
                isPsych
                  ? 'bg-white border-[#C6DCE1] text-[#668F9C] hover:text-[#273D4C] hover:bg-[#E7E4E1] font-sans-psych font-medium shadow-sm'
                  : 'border-white/10 bg-black/40 text-slate-400 hover:text-white hover:bg-white/5 font-mono'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New</span>
            </button>

          </div>
        </div>

        {/* Collapsible Original Dream Excerpt */}
        <div className={`mb-10 rounded-lg p-4 border transition-colors ${
          isPsych
            ? 'bg-white/80 border-[#C6DCE1] text-[#273D4C]'
            : 'border-white/10 bg-black/40 text-slate-300 backdrop-blur-md'
        }`}>
          <button 
            onClick={() => setShowOriginalDream(!showOriginalDream)}
            className={`w-full flex items-center justify-between text-xs hover:opacity-80 cursor-pointer ${
              isPsych ? 'font-sans-psych text-[#668F9C] font-medium' : 'font-mono text-slate-400'
            }`}
          >
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#668F9C]" />
              <span>{isPsych ? 'Your Original Dream Description' : 'Original Dream Submission'}</span>
            </span>
            {showOriginalDream ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showOriginalDream && (
            <p className={`mt-3 text-sm italic pt-3 border-t leading-relaxed ${
              isPsych 
                ? 'font-serif-psych text-[#273D4C] border-[#C6DCE1]' 
                : 'font-serif text-slate-300 border-white/5'
            }`}>
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
            <article className={`p-8 sm:p-12 rounded-xl border shadow-lg transition-colors ${
              isPsych 
                ? 'bg-white border-[#C6DCE1] text-[#273D4C]' 
                : 'bg-mythology-surface/95 border-white/10 manuscript-border text-mythology-parchment shadow-2xl backdrop-blur-xl'
            }`}>

              <div className={`flex items-center justify-between mb-8 pb-3 border-b ${
                isPsych ? 'border-[#C6DCE1]' : 'border-white/10'
              }`}>
                <span className={`text-xs ${
                  isPsych ? 'font-sans-psych font-semibold text-[#668F9C] uppercase tracking-wider' : 'font-mono text-slate-400'
                }`}>
                  {isPsych ? 'The Architecture of Memory • Dream Narrative' : 'Sacred Shastric Interpretation'}
                </span>
                <span className={`text-xs ${
                  isPsych ? 'font-sans-psych text-[#668F9C]' : 'font-mono text-slate-500'
                }`}>
                  {interpretation.aiProviderUsed}
                </span>
              </div>

              {/* Editorial Opening with Drop Cap */}
              <div className={`text-base sm:text-lg leading-relaxed mb-8 ${
                isPsych 
                  ? 'drop-cap-psych font-serif-psych text-[#273D4C]' 
                  : 'drop-cap-myth font-body-myth text-mythology-parchment'
              }`}>
                {interpretation.dreamSummary}
              </div>

              {/* Emotional Themes & Memory Resonance */}
              <div className={`my-8 p-6 rounded-lg border overflow-hidden ${
                isPsych 
                  ? 'bg-[#F2F6F8] border-[#C6DCE1] text-[#273D4C]' 
                  : 'bg-black/40 border-mythology-copper/25 text-mythology-copperLight'
              }`}>
                <Quote className={`w-5 h-5 mb-2 ${isPsych ? 'text-[#668F9C]' : 'opacity-50'}`} />
                <p className={`text-lg sm:text-xl italic leading-snug ${
                  isPsych ? 'font-serif-psych text-[#273D4C]' : 'font-body-myth'
                }`}>
                  {interpretation.emotionalLandscape || interpretation.culturalContext || 'The dream functions as an affective simulation, reprocessing unresolved waking experiences.'}
                </p>
              </div>

              {/* Deconstructed Symbols & Psychological Mechanisms */}
              <div className="mt-10">
                <h3 className={`text-xs uppercase tracking-wider mb-5 flex items-center gap-2 ${
                  isPsych 
                    ? 'font-sans-psych font-semibold text-[#273D4C]' 
                    : 'font-mono text-slate-400'
                }`}>
                  <Layers className={`w-3.5 h-3.5 ${isPsych ? 'text-[#668F9C]' : 'text-global-astral'}`} />
                  <span>{isPsych ? 'Symbolic Associations & Memory Traces' : 'Deconstructed Symbols & Underlying Mechanisms'}</span>
                </h3>

                <div className="space-y-4">
                  {interpretation.symbols.map((sym, i) => (
                    <div 
                      key={i}
                      className={`p-5 rounded-lg border transition-colors ${
                        isPsych
                          ? 'bg-[#FAFDFE] border-[#C6DCE1] hover:border-[#668F9C]'
                          : 'p-5 rounded-lg border border-white/10 bg-black/40 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`text-lg ${
                          isPsych ? 'font-serif-psych font-normal text-[#273D4C]' : 'font-serif-myth text-base font-bold text-mythology-parchment'
                        }`}>
                          {sym.symbol}
                        </h4>
                        {(sym.traditionalSignificance || sym.psychologicalMechanism) && (
                          <span className={`text-xs ${
                            isPsych ? 'font-sans-psych text-[#668F9C] font-medium' : 'font-mono text-slate-400'
                          }`}>
                            {sym.traditionalSignificance || sym.psychologicalMechanism}
                          </span>
                        )}
                      </div>
                      <p className={`text-xs sm:text-sm leading-relaxed ${
                        isPsych ? 'text-[#273D4C]/85 font-sans-psych' : 'text-mythology-parchment/90 font-body-myth'
                      }`}>
                        {sym.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Theoretical or Scriptural Verses */}
              {interpretation.theoreticalExplanations && (
                <div className="mt-10">
                  <h3 className={`text-xs uppercase tracking-wider mb-5 flex items-center gap-2 ${
                    isPsych ? 'font-sans-psych font-semibold text-[#273D4C]' : 'font-mono text-slate-400'
                  }`}>
                    <Brain className={`w-3.5 h-3.5 ${isPsych ? 'text-[#668F9C]' : 'text-psychology-sage'}`} />
                    <span>Scientific & Neurocognitive Frameworks</span>
                  </h3>
                  <div className="space-y-4">
                    {interpretation.theoreticalExplanations.map((theory, idx) => (
                      <div 
                        key={idx} 
                        className={`p-5 rounded-lg border text-xs leading-relaxed ${
                          isPsych
                            ? 'bg-[#FAFDFE] border-[#C6DCE1]'
                            : 'border-psychology-plumBorder bg-psychology-card'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-sm ${
                            isPsych ? 'font-serif-psych font-bold text-[#273D4C]' : 'font-serif-psych font-bold text-psychology-sage'
                          }`}>
                            {theory.school}
                          </span>
                          <span className={`text-xs ${
                            isPsych ? 'font-sans-psych text-[#668F9C]' : 'font-mono text-slate-400'
                          }`}>
                            {theory.empiricalStatus}
                          </span>
                        </div>
                        <p className={isPsych ? 'text-[#273D4C]/85 font-sans-psych' : 'text-slate-300 font-sans'}>
                          {theory.theory}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {interpretation.scripturalPassages && (
                <div className="mt-10">
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
            <div className={`rounded-xl p-6 border ${
              isPsych ? 'bg-white border-[#C6DCE1] shadow-sm' : 'border-white/10 bg-black/40 backdrop-blur-md'
            }`}>
              <div className={`flex items-center gap-2 text-xs uppercase tracking-wider mb-4 pb-2 border-b ${
                isPsych 
                  ? 'font-sans-psych font-semibold text-[#273D4C] border-[#C6DCE1]' 
                  : 'font-mono text-slate-300 border-white/5'
              }`}>
                <BookOpen className={`w-4 h-4 ${isPsych ? 'text-[#668F9C]' : 'text-mythology-copper'}`} />
                <span>{isPsych ? 'Verified Research Citations' : 'Retrieved Academic Sources'}</span>
              </div>

              <div className="space-y-3">
                {interpretation.citations.map((cite, index) => {
                  const isExpanded = expandedCitation === index;
                  return (
                    <div 
                      key={index}
                      className={`rounded-lg border overflow-hidden text-xs transition-all ${
                        isPsych ? 'border-[#C6DCE1] bg-[#FAFDFE]' : 'border-white/10 bg-black/40'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedCitation(isExpanded ? null : index)}
                        className={`w-full p-3.5 flex items-start justify-between text-left transition-colors cursor-pointer ${
                          isPsych ? 'hover:bg-[#F2F6F8]' : 'hover:bg-white/5'
                        }`}
                      >
                        <div>
                          <span className={`font-semibold text-xs block leading-snug ${
                            isPsych ? 'font-serif-psych text-[#273D4C] text-sm' : 'font-serif text-white'
                          }`}>
                            {cite.sourceTitle}
                          </span>
                          <span className={`text-[11px] mt-0.5 block ${
                            isPsych ? 'font-sans-psych text-[#668F9C]' : 'font-mono text-slate-400'
                          }`}>
                            {cite.author} • {cite.chapter}
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className={`w-4 h-4 shrink-0 mt-0.5 ${isPsych ? 'text-[#668F9C]' : 'text-slate-400'}`} />
                        ) : (
                          <ChevronDown className={`w-4 h-4 shrink-0 mt-0.5 ${isPsych ? 'text-[#668F9C]' : 'text-slate-400'}`} />
                        )}
                      </button>
                      
                      {isExpanded && (
                        <div className={`p-3.5 border-t space-y-2 ${
                          isPsych ? 'border-[#C6DCE1] bg-[#F2F6F8]' : 'border-white/5 bg-black/60 font-sans'
                        }`}>
                          <div className={`p-2.5 rounded-md border leading-relaxed text-[11px] italic ${
                            isPsych 
                              ? 'bg-white border-[#C6DCE1] text-[#273D4C] font-serif-psych' 
                              : 'bg-white/5 border-white/5 text-slate-300'
                          }`}>
                            "{cite.excerpt}"
                          </div>
                          <div className={`text-[11px] ${
                            isPsych ? 'font-sans-psych text-[#668F9C]' : 'font-mono text-mythology-copperLight'
                          }`}>
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
            <div className={`rounded-xl p-6 border ${
              isPsych ? 'bg-white border-[#C6DCE1] shadow-sm' : 'border-white/10 bg-black/30 backdrop-blur-md'
            }`}>
              <div className={`flex items-center gap-2 text-xs uppercase tracking-wider mb-4 pb-2 border-b ${
                isPsych 
                  ? 'font-sans-psych font-semibold text-[#273D4C] border-[#C6DCE1]' 
                  : 'font-mono text-slate-300 border-white/5'
              }`}>
                <HelpCircle className={`w-4 h-4 ${isPsych ? 'text-[#668F9C]' : 'text-global-astral'}`} />
                <span>Questions for Personal Reflection</span>
              </div>
              <ul className={`space-y-3 text-xs leading-relaxed ${
                isPsych ? 'font-sans-psych text-[#273D4C]/85' : 'text-slate-300 font-sans'
              }`}>
                {interpretation.reflectionQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className={`font-bold shrink-0 ${
                      isPsych ? 'text-[#668F9C]' : 'text-mythology-copperLight font-mono'
                    }`}>
                      {idx + 1}.
                    </span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Safety & Epistemic Guardrail Card */}
            <div className={`rounded-xl p-6 border ${
              isPsych ? 'bg-[#F2F6F8] border-[#C6DCE1]' : 'border-white/10 bg-black/30 backdrop-blur-md'
            }`}>
              <div className={`flex items-center gap-2 text-xs uppercase tracking-wider mb-3 ${
                isPsych ? 'font-sans-psych font-semibold text-[#273D4C]' : 'font-mono text-amber-400/90'
              }`}>
                <AlertTriangle className="w-4 h-4 text-[#668F9C]" />
                <span>Epistemic Guardrails</span>
              </div>
              <p className={`text-[11px] leading-relaxed mb-3 ${
                isPsych ? 'font-sans-psych text-[#273D4C]/75' : 'text-slate-400 font-sans'
              }`}>
                {interpretation.uncertainties || 
                  'All dream analyses are reflective frameworks for contemplation. DreamLens does not diagnose mental health conditions or present dream symbols as deterministic predictions.'}
              </p>
              <div className={`text-xs italic pt-2 border-t ${
                isPsych ? 'font-sans-psych text-[#668F9C] border-[#C6DCE1]' : 'font-serif text-slate-400 border-white/5'
              }`}>
                Contemplative reflection • Non-clinical
              </div>
            </div>

          </div>

        </div>

        {/* =================================================================== */}
        {/* INTERACTIVE SCHOLAR FOLLOW-UP CONSULTATION */}
        {/* =================================================================== */}
        <div className={`p-8 rounded-xl border mb-12 ${
          isPsych
            ? 'bg-white border-[#C6DCE1] shadow-md'
            : 'border-white/10 bg-black/40 backdrop-blur-xl'
        }`}>
          <div className={`flex items-center justify-between mb-4 pb-3 border-b ${
            isPsych ? 'border-[#C6DCE1]' : 'border-white/5'
          }`}>
            <div>
              <h3 className={`text-sm uppercase tracking-wider ${
                isPsych ? 'font-sans-psych font-semibold text-[#273D4C]' : 'font-mono text-white'
              }`}>
                {isPsych ? 'Explore Further Reflections' : 'Consult Shastric Commentaries'}
              </h3>
              <p className={`text-xs mt-0.5 ${
                isPsych ? 'font-sans-psych text-[#668F9C]' : 'font-sans text-slate-400'
              }`}>
                {isPsych
                  ? 'Ask a question regarding a specific emotion, memory, or theoretical concept from this analysis.'
                  : 'Ask a grounded follow-up question regarding a specific detail, emotion, or verse from this interpretation.'}
              </p>
            </div>
            <ArrowUpRight className={`w-4 h-4 ${isPsych ? 'text-[#668F9C]' : 'text-slate-500'}`} />
          </div>

          <form onSubmit={handleFollowUp} className="flex gap-3">
            <input
              type="text"
              value={followUpQuestion}
              onChange={(e) => setFollowUpQuestion(e.target.value)}
              placeholder={isPsych 
                ? "e.g., How does neurocognitive continuity explain why this memory felt so emotionally vivid?" 
                : "e.g., What remedy does Agni Purana suggest if the dream caused waking anxiety?"}
              className={`flex-1 rounded-md px-4 py-2.5 text-xs focus:outline-none ${
                isPsych
                  ? 'bg-[#FAFDFE] border border-[#C6DCE1] text-[#273D4C] placeholder:text-[#668F9C]/60 focus:border-[#273D4C]'
                  : 'bg-black/40 border border-white/10 text-white placeholder:text-slate-600 focus:border-white/30'
              }`}
            />
            <button
              type="submit"
              className={`px-5 py-2.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                isPsych
                  ? 'bg-[#273D4C] hover:bg-[#1E2E3A] text-[#E7E4E1] font-sans-psych font-semibold shadow-sm'
                  : 'border border-white/10 bg-white/10 hover:bg-white/15 text-white font-sans'
              }`}
            >
              Consult
            </button>
          </form>

          {followUpAnswer && (
            <div className={`mt-5 p-5 rounded-md border text-xs leading-relaxed ${
              isPsych
                ? 'bg-[#F2F6F8] border-[#C6DCE1] text-[#273D4C] font-sans-psych'
                : 'bg-white/5 border-white/10 text-slate-200 font-sans'
            }`}>
              <span className={`block mb-1.5 font-semibold ${
                isPsych ? 'text-[#273D4C]' : 'font-mono text-mythology-copperLight'
              }`}>
                {isPsych ? 'Neurocognitive & Memory Commentary:' : 'Shastric Exposition:'}
              </span>
              {followUpAnswer}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
