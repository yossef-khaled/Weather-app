/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#0e2648',
        'secondary-color': '#2a497b',
        'light-gray': '#f2f3f5',
        'medium-gray': '#6f7681'
      },
      padding: {
        '1rem': '1rem',
        '2rem': '2rem',
        '3rem': '3rem',
        '4rem': '4rem',
      },
      margin: {
        '1rem': '1rem',
        '2rem': '2rem',
        '3rem': '3rem',
        '4rem': '4rem',
      },
      animation: {
        shimmer: 'shimmer 5s both infinite alternate'
      },
      keyframes: {
        shimmer: {
          '0%': {
            'background-position-x': '-1000px'
          },
          '100%': {
            'background-position-x': '1000px'
          }
        },
      }
    },
  },
  plugins: [],
}

