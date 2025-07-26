"use client";

import React from "react";
import FooterItem from "./FooterItem";

const footerItems = [
  { icon: "/icon/footer/home.png", label: "ホーム", href: "/money-mindful/home" },
  { icon: "/icon/footer/add.png", label: "追加", href: "/money-mindful/add" },
  { icon: "/icon/footer/records.png", label: "履歴", href: "/money-mindful/records" },
  { icon: "/icon/footer/graph.png", label: "合計", href: "/money-mindful/total" },
  { icon: "/icon/footer/calendar.png", label: "記録", href: "/money-mindful/calendar" },
  // { icon: "/icon/footer/setting.png", label: "履歴", href: "/money-mindful/setting" },
  { icon: "/icon/footer/profile-user.png", label: "設定", href: "/money-mindful/setting" },
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