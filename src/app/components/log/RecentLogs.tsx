// 直近の履歴表示用コンポーネント

import SectionCard from "@/app/components/section-card/SectionCard";
import React from "react";
import LogItemCard from "./LogItemCard";
import type { CategoryType } from "../../../const/category-icon/categoryIconMap";

type Log = {
  id: string;
  title: string;
  amount: number;
  category: CategoryType;
};

// 日付ごとのログの型
type DailyLogs = {
  date: string;
  logs: Log[];
};

// 仮データ（あとでSupabase連携予定）
const mockLogs: DailyLogs[] = [
  {
    date: "2025年7月4日（金）",
    logs: [
      { id: "1", title: "ジュース", amount: 150, category: "drink" },
      { id: "2", title: "カフェラテ", amount: 450, category: "drink" },
      { id: "3", title: "外食", amount: 780, category: "food" },
    ],
  },
  {
    date: "2025年7月3日（木）",
    logs: [
      { id: "1", title: "飲み会", amount: 3000, category: "beer" },
      { id: "2", title: "セブンコーヒー", amount: 150, category: "drink" },
      { id: "3", title: "朝ごはん", amount: 500, category: "food" },
    ],
  },
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
        {mockLogs.map((daily, index) => (
          <div key={`${daily.date}-${index}`} className="flex flex-col gap-3">
            <h2 className="text-base font-bold">{daily.date}</h2>
            {daily.logs.map((log) => (
              <LogItemCard
                key={log.id}
                id={log.id}
                title={log.title}
                amount={log.amount}
                category={log.category}
              />
            ))}
          </div>
        ))}
      </SectionCard>
    </div>
  );
};

export default RecentLogs;
