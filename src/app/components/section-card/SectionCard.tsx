import Image from "next/image";
import React, { Children } from "react";

type SectionCardProps = {
  icon: string;
  children: React.ReactNode;
  label: string;
};

const SectionCard = ({ icon, label, children }: SectionCardProps) => {
  return (
    <div className="w-full rounded-2xl bg-[#EAE3D8]">
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center justify-start gap-5">
          {/* icon */}
          <Image src={icon} alt="アイコン" width={25} height={25} />

          {/* タイトル */}
          <h2 className="text-xl font-bold">{label}</h2>
        </div>

        {/* 他要素 */}
        {children}
      </div>
    </div>
  );
};

export default SectionCard;
