import { redirect } from "next/navigation";

import { SupabaseLisner } from "@/lib/SupabaseListener";

// ===== セッション確認 =====
// 📍 sessionやprofileがない場合、自動でログイン前画面に遷移。

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, profile } = await SupabaseLisner();

  if (!session || !profile) {
    redirect("/signin");
  }

  return <>{children}</>;
}
