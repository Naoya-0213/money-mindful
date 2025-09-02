"use client";

import { GoalFirstSettingForm } from "@/app/components";

// ===== 目標初回設定用 ======

const GoalSettingPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        {/* 目標初回設定画面をインポート */}
        <GoalFirstSettingForm />
      </div>
    </div>
  );
};

export default GoalSettingPage;
