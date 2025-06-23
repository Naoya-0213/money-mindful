"use client";

import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="fixed bottom-0 z-50 flex h-[80px] w-full max-w-[480px] min-w-[320px] items-center justify-between bg-[#D7CDBE] px-5">
      {/* 仮のフッターアイコン（5個） */}
      <Image src="/icon/home.png" alt="ホーム" width={35} height={35} />
      <Image src="/icon/add.png" alt="追加" width={35} height={35} />
      <Image src="/icon/graph.png" alt="合計" width={35} height={35} />
      <Image src="/icon/calendar.png" alt="カレンダー" width={35} height={35} />
      <Image src="/icon/setting.png" alt="設定" width={35} height={35} />
    </div>
  );
};

export default Footer;
