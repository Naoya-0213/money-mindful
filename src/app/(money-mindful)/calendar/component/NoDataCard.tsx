// ===== 記録なし画面用 ======
// 📍カレンダーの日選択時に使用

// 日付ごとのログの型
type DailyLogs = {
  date: string;
};

const NoDataCard = ({ date }: DailyLogs) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-base font-bold">{date}</h2>
      <div className="flex w-full flex-col items-center px-5 py-5 font-semibold">
        登録がありません...😭
      </div>
    </div>
  );
};

export default NoDataCard;
