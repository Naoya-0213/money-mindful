"use client";

import React from "react";
import Image from "next/image";
import Button from "../button/Button";

const Home = () => {
  return (
    <div className="w-full p-5 text-2xl font-bold flex flex-col items-center gap-5">
      {/* 仮タイトル */}
      <div>
        <h3>北海道旅行</h3>
        <p>¥50,000</p>
      </div>

      {/* 仮グラフ */}
      <Image src="/temp/仮グラフ.png" alt="仮グラフ" width={200} height={200} />

      {/* 仮期限 */}
      <div>
        <p>2025年9月30日まで</p>
      </div>

      {/* 仮追加ボタン */}
      <Button onClick={() => alert("クリックされた！")} >追加</ Button>
    </div>
  );
};

export default Home;
