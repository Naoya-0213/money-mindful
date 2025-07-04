// カテゴリーアイコン用

import Image from "next/image";
import React from "react";
import { categoryIconMap } from "./lib/categoryIconMap";

type CategoryIconProps = {
  name: keyof typeof categoryIconMap;
  alt: string;
};

const CategoryIcon = ({ name, alt }: CategoryIconProps) => {
  const src = categoryIconMap[name];

  return (
    <div
      className="flex items-center justify-center rounded-full bg-[#D7CDBE]"
      style={{ width: 40, height: 40 }}
    >
      <Image src={src} alt={alt} width={25} height={25} />
    </div>
  );
};

export default CategoryIcon;
