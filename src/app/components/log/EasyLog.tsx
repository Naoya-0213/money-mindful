import React from "react";

const EasyLog = () => {
  return (
    <div className="flex justify-between py-3">
      {/* 登録日付・詳細 */}
      <div className="flex gap-5">
        <div className="flex flex-col">
          <p className="text-2xl font-semibold">外食</p>
          <p className="text-xl font-extralight">お昼ご飯を節約した</p>
        </div>
      </div>

      {/* 金額 */}
      <div className="text-right">
        <p className="text-2xl font-semibold">1,000円</p>
      </div>
    </div>
  );
};

export default EasyLog;
