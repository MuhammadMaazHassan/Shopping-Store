module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1fdf4",
          100: "#dcf7e3",
          200: "#b9ebc1",
          300: "#85d595",
          400: "#4fb367",
          500: "#30964a",
          600: "#26763c",
          700: "#205f31",
          800: "#1b5129",
          900: "#173f20",
        },
      },
      boxShadow: {
        glow: "0 20px 80px rgba(56, 189, 248, 0.18)",
      },
      backgroundImage: {
        hero: "radial-gradient(circle at top left, rgba(74, 222, 128, 0.18), transparent 18%), radial-gradient(circle at bottom right, rgba(14, 165, 233, 0.14), transparent 25%)",
      },
    },
  },
  plugins: [],
};
