// ホーム画面

"use client";

import React from "react";
import Image from "next/image";
import Button from "../button/Button";

const Home = () => {
  return (
    <div className="flex w-full flex-col items-center gap-5 p-5 font-bold">
      {/* 仮タイトル */}
      <div className="text-2xl">
        <h3>北海道旅行</h3>
        <p>¥50,000</p>
      </div>

      {/* 仮グラフ */}
      <Image src="/temp/仮グラフ.png" alt="仮グラフ" width={200} height={200} />

      {/* 仮期限 */}
      <div className="text-2xl">
        <p>2025年9月30日まで</p>
      </div>

      {/* 仮追加ボタン */}
      <Button onClick={() => alert("クリックされた！")}>追加</Button>

      {/* 仮履歴表示 */}
      <div className="self-start text-2xl">
        <h3>直近の登録履歴</h3>
      </div>
    </div>
  );
};

export default Home;
