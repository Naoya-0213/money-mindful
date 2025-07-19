// supabase登録のユーザー情報取得用

import { createClient } from "@/utils/supabase/clients";

export const getCurrentUser = async (
  supabase: ReturnType<typeof createClient>,
) => {
  const result = await supabase.auth.getUser();

  if (result.error || !result.data.user) {
    console.error("ユーザー情報の取得に失敗");
    return null;
  }
  return result.data.user;
};
