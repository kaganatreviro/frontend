/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          1000: "#0c4a6e", // пример цвета, замените на свой
          900: "#0d5a7e",
          800: "#0e6a8e",
        },
        secondary: {
          1000: "#3c2a1e",
          900: "#4d3b2f",
          800: "#5e4c3f",
        },
        grey: {
          1000: "#000000",
          900: "#3B3B3B",
          800: "#545454",
          700: "#6E6E6E",
          600: "#878787",
          500: "#A1A1A1",
          400: "#BABABA",
          300: "#D3D3D3",
          200: "#E7E7E7",
        },
        // Добавьте другие цвета по аналогии
      },
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
