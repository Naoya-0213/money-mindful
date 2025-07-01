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
        icon="/icon/footer/home.png"
        label="ホーム"
        href="/money-mindful/home"
      />

      {/* 追加 */}
      <FooterItem icon="/icon/footer/add.png" label="追加" href="/money-mindful/add" />

      {/* 合計 */}
      <FooterItem
        icon="/icon/footer/graph.png"
        label="合計"
        href="/money-mindful/total"
      />

      {/* 記録（カレンダー） */}
      <FooterItem
        icon="/icon/footer/calendar.png"
        label="記録"
        href="/money-mindful/calendar"
      />

      {/* 設定 */}
      <FooterItem
        icon="/icon/footer/setting.png"
        label="設定"
        href="/money-mindful/setting"
      />
    </div>
  );
};

export default Footer;
