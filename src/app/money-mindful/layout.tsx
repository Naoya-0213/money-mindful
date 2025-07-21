// app/money-mindful/layout.tsx
import { redirect } from "next/navigation";

import { SupabaseLisner } from "@/lib/SupabaseListener";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, profile } = await SupabaseLisner();

  if (!session || !profile) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
