// ===== カテゴリーアイコン管理 =====

export const CATEGORY_LIST = [
  // 食費アイコン
  {
    name: "food",
    icon: {
      src: "/icon/categories/icon/food.png",
      alt: "食費アイコン",
    },
    title: "食費",
    id: "category-1",
  },

  // 飲み物アイコン
  {
    name: "drink",
    icon: {
      src: "/icon/categories/icon/drink.png",
      alt: "飲み物アイコン",
    },
    title: "飲み物",
    id: "category-2",
  },

  // 飲み会アイコン
  {
    name: "beer",
    icon: {
      src: "/icon/categories/icon/beer.png",
      alt: "飲み会アイコン",
    },
    title: "飲み会",
    id: "category-3",
  },

  // 買い物アイコン
  {
    name: "shopping",
    icon: {
      src: "/icon/categories/icon/shopping.png",
      alt: "買い物アイコン",
    },
    title: "買い物",
    id: "category-4",
  },

  // 服アイコン
  {
    name: "clothing",
    icon: {
      src: "/icon/categories/icon/clothing.png",
      alt: "服アイコン",
    },
    title: "衣類",
    id: "category-5",
  },

  // 交通費アイコン
  {
    name: "transportation",
    icon: {
      src: "/icon/categories/icon/train.png",
      alt: "交通費アイコン",
    },
    title: "交通費",
    id: "category-6",
  },

  // お金アイコン
  {
    name: "money",
    icon: {
      src: "/icon/categories/icon/money.png",
      alt: "お金アイコン",
    },
    title: "手数料",
    id: "category-7",
  },

  // 交際費アイコン
  {
    name: "social",
    icon: {
      src: "/icon/categories/icon/social.png",
      alt: "交際費アイコン",
    },
    title: "交際費",
    id: "category-8",
  },

  // 趣味アイコン
  {
    name: "hobby",
    icon: {
      src: "/icon/categories/icon/hobby.png",
      alt: "ゲーム機アイコン",
    },
    title: "趣味",
    id: "category-9",
  },

  // 娯楽アイコン
  {
    name: "entertainment",
    icon: {
      src: "/icon/categories/icon/entertainment.png",
      alt: "温泉アイコン",
    },
    title: "娯楽",
    id: "category-10",
  },

  // その他
  {
    name: "others",
    icon: {
      src: "/icon/categories/icon/others.png",
      alt: "その他アイコン",
    },
    title: "その他",
    id: "category-11",
  },
] as const;

// 1件分の型（カテゴリオブジェクト）
export type CategoryItem = (typeof CATEGORY_LIST)[number];

// IDだけの型（"category-1" | "category-2" | ...）
export type CategoryType = CategoryItem["id"];
