import { redirect } from "next/navigation";

import { SupabaseLisner } from "@/lib/SupabaseListener";

import ClientWrapper from "./ClientWrapper";

// sessionやprofileがない場合、自動でログイン前画面に遷移。

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, profile } = await SupabaseLisner();

  if (!session || !profile) {
    redirect("/auth/signin");
  }

  return <ClientWrapper>{children}</ClientWrapper>;
}
