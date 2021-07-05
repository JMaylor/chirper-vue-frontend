const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        pink: colors.rose,
      },
      fontFamily: {
        sans: "Roboto, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color",
      },
      transitionProperty: {
        fill: "fill",
      },
    },
  },
  variants: {
    extend: {
      backgroundOpacity: ["group-focus-visible"],
      display: ["group-focus-visible"],
      ringColor: ["group-focus-visible"],
      ringWidth: ["group-focus-visible"],
      textColor: ["focus-visible", "group-focus-visible"],
      textDecoration: ["group-focus"],
    },
  },
  plugins: [require("tailwindcss-interaction-variants")],
};
