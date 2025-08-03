export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin-slow 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 1s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'gradient-shift': 'gradientShift 15s ease infinite',
      },
      keyframes: {
        'spin-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'sparkle': {
          '0%, 100%': { 
            opacity: '0',
            transform: 'scale(0)'
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1)'
          },
        },
        'heartbeat': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'fadeInUp': {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'shimmer': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        'gradientShift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      fontFamily: {
        'handwriting': ['Dancing Script', 'cursive'],
        'romantic': ['Great Vibes', 'cursive'],
      },
      colors: {
        'romantic': {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
      },
      backgroundImage: {
        'gradient-romantic': 'linear-gradient(45deg, #ff6b9d, #ff8fab, #ffb3c1, #e91e63)',
        'gradient-hearts': 'radial-gradient(circle, #ff6b9d 0%, #ff8fab 50%, #ffb3c1 100%)',
      },
      boxShadow: {
        'romantic': '0 4px 15px rgba(255, 107, 157, 0.3)',
        'romantic-lg': '0 8px 32px rgba(255, 107, 157, 0.2)',
        'romantic-xl': '0 12px 40px rgba(255, 107, 157, 0.3)',
      },
    },
  },
  plugins: [],
}