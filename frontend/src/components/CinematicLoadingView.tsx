import React, { useEffect, useState } from 'react';
import { Brain, Sparkles, CheckCircle2 } from 'lucide-react';
import { DreamMode } from '../types';

interface CinematicLoadingViewProps {
  mode: DreamMode;
}

export const CinematicLoadingView: React.FC<CinematicLoadingViewProps> = ({ mode }) => {
  const isPsych = mode === 'PSYCHOLOGY';

  const psychSteps = [
    'Parsing emotional valence & affective charge...',
    'Querying Domhoff neurocognitive continuity collection...',
    'Evaluating REM sleep theta depotentiation mechanisms...',
    'Synthesizing grounded citations from Freud (1900) & Domhoff (2003)...'
  ];

  const mythSteps = [
    'Aligning dream symbols with Prahara night-watch...',
    'Retrieving Agni Purana Chapter 229 (Svapna-adhyāya)...',
    'Cross-referencing Jagaddeva’s Svapnacintāmaṇi omens...',
    'Illuminating authentic Sanskrit passages & cultural context...'
  ];

  const steps = isPsych ? psychSteps : mythSteps;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 450);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className={`min-h-[calc(100vh-4.5rem)] flex items-center justify-center p-6 transition-colors duration-1000 ${
      isPsych ? 'world-psychology-canvas' : 'world-mythology-canvas'
    }`}>
      <div className="max-w-md w-full text-center">
        
        {/* Animated Central Emblem */}
        <div className="relative w-36 h-36 mx-auto mb-10 flex items-center justify-center">
          
          {/* Subtle Outer Pulse */}
          <div className={`absolute inset-0 rounded-full animate-pulse-subtle opacity-30 ${
            isPsych ? 'bg-psychology-plum' : 'bg-mythology-copperDark'
          }`}></div>
          
          {/* Rotating Ring with Thin Dash */}
          <div className={`absolute inset-2 rounded-full border border-dashed animate-spin-very-slow ${
            isPsych ? 'border-psychology-sage/40' : 'border-mythology-copper/40'
          }`}></div>

          {/* Central Emblem Core */}
          <div className={`relative w-20 h-20 rounded-md flex items-center justify-center border shadow-2xl transition-all ${
            isPsych 
              ? 'bg-psychology-card border-psychology-plumBorder text-psychology-sage shadow-psych-depth' 
              : 'bg-mythology-card border-mythology-copper/40 text-mythology-copperLight shadow-myth-sacred'
          }`}>
            {isPsych ? (
              <Brain className="w-9 h-9 text-psychology-sage animate-pulse" />
            ) : (
              <Sparkles className="w-9 h-9 text-mythology-copperLight animate-pulse" />
            )}
          </div>
        </div>

        {/* Title & Domain Header */}
        <h2 className={`text-2xl sm:text-3xl font-bold mb-2 tracking-tight ${
          isPsych ? 'font-serif-psych text-white' : 'font-serif-myth text-mythology-parchment'
        }`}>
          {isPsych ? 'Deconstructing Subconscious Patterns' : 'Consulting Ancient Scriptural Treatises'}
        </h2>
        
        <p className="text-xs font-serif italic text-slate-400 mb-8">
          {isPsych ? 'Cross-referencing Domhoff & Freud memory networks' : 'Retrieving Agni Purana and Svapnacintāmaṇi omens'}
        </p>

        {/* Progression Steps List */}
        <div className="space-y-3 text-left max-w-sm mx-auto p-5 rounded-lg border border-white/10 bg-black/50 backdrop-blur-xl shadow-xl">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div 
                key={step} 
                className={`flex items-center gap-3 text-xs transition-opacity duration-300 ${
                  isCurrent 
                    ? 'text-white font-medium opacity-100' 
                    : isCompleted 
                      ? 'text-slate-400 opacity-70' 
                      : 'text-slate-600 opacity-30'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <div className={`w-4 h-4 rounded-full border-2 border-t-transparent animate-spin shrink-0 ${
                    isPsych ? 'border-psychology-sage' : 'border-mythology-copper'
                  }`}></div>
                ) : (
                  <div className="w-4 h-4 rounded-full border border-white/20 shrink-0"></div>
                )}
                <span className="truncate font-sans">{step}</span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
