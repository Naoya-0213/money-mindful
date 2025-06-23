import React from "react";

const Add = () => {
  return (
    <div className="w-full flex flex-col gap-4 text-[#795549]">
      {/* タイトル */}
      <h2 className="text-xl font-bold">我慢記録を追加</h2>

      {/* 入力フォーム */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold">タイトル</label>
        <input
          type="text"
          placeholder="外食を我慢"
          className="border border-[#795549] rounded-md px-3 py-2"
        />

        <label className="font-semibold">額</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="500"
            className="w-full border border-[#795549] rounded-md px-3 py-2"
          />
          <span className="text-sm font-bold">円</span>
        </div>

        <label className="font-semibold">カテゴリー</label>
        <div className="flex items-center gap-2">
          <button className="text-sm border border-[#795549] rounded-md px-2 py-1">
            編集
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="bg-[#D7CDBE] text-sm font-bold rounded-md px-3 py-1">
            外食
          </button>
          <button className="border border-[#795549] text-sm rounded-md px-3 py-1">
            飲み物
          </button>
          <button className="border border-[#795549] text-sm rounded-md px-3 py-1">
            交通費
          </button>
        </div>

        <label className="font-semibold">メモ</label>
        <input
          type="text"
          placeholder="例：コンビニのアイスを我慢"
          className="border border-[#795549] rounded-md px-3 py-2"
        />
      </div>

      {/* 追加ボタン */}
      <button className="bg-[#795549] text-white rounded-md py-2 font-bold mt-4">
        追加
      </button>
    </div>
  );
};

export default Add;