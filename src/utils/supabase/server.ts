// ===== Supabase クライアント（サーバー側） =====
// 📍Server Component や API Route で使用
// Next.js の cookies() を使ってセッション管理された Supabase クライアントを生成

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient<T = unknown>() {
  const cookieStore = await cookies();

  return createServerClient<T>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // `setAll` メソッドは Server Component から呼び出されました。
            // ミドルウェアでユーザーセッションを更新している場合は、この警告は無視してかまいません。
          }
        },
      },
    },
  );
}
