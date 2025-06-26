import React from "react";

const Log = () => {
  return (
    <div className="flex justify-between py-3">
      {/* 登録日付・詳細 */}
      <div className="flex gap-5">
        <div>
          <p className="text-xl font-semibold">4月22日</p>
        </div>
        <div className="flex flex-col">
          <p className="text-xl font-semibold">外食</p>
          <p className="font-extralight">お昼ご飯を節約した</p>
        </div>
      </div>

      {/* 金額 */}
      <div className="text-right">
        <p className="text-xl font-semibold">1,000円</p>
      </div>
    </div>
  );
};

export default Log;
