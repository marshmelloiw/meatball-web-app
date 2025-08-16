/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        meatball: {
          primary: '#8A98DB',
          secondary: '#A36FDB', 
          tertiary: '#63C3DB',
          accent: '#4860D9',
          dark: '#5E48D9',
          darker: '#488DD9',
          light: '#B8C4F0',
          background: '#1a1625',
          surface: '#252036',
          border: '#3d3552'
        },
        // Keep some basic colors for compatibility
        purple: {
          primary: '#8A98DB',
          secondary: '#A36FDB',
          tertiary: '#63C3DB'
        }
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
        'pulse-soft': 'pulseSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        }
      },
      boxShadow: {
        'meatball': '0 4px 20px rgba(138, 152, 219, 0.15)',
        'meatball-lg': '0 8px 40px rgba(138, 152, 219, 0.2)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}