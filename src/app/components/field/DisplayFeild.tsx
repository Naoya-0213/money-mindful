// 画面表示のみ用// 入力input（textarea）用

import Image from "next/image";
import React from "react";

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
        className="w-full rounded-2xl bg-white px-4 py-2 text-[#795549] font-bold flex items-center"
        style={{ height: "var(--input-height)" }}
      >
        {children}
      </div>
    </div>
  );
};

export default DisplayField;
