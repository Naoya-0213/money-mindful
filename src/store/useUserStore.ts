// zustandの状態管理用
// https://github.com/pmndrs/zustand
// https://zustand-demo.pmnd.rs/

import type { Database } from "@/types/database.types";
import { create } from "zustand";

type ProfileType = Database["public"]["Tables"]["profiles"]["Row"];

type StateType = {
  user: ProfileType;
  setUser: (payload: ProfileType) => void;
  resetUser: () => void;
};

const useStore = create<StateType>((set) => ({
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

export default useStore;
