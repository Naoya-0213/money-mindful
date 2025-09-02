"use client";

import React from "react";

// ===== 設定項目カード（個別項目の表示） =====
// 📍使用場所：設定画面（/setting）
// 備考：項目タイトルと内容、ボタンを囲うカードUI

type Props = {
  title: string;
  children: React.ReactNode;
  buttonText: string;
  onClick: () => void;
};

export default function SettingItem({ title, children }: Props) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-[#EAE3D8] p-5">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div>{children}</div>
      <div className="flex justify-center"></div>
    </div>
  );
}
