"use client";

import FooterItem from "./FooterItem";

// ===== フッターコンポーネント =====
// 📍全ページ共通のナビゲーションバー
// アイコンとラベルを使った6つのメニューを固定表示

const footerItems = [
  {
    icon: "/icon/footer/home.png",
    label: "ホーム",
    href: "/home",
  },
  { icon: "/icon/footer/add.png", label: "追加", href: "/add" },
  {
    icon: "/icon/footer/records.png",
    label: "履歴",
    href: "/records",
  },
  {
    icon: "/icon/footer/graph.png",
    label: "合計",
    href: "/total",
  },
  {
    icon: "/icon/footer/calendar.png",
    label: "記録",
    href: "/calendar",
  },
  {
    icon: "/icon/footer/profile-user.png",
    label: "設定",
    href: "/setting",
  },
];

const Footer = () => {
  return (
    <div
      style={{ height: "var(--footer-height)" }}
      className="fixed bottom-0 z-50 grid w-full max-w-[480px] grid-cols-6 bg-[#D7CDBE]"
    >
      {footerItems.map((item, index) => (
        <FooterItem
          key={index}
          icon={item.icon}
          label={item.label}
          href={item.href}
        />
      ))}
    </div>
  );
};

export default Footer;
