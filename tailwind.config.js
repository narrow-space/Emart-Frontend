/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'xs': "400px",
      'sm': '414px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      'custom': { 'min': '360px', 'max': '800px' },
    },
  },
  daisyui: {
    themes: [
      "light",
      "dark",
    ],
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/forms'),
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          '-ms-overflow-style': 'none',  // IE and Edge
          'scrollbar-width': 'none',     // Firefox
          '&::-webkit-scrollbar': {
            display: 'none',  // Chrome, Safari, and Opera
          },
        },
      })
    },
  ],
}
