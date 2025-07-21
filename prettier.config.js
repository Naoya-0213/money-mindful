// prettier.config.js
module.exports = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports"
  ],
  importOrder: [
    "^react",
    "^next",
    "<THIRD_PARTY_MODULES>",
    "^@/app/(.*)",
    "^@/utils/(.*)",
    "^@/components/(.*)",
    "^@/types/(.*)",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};