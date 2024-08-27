const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    colors: {
      current: "currentColor",
      transparent: "transparent",
      white: "#fff",
      black: "#000",
    },
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1216px",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)"], // this font-family is used for the footer
        work: ["var(--font-work-sans)"], // this font-family is used for the headings
        serif: ["var(--font-source-serif-pro)"], // this font-family is used for the body like ( p, li, etc. )
      },
      keyframes: {
        slideDown: {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        slideDown: "slideDown 300ms",
        slideUp: "slideUp 300ms",
      },
    },
  },

  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: [
      {
        light: {
          // ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: "#4B6BFB",
          "primary-content": "#FFFFFF",
          "primary-focus": "#405BD5",
          secondary: "#696A75",
          "secondary-focus": "#3B3C4A",
          "secondary-content": "#FFFFFF",
          accent: "#3CC288",
          "accent-focus": "#33A574",
          "accent-content": "#FFFFFF",
          neutral: "#181A2A",
          "neutral-focus": "#141624",
          "neutral-content": "#FFFFFF",
          "base-100": "#FFFFFF",
          "base-200": "#F6F6F7",
          "base-300": "#E8E8EA",
          "base-content": "#181A2A",
          info: "#181454",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",
        },
      },
      {
        dark: {
          // ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          primary: "#4B6BFB",
          "primary-content": "#FFFFFF",
          "primary-focus": "#405BD5",
          secondary: "#696A75",
          "secondary-focus": "#3B3C4A",
          "secondary-content": "#FFFFFF",
          accent: "#3CC288",
          "accent-focus": "#33A574",
          "accent-content": "#FFFFFF",
          neutral: "#181A2A",
          "neutral-focus": "#141624",
          "neutral-content": "#FFFFFF",
          "base-100": "#181A2A",
          "base-200": "#141624",
          "base-300": "#E8E8EA",
          "base-content": "#DCDDDF",
          info: "#FFFFFF",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",
        },
      },
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
    ],
    base: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: "",
    darkTheme: "light",
  },
  plugins: [
    require("daisyui"),
    // require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
    require("tailwindcss-animate"),
    require("tailwindcss-3d"),
    require("tailwindcss-radix")(),
    plugin(({ addVariant }) => {
      addVariant("mac", ".mac &");
      addVariant("windows", ".windows &");
      addVariant("ios", ".ios &");
    }),
  ],
};
