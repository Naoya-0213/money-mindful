import SectionCard from "@/app/components/section-card/SectionCard";
import React from "react";

const AccountSetting = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard icon="/icon/setting/goal/flag.png" label="目標設定">
          <div></div>
        </SectionCard>
      </div>
    </div>
  );
};

export default AccountSetting;
