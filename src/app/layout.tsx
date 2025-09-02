import "react-calendar/dist/Calendar.css";
import { Toaster } from "react-hot-toast";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ClientUserSetter from "@/lib/ClientUserSetter";

import { getCurrentUser } from "@/utils/supabase/getCurrentUser";

import { Footer, Header } from "./components";
import "./globals.css";

// ===== アプリ全体のレイアウト設定 =====
// 📍全ページ共通のHTML構造とレイアウト（Header / Footer / Toaster含む）
// グローバルCSS・Googleフォント・通知UIなどをここで定義

// google font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Money Mindfull App",
  description:
    "我慢して使わなかったお金を“仮想貯金”として記録し、楽しく節約習慣を身につけるアプリ。支出の我慢を可視化して、目標達成に近づこう！",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, profile } = await getCurrentUser();

  return (
    <html lang="jp">
      <body
        className={`${inter.className} flex min-h-screen flex-col items-center bg-white text-[#795549]`}
        style={{ minHeight: "100dvh" }}
      >
        {/* ログイン情報管理 */}
        <ClientUserSetter session={session} profile={profile} />

        {/* ヘッダー */}
        <Header />
        <main
          style={{
            paddingBottom: "var(--footer-height)",
            paddingTop: "var(--header-height)",
          }}
          className="flex w-full max-w-[480px] flex-grow flex-col justify-between bg-[#F3F0EB]"
        >
          {children}

          {/* トースト導入 */}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                fontFamily: "var(--font-geist-sans)",
                background: "#F3F0EB",
                color: "#795549",
                fontSize: "14px",
                padding: "12px 16px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              },
              success: {
                iconTheme: {
                  primary: "#795549",
                  secondary: "#FFF8F0",
                },
              },
              error: {
                iconTheme: {
                  primary: "#B00020",
                  secondary: "#FFD4D4",
                },
              },
            }}
            reverseOrder={false}
          />
        </main>

        {/* フッター */}
        <Footer />
      </body>
    </html>
  );
}
