import Button from "@/app/components/button/Button";
import CategoryIcon from "@/app/components/category/category-icon/CategoryIcon";
import SectionCard from "@/app/components/section-card/SectionCard";
import SectionInfoBox from "@/app/components/section-card/SectionInfoBox";

// ===== ホーム：我慢記録セクションカード =====
// 📍ホーム画面・初回チュートリアルにて使用
// 我慢した支出をカテゴリー付きで記録する導線を表示

type AddRecordCardProps = {
  numberIcon?: string;
};

const AddRecordCard = ({ numberIcon }: AddRecordCardProps) => {
  return (
    <div className="w-full">
      <SectionCard
        label="「がまん」を記録しよう！"
        numberIcon={numberIcon}
        icon="/icon/home/pencil.png"
      >
        {/* 説明文 */}
        <div className="flex flex-col items-center justify-center leading-relaxed font-semibold text-[#777777]">
          <p>コンビニのコーヒーや外食.....</p>
          <p>ちょっとした「がまん」を記録しよう。</p>
        </div>

        {/* 備考 */}
        <SectionInfoBox>
          <div className="flex flex-col gap-5">
            <div className="text-center">
              <p>
                カテゴリーを追加して
                <br />
                整理できます。
              </p>
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
        <div className="flex w-full justify-center pt-3">
          <Button href="/add">「がまん」を記録する</Button>
        </div>
      </SectionCard>
    </div>
  );
};

export default AddRecordCard;
