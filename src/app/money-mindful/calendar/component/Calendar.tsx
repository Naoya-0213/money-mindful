import Image from "next/image";
import React from "react";

const Calendar = () => {
  return (
    <div className="flex w-full flex-col items-center gap-5 p-5 text-[#795549]">
      {/* 仮カレンダー（記録）表示 */}
      <Image
        src="/temp/仮カレンダー表示.png"
        alt="仮カレンダー"
        width={800}
        height={400}
        style={{ width: "100%", height: "auto" }}
      />

      {/* 選択日の記録表示 */}
      <div className="w-full">
        <h2 className="text-2xl font-bold">6月15日（水）</h2>
      </div>
    </div>
  );
};

export default Calendar;
