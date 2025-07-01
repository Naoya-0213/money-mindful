// supabase情報取得用

import type { createClient } from "./clients";

// 共通ログイン中のユーザーを取得
const getCurrentUser = async (supabase: ReturnType<typeof createClient>) => {
  const result = await supabase.auth.getUser();

  if (result.error || !result.data.user) {
    console.error("ユーザー情報の取得に失敗");
    return null;
  }
  return result.data.user;
};
