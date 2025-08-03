"use client";

// ===== Supabase クライアント（クライアント側） =====
// 📍ブラウザで使用する Supabase クライアントを生成
// NEXT_PUBLIC_環境変数を使い、React クライアントで Supabase を利用可能にする
import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database.types";

export function createClient(): SupabaseClient<Database> {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
