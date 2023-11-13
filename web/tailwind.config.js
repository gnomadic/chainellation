/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      // new
      cream: "#F5DFB3",
      lightcream: "#F5DFB3bf",
      fuzzygray: "#fdfefe73",
      boldred: "#801318",
      boldorange: "#EA8F21",
      gray: "#969696",
      offwhite: "#FEFEFE",
      slate: "#00101C",
      lightgray: "#969696",
      niceblack: "#0a0a0abf",
      black: "#000000",
      clearslate: "#00101Cbf",
    },
    fontFamily: {
      bungee: ['"Bungee Shade"', "sans-serif"],
      custom2: ["Jost", "sans-serif"],
      roboto: ["Roboto Condensed", "sans-serif"],
      geo: ["Geologica", "sans-serif"],
      arb: ["arb66", "sans-serif"],
    },
  },
  plugins: [],
};
