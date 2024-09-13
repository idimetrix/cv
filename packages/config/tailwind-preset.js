const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./widgets/**/*.{js,ts,jsx,tsx}",

    "../../apps/web/app/**/*.{js,ts,jsx,tsx}",
    "../../apps/web/pages/**/*.{js,ts,jsx,tsx}",
    "../../apps/web/components/**/*.{js,ts,jsx,tsx}",
    "../../apps/web/widgets/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      full: "100% !important",
    },
    container: {
      center: true,
      padding: "1rem",
    },
    screens: {
      "2xs": "375px",
      // => @media (min-width: 375px) { ... }

      xs: "450px",
      // => @media (min-width: 450px) { ... }

      sm: "575px",
      // => @media (min-width: 576px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "992px",
      // => @media (min-width: 992px) { ... }

      xl: "1200px",
      // => @media (min-width: 1200px) { ... }

      "2xl": "1400px",
      // => @media (min-width: 1400px) { ... }
    },
    // extend: {
    //   boxShadow: {
    //     signUp: "0px 5px 10px rgba(4, 10, 34, 0.2)",
    //     one: "0px 2px 3px rgba(7, 7, 77, 0.05)",
    //     sticky: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
    //   },
    // },

    extend: {
      fontWeight: {
        inherit: "inherit",
      },
      // Goto https://javisperez.github.io/tailwindcolorshades to generate colors
      colors: {
        current: "currentColor",
        transparent: "transparent",
        white: "#fff",
        black: "#000",

        // APP
        border: "#ddd",
        dark1: "#051036",
        dark2: "#0d2857",
        dark3: "#13357b",
        dark4: "#163c8c",
        light1: "#697488",
        light2: "#f5f5f5",
        light3: "#fbfcff",
        blue1: "#3554d1",
        blue2: "#e5f0fd",
        green1: "#ebfcea",
        green2: "#008009",
        yellow1: "#f8d448",
        yellow2: "#e1c03f",
        yellow3: "#ffc700",
        yellow4: "#fff8dd",
        brown1: "#923e01",
        purple1: "#7e53f9",
        red1: "#d93025",
        red2: "#f1416c",
        red3: "#fff5f8",
        info1: "#cde9f6",
        info2: "#4780aa",
        warning1: "#f7f3d7",
        warning2: "#927238",
        error1: "#ecc8c5",
        error2: "#ab3331",
        success1: "#def2d7",
        success2: "#5b7052",

        // TOKEN
        acorn: "#f0a83d",
        pearl: "#6F6F6F",
        armor: "#040301",
        aluminum: "#C4C6CA",
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
        wiggle: {
          "0%, 100%": { transform: "rotate(-8deg)" },
          "50%": { transform: "rotate(8deg)" },
        },
      },
      animation: {
        slideDown: "slideDown 300ms",
        slideUp: "slideUp 300ms",
        wiggle: "wiggle .75s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
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
  variants: {
    scrollbar: ["dark"],
  },
};
