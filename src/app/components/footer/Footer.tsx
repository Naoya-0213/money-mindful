"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="grid h-[80px] w-full max-w-[480px] grid-cols-5 bg-[#D7CDBE]">
      {/* ホーム */}
      <Link
        href="/money-mindful/home"
        className="flex flex-col items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center">
          <Image src="/icon/home.png" alt="ホーム" width={35} height={35} />
          <p className="mt-[1px] text-base font-bold">ホーム</p>
        </div>
      </Link>

      {/* 追加 */}
      <Link
        href="/money-mindful/add"
        className="flex flex-col items-center justify-center"
      >
        <div>
          <Image src="/icon/add.png" alt="追加" width={35} height={35} />
          <p className="mt-[1px] text-base font-bold">追加</p>
        </div>
      </Link>

      {/* 合計 */}
      <div className="flex flex-col items-center justify-center">
        <Image src="/icon/graph.png" alt="合計" width={35} height={35} />
        <p className="mt-[1px] text-base font-bold">合計</p>
      </div>

      {/* カレンダー */}
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/icon/calendar.png"
          alt="カレンダー"
          width={35}
          height={35}
        />
        <p className="mt-[1px] text-base font-bold">カレンダー</p>
      </div>

      {/* 設定 */}
      <div className="flex flex-col items-center justify-center">
        <Image src="/icon/setting.png" alt="設定" width={35} height={35} />
        <p className="mt-[1px] text-base font-bold">設定</p>
      </div>
    </div>
  );
};

export default Footer;
