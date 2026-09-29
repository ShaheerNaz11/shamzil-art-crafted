/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          primary: '#6C3BAA',
          deep: '#3B1D5A',
          light: '#EDE4F7',
          lavender: '#DCC9F2',
          accent: '#8E5CC2',
        },
        background: '#FAF8FC',
        text: {
          main: '#241A2D',
          secondary: '#6F6575'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
