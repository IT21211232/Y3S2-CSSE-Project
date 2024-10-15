/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_yellow: '#DEE140',
      },
      filter: {
        'yellow_filter': 'invert(91%) sepia(36%) saturate(856%) hue-rotate(2deg) brightness(93%) contrast(89%)'
      }
    },
  },
  plugins: [],
}