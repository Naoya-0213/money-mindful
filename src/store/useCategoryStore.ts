import type { CategoryType } from "@/const/category-icon/categoryIconMap";
import { create } from "zustand";

// 📌 zustandの状態管理用
// 参考↓
// https://github.com/pmndrs/zustand
// https://zustand-demo.pmnd.rs/
// ===== カテゴリーの選択用 =====

type CategoryState = {
  selectedCategory: CategoryType | null;
  setCategory: (id: CategoryType) => void;
  resetCategory: () => void;
};

const useCategoryStore = create<CategoryState>((set) => ({
  // 選択されているカテゴリーID
  selectedCategory: null,

  // 選択したカテゴリーをセット
  setCategory: (id) => set({ selectedCategory: id }),

  // 選択状態をリセット
  resetCategory: () => set({ selectedCategory: null }),
}));

export default useCategoryStore;
