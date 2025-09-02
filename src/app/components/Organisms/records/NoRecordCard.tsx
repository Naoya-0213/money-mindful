"use client";

import Button from "../../Atoms/button/Button";
import CategoryIcon from "../../Molecules/category/category-icon/CategoryIcon";
import SectionCard from "../../Molecules/section-card/SectionCard";
import SectionInfoBox from "../../Molecules/section-card/SectionInfoBox";


// ===== 「がまん」記録がない場合の表示カード =====

const NoRecordCard = () => {
  return (
    <SectionCard label="登録履歴" icon="/icon/record/record2.png">
      {/* ヘッダー：「がまん」の登録がない旨のメッセージ */}
      <div className="flex justify-center py-5">
        <h2 className="text-lg font-bold text-[#795549]">
          「がまん」の登録がありません。
        </h2>
      </div>

      {/* ユーザーに記録の例を促す説明文 */}
      <div className="flex flex-col items-center justify-center leading-relaxed font-semibold text-[#777777]">
        <p>コンビニのコーヒーや外食.....</p>
        <p>ちょっとした「がまん」を記録しよう。</p>
      </div>

      {/* 情報ボックス：カテゴリーの案内と例アイコン */}
      <SectionInfoBox>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center">
            <p>カテゴリーを追加して、</p>
            <p>整理できます。</p>
          </div>

          {/* カテゴリー例 */}
          <div className="flex w-full justify-center gap-5">
            <CategoryIcon id="category-5" />
            <CategoryIcon id="category-3" />
            <CategoryIcon id="category-6" />
            <CategoryIcon id="category-1" />
          </div>
        </div>
      </SectionInfoBox>

      {/* ボタン：「がまん」追加ページへのリンク */}
      <div className="flex w-full justify-center py-3">
        <Button href="/add">「がまん」を記録する</Button>
      </div>
    </SectionCard>
  );
};

export default NoRecordCard;
