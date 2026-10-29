
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
theme: {
  extend: {
    keyframes: {
      "hero-reveal": {
        "0%": {
          opacity: "0",
          transform: "translateY(24px)",
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
    },
    animation: {
      "hero-reveal": "hero-reveal 0.9s ease-out both",
    },
  },
},

  plugins: [],
};
