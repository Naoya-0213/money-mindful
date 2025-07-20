module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],
};

module.exports = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
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
