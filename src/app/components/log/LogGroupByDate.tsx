// 日付ごとの記録履歴コンポーネント

import React from "react";
import LogItemCard from "./LogItemCard";

const LogGroupByDate = () => {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="text-xl font-bold">2025年4月23日（月）</h3>
      </div>
      <LogItemCard />
      <LogItemCard />
      <LogItemCard />
    </div>
  );
};

export default LogGroupByDate;
