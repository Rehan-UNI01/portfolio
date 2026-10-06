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
        // Sonny Boy inspired pastel palette
        sonny: {
          bg: '#FAF8F5',          // Warm paper canvas
          canvas: '#F4F0EA',      // Secondary warm paper
          card: 'rgba(255, 255, 255, 0.85)',
          sky: '#93C5FD',         // Washed summer sky blue
          skyDeep: '#60A5FA',
          cerulean: '#38BDF8',
          peach: '#FDBA74',       // Sunlit summer peach / apricot
          coral: '#FCA5A5',       // Soft washed coral
          lavender: '#DDD6FE',    // Twilight nostalgia dusk
          purple: '#C4B5FD',
          mint: '#86EFAC',        // Summer grassland green
          sage: '#A7F3D0',
          butter: '#FEF08A',      // Sunlight warmth
          sand: '#FDE68A',
          ink: '#1E2430',         // Deep editorial ink
          inkMuted: '#475569',    // Soft pencil gray
          inkFaint: '#94A3B8',    // Very soft text
          border: 'rgba(30, 36, 48, 0.08)',
          borderHover: 'rgba(99, 102, 241, 0.25)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
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
