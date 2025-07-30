// 直近の履歴表示用コンポーネント
import type { CategoryType } from "@/const/category-icon/categoryIconMap";

import RecordItemCard from "@/app/components/records/RecordItemCard";

type Log = {
  id: string;
  title: string;
  amount: number;
  category_id: CategoryType;
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
      { id: "1", title: "ジュース", amount: 150, category_id: "category-2" },
      { id: "2", title: "カフェラテ", amount: 450, category_id: "category-2" },
      { id: "3", title: "外食", amount: 780, category_id: "category-1" },
    ],
  },
];

const DataCard = () => {
  return (
    <div className="w-full">
      {/* 仮データを map で表示 */}
      {mockLogs.map((daily, index) => (
        <div key={`${daily.date}-${index}`} className="flex flex-col gap-3">
          <h2 className="text-base font-bold">{daily.date}</h2>
          <div className="pt-2 flex flex-col gap-3">
            {daily.logs.map((log) => (
              <RecordItemCard
                key={log.id}
                id={log.id}
                title={log.title}
                amount={log.amount}
                category_id={log.category_id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataCard;
