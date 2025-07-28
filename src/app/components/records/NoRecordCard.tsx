" use client";

import Button from "../button/Button";
import CategoryIcon from "../category/category-icon/CategoryIcon";
import SectionCard from "../section-card/SectionCard";
import SectionInfoBox from "../section-card/SectionInfoBox";

const NoRecordCard = () => {
  return (
    <SectionCard label="登録履歴" icon="/icon/record/record2.png">
      <div className="flex justify-center py-5">
        <h2 className="text-lg font-bold text-[#795549]">
          「がまん」の登録がありません。
        </h2>
      </div>

      {/* 説明文 */}
      <div className="flex flex-col items-center justify-center leading-relaxed font-semibold text-[#777777]">
        <p>コンビニのコーヒーや外食.....</p>
        <p>ちょっとした「がまん」を記録しよう。</p>
      </div>

      {/* 備考 */}
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

      {/* 追加へ移動ボタン */}
      <div className="flex w-full justify-center py-3">
        <Button href="/money-mindful/add">「がまん」を記録する</Button>
      </div>
    </SectionCard>
  );
};

export default NoRecordCard;
