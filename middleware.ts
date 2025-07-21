import { type NextRequest, NextResponse } from "next/server";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// ===== middleware.ts ======
// ✅ ミドルウェアの役割
// Next.js アプリにおける「全ページ共通のフィルター機能」
// 「/money-mindful」配下にアクセスされた場合のみ、
// Supabaseのセッション（ログイン状態）を確認し、
// ・未ログイン → /auth/login にリダイレクト
// ・長時間放置などでセッション取得に失敗（期限切れなど）→ /session-error にリダイレクト

export async function middleware(req: NextRequest) {
  // 今のリクエストを「次の処理に進めてもいいよ」と初期化
  const res = NextResponse.next();

  // Supabaseのクライアントを生成（Cookie経由でセッション確認）
  const supabase = createMiddlewareClient({ req, res });

  // ✅ セッション＆エラー情報を取得
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;
  const isProtected = pathname.startsWith("/money-mindful");

  // ✅ セッションなし（未ログイン） → /auth/login に遷移
  if ((!session || !session.user) && isProtected) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // ✅ セッション取得エラー（トークン切れなど） → /session-error に遷移
  if (error && isProtected) {
    return NextResponse.redirect(
      new URL("/money-mindful/session-error", req.url),
    );
  }

  return res;
}

// ✅ money-mindful配下のページでのみ適用！
export const config = {
  matcher: ["/money-mindful/:path*"],
};
