import { type NextRequest, NextResponse } from "next/server";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// ===== 認証ミドルウェア =====
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
  const isProtected = pathname.startsWith("/");

  // ===== 除外ルート =====
  const isAuthRoute = pathname.startsWith("/auth"); // ログイン関連ページ
  const isNextAsset = pathname.startsWith("/_next"); // Next.js 内部のJS/CSS/画像
  const isStaticFile = pathname.match(
    /\.(png|jpg|jpeg|gif|svg|ico|css|js|map)$/,
  ); // 画像などの静的ファイル

  if (isAuthRoute || isNextAsset || isStaticFile) {
    return res;
  }

  // セッションなし（未ログイン） → /auth/signin に遷移
  if ((!session || !session.user) && isProtected) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // セッション取得エラー（トークン切れなど） → /session-error に遷移
  if (error && isProtected) {
    return NextResponse.redirect(new URL("/session-error", req.url));
  }

  return res;
}

// すべてのページで適用
export const config = {
  matcher: ["/:path*"],
};
