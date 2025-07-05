import Image from "next/image";
import React from "react";

const Total = () => {
  return (
    <div className="flex w-full flex-col items-center gap-5 p-5 text-[#795549]">
      {/* 仮セクションバー＆グラフ */}

      <Image
        src="/temp/仮合計グラフ2.png"
        alt="仮合計グラフ"
        width={800}
        height={400}
        style={{ width: "100%", height: "auto" }}
      />

      {/* 合計表示 */}
      <div className="text-3xl font-bold">
        <h3>今週の合計</h3>
        <p>¥20,000</p>
      </div>
    </div>
  );
};

export default Total;
