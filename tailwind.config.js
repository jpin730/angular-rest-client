/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: '#3f51b5',
        accent: '#ff4081',
        warn: '#f44336',
        dark: 'rgba(31,41,55, 1)',
      },
    },
  },
};
