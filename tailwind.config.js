/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ancient-gold': '#D4AF37',
        'saffron': '#FF9933',
        'burnt-orange': '#CC5500',
        'sandstone': '#C19A6B',
        'charcoal': '#1a1a1a',
        'deep-black': '#0a0a0a',
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'ancient-serif': ['Cinzel', 'Cormorant Garamond', 'serif'],
        'ancient-accent': ['Noto Sans Devanagari', 'Hind', 'sans-serif'],
        'body': ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

