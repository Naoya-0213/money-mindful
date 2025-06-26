"use client";

import React from "react";
import FooterItem from "./FooterItem";

const Footer = () => {
  return (
    <div
      style={{ height: "var(--footer-height)" }}
      className="fixed bottom-0 z-50 grid w-full max-w-[480px] grid-cols-5 bg-[#D7CDBE]"
    >
      {/* ホーム */}
      <FooterItem
        icon="/icon/home.png"
        label="ホーム"
        href="/money-mindful/home"
      />

      {/* 追加 */}
      <FooterItem icon="/icon/add.png" label="追加" href="/money-mindful/add" />

      {/* 合計 */}
      <FooterItem
        icon="/icon/graph.png"
        label="合計"
        href="/money-mindful/total"
      />

      {/* 記録（カレンダー） */}
      <FooterItem
        icon="/icon/calendar.png"
        label="記録"
        href="/money-mindful/home"
      />

      {/* 設定 */}
      <FooterItem
        icon="/icon/setting.png"
        label="設定"
        href="/money-mindful/home"
      />
    </div>
  );
};

export default Footer;
