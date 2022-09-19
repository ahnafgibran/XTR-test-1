/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        primaryDark: '#282C37',
        secondaryDark: '#313541',
        navText: '#8298A0',
        activeNav: '#72CDD2',
        activePlace: '#1C1F27',
      },
    },
  },
  plugins: [],
}