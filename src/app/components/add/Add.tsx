import React from "react";
import Button from "../button/Button";

const Add = () => {
  return (
    <div className="flex w-full flex-col gap-5 px-6 py-6 text-[#795549]">
      {/* タイトル */}
      <h2 className="text-2xl font-bold">我慢記録を追加</h2>

      {/* 入力フォーム */}
      <div className="flex flex-col gap-5">
        {/* タイトル */}
        <label className="font-semibold">タイトル</label>
        <input
          type="text"
          placeholder="外食を我慢"
          className="h-[60px] rounded-xl border border-[#795549] bg-white px-6 py-2"
        />

        {/* 額 */}
        <label className="font-semibold">額</label>
        <div className="flex items-center gap-4">
          <input
            type="number"
            placeholder="500"
            className="h-[60px] w-full rounded-xl border border-[#795549] bg-white px-6 py-2"
          />
          <span className="text-sm font-bold">円</span>
        </div>

        {/* カテゴリー */}
        <label className="font-semibold">カテゴリー</label>
        <div className="flex items-center gap-2">
          <button className="rounded-md border border-[#795549] px-2 py-1 text-sm">
            編集
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-md bg-[#D7CDBE] px-3 py-1 text-sm font-bold">
            外食
          </button>
          <button className="rounded-md border border-[#795549] px-3 py-1 text-sm">
            飲み物
          </button>
          <button className="rounded-md border border-[#795549] px-3 py-1 text-sm">
            交通費
          </button>
        </div>

        {/* メモ */}
        <label className="font-semibold">メモ</label>
        <input
          type="text"
          placeholder="例：コンビニのアイスを我慢"
          className="h-[60px] rounded-xl border border-[#795549] bg-white px-6 py-2"
        />
      </div>

      {/* 仮追加ボタン */}
      <div className="flex justify-center">
        <Button onClick={() => alert("クリックされた！")}>追加</Button>
      </div>
    </div>
  );
};

export default Add;
