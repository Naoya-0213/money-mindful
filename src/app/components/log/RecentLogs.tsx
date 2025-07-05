// 直近の履歴表示用コンポーネント

import SectionCard from "@/app/components/section-card/SectionCard";
import React from "react";
import LogItemCard from "./LogItemCard";
import type { CategoryType } from "../../../const/category-icon/categoryIconMap";

// 仮データ（あとでSupabase連携予定）
const mockLogs: {
  id: string;
  title: string;
  amount: number;
  category: CategoryType;
}[] = [
  { id: "1", title: "ジュース", amount: 150, category: "drink" },
  { id: "2", title: "カフェラテ", amount: 450, category: "drink" },
  { id: "3", title: "外食", amount: 780, category: "food" },
];

const RecentLogs = () => {
  return (
    <div className="w-full">
      <SectionCard
        icon="/icon/home/folder.png"
        label="履歴icon"
        title="直近の登録履歴"
      >
        {/* 仮データを map で表示 */}
        {mockLogs.map((log) => (
          <LogItemCard
            key={log.id}
            title={log.title}
            amount={log.amount}
            category={log.category}
          />
        ))}
      </SectionCard>
    </div>
  );
};

export default RecentLogs;
