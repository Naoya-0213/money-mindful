import { create } from "zustand";

// 📌 zustandの状態管理用
// 参考↓
// https://github.com/pmndrs/zustand
// https://zustand-demo.pmnd.rs/

// ===== 我慢記録の保存用 =====
// 📍 supabaseから登録記録を保存。このstore（zustand）に保存。どこでも情報を表示できるようにする。

type AddFormState = {
  title: string;
  amount: number;
  saved_date: string;
  category_id: string | null;
  memo: string;

  setAddForm: (payload: Partial<AddFormState>) => void;
  resetAddForm: () => void;
};

export const useAddFormStore = create<AddFormState>((set) => ({
  title: "",
  amount: 0,
  saved_date: new Date().toISOString().split("T")[0],
  category_id: null,
  memo: "",

  setAddForm: (payload) => set((state) => ({ ...state, ...payload })),
  resetAddForm: () =>
    set({
      title: "",
      amount: undefined,
      saved_date: new Date().toISOString().split("T")[0],
      memo: "",
    }),
}));
