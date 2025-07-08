// 目標設定用
"use client";

import FormField from "@/app/components/field/FormField";
import SectionCard from "@/app/components/section-card/SectionCard";
import React, { useState } from "react";

const GoalSetting = () => {
  const [value, setValue] = useState("北海道旅行");

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard icon="/icon/setting/goal/flag.png" label="目標設定">
          {/* 目標タイトル */}
          <FormField
            label="目標タイトル"
            icon="/icon/setting/goal/tag.png"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          {/* 額 */}
        </SectionCard>
      </div>
    </div>
  );
};

export default GoalSetting;
