import Image from "next/image";

// ===== 入力値の表示専用フィールド =====
// 📍確認画面などで使用。label＋valueの組み合わせを装飾して表示
// 入力フィールドではなく、子要素（文字列）をそのまま表示する

type DisplayFieldProps = {
  label: string;
  icon?: string;
  children: string;
};

const DisplayField = ({ label, icon, children }: DisplayFieldProps) => {
  return (
    <div className="flex flex-col gap-3">
      {/* タイトル */}
      <div className="flex items-center gap-3">
        <div>
          {icon && <Image src={icon} alt="アイコン" width={20} height={20} />}
        </div>
        <h2 className="text-lg font-bold text-[#795549]">{label}</h2>
      </div>

      <div
        className="flex w-full items-center rounded-2xl bg-white px-4 py-2 font-bold text-[#795549]"
        style={{ height: "var(--input-height)" }}
      >
        {children}
      </div>
    </div>
  );
};

export default DisplayField;
