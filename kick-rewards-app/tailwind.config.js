/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kick: {
          primary: '#53fc18',
          secondary: '#00ff41',
          dark: '#0f0f23',
          darker: '#0a0a1a',
          accent: '#ff6b6b',
          gold: '#ffd700',
        }
      },
      fontFamily: {
        'gaming': ['Orbitron', 'monospace'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}