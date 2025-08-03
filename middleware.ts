import { type NextRequest, NextResponse } from "next/server";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// ===== 認証ミドルウェア =====
// 📍/money-mindful 配下の全ページに適用
// Supabaseのセッションをチェックし、未ログイン時は /auth/signin、セッション取得失敗時は /session-error にリダイレクトする

export async function middleware(req: NextRequest) {
  // 今のリクエストを「次の処理に進めてもいいよ」と初期化
  const res = NextResponse.next();

  // Supabaseのクライアントを生成（Cookie経由でセッション確認）
  const supabase = createMiddlewareClient({ req, res });

  // セッション＆エラー情報を取得
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;
  const isProtected = pathname.startsWith("/money-mindful");

  // セッションなし（未ログイン） → /auth/signin に遷移
  if ((!session || !session.user) && isProtected) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // セッション取得エラー（トークン切れなど） → /session-error に遷移
  if (error && isProtected) {
    return NextResponse.redirect(
      new URL("/money-mindful/session-error", req.url),
    );
  }

  return res;
}

// money-mindful配下のページでのみ適用！
export const config = {
  matcher: ["/money-mindful/:path*"],
};
