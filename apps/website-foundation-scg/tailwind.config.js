const { colors } = require("./src/theme/color");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        neutralText: colors.neutralText,
        background: colors.background,
      },
      fontFamily: {
        heading: ["System", "sans-serif"],
        body: ["System", "sans-serif"],
      },
    },
  },
  plugins: [],
};
