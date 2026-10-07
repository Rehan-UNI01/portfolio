/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Sonny Boy Anime Aesthetic Palette
        sonny: {
          sky: '#1A66FF',
          skyVivid: '#00A3FF',
          skyLight: '#38BDF8',
          turquoise: '#00CC99',
          crimson: '#FF3B30',
          paper: '#F5F4F0',
          paperLight: '#FFFDF7',
          paperWarm: '#FAF7EE',
          ink: '#0D0F12',
          black: '#000000',
          yellow: '#FFD026',
          amber: '#F59E0B',
          muted: '#525B6A',
          halftone: 'rgba(13, 15, 18, 0.18)',
        },
      },
      fontFamily: {
        title: ['"Dela Gothic One"', 'cursive'],
        marker: ['"Permanent Marker"', 'cursive'],
        sketch: ['"Patrick Hand"', '"Gaegu"', 'cursive'],
        hand: ['"Gaegu"', '"Patrick Hand"', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 8s ease-in-out infinite',
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
      boxShadow: {
        'sonny-sm': '0 2px 8px -1px rgba(30, 36, 48, 0.04), 0 1px 4px -1px rgba(30, 36, 48, 0.03)',
        'sonny-card': '0 10px 30px -5px rgba(100, 116, 139, 0.08), 0 4px 12px -2px rgba(100, 116, 139, 0.04)',
        'sonny-hover': '0 18px 40px -8px rgba(100, 116, 139, 0.16), 0 8px 18px -3px rgba(100, 116, 139, 0.08)',
        'sonny-pastel-sky': '0 12px 30px -6px rgba(147, 197, 253, 0.45)',
        'sonny-pastel-peach': '0 12px 30px -6px rgba(253, 186, 116, 0.45)',
        'sonny-pastel-lavender': '0 12px 30px -6px rgba(221, 214, 254, 0.5)',
      },
    },
  },
  plugins: [],
}
