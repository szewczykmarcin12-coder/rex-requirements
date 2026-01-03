/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rex-dark': '#0A1628',
        'rex-blue': '#395185',
        'rex-peach': '#FFBF99',
      }
    },
  },
  plugins: [],
}
