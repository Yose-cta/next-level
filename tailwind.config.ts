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
        noir: {
          DEFAULT: '#0a0a0a',
          2: '#141414',
          3: '#1a1a1a',
          4: '#22201d',
        },
        cream: {
          DEFAULT: '#f5f0e8',
          dim: 'rgba(245, 240, 232, 0.75)',
          mute: 'rgba(245, 240, 232, 0.55)',
        },
        mutedc: '#8a8580',
        champagne: {
          DEFAULT: '#d4b896',
          dim: 'rgba(212, 184, 150, 0.75)',
        },
        gold: '#c9a868',
        electric: {
          DEFAULT: '#ffd23f',
          soft: 'rgba(255, 210, 63, 0.15)',
        },
        magenta: {
          DEFAULT: '#ec4899',
          soft: 'rgba(236, 72, 153, 0.15)',
        },
        blood: {
          DEFAULT: '#dc2626',
          soft: 'rgba(220, 38, 38, 0.15)',
        },
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Fraunces', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-mono)', 'Spline Sans Mono', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        editorial: '0.25em',
        tightest: '-0.04em',
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 12vw, 9rem)', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.5rem, 7vw, 5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s infinite',
        'fade-up': 'fade-up 0.9s ease forwards',
        shimmer: 'shimmer 2.6s linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(255, 210, 63, 0.5)' },
          '70%': { boxShadow: '0 0 0 14px rgba(255, 210, 63, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(255, 210, 63, 0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'noise':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/><feColorMatrix values='0 0 0 0 0.95  0 0 0 0 0.94  0 0 0 0 0.91  0 0 0 0.045 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        'shimmer':
          'linear-gradient(110deg, transparent 30%, rgba(255,210,63,0.2) 50%, transparent 70%)',
      },
      boxShadow: {
        'glow-electric': '0 10px 30px rgba(255, 210, 63, 0.35)',
        'glow-magenta': '0 10px 30px rgba(236, 72, 153, 0.45)',
        'editorial': '0 30px 60px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}

export default config
