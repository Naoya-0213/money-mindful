// セクションカード内の説明部分

import React from "react";

type SectionInfoBoxProps = {
  children: React.ReactNode;
};

const SectionInfoBox = ({ children }: SectionInfoBoxProps) => {
  return (
    <div className="px-5">
      <div className="flex w-full flex-col items-center rounded-2xl bg-[#F3F0EB] p-5 font-semibold">
        <div className="flex flex-col leading-relaxed w-full">{children}</div>
      </div>
    </div>
  );
};

export default SectionInfoBox;
