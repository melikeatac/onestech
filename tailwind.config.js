/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#dd728f',
          50: '#fbeff3',
          100: '#f7e0e7',
          200: '#f1c3d0',
          300: '#eaa7ba',
          400: '#e489a2',
          500: '#dd728f',
          600: '#c76582',
          700: '#b15873',
          800: '#8f475e',
          900: '#6f394a',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

