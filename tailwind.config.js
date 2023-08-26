/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  purge: {
    mode: 'all',
    preserveHtmlElements: false,
    content: [
      './src/**/*.js',
      './node_modules/flatpickr/**/*.js',
    ],
  },
}

