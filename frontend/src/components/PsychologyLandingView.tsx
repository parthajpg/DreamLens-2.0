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
      {/* Cinematic Vignette Overlays for Contrast and Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60 pointer-events-none"></div>
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/60 pointer-events-none"></div>

      {/* Top Bar: Minimal Return Link */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white transition-colors px-3 py-1.5 rounded-md bg-black/40 border border-white/10 backdrop-blur-md"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Portals</span>
        </button>

        <div className="text-xs font-mono text-psychology-sage/80 tracking-widest uppercase">
          Domhoff • De Gennaro • Freud
        </div>
      </div>

      {/* Central Editorial Stature: Psychology Invocation & Single Focal Arrow */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center">
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-psych font-bold tracking-tight text-white mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
          {isTamil ? (
            <>
              மனதின் ஆழம் <br />
              <span className="shimmer-silver-text text-3xl sm:text-5xl lg:text-6xl">நரம்பியல் பகுப்பாய்வு</span>
            </>
          ) : isTanglish ? (
            <>
              The Psychology Realm <br />
              <span className="shimmer-silver-text text-3xl sm:text-5xl lg:text-6xl">Subconscious Mind</span>
            </>
          ) : (
            <>
              The Psychology Realm <br />
              <span className="shimmer-silver-text text-3xl sm:text-5xl lg:text-6xl">Subconscious Simulation</span>
            </>
          )}
        </h1>

        <p className="text-base sm:text-xl font-sans text-slate-200/90 max-w-2xl mx-auto leading-relaxed mb-12 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          {isTamil
            ? 'கனவுகள் என்பது தன்னிச்சையான அறிவாற்றல் உருவகப்படுத்துதல்கள். தொடர்ச்சி கோட்பாடுகள் மற்றும் நரம்பியல் ஆய்வுகளின் வழி கண்டறியுங்கள்.'
            : isTanglish
              ? 'Dreams as unconstrained cognitive simulations. Decoded through neurocognitive continuity and affective depotentiation in REM sleep.'
              : 'Dreams as unconstrained cognitive simulations. Decoded through neurocognitive continuity and affective depotentiation in REM sleep.'}
        </p>

        {/* THE SINGLE FOCAL ARROW (Direct Gateway to Functional Sanctuary) */}
        <button
          onClick={onEnter}
          aria-label="Enter the Subconscious Psychology dream sanctuary"
          className="group flex flex-col items-center gap-3.5 focus:outline-none cursor-pointer"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-psychology-sage/50 bg-black/40 backdrop-blur-md flex items-center justify-center text-psychology-sage group-hover:border-psychology-silver group-hover:bg-black/60 group-hover:scale-110 transition-all duration-500 shadow-2xl shadow-indigo-950/40">
            <ArrowRight className="w-7 h-7 sm:w-9 sm:h-9 text-psychology-sage group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300" />
          </div>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-psychology-silver group-hover:text-white transition-colors drop-shadow-md">
            Enter Subconscious Realm
          </span>
        </button>

      </div>

      {/* Bottom Editorial Caption */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full text-center">
        <span className="text-xs font-serif italic text-slate-400 drop-shadow-sm">
          Grounded in Domhoff’s Neurocognitive Model (2003) & De Gennaro’s Emotional Processing (2019)
        </span>
      </div>

    </div>
  );
};
