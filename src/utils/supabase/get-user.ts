// supabase登録のユーザー情報取得用

import { createClient } from "@/utils/supabase/clients";

export const getCurrentUser = async () => {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
};
