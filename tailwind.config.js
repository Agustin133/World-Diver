/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ocean-deep': '#001219',
        'ocean-blue': '#005f73',
        'ocean-teal': '#0a9396',
        'ocean-light': '#94d2bd',
      },
    },
  },
  plugins: [],
}
