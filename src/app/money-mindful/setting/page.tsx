// 設定セクション

"use client";

import Setting from "@/app/components/setting/Setting";
import React from "react";

export default function SettingPage() {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <Setting />
    </div>
  );
}
