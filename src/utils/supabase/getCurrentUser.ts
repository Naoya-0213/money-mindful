"use server";

import type { Database } from "@/types/database.types";

import { createClient } from "./server";

// ===== ユーザー情報の取得処理 =====
// 📍Supabaseのユーザー情報とプロフィールを取得（サインイン後に使用）
// email・名前・画像などを profiles テーブルから取得し、画面に渡すための関数

export const getCurrentUser = async () => {
  const supabase = await createClient<Database>();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let profile = null;

  if (session) {
    const { data: currentProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    profile = currentProfile;

    // メールアドレス変更時に同期
    if (currentProfile && currentProfile.email !== session.user.email) {
      const { data: updatedProfile } = await supabase
        .from("profiles")
        .update({ email: session.user.email })
        .match({ id: session.user.id })
        .select("*")
        .single();

      profile = updatedProfile;
    }
  }

  return { session, profile };
};
