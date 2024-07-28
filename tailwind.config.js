/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
        extend: {
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif'],
            },
            colors: {
                leafGreen: '#4b734e',
                leafFillGreen: '#1c5721',
            },
      },
  },
  plugins: [],
  }