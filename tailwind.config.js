/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#8967B3',
        secondary: '#FF5580',
        darkPrimary: '#7c56aa',
        darkSecondary: '#eb4770',
      },
      fontFamily: {
        inter: ['inter', 'sans-serif'],
      },
    },
    screens: {
      xm: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
    },
  },
  plugins: [],
};
