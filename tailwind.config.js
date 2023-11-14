/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "login-bg": "url(/public/assets/login/login-bg.svg)",
        "not-found-bg2": "url(/public/assets/notfound/not-found-bg2.png)",
        "dotted-paper": "url(/public/assets/Home/dotted-paper.png)",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs")],
};
