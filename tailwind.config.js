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
        primary_yellow_light:'#f7fa6e'
      },
      // filter: {
      //   'yellow_filter': 'invert-[91%] sepia-[36%] saturate[856%] hue-rotate-[2deg] brightness-[93%] contrast-[89%]'
      // }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.yellow-filter': {
          filter: 'invert(91%) sepia(36%) saturate(856%) hue-rotate(2deg) brightness(93%) contrast(89%)',
        },
      });
    },
  ],
}