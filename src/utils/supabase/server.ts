// ===== Supabase クライアント（サーバー側） =====
// 📍Server Component や API Route で使用
// Next.js の cookies() を使ってセッション管理された Supabase クライアントを生成
import { cookies } from "next/headers";

import { createServerClient } from "@supabase/ssr";

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
            // Server Component から呼ばれた場合の set 不可は無視してOK
            // (ミドルウェア等でセッション更新しているなら問題なし)
          }
        },
      },
    },
  );
}
