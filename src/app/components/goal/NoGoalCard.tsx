import React from "react";
import SectionCard from "../section-card/SectionCard";
import SectionInfoBox from "../section-card/SectionInfoBox";

type NoGoalCardProps = {
  numberIcon?: string;
};

const NoGoalCard = ({ numberIcon }: NoGoalCardProps) => {
  return (
    <div className="w-full">
      {/* step1：目標設定 */}
      <SectionCard
        label="目標を登録しよう！"
        numberIcon={numberIcon}
        icon="/icon/login/step1/flag.png"
      >
        {/* 備考 */}
        <div className="flex flex-col items-center justify-center leading-relaxed font-semibold text-[#777777]">
          <p>旅行、欲しいもの、貯金でもOK！</p>
          <p>まずは「がんばる理由」を決めよう。</p>
        </div>

        {/* 説明カード1 */}
        <SectionInfoBox>
          <p>目標例</p>
          <p>・北海道旅行に行く（¥100,000）</p>
          <p>・スニーカーを買う（¥20,000）</p>
          <p>・switch2を買う（¥50,000）</p>
        </SectionInfoBox>
      </SectionCard>
    </div>
  );
};

export default NoGoalCard;
