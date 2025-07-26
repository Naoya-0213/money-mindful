// カテゴリーアイコン用
import Image from "next/image";

import { CATEGORY_LIST } from "../../../../const/category-icon/categoryIconMap";

type CategoryIconProps = {
  name: string;
};

const CategoryIcon = ({ name }: CategoryIconProps) => {
  const category = CATEGORY_LIST.find((category) => name === category.name)!;

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
