// ✅ サーバーコンポーネント専用のSupabaseリスナー関数
// 1. Supabaseのセッション情報とプロフィール情報を取得
// 2. 必要に応じてプロフィールのemailを自動更新
// 3. layout.tsxなどで使用し、zustandにユーザー情報をセットする目的で使う

"use server";

import type { Database } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

// 認証状態の監視
export const SupabaseLisner = async () => {
  // Supabaseのサーバー用クライアントを作成（cookie/headers付き）
  const supabase = await createClient<Database>();

  // 認証済みのセッション情報を取得（未ログインならnull）
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
