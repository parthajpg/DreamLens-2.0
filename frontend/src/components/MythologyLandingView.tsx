import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Language } from '../types';

interface MythologyLandingViewProps {
  onEnter: () => void;
  onBack: () => void;
  language: Language;
}

export const MythologyLandingView: React.FC<MythologyLandingViewProps> = ({
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
        backgroundImage: "url('/images/mythology/cosmic_lotus_dreamscape.png')",
      }}
    >
      {/* Cinematic Vignette Overlays for Contrast and Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/60 pointer-events-none"></div>
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/60 pointer-events-none"></div>

      {/* Top Bar: Minimal Return Link */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-amber-200/80 hover:text-white transition-colors px-3 py-1.5 rounded-md bg-black/40 border border-white/10 backdrop-blur-md"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Portals</span>
        </button>

        <div className="text-xs font-mono text-amber-200/70 tracking-widest uppercase">
          अग्निपुराणम् २२९ • स्वप्नचिन्तामणि
        </div>
      </div>

      {/* Central Editorial Stature: Sacred Invocation & Single Focal Arrow */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center">
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-myth font-bold tracking-tight text-mythology-parchment mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
          {isTamil ? (
            <>
              புனித தரிசனம் <br />
              <span className="shimmer-gold-text text-3xl sm:text-5xl lg:text-6xl">சகுன சாஸ்திரம்</span>
            </>
          ) : isTanglish ? (
            <>
              The Sacred Beyond <br />
              <span className="shimmer-gold-text text-3xl sm:text-5xl lg:text-6xl">Cosmic Oneiromancy</span>
            </>
          ) : (
            <>
              The Sacred Beyond <br />
              <span className="shimmer-gold-text text-3xl sm:text-5xl lg:text-6xl">Scriptural Oneiromancy</span>
            </>
          )}
        </h1>

        <p className="text-base sm:text-xl font-body-myth text-amber-100/90 max-w-2xl mx-auto leading-relaxed mb-12 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          {isTamil
            ? 'சூக்கும உடலின் பயணங்கள் மற்றும் அக்னி புராணத்தின் சகுனப் பேருண்மைகள்.'
            : isTanglish
              ? 'Where the subtle body wanders through the cosmic field of auspicious and inauspicious omens.'
              : 'Where the subtle body wanders through the cosmic field of auspicious and inauspicious omens.'}
        </p>

        {/* THE SINGLE FOCAL ARROW (Direct Gateway to Functional Sanctuary) */}
        <button
          onClick={onEnter}
          aria-label="Enter the Sacred Mythology dream sanctuary"
          className="group flex flex-col items-center gap-3.5 focus:outline-none cursor-pointer"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-amber-300/50 bg-black/40 backdrop-blur-md flex items-center justify-center text-amber-200 group-hover:border-amber-300 group-hover:bg-black/60 group-hover:scale-110 transition-all duration-500 shadow-2xl shadow-amber-900/40">
            <ArrowRight className="w-7 h-7 sm:w-9 sm:h-9 text-amber-300 group-hover:translate-x-1.5 transition-transform duration-300" />
          </div>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-200/90 group-hover:text-white transition-colors drop-shadow-md">
            Enter Sacred Sanctuary
          </span>
        </button>

      </div>

      {/* Bottom Editorial Caption */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full text-center">
        <span className="text-xs font-serif italic text-amber-200/60 drop-shadow-sm">
          Grounded in Agni Puranam Chapter 229 and Jagaddeva’s Svapnacintāmaṇi (c. 1175 CE)
        </span>
      </div>

    </div>
  );
};
