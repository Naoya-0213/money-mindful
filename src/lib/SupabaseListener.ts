"use server";

import { createClient } from "@/utils/supabase/server";

import type { Database } from "@/types/database.types";

// ===== ユーザー情報取得リスナー =====
// 📍layout.tsx などのサーバーコンポーネントで使用
// 備考：zustand にログイン情報（セッション＆プロフィール）を渡すための初期取得処理

// 認証状態の監視
export const SupabaseLisner = async () => {
  // Supabaseのサーバー用クライアントを作成（cookie/headers付き）
  const supabase = await createClient<Database>();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // プロフィールの取得
  let profile = null;
  if (session) {
    // 現在ログイン中のユーザーに紐づくプロフィール情報を取得
    const { data: currentProfile } = await supabase
      .from("profiles") // テーブル指定
      .select("*") // すべてのカラムを取得
      .eq("id", session.user.id) // 条件：idが一致
      .single(); // 結果は1件だけ期待
    profile = currentProfile;

    // メールアドレスを変更した場合、プロフィールを更新
    if (currentProfile && currentProfile.email !== session.user.email) {
      const { data: updatedProfile } = await supabase
        .from("profiles")
        .update({ email: session.user.email }) // 新しいメアドに更新
        .match({ id: session.user.id }) // このidが対象
        .select("*")
        .single();

      profile = updatedProfile;
    }
  }

  return { session, profile };
};
