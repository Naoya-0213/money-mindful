import Image from "next/image";
import React, { Children } from "react";

type SectionCardProps = {
  title: string;
  icon: string;
  children: React.ReactNode;
  label: string;
};

const SectionCard = ({ title, icon, label, children }: SectionCardProps) => {
  return (
    <div className="w-full rounded-2xl bg-[#EAE3D8]">
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center justify-start gap-5">
          {/* icon */}
          <Image src={icon} alt={label} width={30} height={30} />

          {/* タイトル */}
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>

        {/* 他要素 */}
        {children}
      </div>
    </div>
  );
};

export default SectionCard;
