// middleware.ts

// ✅ ミドルウェアの役割
// Next.js アプリにおける「全ページ共通のフィルター機能」
// 全ページに入る前に、Supabaseのセッション（ログイン状態）を確認する。
// 「/money-mindful」配下にアクセスされた場合のみ、セッションを取得して、
// 未ログインであればログインページ（/auth/login）へリダイレクトする。

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // 今のリクエストを「次の処理に進めてもいいよ」と初期化
  const res = NextResponse.next();

  // supabaseとの連携）リクエストとレスポンスの情報を渡している
  // req：NextRequestの略）ブラウザから送られてきたリクエスト情報のこと
  // res：NextResponseの略）middlewareから返す予定のレスポンス情報（NextResponse.next()で作成）
  const supabase = createMiddlewareClient({ req, res });

  // セッション（ログイン状態）を取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // ✅ セッション確認：未ログインならログイン画面へリダイレクト（/auth/login/page.tsx）
  if (!session && req.nextUrl.pathname.startsWith("/money-mindful")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return res;
}

// ✅ money-mindful配下のpage.tsxで適用！
export const config = {
  matcher: ["/money-mindful/:path*"],
};
