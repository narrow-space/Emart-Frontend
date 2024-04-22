/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'sm': '414px',
      // => @media (min-width: 640px) { ... }

      'md': '911px',
      // => @media (min-width: 1024px) { ... }

      'lg': '1279px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  daisyui: {
    themes: [
      "light",
      "dark",
    ],
  },
  
  plugins: [require("daisyui")
  ,require('@tailwindcss/forms')


],

}