/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F7F7F5',
        ink: {
          0: '#FFFFFF',
          400: '#8A8A85',
          700: '#3F3F3C',
          900: '#1E1E1C',
        },
        brand: {
          100: '#E4E9FF',
          300: '#AAB8FF',
          600: '#4C5FD5',
          700: '#3C4CB0',
          800: '#2F3C8C',
        },
        leaf: {
          50: '#EAF7EE',
          600: '#1F9D55',
        },
        amber: {
          50: '#FFF6E5',
          600: '#C77A0A',
        },
        rose: {
          50: '#FDEBEC',
          500: '#E5545F',
          600: '#D93E4C',
          700: '#B72F3C',
        },
      },
      borderRadius: {
        card: '14px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(20, 20, 18, 0.06), 0 8px 24px rgba(20, 20, 18, 0.04)',
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
