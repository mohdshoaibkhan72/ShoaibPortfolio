// tailwind.config.js
const v = (name) => `rgb(var(${name}) / <alpha-value>)`;
const slate = Object.fromEntries(
  [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((n) => [n, v(`--slate-${n}`)])
);

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: { slate, white: v("--c-white"), black: v("--c-black") },
    },
  },
  plugins: [],
};
