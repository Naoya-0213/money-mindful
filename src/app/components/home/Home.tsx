// ホーム画面

"use client";

import React from "react";
import Image from "next/image";
import Button from "../button/Button";
import Link from "next/link";
import Log from "../log/Log";

const Home = () => {
  return (
    <div className="flex w-full flex-col items-center gap-5 p-5">
      {/* タイトル */}
      <div className="text-3xl font-bold">
        <h3>北海道旅行</h3>
        <p>¥50,000</p>
      </div>

      {/* 仮グラフ */}
      <Image src="/temp/仮グラフ.png" alt="仮グラフ" width={200} height={200} />

      {/* 期限 */}
      <div className="text-2xl font-semibold">
        <p>2025年9月30日まで</p>
      </div>

      {/* 追加ボタン */}
      <Link href="/money-mindful/add" className="flex w-full justify-center">
        <Button>我慢記録を追加する</Button>
      </Link>

      {/* 履歴表示 */}
      <div className="w-full self-start pt-5">
        <h3 className="text-2xl font-bold">直近の登録履歴</h3>
      </div>

      <div className="w-full">
        <Log />
        <Log />
        <Log />
      </div>
    </div>
  );
};

export default Home;
