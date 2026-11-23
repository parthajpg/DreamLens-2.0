import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const PraharaClock: React.FC<{ selectedPrahara?: number; onSelect?: (prahara: number) => void }> = ({
  selectedPrahara = 4,
  onSelect,
}) => {
  const [activeHover, setActiveHover] = useState<number | null>(null);

  const praharas = [
    {
      num: 1,
      name: 'Prathama Prahara',
      sanskrit: 'प्रथम प्रहर',
      hours: '6:00 PM – 9:00 PM',
      manifestation: 'Manifests within 1 Year',
      desc: 'Early evening dreams reflecting recent waking digestion and thoughts.',
      accent: 'text-amber-300',
    },
    {
      num: 2,
      name: 'Dvitiya Prahara',
      sanskrit: 'द्वितीय प्रहर',
      hours: '9:00 PM – 12:00 AM',
      manifestation: 'Manifests within 6 Months',
      desc: 'Deep sleep phase governed by physiological humors (Tridoshas). Moderately fruit-bearing.',
      accent: 'text-amber-400',
    },
    {
      num: 3,
      name: 'Tritiya Prahara',
      sanskrit: 'तृतीय प्रहर',
      hours: '12:00 AM – 3:00 AM',
      manifestation: 'Manifests within 3 Months',
      desc: 'Inner subconscious clarity as bodily fatigue subsides. Highly symbolic and potent.',
      accent: 'text-orange-400',
    },
    {
      num: 4,
      name: 'Chaturtha / Brahma Muhurta',
      sanskrit: 'चतुर्थ प्रहर • ब्रह्ममुहूर्त',
      hours: '3:00 AM – 6:00 AM',
      manifestation: 'Manifests within 10 to 15 Days',
      desc: 'Highest sacred potency. Serene dawn mind (Sattvic). True prophetic and auspicious omens.',
      accent: 'text-mythology-goldBright',
    },
  ];

  const current = praharas.find((p) => p.num === (activeHover ?? selectedPrahara)) || praharas[3];

  return (
    <div className="rounded-xl p-6 sm:p-7 border border-mythology-border bg-gradient-to-b from-[#26180e] to-[#170e08] shadow-myth-radiance relative overflow-hidden">
      
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6 pb-4 border-b border-mythology-gold/20">
        <div>
          <h4 className="text-base font-serif-myth font-bold text-mythology-goldBright tracking-wide">
            Prahara Temporal Timing (अग्निपुराण २२९)
          </h4>
          <span className="text-xs font-mono text-mythology-parchmentMuted">
            Select the night watch when your dream occurred
          </span>
        </div>
        <div className="text-xs font-mono text-mythology-copper">
          Manifestation Horizons
        </div>
      </div>

      {/* 4 Interactive Watch Astrolabe Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-5">
        {praharas.map((p) => {
          const isSelected = selectedPrahara === p.num;
          return (
            <button
              key={p.num}
              type="button"
              onClick={() => onSelect && onSelect(p.num)}
              onMouseEnter={() => setActiveHover(p.num)}
              onMouseLeave={() => setActiveHover(null)}
              className={`p-3.5 rounded-lg text-left border transition-all duration-200 relative overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-b from-mythology-gold/20 to-mythology-terracotta/25 border-mythology-gold shadow-md'
                  : 'bg-black/40 border-mythology-gold/15 hover:border-mythology-gold/30 hover:bg-black/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-mythology-gold font-bold">
                  WATCH {p.num}
                </span>
                {p.num === 4 ? (
                  <Sun className="w-3.5 h-3.5 text-mythology-goldBright" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-mythology-parchmentMuted" />
                )}
              </div>
              <div className="text-xs font-serif-myth font-semibold text-white mb-0.5">
                {p.name.split('/')[0]}
              </div>
              <div className="text-[11px] font-sans text-mythology-parchmentMuted mb-2">
                {p.hours}
              </div>
              <div className="text-[10px] font-mono text-emerald-400 font-medium">
                {p.manifestation}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Watch Shastric Exposition Banner */}
      <div className="p-4 rounded-lg bg-black/60 border border-mythology-gold/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-serif-myth font-bold text-mythology-goldBright text-sm">
              {current.sanskrit}
            </span>
            <span className="text-[11px] font-mono text-mythology-parchmentMuted">
              ({current.hours})
            </span>
          </div>
          <p className="text-xs font-body-myth text-mythology-parchment leading-relaxed">
            {current.desc}
          </p>
        </div>
        <div className="shrink-0 sm:text-right">
          <div className="text-xs font-mono font-semibold text-emerald-300">
            {current.manifestation}
          </div>
        </div>
      </div>

    </div>
  );
};
