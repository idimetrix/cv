module.exports = {
  tailwindConfig: "./packages/config/tailwind-preset.js",
  importOrder: [
    "^@(cb)/(.*)$",
    "^@lib/(.*)$",
    "^@components/(.*)$",
    "^@(server|trpc)/(.*)$",
    "^~/(.*)$",
    "^[./]",
  ],
  plugins: [
    "prettier-plugin-organize-imports",
    require.resolve("@trivago/prettier-plugin-sort-imports"),
    "prettier-plugin-tailwindcss",
  ],
  importOrderSeparation: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  bracketSpacing: true,
  bracketSameLine: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "es5",
  semi: true,
  printWidth: 110,
  arrowParens: "always",
  overrides: [
    {
      files: "*.svg",
      options: {
        parser: "html",
      },
    },
  ],
};
