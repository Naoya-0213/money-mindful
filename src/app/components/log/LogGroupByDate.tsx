// 日付ごとの記録履歴コンポーネント

import React from "react";
import LogItemCard from "./LogItemCard";

const LogGroupByDate = () => {
  return (
    <div className="">
      <div>
        <h3 className="text-xl font-bold">4月23日（月）</h3>
      </div>
      <LogItemCard />
    </div>
  );
};

export default LogGroupByDate;
