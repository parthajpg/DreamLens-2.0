import React from 'react';

export const PsychologyArtwork: React.FC<{ className?: string }> = ({ className = "w-full h-auto" }) => {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      <svg 
        viewBox="0 0 400 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[340px] opacity-90 transition-transform duration-700 hover:scale-105"
      >
        <defs>
          {/* Subtle Gradients */}
          <linearGradient id="psychPortal" x1="200" y1="40" x2="200" y2="360" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5865F2" stopOpacity="0.3" />
            <stop offset="0.5" stopColor="#1A162B" stopOpacity="0.6" />
            <stop offset="1" stopColor="#060810" stopOpacity="0.95" />
          </linearGradient>

          <radialGradient id="subconsciousVoid" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2A2440" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#0B101D" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#060810" stopOpacity="0" />
          </radialGradient>

          <filter id="surrealGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Fine Astronomical Ring */}
        <circle cx="200" cy="200" r="175" stroke="#4E5868" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 6" />
        <circle cx="200" cy="200" r="155" stroke="#5865F2" strokeOpacity="0.15" strokeWidth="1" />

        {/* Central Atmospheric Aura */}
        <circle cx="200" cy="200" r="130" fill="url(#subconsciousVoid)" />

        {/* Surrealistic Receding Archways (The Architecture of the Psyche) */}
        <path 
          d="M 120 320 V 180 C 120 135 155 100 200 100 C 245 100 280 135 280 180 V 320 Z" 
          stroke="#7E9A8E" 
          strokeOpacity="0.4" 
          strokeWidth="1.2" 
          fill="url(#psychPortal)"
        />
        <path 
          d="M 145 320 V 195 C 145 165 170 140 200 140 C 230 140 255 165 255 195 V 320 Z" 
          stroke="#94A3B8" 
          strokeOpacity="0.3" 
          strokeWidth="1" 
        />
        <path 
          d="M 170 320 V 215 C 170 198 183 185 200 185 C 217 185 230 198 230 215 V 320 Z" 
          stroke="#5865F2" 
          strokeOpacity="0.4" 
          strokeWidth="1" 
        />

        {/* Floating Subconscious Horizon & Eye of Perception */}
        <ellipse cx="200" cy="200" rx="45" ry="18" stroke="#E2E8F0" strokeOpacity="0.6" strokeWidth="1.2" />
        <circle cx="200" cy="200" r="7" fill="#E2E8F0" fillOpacity="0.8" />
        <circle cx="200" cy="200" r="2.5" fill="#060810" />

        {/* Linear Neural Projection Lines */}
        <line x1="200" y1="50" x2="200" y2="90" stroke="#7E9A8E" strokeOpacity="0.5" strokeWidth="1" />
        <line x1="60" y1="200" x2="110" y2="200" stroke="#7E9A8E" strokeOpacity="0.3" strokeWidth="1" />
        <line x1="290" y1="200" x2="340" y2="200" stroke="#7E9A8E" strokeOpacity="0.3" strokeWidth="1" />

        {/* Scholarly Metadata Coordinates */}
        <text x="200" y="348" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace" letterSpacing="2" opacity="0.6">
          NEUROCOGNITIVE FREQUENCY • 0.5 - 4.0 HZ (REM)
        </text>
        <text x="200" y="78" textAnchor="middle" fill="#7E9A8E" fontSize="7" fontFamily="monospace" letterSpacing="1" opacity="0.7">
          CONTINUITY HYPOTHESIS [DOMHOFF 2003]
        </text>
      </svg>
    </div>
  );
};
