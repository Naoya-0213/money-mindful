// カテゴリーアイコン用

import Image from "next/image";
import React from "react";
import { categoryIconMap } from "../../../../const/category-icon/categoryIconMap";

type CategoryIconProps = {
  name: keyof typeof categoryIconMap;
};

const CategoryIcon = ({ name }: CategoryIconProps) => {
  const icon = categoryIconMap[name];

  return (
    <div
      className="flex items-center justify-center rounded-full bg-[#D7CDBE]"
      style={{ width: 40, height: 40 }}
    >
      <Image src={icon.src} alt={icon.alt} width={25} height={25} />
    </div>
  );
};

export default CategoryIcon;
