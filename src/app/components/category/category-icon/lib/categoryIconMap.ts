// カテゴリーアイコン一括管理用

export const categoryIconMap = {
  // 飲み物アイコン
  drink: { src: "/icon/categories/icon/drink.png", alt: "飲み物アイコン" },

  // 飲み会アイコン
  beer: { src: "/icon/categories/icon/beer.png", alt: "飲み会アイコン" },

  // 食費アイコン
  food: { src: "/icon/categories/icon/food.png", alt: "食費アイコン" },

  // 交通費アイコン
  train: { src: "/icon/categories/icon/train.png", alt: "交通費アイコン" },

  // 買い物アイコン
  shopping: { src: "/icon/categories/icon/shopping.png", alt: "買い物アイコン" },

  // お金アイコン
  money: { src: "/icon/categories/icon/money.png", alt: "お金アイコン" },

  // 交際費アイコン
  social: { src: "/icon/categories/icon/social.png", alt: "交際費アイコン" },

  // 服アイコン
  clothing: { src: "/icon/categories/icon/clothing.png", alt: "服アイコン" },
} as const;

export type CategoryType = keyof typeof categoryIconMap;
