import React from "react";
import SectionCard from "../section-card/SectionCard";
import SectionInfoBox from "../section-card/SectionInfoBox";
import Image from "next/image";
import Button from "../button/Button";

type NoGoalCardProps = {
  numberIcon?: string;
};

const NoGoalCard = ({ numberIcon }: NoGoalCardProps) => {
  return (
    <div className="w-full">
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
          <div className="flex justify-center">
            <div>
              <p>目標例</p>
              <p>・北海道旅行に行く（¥100,000）</p>
              <p>・スニーカーを買う（¥20,000）</p>
              <p>・switch2を買う（¥50,000）</p>
            </div>
          </div>
        </SectionInfoBox>

        {/* 説明カード2 */}
        <SectionInfoBox>
          <div className="flex justify-between gap-3 px-5">
            {/* アイコン */}
            <div className="flex w-1/3 min-w-[70px] flex-col items-center justify-center gap-1">
              <Image
                src="/icon/setting/goal/profile-user.png"
                alt="アイコン"
                width={35}
                height={35}
              />
              <p className="mt-[1px] text-sm font-semibold">設定</p>
            </div>

            {/* 備考 */}
            <div className="flex w-2/3 flex-col items-center">
              <p>フッターの設定</p>
              <p>から変更可能です。</p>
            </div>
          </div>
        </SectionInfoBox>

        {/* 目標追加へ遷移ボタン */}
        <div className="flex w-full justify-center">
          <Button href="/money-mindful/setting/goal">目標を編集</Button>
        </div>
      </SectionCard>
    </div>
  );
};

export default NoGoalCard;
