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

  const emotionPills = isPsych
    ? [
        'Cognitive Disorientation',
        'Acute Apprehension / Dread',
        'Transcendent Stillness',
        'Subconscious Mourning',
        'Kinesthetic Freedom (Flying)',
        'Chronic Recurring Schema',
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
      className="min-h-[calc(100vh-4.5rem)] py-10 px-4 sm:px-6 lg:px-8 transition-all duration-700 relative bg-cover bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage: isPsych 
          ? "url('/images/psychology/landingpage_psychology.png')" 
          : "url('/images/mythology/cosmic_lotus_dreamscape.png')"
      }}
    >
      {/* Luminous Dark Overlay for Contrast & Readability Across Both Realms */}
      <div className={`absolute inset-0 pointer-events-none ${
        isPsych 
          ? 'bg-gradient-to-b from-black/80 via-[#060810]/90 to-[#060810]/98' 
          : 'bg-gradient-to-b from-black/75 via-black/85 to-[#140c07]/95'
      }`}></div>

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Navigation & Realm Indicator */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isMyth ? 'Return to Sacred Portal' : 'Return to Subconscious Portal'}</span>
          </button>

          <div className="text-xs font-serif text-slate-400">
            Realm: <span className="font-semibold text-white">{isPsych ? 'Psychology' : 'Sacred Mythology'}</span>
          </div>
        </div>

        {/* Header Storytelling with Fine-Art Backdrop Banner */}
        <div className="relative mb-8 p-6 sm:p-8 rounded-xl border border-white/10 overflow-hidden bg-black/50 backdrop-blur-md">
          {/* Subtle Background Photography */}
          <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
            <img 
              src={isPsych ? "/images/psychology/landingpage_psychology.png" : "/images/mythology/cosmic_lotus_dreamscape.png"} 
              alt="Realm visual atmosphere" 
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${
              isPsych 
                ? 'from-psychology-surface via-psychology-surface/90 to-transparent' 
                : 'from-[#170e08] via-[#170e08]/90 to-transparent'
            }`}></div>
          </div>

          <div className="relative z-10">
            <h1 className={`text-3xl sm:text-4xl font-bold mb-2 tracking-tight ${
              isPsych ? 'font-serif-psych text-white' : 'font-serif-myth text-mythology-parchment'
            }`}>
              {isPsych ? 'Record The Subconscious Simulation' : 'Whisper Your Vision to the Shastras'}
            </h1>
            <p className="text-sm text-slate-300 font-sans leading-relaxed max-w-xl">
              {isPsych
                ? 'Enter raw, uncurated dream recollections. Details of light, water, disorientation, characters, or fear will be cross-referenced with empirical neurocognitive memory models.'
                : 'Record the omens and sacred motifs of your dream. Signs of lamps, rivers, heights, or celestial bodies will be retrieved from Agni Purana Chapter 229.'}
            </p>
          </div>
        </div>

        {/* Writing Sanctuary Form */}
        <form onSubmit={handleSubmit} className={`rounded-xl p-6 sm:p-10 border backdrop-blur-xl shadow-2xl transition-all ${
          isPsych 
            ? 'bg-psychology-surface/90 border-psychology-plumBorder shadow-psych-depth' 
            : 'bg-[#180f09]/90 manuscript-border shadow-myth-sacred'
        }`}>
          
          {/* Main Dream Description Textarea */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs uppercase font-mono tracking-widest text-slate-300">
                What did you experience in sleep? <span className="text-amber-400">*</span>
              </label>
              <span className="text-[10px] font-mono text-slate-500">
                Raw dream narrative
              </span>
            </div>

            <textarea
              value={dreamText}
              onChange={(e) => setDreamText(e.target.value)}
              placeholder={isPsych 
                ? "Describe the imagery, physical sensations, and unresolved friction... (e.g. I was standing in an ancient archival library where the floor was made of black water, and my reflection was speaking with a delayed voice...)" 
                : "Recount the vision and sacred signs... (e.g. In the quiet hours before dawn, I climbed the steps of a mountain temple while carrying an unlit brass deepam, and suddenly a white cow with golden horns looked towards the rising sun...)"}
              rows={7}
              className={`w-full bg-black/40 border rounded-lg p-5 text-white text-base sm:text-lg focus:outline-none transition-colors resize-y leading-relaxed ${
                isPsych 
                  ? 'border-white/10 font-serif-psych placeholder:font-sans placeholder:text-slate-600 focus:border-psychology-sage/60' 
                  : 'border-mythology-copper/25 font-body-myth text-mythology-parchment placeholder:font-sans placeholder:text-stone-600 focus:border-mythology-copperLight'
              }`}
            />
            {error && (
              <div className="flex items-center gap-2 text-rose-400 text-xs mt-2.5 font-sans">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Emotional State Selector */}
          <div className="mb-8">
            <label className="block text-xs uppercase font-mono tracking-widest text-slate-300 mb-2.5">
              Predominant Affective / Emotional Tone (Optional)
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {emotionPills.map((pill) => (
                <button
                  type="button"
                  key={pill}
                  onClick={() => setEmotionalState(emotionalState === pill ? '' : pill)}
                  className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
                    emotionalState === pill
                      ? isPsych 
                        ? 'bg-psychology-plum text-white border-psychology-sage'
                        : 'bg-mythology-card text-mythology-goldBright border-mythology-gold'
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
              placeholder="Or enter custom emotional nuance..."
              className="w-full bg-black/30 border border-white/10 rounded-md px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-white/30"
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

          {/* Waking Context or Triggers */}
          <div className="mb-8">
            <label className="block text-xs uppercase font-mono tracking-widest text-slate-300 mb-2">
              {isPsych ? 'Recent Waking Preoccupations or Triggers' : 'Additional Personal Context'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
                placeholder={isPsych 
                  ? "e.g., Major career confrontation 2 days ago; woke up abruptly at 4:15 AM." 
                  : "e.g., Family milestone approaching; felt quiet reverence upon waking."}
                className="w-full bg-black/30 border border-white/10 rounded-md px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-white/30"
              />
              <div className="absolute right-3.5 top-3.5 text-slate-500">
                {isMyth ? <Sun className="w-4 h-4 text-mythology-copper" /> : <Moon className="w-4 h-4 text-psychology-sage" />}
              </div>
            </div>
          </div>

          {/* Independent Multilingual Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-lg bg-black/40 border border-white/10 mb-8">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1.5">
                Input Language
              </label>
              <select
                value={inputLanguage}
                onChange={(e) => setInputLanguage(e.target.value as Language)}
                className="w-full bg-global-surface border border-white/10 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30"
              >
                <option value="ENGLISH" className="bg-[#0b101d]">English</option>
                <option value="TAMIL" className="bg-[#0b101d]">தமிழ் (Tamil)</option>
                <option value="TANGLISH" className="bg-[#0b101d]">Tanglish (Conversational)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1.5">
                Response Language (Independent)
              </label>
              <select
                value={responseLanguage}
                onChange={(e) => setResponseLanguage(e.target.value as Language)}
                className="w-full bg-global-surface border border-white/10 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30"
              >
                <option value="ENGLISH" className="bg-[#0b101d]">English</option>
                <option value="TAMIL" className="bg-[#0b101d]">தமிழ் (Tamil)</option>
                <option value="TANGLISH" className="bg-[#0b101d]">Tanglish (Conversational)</option>
              </select>
            </div>
          </div>

          {/* Submit Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span className="text-xs font-serif italic text-slate-400">
              Verifiable scriptural & psychological grounding
            </span>

            <button
              type="submit"
              className={`w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-md font-sans text-sm font-medium transition-all duration-300 shadow-xl ${
                isPsych
                  ? 'bg-psychology-plum hover:bg-psychology-plumBorder text-psychology-silver border border-psychology-plumBorder shadow-psych-depth'
                  : 'bg-mythology-card hover:bg-[#2d1f14] text-mythology-parchment border border-mythology-copper/40 shadow-myth-sacred'
              }`}
            >
              <span>{isPsych ? 'Deconstruct Subconscious Simulation' : 'Consult Agni Puranam & Shastras'}</span>
              <Send className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
