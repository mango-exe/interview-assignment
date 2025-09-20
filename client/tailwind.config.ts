/** @type {import('tailwindcss').Config} */
import twAnimate from 'tw-animate-css'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-purple': '#E9E9FF',
        'brighter-purple': '#F8F8FF',
      },
    },
  },
  plugins: [
    twAnimate
  ],
}
