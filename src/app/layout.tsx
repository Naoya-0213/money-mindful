import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

// google font(1)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// google font(2)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// google font(3)
const inter = Inter({ subsets: ["latin"] }); // inter を定義

// サイトタイトル＆説明
export const metadata: Metadata = {
  title: "Money Mindfull App",
  description:
    "我慢して使わなかったお金を“仮想貯金”として記録し、楽しく節約習慣を身につけるアプリ。支出の我慢を可視化して、目標達成に近づこう！",
};

// ページ全体レイアウト
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body
        className={`${inter.className} flex min-h-screen flex-col items-center bg-white text-[#795549]`}
        style={{ minHeight: "100dvh" }}
      >
        {/* ヘッダー */}
        <Header />

        {/* メインセクション */}
        <main
          style={{
            paddingBottom: "var(--footer-height)",
            paddingTop: "var(--header-height)",
          }}
          className="flex w-full max-w-[480px] flex-grow flex-col justify-between bg-[#F3F0EB]"
        >
          {children}
        </main>

        {/* フッター */}
        <Footer />
      </body>
    </html>
  );
}
