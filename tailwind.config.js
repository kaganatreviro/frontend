/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xl40: ["40px", "1.2"],
      },
      fontWeight: {
        medium: 500,
      },
    },
  },
  plugins: [],
};
