import React from 'react';
import { BookOpen, Sparkles, Brain, Compass } from 'lucide-react';
import { DreamMode, Language } from '../types';

interface NavbarProps {
  mode: DreamMode | null;
  onSelectMode: (mode: DreamMode) => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  onOpenJournal: () => void;
  journalCount: number;
  onResetToHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  mode,
  onSelectMode,
  language,
  onSelectLanguage,
  onOpenJournal,
  journalCount,
  onResetToHome,
}) => {
  const isMyth = mode === 'HINDU_MYTHOLOGY';
  const isPsych = mode === 'PSYCHOLOGY';

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors duration-500 ${
      isMyth 
        ? 'bg-[#140c07]/90 border-mythology-border' 
        : isPsych 
          ? 'bg-[#121B22]/95 border-[#668F9C]/20 text-[#E7E4E1]' 
          : 'bg-global-bg/90 border-global-border'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brandmark with Archival Surreal Symbol */}
        <button 
          onClick={onResetToHome}
          className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
        >
          <div className={`w-9 h-9 rounded-md border flex items-center justify-center transition-all duration-300 ${
            isMyth
              ? 'bg-mythology-card border-mythology-gold/40 text-mythology-gold'
              : isPsych
                ? 'bg-[#1F313E] border-[#668F9C]/40 text-[#C6DCE1]'
                : 'bg-global-surface border-white/15 text-white'
          }`}>
            <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`tracking-tight font-bold text-2xl transition-colors ${
                isMyth 
                  ? 'font-serif-myth text-mythology-parchment' 
                  : isPsych
                    ? 'font-serif-psych text-[#E7E4E1]'
                    : 'font-serif-psych text-white'
              }`}>
                DreamLens
              </span>
              <span className={`text-xs font-mono font-light ${
                isPsych ? 'text-[#C6DCE1]/80' : 'text-slate-400'
              }`}>
                2.0
              </span>
            </div>
            <span className={`hidden sm:block text-[10px] tracking-wider font-sans ${
              isPsych ? 'text-[#C6DCE1]/70' : 'text-slate-400'
            }`}>
              {isPsych ? 'The Architecture of Memory' : 'Dual Sovereign Inquiries'}
            </span>
          </div>
        </button>

        {/* Center: Sovereign Realm Switcher (When inside a world) */}
        {mode && (
          <div className={`hidden md:flex items-center border text-xs rounded-md overflow-hidden ${
            isPsych ? 'border-[#668F9C]/30 bg-[#1F313E]' : 'border-white/15 bg-black/40'
          }`}>
            <button
              onClick={() => onSelectMode('PSYCHOLOGY')}
              className={`flex items-center gap-2 px-4 py-2 transition-colors cursor-pointer ${
                isPsych 
                  ? 'bg-[#273D4C] text-[#E7E4E1] font-sans-psych font-semibold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Brain className={`w-3.5 h-3.5 ${isPsych ? 'text-[#C6DCE1]' : 'text-psychology-sage'}`} />
              <span className="font-serif-psych text-sm">Psychology Realm</span>
            </button>
            <div className={`w-px h-5 ${isPsych ? 'bg-[#668F9C]/20' : 'bg-white/10'}`} />
            <button
              onClick={() => onSelectMode('HINDU_MYTHOLOGY')}
              className={`flex items-center gap-2 px-4 py-2 transition-colors cursor-pointer ${
                isMyth 
                  ? 'bg-mythology-card text-mythology-parchment font-medium' 
                  : isPsych
                    ? 'text-[#C6DCE1]/80 hover:text-white'
                    : 'text-slate-400 hover:text-mythology-parchment'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-mythology-goldBright" />
              <span className="font-serif-myth text-sm">Sacred Mythology</span>
            </button>
          </div>
        )}

        {/* Right Tools (Language + Journal) */}
        <div className="flex items-center gap-3">
          
          {/* Multilingual Selector */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => onSelectLanguage(e.target.value as Language)}
              className={`text-xs rounded-md px-3 py-2 focus:outline-none transition-colors cursor-pointer font-sans ${
                isPsych
                  ? 'bg-[#1F313E] border border-[#668F9C]/40 text-[#E7E4E1] focus:border-[#C6DCE1]'
                  : 'bg-black/50 border border-white/15 text-white focus:border-white/30'
              }`}
            >
              <option value="ENGLISH" className="bg-[#1F313E] text-white">English</option>
              <option value="TAMIL" className="bg-[#1F313E] text-white">தமிழ் (Tamil)</option>
              <option value="TANGLISH" className="bg-[#1F313E] text-white">Tanglish (Conversational)</option>
            </select>
          </div>

          {/* Private Journal Trigger */}
          <button
            onClick={onOpenJournal}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md border text-xs transition-colors cursor-pointer ${
              isMyth
                ? 'bg-mythology-card border-mythology-gold/30 hover:border-mythology-gold text-mythology-parchment'
                : isPsych
                  ? 'bg-[#1F313E] border border-[#668F9C]/40 hover:bg-[#2A4252] text-[#E7E4E1] font-sans-psych'
                  : 'bg-white/5 border-white/15 hover:bg-white/10 text-white'
            }`}
            title="Open private device-local journal"
          >
            <BookOpen className={`w-3.5 h-3.5 ${isPsych ? 'text-[#C6DCE1]' : 'text-mythology-gold'}`} />
            <span className="hidden sm:inline font-sans font-medium">Journal</span>
            {journalCount > 0 && (
              <span className={`font-mono text-xs font-bold ${isPsych ? 'text-[#C6DCE1]' : 'text-mythology-gold'}`}>
                ({journalCount})
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
