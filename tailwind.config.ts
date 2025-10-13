import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f7f7f8',
        ink: '#111113',
        muted: '#6b7280',
        accent: '#fff34d',     // yellow marker
        accentSoft: '#fffbd1'  // soft yellow
      },
      fontFamily: {
        sans: ['Inter','ui-sans-serif','system-ui','sans-serif'],
      },
      spacing: {
        sectionY: 'min(9vw, 120px)',
        g: '32px'
      },
      borderRadius: {
        xl2: '1rem'
      },
      boxShadow: {
        card: '0 12px 30px rgba(0,0,0,.06)'
      }
    }
  },
  plugins: []
} satisfies Config
