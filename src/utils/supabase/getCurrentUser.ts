// ===== ユーザー情報の取得処理 =====
// 📍Supabaseのユーザー情報とプロフィールを取得（サインイン後に使用）
// email・名前・画像などを profiles テーブルから取得し、画面に渡すための関数

// TODO これを全体layoutで使用し、簡単にユーザー取得できるようにすること。
// TODO todo-list-nextjsを参考に更新すること

import { createClient } from "@/utils/supabase/clients";

export const getCurrentUser = async (
  supabase: ReturnType<typeof createClient>,
) => {
  // supabaseデフォルトテーブルuserからemail・idを取得
  const result = await supabase.auth.getUser();

  if (result.error || !result.data.user) {
    console.error("ユーザー情報の取得に失敗");
    return null;
  }

  // profiles テーブルから追加情報（name, image_urlなど）を取得
  const user = result.data.user;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*") // emailも含まれているなら取得可能
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    console.error("プロフィール情報の取得に失敗:", profileError.message);
    return null;
  }
  return profile;
};
