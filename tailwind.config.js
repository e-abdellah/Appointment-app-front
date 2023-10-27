/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          '100': '#ffffff',
          '900': '#333333',
        },
        violet: {
          '600': '#8A2BE2',
        },
        indigo: {
          '600': '#4B0082',
        },
      },
    },
  },
  plugins: [],
}
