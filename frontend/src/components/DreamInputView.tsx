import React, { useState } from 'react';
import { ArrowLeft, Send, Moon, Sun, AlertCircle } from 'lucide-react';
import { DreamMode, Language } from '../types';
import { PraharaClock } from './visuals/PraharaClock';

interface DreamInputViewProps {
  mode: DreamMode;
  onBack: () => void;
  onSubmit: (params: {
    dreamText: string;
    emotionalState: string;
    additionalContext: string;
    inputLanguage: Language;
    responseLanguage: Language;
  }) => void;
  initialDreamText?: string;
  initialEmotion?: string;
  initialContext?: string;
  defaultLanguage: Language;
}

export const DreamInputView: React.FC<DreamInputViewProps> = ({
  mode,
  onBack,
  onSubmit,
  initialDreamText = '',
  initialEmotion = '',
  initialContext = '',
  defaultLanguage,
}) => {
  const [dreamText, setDreamText] = useState(initialDreamText);
  const [emotionalState, setEmotionalState] = useState(initialEmotion);
  const [additionalContext, setAdditionalContext] = useState(initialContext);
  const [inputLanguage, setInputLanguage] = useState<Language>(defaultLanguage);
  const [responseLanguage, setResponseLanguage] = useState<Language>(defaultLanguage);
  const [selectedPrahara, setSelectedPrahara] = useState<number>(4);
  const [error, setError] = useState('');

  const isMyth = mode === 'HINDU_MYTHOLOGY';
  const isPsych = mode === 'PSYCHOLOGY';

  // Natural human language for Psychology, sacred Sanskrit omens for Mythology
  const emotionPills = isPsych
    ? [
        'Disorienting or strange',
        'Anxious or uneasy',
        'Peaceful, still, or quiet',
        'Melancholic or grieving',
        'Weightless or free (flying)',
        'Familiar, as if remembered',
        'Frustrating or unresolved',
      ]
    : [
        'Auspicious Wonder (Prasanna)',
        'Spiritual Reverence (Bhakti)',
        'Distressing Nightmare (Duhsvapna)',
        'Celestial Guidance (Daiva)',
        'Bodily Unease / Restlessness',
        'Early Dawn Revelation (Brahma Muhurta)',
      ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dreamText.trim() || dreamText.trim().length < 10) {
      setError('Please provide at least a few words describing your dream (minimum 10 characters).');
      return;
    }
    setError('');

    const contextWithPrahara = isMyth 
      ? `${additionalContext ? additionalContext + ' • ' : ''}Dream Timing: Prahara Watch ${selectedPrahara}`
      : additionalContext;

    onSubmit({
      dreamText: dreamText.trim(),
      emotionalState,
      additionalContext: contextWithPrahara,
      inputLanguage,
      responseLanguage,
    });
  };

  return (
    <div 
      className={`min-h-[calc(100vh-4.5rem)] py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-700 relative ${
        isPsych
          ? 'bg-[#EEF3F5] text-[#273D4C]'
          : 'bg-cover bg-center bg-fixed bg-no-repeat text-slate-100'
      }`}
      style={isMyth ? {
        backgroundImage: "url('/images/mythology/cosmic_lotus_dreamscape.png')"
      } : undefined}
    >
      {/* Mythology Luminous Dark Overlay (Preserved for Hindu Mythology) */}
      {isMyth && (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/75 via-black/85 to-[#140c07]/95"></div>
      )}

      {/* Psychology Architectural Atmosphere: Soft, light mist canvas with subtle top tone */}
      {isPsych && (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#E7E4E1]/50 via-transparent to-[#EEF3F5]"></div>
      )}

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Navigation & Realm Indicator */}
        <div className={`flex items-center justify-between mb-8 pb-4 border-b ${
          isPsych ? 'border-[#C6DCE1]' : 'border-white/10'
        }`}>
          <button
            onClick={onBack}
            className={`flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer ${
              isPsych 
                ? 'font-sans-psych text-[#668F9C] hover:text-[#273D4C]' 
                : 'font-mono text-slate-400 hover:text-white'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isMyth ? 'Return to Sacred Portal' : 'Return to Psychology Realm'}</span>
          </button>

          <div className={`text-xs ${
            isPsych ? 'font-sans-psych text-[#668F9C]' : 'font-serif text-slate-400'
          }`}>
            Realm: <span className={`font-semibold ${
              isPsych ? 'text-[#273D4C]' : 'text-white'
            }`}>{isPsych ? 'Psychology' : 'Sacred Mythology'}</span>
          </div>
        </div>

        {/* Header Storytelling */}
        {isPsych ? (
          // Psychology Realm: Lighter, spacious, natural editorial invitation
          <div className="mb-10 text-left">
            <h1 className="text-3xl sm:text-5xl font-serif-psych font-normal text-[#273D4C] tracking-tight mb-3">
              What stayed with you when you woke?
            </h1>
            <p className="text-base sm:text-lg font-sans-psych text-[#273D4C]/80 leading-relaxed max-w-2xl">
              Describe what you remember. A feeling, a person, a place, or even a single image is enough to begin.
            </p>
          </div>
        ) : (
          // Mythology Realm: Preserved ancient temple manuscript banner
          <div className="relative mb-8 p-6 sm:p-8 rounded-xl border border-white/10 overflow-hidden bg-black/50 backdrop-blur-md">
            <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
              <img 
                src="/images/mythology/cosmic_lotus_dreamscape.png" 
                alt="Realm visual atmosphere" 
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#170e08] via-[#170e08]/90 to-transparent"></div>
            </div>

            <div className="relative z-10">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight font-serif-myth text-mythology-parchment">
                Whisper Your Vision to the Shastras
              </h1>
              <p className="text-sm text-slate-300 font-sans leading-relaxed max-w-xl">
                Record the omens and sacred motifs of your dream. Signs of lamps, rivers, heights, or celestial bodies will be retrieved from Agni Purana Chapter 229.
              </p>
            </div>
          </div>
        )}

        {/* Writing Sanctuary Form */}
        <form onSubmit={handleSubmit} className={`rounded-xl p-6 sm:p-10 transition-all ${
          isPsych 
            ? 'bg-white/95 border border-[#C6DCE1] shadow-xl shadow-[#273D4C]/5 text-[#273D4C]' 
            : 'bg-[#180f09]/90 border border-white/10 manuscript-border shadow-2xl backdrop-blur-xl text-slate-100'
        }`}>
          
          {/* Main Dream Description Textarea */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <label className={`text-xs uppercase tracking-wider ${
                isPsych 
                  ? 'font-sans-psych font-semibold text-[#273D4C]' 
                  : 'font-mono text-slate-300'
              }`}>
                {isPsych ? 'The Dream Narrative' : 'What did you experience in sleep?'} <span className="text-amber-500">*</span>
              </label>
              <span className={`text-[11px] ${
                isPsych ? 'font-sans-psych text-[#668F9C]' : 'font-mono text-slate-500'
              }`}>
                {isPsych ? 'Private & device-local' : 'Raw dream narrative'}
              </span>
            </div>

            <textarea
              value={dreamText}
              onChange={(e) => setDreamText(e.target.value)}
              placeholder={isPsych 
                ? "Describe what you remember... (e.g. I was walking through an unfamiliar city where all the bridges led back to my childhood home. The sky was overcast, and people passed by without speaking...)" 
                : "Recount the vision and sacred signs... (e.g. In the quiet hours before dawn, I climbed the steps of a mountain temple while carrying an unlit brass deepam, and suddenly a white cow with golden horns looked towards the rising sun...)"}
              rows={7}
              className={`w-full rounded-lg p-5 text-base sm:text-lg focus:outline-none transition-colors resize-y leading-relaxed ${
                isPsych 
                  ? 'bg-[#FAFDFE] border border-[#668F9C]/35 font-serif-psych text-[#273D4C] placeholder:font-sans-psych placeholder:text-[#668F9C]/60 focus:border-[#273D4C] focus:ring-1 focus:ring-[#273D4C]/20 shadow-inner' 
                  : 'bg-black/40 border border-mythology-copper/25 font-body-myth text-mythology-parchment placeholder:font-sans placeholder:text-stone-600 focus:border-mythology-copperLight'
              }`}
            />
            {error && (
              <div className="flex items-center gap-2 text-rose-600 text-xs mt-2.5 font-sans">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Emotional Context Controls */}
          <div className="mb-8">
            <label className={`block text-xs uppercase tracking-wider mb-2.5 ${
              isPsych 
                ? 'font-sans-psych font-semibold text-[#273D4C]' 
                : 'font-mono text-slate-300'
            }`}>
              {isPsych ? 'How did the dream feel?' : 'Predominant Affective / Emotional Tone (Optional)'}
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {emotionPills.map((pill) => (
                <button
                  type="button"
                  key={pill}
                  onClick={() => setEmotionalState(emotionalState === pill ? '' : pill)}
                  className={`text-xs px-3.5 py-2 rounded-md border transition-all cursor-pointer ${
                    isPsych
                      ? emotionalState === pill
                        ? 'bg-[#273D4C] text-[#E7E4E1] border-[#273D4C] shadow-sm font-medium'
                        : 'bg-[#F2F6F8] border-[#C6DCE1] text-[#273D4C] hover:bg-[#E7E4E1]'
                      : emotionalState === pill
                        ? 'bg-mythology-card text-mythology-goldBright border-mythology-gold'
                        : 'bg-black/30 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  {pill}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={emotionalState}
              onChange={(e) => setEmotionalState(e.target.value)}
              placeholder={isPsych ? "Or describe the feeling in your own words..." : "Or enter custom emotional nuance..."}
              className={`w-full rounded-md px-4 py-2.5 text-xs focus:outline-none ${
                isPsych
                  ? 'bg-[#F7FAFB] border border-[#C6DCE1] text-[#273D4C] placeholder:text-[#668F9C]/70 focus:border-[#273D4C]'
                  : 'bg-black/30 border border-white/10 text-white placeholder:text-slate-600 focus:border-white/30'
              }`}
            />
          </div>

          {/* Mythological Prahara Clock (Only for Hindu Mythology mode) */}
          {isMyth && (
            <div className="mb-8">
              <PraharaClock 
                selectedPrahara={selectedPrahara} 
                onSelect={(p) => setSelectedPrahara(p)} 
              />
            </div>
          )}

          {/* Context or Recent Events */}
          <div className="mb-8">
            <label className={`block text-xs uppercase tracking-wider mb-2 ${
              isPsych 
                ? 'font-sans-psych font-semibold text-[#273D4C]' 
                : 'font-mono text-slate-300'
            }`}>
              {isPsych ? 'Context or recent thoughts (optional)' : 'Additional Personal Context'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
                placeholder={isPsych 
                  ? "e.g., A difficult conversation earlier this week, a major life transition, or waking up abruptly." 
                  : "e.g., Family milestone approaching; felt quiet reverence upon waking."}
                className={`w-full rounded-md px-4 py-3 text-xs focus:outline-none ${
                  isPsych
                    ? 'bg-[#F7FAFB] border border-[#C6DCE1] text-[#273D4C] placeholder:text-[#668F9C]/70 focus:border-[#273D4C]'
                    : 'bg-black/30 border border-white/10 text-white placeholder:text-slate-600 focus:border-white/30'
                }`}
              />
              <div className="absolute right-3.5 top-3.5">
                {isMyth ? <Sun className="w-4 h-4 text-mythology-copper" /> : <Moon className="w-4 h-4 text-[#668F9C]" />}
              </div>
            </div>
          </div>

          {/* Independent Multilingual Selectors */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-lg mb-8 border ${
            isPsych
              ? 'bg-[#F2F6F8] border-[#C6DCE1]'
              : 'bg-black/40 border-white/10'
          }`}>
            <div>
              <label className={`block text-[11px] mb-1.5 ${
                isPsych ? 'font-sans-psych font-semibold text-[#273D4C]' : 'font-mono text-slate-400'
              }`}>
                Input Language
              </label>
              <select
                value={inputLanguage}
                onChange={(e) => setInputLanguage(e.target.value as Language)}
                className={`w-full rounded-md px-3 py-2 text-xs focus:outline-none ${
                  isPsych
                    ? 'bg-white border border-[#C6DCE1] text-[#273D4C] font-sans-psych'
                    : 'bg-global-surface border border-white/10 text-white'
                }`}
              >
                <option value="ENGLISH">English</option>
                <option value="TAMIL">தமிழ் (Tamil)</option>
                <option value="TANGLISH">Tanglish (Conversational)</option>
              </select>
            </div>

            <div>
              <label className={`block text-[11px] mb-1.5 ${
                isPsych ? 'font-sans-psych font-semibold text-[#273D4C]' : 'font-mono text-slate-400'
              }`}>
                Response Language (Independent)
              </label>
              <select
                value={responseLanguage}
                onChange={(e) => setResponseLanguage(e.target.value as Language)}
                className={`w-full rounded-md px-3 py-2 text-xs focus:outline-none ${
                  isPsych
                    ? 'bg-white border border-[#C6DCE1] text-[#273D4C] font-sans-psych'
                    : 'bg-global-surface border border-white/10 text-white'
                }`}
              >
                <option value="ENGLISH">English</option>
                <option value="TAMIL">தமிழ் (Tamil)</option>
                <option value="TANGLISH">Tanglish (Conversational)</option>
              </select>
            </div>
          </div>

          {/* Submit Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span className={`text-xs italic ${
              isPsych ? 'font-sans-psych text-[#668F9C]' : 'font-serif text-slate-400'
            }`}>
              {isPsych 
                ? 'Grounded in neurocognitive memory & emotional processing models' 
                : 'Verifiable scriptural & psychological grounding'}
            </span>

            <button
              type="submit"
              className={`w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-md text-sm font-semibold transition-all duration-300 shadow-xl cursor-pointer ${
                isPsych
                  ? 'bg-[#273D4C] hover:bg-[#1E2E3A] text-[#E7E4E1] border border-[#668F9C]/40 shadow-[#273D4C]/20 hover:translate-y-[-1px]'
                  : 'bg-mythology-card hover:bg-[#2d1f14] text-mythology-parchment border border-mythology-copper/40 shadow-myth-sacred'
              }`}
            >
              <span>{isPsych ? 'Reflect on Dream' : 'Consult Agni Puranam & Shastras'}</span>
              <Send className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
