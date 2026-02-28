/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0f18',
        surface: '#121824',
        gold: {
          light: '#f2dfa7',
          DEFAULT: '#d4af37',
          dark: '#b39029',
        },
        charcoal: '#1a1f2b'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        wide: '0.05em',
        wider: '0.1em',
        widest: '0.25em',
      }
    },
  },
  plugins: [],
}

