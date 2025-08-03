"use client";

import { useEffect } from "react";

import useStore from "@/store/useUserStore";
import type { Session } from "@supabase/supabase-js";

import type { Database } from "@/types/database.types";

// ===== ログインユーザー情報を zustand に保存するだけのコンポーネント =====
// - layout.tsx などで使用（session / profile を渡す）
// - Supabase から取得した情報を useUserStore に保存
// - UI は持たず、useEffect で初回のみ setUser を実行

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
