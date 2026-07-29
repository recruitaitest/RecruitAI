import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        background: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-hover': 'var(--color-surface-hover)',
        'secondary-surface': 'var(--color-surface-hover)',
        border: 'var(--color-border)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        muted: 'var(--color-text-secondary)',
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-soft': 'var(--color-primary-soft)',
        'ai-accent': 'var(--color-ai-accent)',
        'ai-accent-soft': 'var(--color-ai-accent-soft)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        info: 'var(--color-info)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'elevated': 'var(--shadow-elevated)',
      },
      spacing: {
        '18': '4.5rem',
      },
      transitionDuration: {
        'fast': '120ms',
        'base': '200ms',
        'slow': '320ms',
        'page': '400ms',
      },
      transitionTimingFunction: {
        'standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'emphasized': 'cubic-bezier(0.2, 0, 0, 1)',
        'decelerate': 'cubic-bezier(0, 0, 0.2, 1)',
      }
    },
  },
  plugins: [],
}
export default config
