/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Outfit"', 'sans-serif'],
        serif: ['"Playfair Display"', '"Cinzel"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
      },
      colors: {
        resort: {
          gold: '#c49b55',
          'gold-hover': '#b89047',
          'gold-light': '#dfbe82',
          dark: '#0a0d14',
          navy: '#111622',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
