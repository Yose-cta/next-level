import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1440px' },
    },
    extend: {
      colors: {
        // ============ DARK theme (deep midnight purple) ============
        midnight: { DEFAULT: '#0a0820', 2: '#100d36', 3: '#161236', 4: '#1f1845' },
        cosmos: '#060418',

        // ============ LIGHT theme (warm bone) ============
        bone: { DEFAULT: '#f4f1ea', light: '#faf8f3', dark: '#ebe7dd' },
        paper: '#faf8f3',
        shell: '#ebe7dd',

        // ============ Text colors ============
        ink: { DEFAULT: '#1a1612', soft: '#2c2620' },
        charcoal: '#44403c',
        ash: '#78716c',          // ash for LIGHT bg
        smoke: 'rgba(255, 255, 255, 0.7)',  // smoke for DARK bg
        whisper: 'rgba(255, 255, 255, 0.45)',

        // ============ Brand accents (SOLO 2: electric + magenta) ============
        electric: { DEFAULT: '#f6cf2f', soft: 'rgba(246, 207, 47, 0.15)' },
        magenta: { DEFAULT: '#f3259a', soft: 'rgba(243, 37, 154, 0.15)' },
        gold: { DEFAULT: '#b08d4a', dark: '#8a6d3b', light: '#c9a967' },

        white: '#ffffff',
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Instrument Serif', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        editorial: '0.25em',
        wider2: '0.18em',
        tightest: '-0.04em',
        tight2: '-0.02em',
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 7vw, 6rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2rem, 5vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 3.5vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'display-sm': ['clamp(1.25rem, 2.5vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        orbit: 'orbit 60s linear infinite',
        'orbit-reverse': 'orbit-reverse 80s linear infinite',
        'orb-magenta': 'orb-magenta 22s ease-in-out infinite',
        'orb-electric': 'orb-electric 26s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        orbit: { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        'orbit-reverse': { from: { transform: 'rotate(360deg)' }, to: { transform: 'rotate(0deg)' } },
        'orb-magenta': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(60px, -40px) scale(1.1)' },
        },
        'orb-electric': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-50px, 50px) scale(1.05)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
      },
      boxShadow: {
        'soft': '0 1px 2px rgba(10, 8, 32, 0.06), 0 4px 12px rgba(10, 8, 32, 0.04)',
        'medium': '0 2px 4px rgba(10, 8, 32, 0.08), 0 12px 32px rgba(10, 8, 32, 0.10)',
        'lift': '0 4px 8px rgba(10, 8, 32, 0.10), 0 20px 60px rgba(10, 8, 32, 0.15)',
        'glow-electric': '0 10px 40px rgba(246, 207, 47, 0.3)',
        'glow-magenta': '0 10px 40px rgba(243, 37, 154, 0.3)',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.42, 0, 0.13, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}

export default config
