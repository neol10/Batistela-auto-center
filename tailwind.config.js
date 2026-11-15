/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '360px',
      'sm-phone': '390px',
      'md-phone': '430px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        obsidian: 'var(--bg-obsidian)',
        carbon: 'var(--bg-carbon)',
        graphite: 'var(--bg-graphite)',
        'accent-red': 'var(--accent-red)',
        'accent-red-glow': 'var(--accent-red-glow)',
        'text-white': 'var(--text-white)',
        'text-chrome': 'var(--text-chrome)',
        'border-metallic': 'var(--border-metallic)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Syne', 'system-ui', 'sans-serif'],
        sans: ['Inter', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        // Fluid typography using clamp()
        'fluid-display': 'clamp(2.5rem, 6vw + 1rem, 5.5rem)',
        'fluid-h1': 'clamp(2rem, 4vw + 0.8rem, 3.75rem)',
        'fluid-h2': 'clamp(1.5rem, 2.5vw + 0.6rem, 2.5rem)',
        'fluid-h3': 'clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem)',
        'fluid-body': 'clamp(0.95rem, 0.4vw + 0.85rem, 1.125rem)',
        'fluid-small': 'clamp(0.8rem, 0.25vw + 0.75rem, 0.925rem)',
      },
      boxShadow: {
        'red-glow': '0 0 28px -4px var(--accent-red-glow)',
        'red-glow-lg': '0 0 48px -6px var(--accent-red-glow)',
        'metallic': '0 4px 20px -2px rgba(0, 0, 0, 0.7), 0 0 0 1px var(--border-metallic)',
      },
      transitionTimingFunction: {
        'cinema-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'cinema-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
    },
  },
  plugins: [],
};
