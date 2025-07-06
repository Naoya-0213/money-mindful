// カテゴリーアイコン一括管理用

export const CATEGORY_ICON_LIST = {
  // 食費アイコン
  food: {
    src: "/icon/categories/icon/food.png",
    alt: "食費アイコン",
    title: "食費",
  },

  // 飲み物アイコン
  drink: {
    src: "/icon/categories/icon/drink.png",
    alt: "飲み物アイコン",
    title: "飲み物",
  },

  // 飲み会アイコン
  beer: {
    src: "/icon/categories/icon/beer.png",
    alt: "飲み会アイコン",
    title: "飲み会",
  },

  // 買い物アイコン
  shopping: {
    src: "/icon/categories/icon/shopping.png",
    alt: "買い物アイコン",
    title: "買い物",
  },

  // 服アイコン
  clothing: {
    src: "/icon/categories/icon/clothing.png",
    alt: "服アイコン",
    title: "衣類",
  },

  // 交通費アイコン
  transportation: {
    src: "/icon/categories/icon/train.png",
    alt: "交通費アイコン",
    title: "交通費",
  },

  // お金アイコン
  money: {
    src: "/icon/categories/icon/money.png",
    alt: "お金アイコン",
    title: "手数料",
  },

  // 交際費アイコン
  social: {
    src: "/icon/categories/icon/social.png",
    alt: "交際費アイコン",
    title: "交際費",
  },

  // 趣味アイコン
  hobby: {
    src: "/icon/categories/icon/hobby.png",
    alt: "ゲーム機アイコン",
    title: "趣味",
  },

  // 娯楽アイコン
  entertainment: {
    src: "/icon/categories/icon/entertainment.png",
    alt: "温泉アイコン",
    title: "娯楽",
  },

  // その他
  others: {
    src: "/icon/categories/icon/others.png",
    alt: "その他アイコン",
    title: "その他",
  },
} as const;

export type CategoryType = keyof typeof CATEGORY_ICON_LIST;
