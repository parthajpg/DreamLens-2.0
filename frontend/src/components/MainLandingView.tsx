import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { DreamMode, Language } from '../types';

interface MainLandingViewProps {
  onEnter: () => void;
  onSelectMode: (mode: DreamMode) => void;
  language: Language;
}

export const MainLandingView: React.FC<MainLandingViewProps> = ({
  onEnter,
  onSelectMode,
  language,
}) => {
  const isTamil = language === 'TAMIL';
  const isTanglish = language === 'TANGLISH';

  return (
    <div 
      className="relative min-h-[calc(100vh-5rem)] w-full flex flex-col justify-between overflow-hidden bg-cover bg-center bg-no-repeat transition-all duration-700"
      style={{
        backgroundImage: "url('/images/main-landing-page.png')",
      }}
    >
      {/* Cinematic Vignette Overlays for Contrast and Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/55 pointer-events-none"></div>
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/60 pointer-events-none"></div>

      {/* Top Bar: Epistemic Pillar Indicators */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300/80 tracking-widest uppercase bg-black/40 px-3 py-1.5 rounded-md border border-white/10 backdrop-blur-md">
          <Compass className="w-3.5 h-3.5 text-amber-200/90" />
          <span>Sovereign Dual-Realm Oneiromancy</span>
        </div>

        <div className="text-xs font-mono text-slate-300/80 tracking-widest uppercase hidden sm:block bg-black/40 px-3 py-1.5 rounded-md border border-white/10 backdrop-blur-md">
          Empirical Mind • Sacred Shastra
        </div>
      </div>

      {/* Central Editorial Stature: Grand Invocation & Single Focal Arrow */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center flex flex-col items-center">
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-psych font-bold tracking-tight text-white mb-4 drop-shadow-[0_4px_28px_rgba(0,0,0,0.9)] leading-[1.08]">
          {isTamil ? (
            <>
              விழிப்பின் எல்லைக்கு அப்பால் <br />
              <span className="shimmer-gold-text font-serif-myth text-3xl sm:text-5xl lg:text-6xl">
                இரு முழுமைத் தரிசனங்கள்
              </span>
            </>
          ) : isTanglish ? (
            <>
              Beyond the Waking Horizon <br />
              <span className="shimmer-gold-text font-serif-myth text-3xl sm:text-5xl lg:text-6xl">
                Two Sovereign Worlds
              </span>
            </>
          ) : (
            <>
              Beyond the Waking Horizon <br />
              <span className="shimmer-gold-text font-serif-myth text-3xl sm:text-5xl lg:text-6xl">
                Two Sovereign Worlds
              </span>
            </>
          )}
        </h1>

        <p className="text-base sm:text-xl font-sans text-slate-200/95 max-w-2xl mx-auto leading-relaxed mb-12 drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
          {isTamil
            ? 'பொதுவான அரட்டைப் பெட்டிகள் அல்ல. நரம்பியல் கோட்பாடுகள் அல்லது பண்டைய அக்னி புராண சகுன சாஸ்திரங்கள் வழியே உங்கள் கனவுகளைத் தனித்துவமாக, ஆதாரங்களுடன் கண்டறியுங்கள்.'
            : isTanglish
              ? 'Reject generic AI chatbots. Experience dream interpretation as two distinct, sovereign worlds: empirical neurocognitive science and sacred Hindu scriptural oneiromancy.'
              : 'Reject generic AI chatbots. Experience dream interpretation as two distinct, sovereign worlds: empirical neurocognitive science and sacred Hindu scriptural oneiromancy.'}
        </p>

        {/* THE SINGLE FOCAL ARROW (Direct Gateway to Dual Realm Explorer) */}
        <button
          onClick={onEnter}
          aria-label="Enter DreamLens Dual Realm Explorer"
          className="group flex flex-col items-center gap-3.5 focus:outline-none cursor-pointer"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/40 bg-black/45 backdrop-blur-md flex items-center justify-center text-white group-hover:border-amber-200 group-hover:bg-black/65 group-hover:scale-110 transition-all duration-500 shadow-2xl shadow-indigo-950/50">
            <ArrowRight className="w-7 h-7 sm:w-9 sm:h-9 text-slate-100 group-hover:text-amber-200 group-hover:translate-x-1.5 transition-all duration-300" />
          </div>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-200 group-hover:text-amber-200 transition-colors drop-shadow-md">
            Enter The Realms
          </span>
        </button>

        {/* Minimal Direct Gateways */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-300/90">
          <button
            onClick={() => onSelectMode('PSYCHOLOGY')}
            className="hover:text-psychology-sage transition-colors underline-offset-8 hover:underline drop-shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <span>Psychology Realm</span>
            <span className="text-slate-400">→</span>
          </button>
          
          <span className="text-slate-500/70 select-none">•</span>

          <button
            onClick={() => onSelectMode('HINDU_MYTHOLOGY')}
            className="hover:text-amber-200 transition-colors underline-offset-8 hover:underline drop-shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <span>Sacred Mythology</span>
            <span className="text-slate-400">→</span>
          </button>
        </div>

      </div>

      {/* Bottom Editorial Caption */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full text-center">
        <span className="text-xs font-sans text-slate-300/80 drop-shadow-md">
          Zero Registration • 100% Device-Local Privacy • Real Grounded Citations
        </span>
      </div>

    </div>
  );
};
