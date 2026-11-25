/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#07162c',
        navy: {
          950: '#040d1a',
          900: '#07162c',
          850: '#0a1d38',
          800: '#0d2446',
          700: '#112f5a',
        },
        royal: {
          DEFAULT: '#1D63D8',
          hover: '#2563EB',
          glow: 'rgba(29, 99, 216, 0.35)',
          light: '#3B82F6',
        },
        gold: {
          DEFAULT: '#F2C14E',
          glow: 'rgba(242, 193, 78, 0.35)',
          dark: '#D9A429',
          light: '#F8D67D',
        },
        surface: {
          dark: '#08162b',
          card: '#0c1f3d',
          border: 'rgba(255, 255, 255, 0.1)',
          lighter: '#10294f'
        },
        accent: {
          DEFAULT: '#F2C14E',
          royal: '#1D63D8',
          glow: 'rgba(242, 193, 78, 0.3)'
        },
        light: {
          DEFAULT: '#F4F7FC',
          muted: '#D7E1F0',
          subtle: '#8EA4C4'
        }
      },
      fontFamily: {
        display: ['Bebas Neue', 'Oswald', 'Impact', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'Manrope', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
