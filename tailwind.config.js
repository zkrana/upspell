/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "640px",
      md: { max: "768px" },
      "max-md": { max: "1023px" },
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      web: "1440px",
      tab: "834px",
    },
    extend: {
      colors: {
        primarycolor: "#F26522",
        'primary-text-color': "#707070",
        'secendary-bgcolor': "#2C2C2C",
        borderColor: "#DCE2E8",
      },
    },
  },
  plugins: [],
};
