import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Language } from '../types';

interface PsychologyLandingViewProps {
  onEnter: () => void;
  onBack: () => void;
  language: Language;
}

export const PsychologyLandingView: React.FC<PsychologyLandingViewProps> = ({
  onEnter,
  onBack,
  language,
}) => {
  const isTamil = language === 'TAMIL';
  const isTanglish = language === 'TANGLISH';

  return (
    <div 
      className="relative min-h-[calc(100vh-5rem)] w-full flex flex-col justify-between overflow-hidden bg-cover bg-center bg-no-repeat transition-all duration-700"
      style={{
        backgroundImage: "url('/images/psychology/landingpage_psychology.png')",
      }}
    >
      {/* Localized Cinematic Overlays: preserves visual composition without heavy black blanket */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none"></div>

      {/* Top Bar: Discreet Navigation & Realm Theme */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-sans-psych text-slate-200 hover:text-white transition-colors px-3 py-1.5 rounded bg-black/40 border border-white/10 backdrop-blur-sm cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Portals</span>
        </button>

        <div className="text-xs font-sans-psych text-[#C6DCE1] tracking-wider uppercase font-medium bg-black/30 px-3 py-1.5 rounded border border-white/10 backdrop-blur-sm">
          The Architecture of Memory
        </div>
      </div>

      {/* Central Editorial Stature: Human Introspection & Clear Call to Action */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center">
        
        {/* Editorial Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-psych font-normal tracking-tight text-white mb-6 leading-[1.08] drop-shadow-[0_4px_28px_rgba(0,0,0,0.95)] max-w-3xl">
          {isTamil ? (
            'நாம் சென்றிராத இடங்களின் நினைவுகளைப் போல சில கனவுகள் உணர்த்துகின்றன.'
          ) : isTanglish ? (
            'Some dreams feel like memories of places we’ve never been.'
          ) : (
            'Some dreams feel like memories of places we’ve never been.'
          )}
        </h1>

        {/* Supporting Copy */}
        <p className="text-lg sm:text-xl font-sans-psych text-[#C6DCE1] max-w-xl mx-auto leading-relaxed mb-10 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          {isTamil
            ? 'உங்கள் கனவுகளின் பின்னணியிலுள்ள உணர்வுகள், நினைவுகள் மற்றும் தொடர்புகளை ஆழமாக ஆய்ந்தறியுங்கள்.'
            : isTanglish
              ? 'Explore the emotions, memories, and associations behind your dreams.'
              : 'Explore the emotions, memories, and associations behind your dreams.'}
        </p>

        {/* Primary CTA */}
        <button
          onClick={onEnter}
          aria-label="Explore My Dream"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-md bg-[#273D4C] text-[#E7E4E1] hover:bg-[#1f313e] hover:text-white border border-[#C6DCE1]/40 transition-all duration-300 font-sans-psych font-semibold text-base shadow-2xl hover:shadow-[#273D4C]/50 hover:translate-y-[-1px] cursor-pointer"
        >
          <span>{isTamil ? 'என் கனவை ஆராய்க' : 'Explore My Dream'}</span>
          <ArrowRight className="w-4 h-4 text-[#C6DCE1]" />
        </button>

      </div>

      {/* Bottom Editorial Caption */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full text-center">
        <span className="text-xs font-sans-psych text-slate-300/80 drop-shadow-sm">
          Neurocognitive Continuity & Emotional Processing • G. William Domhoff & Luigi De Gennaro
        </span>
      </div>

    </div>
  );
};
