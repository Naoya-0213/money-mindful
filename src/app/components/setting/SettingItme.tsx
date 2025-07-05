// フッターの部品用

"use client";

import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
  buttonText: string;
  onClick: () => void;
};

export default function SettingItem({
  title,
  children,
  buttonText,
  onClick,
}: Props) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-[#EAE3D8] p-5">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div>{children}</div>
      <div className="flex justify-center"></div>
    </div>
  );
}
