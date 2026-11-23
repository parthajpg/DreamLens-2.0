import React from 'react';

export const MythologyArtwork: React.FC<{ className?: string }> = ({ className = "w-full h-auto" }) => {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      <svg 
        viewBox="0 0 400 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[340px] opacity-90 transition-transform duration-700 hover:scale-105"
      >
        <defs>
          <radialGradient id="sacredSanctum" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C99A53" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#8A4328" stopOpacity="0.25" />
            <stop offset="85%" stopColor="#18110B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0E0906" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="goldFiligree" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E5B869" />
            <stop offset="0.5" stopColor="#C99A53" />
            <stop offset="1" stopColor="#855F27" />
          </linearGradient>
        </defs>

        {/* Sanctum Atmospheric Aura */}
        <circle cx="200" cy="200" r="160" fill="url(#sacredSanctum)" />

        {/* Outer Square Sacred Mandala (Bhupura / Earth Portal) */}
        <rect x="40" y="40" width="320" height="320" stroke="#C99A53" strokeOpacity="0.25" strokeWidth="1" />
        <rect x="52" y="52" width="296" height="296" stroke="#8A4328" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4 8" />

        {/* 4 Cardinal Sacred Gates T-shapes */}
        <path d="M 180 40 V 28 H 220 V 40" stroke="#C99A53" strokeOpacity="0.5" strokeWidth="1.2" />
        <path d="M 180 360 V 372 H 220 V 360" stroke="#C99A53" strokeOpacity="0.5" strokeWidth="1.2" />
        <path d="M 40 180 H 28 V 220 H 40" stroke="#C99A53" strokeOpacity="0.5" strokeWidth="1.2" />
        <path d="M 360 180 H 372 V 220 H 360" stroke="#C99A53" strokeOpacity="0.5" strokeWidth="1.2" />

        {/* Concentric Celestial Rings */}
        <circle cx="200" cy="200" r="135" stroke="url(#goldFiligree)" strokeOpacity="0.4" strokeWidth="1" />
        <circle cx="200" cy="200" r="105" stroke="#C99A53" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="2 4" />
        <circle cx="200" cy="200" r="75" stroke="#E5B869" strokeOpacity="0.5" strokeWidth="1.2" />

        {/* 8-Petal Sacred Lotus Geometry (Ashta-dala Padma) */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <g key={i} transform={`rotate(${angle} 200 200)`}>
            <path 
              d="M 200 125 C 215 150 215 175 200 200 C 185 175 185 150 200 125 Z" 
              fill="#C99A53" 
              fillOpacity="0.12" 
              stroke="#E5B869" 
              strokeOpacity="0.45" 
              strokeWidth="1"
            />
          </g>
        ))}

        {/* Sacred Central Bindu (Cosmic Seed) */}
        <circle cx="200" cy="200" r="12" fill="#8A4328" stroke="#E5B869" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="4" fill="#FBF5EB" />

        {/* Traditional Scriptural Inscription Text */}
        <text x="200" y="345" textAnchor="middle" fill="#C99A53" fontSize="8" fontFamily="serif" letterSpacing="2" opacity="0.75">
          अग्निपुराणम् • अध्याय २२९ • स्वप्नाध्यायः
        </text>
        <text x="200" y="70" textAnchor="middle" fill="#E5B869" fontSize="7" fontFamily="serif" letterSpacing="2" opacity="0.7">
          SVAPNACINTĀMAṆI • JAGADDEVA (c. 1175 CE)
        </text>
      </svg>
    </div>
  );
};
