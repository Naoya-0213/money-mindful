import Image from "next/image";

import {
  CATEGORY_LIST,
  CategoryType,
} from "../../../../const/category-icon/categoryIconMap";

// ===== カテゴリーアイコン表示コンポーネント =====
// 📍カテゴリーボタンやカード内で使用。カテゴリーIDに応じた画像を表示
// CATEGORY_LISTから該当アイコンデータを取得し、アイコンをレンダリング

type CategoryIconProps = {
  id: CategoryType;
};

const CategoryIcon = ({ id }: CategoryIconProps) => {
  const category = CATEGORY_LIST.find((category) => id === category.id);

  if (!category) return null;

  return (
    <div
      className="flex items-center justify-center rounded-full bg-[#D7CDBE]"
      style={{ width: 40, height: 40 }}
    >
      <Image src={category.src} alt={category.alt} width={25} height={25} />
    </div>
  );
};

export default CategoryIcon;
