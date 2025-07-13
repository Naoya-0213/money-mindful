import NoGoalCard from "@/app/components/goal/NoGoalCard";
import SectionCard from "@/app/components/section-card/SectionCard";
import React from "react";

const FirstLoginPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        {/* 導入 */}

        {/* step1：目標設定 */}
        <NoGoalCard numberIcon="/icon/login/step1/number-1.png" />

        {/* step2：我慢記録 */}
        <SectionCard
          label="我慢を記録しよう！"
          numberIcon="/icon/login/step2/number-2.png"
          icon="/icon/login/step2/pencil.png"
        >
          <div></div>
        </SectionCard>

        {/* step3：記録確認 */}
        <SectionCard
          label="記録を振り返ろう！"
          numberIcon="/icon/login/step3/number-3.png"
          icon="/icon/login/step3/money.png"
        >
          <div></div>
        </SectionCard>

        {/* ホームへ遷移ボタン */}
      </div>
    </div>
  );
};

export default FirstLoginPage;
