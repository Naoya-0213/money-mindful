import React from "react";
import SectionCard from "../section-card/SectionCard";

const NoGoalCard = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        {/* step1：目標設定 */}
        <SectionCard
          label="目標を登録しよう！"
          icon="/icon/login/step1/flag.png"
        >
          {/* 備考 */}
          <div className="flex flex-col items-center justify-center leading-relaxed font-semibold text-[#777777]">
            <p>旅行、欲しいもの、貯金でもOK！</p>
            <p>まずは「がんばる理由」を決めよう。</p>
          </div>

          {/* 説明カード1 */}
           <div className="flex w-full flex-col items-center gap-5 rounded-2xl bg-[#F3F0EB] p-5 font-semibold"></div>
        </SectionCard>
      </div>
    </div>
  );
};

export default NoGoalCard;
