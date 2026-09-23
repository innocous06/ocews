/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#030303',
          900: '#070708',
          850: '#0d0d10',
          800: '#141417',
          700: '#1e1e24',
          600: '#2c2c34',
        },
        amber: {
          350: '#fcd34d',
          400: '#fbbf24',
          450: '#f59e0b',
          500: '#d97706',
          950: '#231203',
        }
      },
      fontFamily: {
        display: ['Instrument Serif', 'Newsreader', 'Georgia', 'serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      }
    },
  },
  plugins: [],
}
