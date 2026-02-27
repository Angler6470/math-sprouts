/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        garden: {
          soft: '#F0FDF4',
          green: '#4ADE80',
          yellow: '#FDE047',
          earth: '#78350F',
        }
      },
      animation: {
        'fall-lightly': 'fall-lightly 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'bounce-light': 'bounce-light 2s ease-in-out infinite',
      },
      keyframes: {
        'fall-lightly': {
          '0%': { 
            transform: 'translateY(-150px) scale(0.3) rotate(0deg)',
            opacity: '0'
          },
          '50%': {
            opacity: '1'
          },
          '100%': { 
            transform: 'translateY(0) scale(1) rotate(360deg)',
            opacity: '1'
          }
        },
        'bounce-light': {
          '0%, 100%': { 
            transform: 'translateY(0px)',
          },
          '50%': { 
            transform: 'translateY(-3px)',
          }
        }
      }
    }
  },
  plugins: [],
}
