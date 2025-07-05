// ホーム専用コンポーネント：目標進捗セクション

import SectionCard from "@/app/components/section-card/SectionCard";
import Image from "next/image";
import React from "react";

const GoalStatusCard = () => {
  return (
    <div className="w-full">
      {/* 進捗 */}
      <SectionCard
        title="目標達成まで......"
        icon="/icon/home/paper-plane.png"
        label="進捗icon"
      >
        <div className="flex flex-col gap-3">
          {/* 進捗グラフ */}
          <div className="flex w-full items-center justify-center">
            <Image
              src="/temp/仮進捗グラフ.png"
              alt="仮カレンダー"
              width={200}
              height={200}
              style={{ width: "100%", height: "auto" }}
              className="max-w-[200px]"
            />
          </div>

          {/* 合計 */}
          <div className="flex items-center justify-center gap-5">
            <div className="flex min-w-[50px] justify-center">
              <span className="text-lg font-bold">合計</span>
            </div>

            <p className="flex h-auto min-h-[65px] min-w-[100px] items-center justify-center rounded-xl bg-[#F3F0EB] px-6 py-4 text-lg font-bold">
              ¥35,000
            </p>
          </div>

          {/* 区切り線 */}
          <div className="mx-auto mt-2 mb-2 h-0.5 w-[95%] rounded-full bg-[#795549]" />

          {/* 残数表示 */}
          {/* 日数 */}
          <div className="flex items-center justify-center gap-5">
            <div className="flex min-w-[50px] justify-center">
              <span className="text-lg font-bold">残り</span>
            </div>
            <p className="flex h-auto min-h-[65px] min-w-[100px] items-center justify-center rounded-xl bg-[#F3F0EB] px-6 py-4 text-lg font-bold">
              90
            </p>
            <div className="flex min-w-[50px] justify-center">
              <span className="text-lg font-bold">日で</span>
            </div>
          </div>

          {/* 金額 */}
          <div className="flex items-center justify-center gap-5">
            <p className="flex h-auto min-h-[65px] min-w-[100px] items-center justify-center rounded-xl bg-[#F3F0EB] px-6 py-4 text-lg font-bold">
              ¥15,000
            </p>
            <div className="flex min-w-[100px] justify-center">
              <span className="text-lg font-bold">を貯める！</span>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default GoalStatusCard;
