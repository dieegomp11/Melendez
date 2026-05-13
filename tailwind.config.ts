import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:       '#070610',
        midnight:  '#0d0b1e',
        profile:   '#090815',
        cream:     '#f0ede8',
        gold:      '#C9A84C',
        'gold-lt': '#e8c96a',
        'gold-dim':'#8a6d2e',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'Bebas Neue', 'sans-serif'],
        body:    ['var(--font-outfit)', 'Outfit', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'stripe-profile':
          'repeating-linear-gradient(0deg,transparent,transparent 47px,rgba(255,255,255,0.018) 47px,rgba(255,255,255,0.018) 48px)',
      },
    },
  },
  plugins: [],
}

export default config
