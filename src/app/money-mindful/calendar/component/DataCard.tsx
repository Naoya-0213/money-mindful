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

const DataCard = ({ date, logs }: DailyLogs) => {
  return (
    <div className="flex w-full flex-col gap-5">
      <h2 className="text-base font-bold">{date}</h2>
      <div className="flex flex-col gap-3">
        {logs.map((log) => (
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
  );
};

export default DataCard;
