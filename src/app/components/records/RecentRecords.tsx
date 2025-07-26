// 直近の履歴表示用コンポーネント
import SectionCard from "@/app/components/section-card/SectionCard";

import type { CategoryType } from "../../../const/category-icon/categoryIconMap";
import RecordItemCard from "./RecordItemCard";

type Log = {
  id: string;
  title: string;
  amount: number;
  categoryId: CategoryType;
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
      { id: "1", title: "ジュース", amount: 150, categoryId: "category-2" },
      { id: "2", title: "カフェラテ", amount: 450, categoryId: "category-2" },
      { id: "3", title: "外食", amount: 780, categoryId: "category-1" },
    ],
  },
  {
    date: "2025年7月3日（木）",
    logs: [
      { id: "1", title: "飲み会", amount: 3000, categoryId: "category-3" },
      {
        id: "2",
        title: "セブンコーヒー",
        amount: 150,
        categoryId: "category-2",
      },
      { id: "3", title: "朝ごはん", amount: 500, categoryId: "category-1" },
    ],
  },
];

const RecentRecords = () => {
  return (
    <div className="w-full">
      <SectionCard label="直近の登録履歴" icon="/icon/home/folder.png">
        {/* 仮データを map で表示 */}
        {mockLogs.map((daily, index) => (
          <div key={`${daily.date}-${index}`} className="flex flex-col gap-3">
            <h2 className="text-base font-bold">{daily.date}</h2>
            {daily.logs.map((log) => (
              <RecordItemCard
                key={log.id}
                id={log.id}
                title={log.title}
                amount={log.amount}
                categoryId={log.categoryId}
              />
            ))}
          </div>
        ))}
      </SectionCard>
    </div>
  );
};

export default RecentRecords;
