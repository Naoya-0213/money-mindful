import SectionCard from "@/app/components/section-card/SectionCard";
import React from "react";

const ChangeImagePage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard
          title="プロフィール設定"
          icon="/icon/setting/profile/social.png"
          label="目標設定icon"
        >
          <div></div>
        </SectionCard>
      </div>
    </div>
  );
};

export default ChangeImagePage;
