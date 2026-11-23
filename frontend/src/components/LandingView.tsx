import React, { useState } from 'react';
import { ArrowRight, BookOpen, ArrowLeft } from 'lucide-react';
import { DreamMode, Language } from '../types';

interface LandingViewProps {
  onSelectMode: (mode: DreamMode) => void;
  language: Language;
  onBackToIntro?: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onSelectMode, language, onBackToIntro }) => {
  const isTamil = language === 'TAMIL';
  const isTanglish = language === 'TANGLISH';

  // Interactive Teaser Symbol Comparison
  const [activeSymbol, setActiveSymbol] = useState<'OCEAN' | 'FIRE' | 'FALLING'>('OCEAN');

  const symbolComparisons = {
    OCEAN: {
      title: 'Vast Ocean / Torrential Water',
      image: '/images/psychology/subconscious_horizon.png',
      psychology: 'Unconscious affective reservoir. Metaphorical simulation of emotional boundaries and suppressed memory traces during REM sleep.',
      psychologyAuthor: 'Neurocognitive Model (Domhoff 2003)',
      mythology: 'Crossing deep or flooded water signifies liberation from moral tribulations and karmic entanglements. Clear water portends propitious beginnings.',
      mythologyAuthor: 'Svapnacintāmaṇi (Tritiya Prakarana) & Agni Purana 229',
    },
    FIRE: {
      title: 'Sacred Lamp / Radiant Flame',
      image: '/images/mythology/temple_sanctum.png',
      psychology: 'Spontaneous neural reorganization in the Default Mode Network. Indicates high cognitive salience and sudden waking realization.',
      psychologyAuthor: 'Affective Depotentiation (De Gennaro 2019)',
      mythology: 'Beholding a sanctified Deepam (lamp) brings renown, illumination of intellect, and direct blessings of prosperity and peace.',
      mythologyAuthor: 'Agni Purana Chapter 229 (Svapna-adhyāya)',
    },
    FALLING: {
      title: 'Precipice / Falling through Space',
      image: '/images/psychology/portal_corridor.png',
      psychology: 'Vestibular motor simulation reflecting sudden loss of perceived waking agency, interpersonal anxiety, or elevated physiological tension.',
      psychologyAuthor: 'Hall/Van de Castle Empirical Coding Metric',
      mythology: 'Falling from height warns of impending loss or negligence. Prescribes morning contemplation and Gayatri recitation to avert inauspicious outcomes.',
      mythologyAuthor: 'Agni Purana Chapter 229 (Ashubha Svapna Shanti)',
    },
  };

  const comp = symbolComparisons[activeSymbol];

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between overflow-hidden">
      
      {/* 1. HERO HEADER: Bold, Art-Directed Stature */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-16 w-full text-center">
        
        {onBackToIntro && (
          <div className="mb-8 flex justify-center sm:justify-start">
            <button
              onClick={onBackToIntro}
              className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors px-3.5 py-1.5 rounded-md bg-white/5 border border-white/10 hover:border-white/25 cursor-pointer backdrop-blur-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Horizon Intro</span>
            </button>
          </div>
        )}

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-psych font-bold tracking-tight text-white max-w-5xl mx-auto leading-[1.08] mb-6">
          {isTamil ? (
            <>
              கனவுகளின் ஆழம். <br />
              <span className="shimmer-gold-text font-serif-myth">இரு முழுமைத் தரிசனங்கள்.</span>
            </>
          ) : isTanglish ? (
            <>
              In the silence of sleep, <br />
              <span className="shimmer-gold-text font-serif-myth">Two Sovereign Worlds</span> await.
            </>
          ) : (
            <>
              In the silence of sleep, <br />
              <span className="shimmer-gold-text font-serif-myth">Two Sovereign Worlds</span> await.
            </>
          )}
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed mb-16">
          {isTamil
            ? 'பொதுவான அரட்டைப் பெட்டிகள் அல்ல. உங்கள் கனவை நவீன நரம்பியல் கோட்பாடுகள் அல்லது அக்னி புராணத்தின் சகுன சாஸ்திரங்கள் வழியே தனித்தனியாக, முழுமையான ஆதாரங்களுடன் கண்டறியுங்கள்.'
            : isTanglish
              ? 'No generic chatbot cliches. Step into two distinct worlds: rigorous neurocognitive psychology and sacred Hindu scriptural oneiromancy.'
              : 'Reject generic AI chatbots. Experience dream interpretation as two distinct, image-led worlds: empirical neurocognitive science and sacred Hindu scriptural oneiromancy.'}
        </p>

        {/* =================================================================== */}
        {/* 2. THE DUAL SOVEREIGN GATEWAYS (VIBRANT, IMAGE-LED FOCAL POINT)   */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 text-left max-w-6xl mx-auto">
          
          {/* GATEWAY 1: Psychology Realm (Cool, Deep, Surrealist) */}
          <div 
            onClick={() => onSelectMode('PSYCHOLOGY')}
            className="group cursor-pointer rounded-xl border border-psychology-plumBorder bg-psychology-surface hover:border-psychology-sage transition-all duration-500 shadow-psych-depth hover:shadow-portal-hover relative overflow-hidden flex flex-col justify-between min-h-[500px]"
          >
            {/* High-Contrast Visual Imagery */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img 
                src="/images/psychology/landingpage_psychology.png" 
                alt="Psychology subconscious dreamscape" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-psychology-surface via-psychology-surface/30 to-transparent"></div>
            </div>

            {/* Content Body */}
            <div className="p-8 pt-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif-psych font-bold text-white mb-3 group-hover:text-psychology-silver transition-colors">
                  The Psychology Realm
                </h2>

                <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
                  Understand dreams as unconstrained cognitive simulations. Decoded through G. William Domhoff’s
                  neurocognitive continuity theory, Luigi De Gennaro’s REM theta emotional depotentiation, and classical psychoanalysis.
                </p>

                {/* Primary Authors */}
                <div className="text-xs font-mono text-slate-400 mb-6 pt-3 border-t border-white/10 flex items-center gap-2">
                  <span className="text-psychology-sage font-semibold uppercase tracking-wider text-[10px]">Authorities:</span>
                  <span>Domhoff • De Gennaro • Freud</span>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-psychology-sage font-sans text-sm font-semibold">
                <span>Enter The Subconscious Realm</span>
                <ArrowRight className="w-4 h-4 text-psychology-sage group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* GATEWAY 2: Sacred Mythology Realm (Warm, Luminous, Temple Gold) */}
          <div 
            onClick={() => onSelectMode('HINDU_MYTHOLOGY')}
            className="group cursor-pointer rounded-xl border border-mythology-border bg-gradient-to-b from-[#22150c] to-[#140c07] hover:border-mythology-gold transition-all duration-500 shadow-myth-radiance hover:shadow-portal-hover relative overflow-hidden flex flex-col justify-between min-h-[500px]"
          >
            {/* High-Contrast Visual Imagery */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img 
                src="/images/mythology/temple_sanctum.png" 
                alt="Ancient temple sanctum at sacred dawn" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-105 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#22150c] via-[#22150c]/30 to-transparent"></div>
            </div>

            {/* Content Body */}
            <div className="p-8 pt-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif-myth font-bold text-mythology-parchment mb-3 group-hover:text-mythology-goldBright transition-colors">
                  The Sacred Beyond
                </h2>

                <p className="text-sm text-mythology-parchment font-body-myth leading-relaxed mb-6">
                  Decode dreams as visions of the subtle body (*Sukshma Sharira*). Grounded in the authoritative
                  229th chapter of Agni Purana, the four watches of the night (*Prahara*), and Jagaddeva’s classic *Svapnacintāmaṇi*.
                </p>

                {/* Primary Authorities */}
                <div className="text-xs font-mono text-mythology-parchmentMuted mb-6 pt-3 border-t border-mythology-gold/20 flex items-center gap-2">
                  <span className="text-mythology-gold font-semibold uppercase tracking-wider text-[10px]">Treatises:</span>
                  <span>Agni Purana (Ch. 229) • Svapnacintāmaṇi</span>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-mythology-gold/20 flex items-center justify-between text-mythology-goldBright font-sans text-sm font-semibold">
                <span>Enter Sacred Scriptural Inquiry</span>
                <ArrowRight className="w-4 h-4 text-mythology-goldBright group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* =================================================================== */}
      {/* 3. INTERACTIVE COMPARATIVE EXHIBIT: ONE DREAM. TWO TRUTHS.          */}
      {/* =================================================================== */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full border-t border-white/10">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h3 className="text-3xl sm:text-4xl font-serif-psych font-bold text-white mb-3">
            One Dream. Two Truths.
          </h3>
          <p className="text-sm text-slate-300 font-sans">
            Witness how the identical dream symbol is deciphered with rigor under both sovereign authorities.
          </p>
        </div>

        {/* Editorial Text Tabs */}
        <div className="flex justify-center border-b border-white/10 mb-10">
          {(['OCEAN', 'FIRE', 'FALLING'] as const).map((sym) => (
            <button
              key={sym}
              onClick={() => setActiveSymbol(sym)}
              className={`px-6 py-3 text-xs font-mono uppercase tracking-wider transition-colors relative ${
                activeSymbol === sym
                  ? 'text-white font-bold border-b-2 border-white -mb-px'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {symbolComparisons[sym].title.split('/')[0]}
            </button>
          ))}
        </div>

        {/* Comparative Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Psychology Card */}
          <div className="p-8 rounded-xl border border-psychology-plumBorder bg-psychology-surface flex flex-col justify-between shadow-psych-depth">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                <span className="text-xs font-mono text-psychology-sage uppercase tracking-wider font-semibold">
                  Psychology Perspective
                </span>
                <span className="text-xs font-mono text-slate-500">DOMHOFF / FREUD</span>
              </div>

              <h4 className="font-serif-psych text-2xl font-bold text-white mb-4">
                {comp.title}
              </h4>

              <p className="text-sm text-slate-200 font-sans leading-relaxed mb-6">
                "{comp.psychology}"
              </p>
            </div>

            <div className="text-xs font-mono text-slate-400 pt-4 border-t border-white/5 flex items-center justify-between">
              <span>Authority:</span>
              <span className="text-psychology-sage">{comp.psychologyAuthor}</span>
            </div>
          </div>

          {/* Hindu Mythology Card (Luminous & Warm) */}
          <div className="p-8 rounded-xl border border-mythology-border bg-gradient-to-b from-[#26170c] to-[#170e08] flex flex-col justify-between shadow-myth-radiance">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-mythology-gold/20">
                <span className="text-xs font-mono text-mythology-goldBright uppercase tracking-wider font-semibold">
                  Hindu Mythology Perspective
                </span>
                <span className="text-xs font-mono text-mythology-parchmentMuted/70">AGNI PURANAM</span>
              </div>

              <h4 className="font-serif-myth text-2xl font-bold text-mythology-parchment mb-4">
                {comp.title}
              </h4>

              <p className="text-sm text-mythology-parchment font-body-myth leading-relaxed mb-6">
                "{comp.mythology}"
              </p>
            </div>

            <div className="text-xs font-mono text-mythology-parchmentMuted pt-4 border-t border-mythology-gold/15 flex items-center justify-between">
              <span>Authority:</span>
              <span className="text-mythology-goldBright">{comp.mythologyAuthor}</span>
            </div>
          </div>

        </div>

      </section>

      {/* 4. FOOTER: Clear Ethical & Epistemic Boundaries */}
      <footer className="border-t border-white/10 py-10 px-4 text-xs text-slate-400 font-sans bg-black/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-mythology-gold" />
            <span className="font-serif text-white">DreamLens 2.0 • Dual-Perspective AI Platform</span>
          </div>
          <div className="text-slate-400 font-mono text-xs">
            Zero user accounts • 100% device-local private journal
          </div>
        </div>
      </footer>

    </div>
  );
};
