import { create } from "zustand";

import type { Database } from "@/types/database.types";

// 📌 zustandの状態管理用
// 参考↓
// https://github.com/pmndrs/zustand
// https://zustand-demo.pmnd.rs/

// ===== ログイン情報の管理用 =====
// 📍ログイン後に取得したプロフィール情報を保持
// zustandで管理し、どの画面からでもログインユーザー情報を参照できるようにする

type ProfileType = Database["public"]["Tables"]["profiles"]["Row"];

type StateType = {
  user: ProfileType;
  setUser: (payload: ProfileType) => void;
  resetUser: () => void;
};

const useUserStore = create<StateType>((set) => ({
  // 初期値
  user: { id: "", name: "", email: "", image_url: "", created_at: "" },
  //  アップデート
  setUser: (payload) => set({ user: payload }),
  // リセット
  resetUser: () =>
    set({
      user: { id: "", name: "", email: "", image_url: "", created_at: "" },
    }),
}));

export default useUserStore;
