/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Layer 1: Global Identity
        global: {
          bg: '#070a0f',
          surface: '#0d131f',
          elevated: '#162132',
          border: 'rgba(255, 255, 255, 0.08)',
          text: '#f0f2f5',
          muted: '#8492a6',
          astral: '#38bdf8',
        },
        // Layer 2: Psychology Realm (The Architecture of Memory)
        psychology: {
          deepInk: '#273D4C',
          dustyTeal: '#668F9C',
          frostBlue: '#C6DCE1',
          fadedViolet: '#B4A5C8',
          porcelain: '#E7E4E1',
          // Architectural mappings
          bg: '#182631',
          surface: '#273D4C',
          surfaceLight: '#E7E4E1',
          card: '#1F313E',
          cardHover: '#2A4252',
          border: 'rgba(198, 220, 225, 0.25)',
          borderMuted: 'rgba(102, 143, 156, 0.2)',
          sage: '#C6DCE1', // Frost Blue accent
          silver: '#E7E4E1', // Porcelain Gray
          textMuted: '#9AB3BE',
          glow: 'rgba(102, 143, 156, 0.15)',
        },
        // Layer 3: Sacred Mythology Realm (Warm, Luminous, Manuscript & Temple Gold)
        mythology: {
          // Luminous Manuscript Base
          bg: '#140c07',
          surface: '#1c120a',
          card: '#24170d',
          cardHover: '#2e1e12',
          // Parchment & Sandstone
          parchment: '#fcf8f0',
          parchmentWarm: '#f3e8d2',
          parchmentMuted: '#d5c29f',
          // Sacred Metals & Earth
          gold: '#e5b358',
          goldBright: '#fcd34d',
          goldDark: '#92631a',
          copper: '#c97a3e',
          terracotta: '#9c4424',
          terracottaLight: '#c25832',
          vermilion: '#b91c1c',
          // Deep ceremonial backdrop
          indigo: '#0f172a',
          border: 'rgba(229, 179, 88, 0.28)',
          borderBright: 'rgba(229, 179, 88, 0.55)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        'serif-psych': ['"Instrument Serif"', 'Cormorant Garamond', 'Georgia', 'serif'],
        'display-psych': ['"Instrument Serif"', 'Georgia', 'serif'],
        'sans-psych': ['Manrope', 'Plus Jakarta Sans', 'sans-serif'],
        'serif-myth': ['Mordial', 'Rozha One', 'Cinzel Decorative', 'serif'],
        'body-myth': ['Lora', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
        tamil: ['Noto Serif Tamil', 'serif']
      },
      boxShadow: {
        'psych-depth': '0 25px 60px -15px rgba(6, 8, 16, 0.95), 0 0 35px -5px rgba(99, 102, 241, 0.15)',
        'myth-radiance': '0 25px 60px -15px rgba(20, 12, 7, 0.95), 0 0 45px -5px rgba(229, 179, 88, 0.2)',
        'portal-hover': '0 30px 70px -10px rgba(0, 0, 0, 0.8)',
        'manuscript': '0 20px 40px -10px rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(229, 179, 88, 0.05)',
      },
      backgroundImage: {
        'psych-gradient': 'linear-gradient(180deg, rgba(12, 16, 29, 0.95) 0%, rgba(6, 8, 16, 0.98) 100%)',
        'myth-gradient': 'linear-gradient(180deg, rgba(28, 18, 10, 0.95) 0%, rgba(20, 12, 7, 0.98) 100%)',
        'gold-shimmer': 'linear-gradient(135deg, #e5b358 0%, #fff1cb 50%, #c97a3e 100%)',
        'silver-shimmer': 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)',
      }
    },
  },
  plugins: [],
};
