// 直近の履歴表示用コンポーネント

import LogGroupByDate from "@/app/components/log/LogGroupByDate";
import SectionCard from "@/app/components/section-card/SectionCard";
import React from "react";

const RecentLogs = () => {
  return (
    <div className="w-full">
      <SectionCard
        icon="/icon/home/folder.png"
        label="履歴icon"
        title="直近の登録履歴"
      >
        {/* 履歴 */}
        <LogGroupByDate />
      </SectionCard>
    </div>
  );
};

export default RecentLogs;
