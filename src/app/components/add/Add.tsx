import React from "react";
import Button from "../button/Button";
import Category from "../category/Category";

const Add = () => {
  return (
    <div className="flex w-full flex-col gap-5 p-5 text-[#795549]">
      {/* タイトル */}
      <h2 className="text-2xl font-bold">我慢記録を追加</h2>

      {/* 入力フォーム */}
      <div className="flex flex-col gap-5">
        {/* タイトル */}
        <label className="text-xl font-semibold">タイトル</label>
        <input
          type="text"
          placeholder="外食を我慢"
          className="h-[60px] rounded-xl border border-[#795549] bg-white px-6 py-2 text-xl"
        />

        {/* 額 */}
        <label className="text-xl font-semibold">額</label>
        <div className="flex items-center gap-4">
          <input
            type="number"
            placeholder="500"
            className="h-[60px] w-full rounded-xl border border-[#795549] bg-white px-6 py-2 text-xl"
          />
          <span className="text-xl font-bold">円</span>
        </div>

        {/* カテゴリー */}
        <div className="mt-2 flex items-center gap-4">
          <label className="text-xl font-semibold">カテゴリー</label>
          <button className="rounded-md border bg-[#795549] px-3 py-1 text-base text-[#F3F0EB]">
            編集
          </button>
        </div>

        {/* ラベル */}
        <div className="flex flex-wrap gap-2">
          <Category className="border-1 border-[#795549]">外食</Category>
          <Category className="border-1 border-[#795549]">飲み物</Category>
          <Category className="border-1 border-[#795549]">飲み会</Category>
          <Category className="border-1 border-[#795549]">衝動買い</Category>
          <Category className="border-1 border-[#795549]">コンビニ</Category>
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
