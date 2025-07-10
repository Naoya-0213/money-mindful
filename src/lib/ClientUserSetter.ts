// 全体で使い回す「ログインユーザー情報の初期設定」用クライアントコンポーネント
// - layout.tsx などで session / profile を渡して呼び出す
// - Supabase から取得したユーザー情報を zustand に保存する役割
// - UI は持たず、useEffect で一度だけ setUser を実行する

"use client";

import useStore from "@/store/useUserStore";
import type { Database } from "@/types/database.types";
import type { Session } from "@supabase/supabase-js";
import { useEffect } from "react";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

// zustand導入(setUser)
export default function ClientUserSetter({
  session,
  profile,
}: {
  session: Session | null;
  profile: Profile | null;
}) {
  const { setUser } = useStore();

  useEffect(() => {
    if (!session || !profile) return;

    setUser({
      id: session.user.id,
      email: session.user.email ?? "",
      name: profile.name,
      image_url: profile.image_url,
      created_at: profile.created_at,
    });
  }, [session, profile, setUser]);

  return null;
}
