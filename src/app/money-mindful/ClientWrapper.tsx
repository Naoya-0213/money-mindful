"use client";

import { useEffect } from "react";

import useUserStore from "@/store/useUserStore";

import { createClient } from "@/utils/supabase/clients";
import { getCurrentUser } from "@/utils/supabase/getCurrentUser";

// ===== 全体適用クライアント処理（zustandでの現情報の取得）=====

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser(supabase);
      if (user) setUser(user);
    };
    fetchUser();
  }, [setUser]);

  return <>{children}</>;
}
