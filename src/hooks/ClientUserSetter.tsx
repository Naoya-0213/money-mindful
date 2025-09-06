// TODO フックスで対応できないか？

"use client";

import { useEffect } from "react";

import useUserStore from "@/store/useUserStore";
import type { Session } from "@supabase/supabase-js";

import type { Database } from "@/types/database.types";

// TODO フックスで対応できないか？

type Users = Database["public"]["Tables"]["profiles"]["Row"];

export default function ClientUserSetter({
  session,
  users,
}: {
  session: Session | null;
  users: Users | null;
}) {
  const { setUser } = useUserStore();

  useEffect(() => {
    if (!session || !users) return;

    setUser({
      id: session.user.id,
      email: session.user.email ?? "",
      name: users.name,
      image_url: users.image_url,
      created_at: users.created_at,
    });
  }, [session, users, setUser]);

  return null;
}
