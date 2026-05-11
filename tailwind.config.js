/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#C9A96E',
          600: '#B8924A',
          700: '#9A7A3A',
          800: '#7C6230',
          900: '#5E4A20',
        },
        obsidian: {
          50:  '#f5f5f4',
          100: '#e7e5e4',
          200: '#d4d0cc',
          300: '#b4afa8',
          400: '#8c857c',
          500: '#6e6660',
          600: '#524d49',
          700: '#3d3936',
          800: '#2a2724',
          900: '#1a1714',
          950: '#0d0b09',
        },
        cream: {
          50:  '#fdfaf5',
          100: '#faf3e7',
          200: '#f4e4c8',
          300: '#eccfa0',
          400: '#e0b56c',
          500: '#d49a3d',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Amiri', 'Georgia', 'serif'],
        sans:    ['var(--font-jost)', 'Cairo', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-dm-mono)', 'Cairo', 'monospace'],
        arabic:  ['Amiri', 'serif'],
        'arabic-sans': ['Cairo', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.3em',
        ultra:  '0.5em',
      },
      animation: {
        'fade-in':   'fadeIn 0.6s ease-out forwards',
        'fade-up':   'fadeUp 0.7s ease-out forwards',
        'slide-right':'slideRight 0.5s ease-out forwards',
        'shimmer':   'shimmer 2s infinite linear',
      },
      keyframes: {
        fadeIn:     { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeUp:     { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideRight: { from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(0)' } },
        shimmer:    { '0%': { backgroundPosition: '-1000px 0' }, '100%': { backgroundPosition: '1000px 0' } },
      },
    },
  },
  plugins: [],
};
