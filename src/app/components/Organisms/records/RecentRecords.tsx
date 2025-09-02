import SectionCard from "@/app/components/molecules/section-card/SectionCard";

import type { CategoryType } from "../../../../const/category-icon/categoryIconMap";
import RecordItemCard from "./RecordItemCard";

// ===== 直近の登録履歴（仮データ表示） =====
// TODO （今後実装予定...!）

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

// 📌 仮データ（今後 Supabase から取得予定）
const mockLogs: DailyLogs[] = [
  {
    date: "2025年7月4日（金）",
    logs: [
      { id: "1", title: "ジュース", amount: 150, category_id: "category-2" },
      { id: "2", title: "カフェラテ", amount: 450, category_id: "category-2" },
      { id: "3", title: "外食", amount: 780, category_id: "category-1" },
    ],
  },
  {
    date: "2025年7月3日（木）",
    logs: [
      { id: "1", title: "飲み会", amount: 3000, category_id: "category-3" },
      {
        id: "2",
        title: "セブンコーヒー",
        amount: 150,
        category_id: "category-2",
      },
      { id: "3", title: "朝ごはん", amount: 500, category_id: "category-1" },
    ],
  },
];

const RecentRecords = () => {
  return (
    <div className="w-full">
      <SectionCard label="直近の登録履歴" icon="/icon/home/record2.png">
        {/* 📍仮データを日付ごとにマップ表示 */}
        {mockLogs.map((daily, index) => (
          <div key={`${daily.date}-${index}`} className="flex flex-col gap-3">
            <h2 className="text-base font-bold">{daily.date}</h2>
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
        ))}
      </SectionCard>
    </div>
  );
};

export default RecentRecords;
