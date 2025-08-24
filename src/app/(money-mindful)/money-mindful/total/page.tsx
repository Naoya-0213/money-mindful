// 合計セクション
import Total from "@/app/(money-mindful)/money-mindful/total/component/Total";

import GoalStatusCard from "../home/component/GoalStatusCard";

export default function TotalPage() {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <GoalStatusCard />
        <Total />
      </div>
    </div>
  );
}
