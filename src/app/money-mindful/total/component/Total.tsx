import SectionCard from "@/app/components/section-card/SectionCard";
import SectionInfoBox from "@/app/components/section-card/SectionInfoBox";

const Total = () => {
  return (
    <SectionCard icon="/icon/total/graph.png" label="合計の確認">
      <div className="flex flex-col gap-5 text-center">
        <h2 className="font-bold">合計の確認機能、まもなく実装予定！</h2>

        <p className="text-center leading-relaxed font-semibold text-[#777777]">
          「がまん」した金額の合計を、
          <br />
          分かりやすく振り返れるよう
          <br />
          以下の機能を近日中に実装予定です！
        </p>

        <SectionInfoBox>
          <div className="flex flex-col gap-3">
            <h3>📊 カテゴリー別合計</h3>
            <p className="font-light">
              食費、趣味、買い物などの
              <br />
              カテゴリごとに集計。
              <br />
              節約の傾向や無駄遣い
              <br />
              のクセも見えてくる！
            </p>
          </div>
        </SectionInfoBox>
        <SectionInfoBox>
          <div className="flex flex-col gap-3">
            <h3>
              📅 期間別の集計
              <br />
              （週・月・年）
            </h3>
            <p className="font-light">
              「今週どれだけ頑張った？」
              <br />
              「今月いくら節約できた？」
              <br />
              「今年の合計は？」 <br />
              期間を切り替えて成果を実感！
            </p>
          </div>
        </SectionInfoBox>
      </div>
    </SectionCard>
  );
};

export default Total;
