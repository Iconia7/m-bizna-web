/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          rose: '#A7002A',      // YOUR NEW TEXT COLOR (Crimson)
          charcoal: '#020230ff',  // YOUR NEW NAV/FOOTER COLOR (Dark Blue)
          light: '#F5F5F5',
          white: '#FFFFFF'
        }
      },
      fontFamily: {
        creative: ['Outfit', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}