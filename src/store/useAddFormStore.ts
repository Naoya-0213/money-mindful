import { create } from "zustand";

// 📌 zustandの状態管理用
// 参考↓
// https://github.com/pmndrs/zustand
// https://zustand-demo.pmnd.rs/

// ===== 我慢記録の保存用 =====
// 📍「追加・編集」フォームの状態管理（Zustand）
// 備考：Supabaseから取得したデータを保持し、任意の画面で利用可能にする

type AddFormState = {
  title: string;
  amount: number;
  saved_date: string;
  category_id: string | null;
  memo: string;

  initialized: boolean;

  setAddForm: (payload: Partial<AddFormState>) => void;
  resetAddForm: () => void;
  setInitialized: () => void;
  resetInitialized: () => void;
};

export const useAddFormStore = create<AddFormState>((set) => ({
  title: "",
  amount: 0,
  saved_date: new Date().toISOString().split("T")[0],
  category_id: null,
  memo: "",

  initialized: false,

  setAddForm: (payload) => set((state) => ({ ...state, ...payload })),

  resetAddForm: () =>
    set({
      title: "",
      amount: 0,
      saved_date: new Date().toISOString().split("T")[0],
      category_id: null,
      memo: "",
      initialized: false,
    }),

  setInitialized: () => set({ initialized: true }),
  resetInitialized: () => set({ initialized: false }),
}));
