"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { CategoryType } from "../../../const/category-icon/categoryIconMap";
import CategoryIcon from "../category/category-icon/CategoryIcon";

type Props = {
  title: string;
  id: string;
  amount: number;
  category_id: CategoryType; 
};

const RecordItemCard = ({ id, title, amount, category_id }: Props) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/money-mindful/records/${id}`)}
      className="flex w-full items-center justify-between rounded-2xl bg-[#F3F0EB] p-3"
    >
      <div className="flex items-center gap-5">
        {/* アイコン */}
        <div>
          <CategoryIcon id={category_id} />
        </div>
        {/* タイトル */}
        <div className="font-bold">{title}</div>
      </div>

      <div className="flex items-center gap-2">
        {/* 金額 */}
        <div className="font-bold">¥{amount}</div>

        {/* 詳細誘導ボタン */}
        <div>
          <Image
            src="/icon/arrow/next-icon.png"
            alt="矢印"
            width={24}
            height={24}
          />
        </div>
      </div>
    </button>
  );
};

export default RecordItemCard;
