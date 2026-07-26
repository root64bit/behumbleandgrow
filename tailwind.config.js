/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-navy': '#102A4C',
        'deep-navy': '#0B2342',
        'growth-green': '#078A5B',
        'emerald-custom': '#10B981',
        'soft-green': '#DFF8ED',
        'opportunity-gold': '#F5B942',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Manrope', 'Plus Jakarta Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
