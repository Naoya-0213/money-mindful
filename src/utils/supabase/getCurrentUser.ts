// supabase登録のユーザー情報取得用
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

  // profiles テーブルから追加情報（name, image_url）を取得
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
