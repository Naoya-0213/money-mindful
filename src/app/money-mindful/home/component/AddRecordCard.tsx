// ホーム専用コンポーネント：我慢記録セクション

import SectionCard from "@/app/components/section-card/SectionCard";
import React from "react";

const AddRecordCard = () => {
  return (
    <div className="w-full">
      <SectionCard
        title="我慢を記録しよう！"
        icon="/icon/home/pencil.png"
        label="我慢記録icon"
      >
        <p></p>
      </SectionCard>
    </div>
  );
};

export default AddRecordCard;
