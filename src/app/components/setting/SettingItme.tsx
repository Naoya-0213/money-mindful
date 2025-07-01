// フッターの部品用

"use client"

import React from "react";
import SmallButton from "../button/SmallButton";

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
    <div className="rounded-2xl bg-[#EAE3D8] p-5 flex flex-col gap-5">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div>{children}</div>
      <div className="flex justify-center">
        <SmallButton onClick={onClick}>{buttonText}</SmallButton>
      </div>
    </div>
  );
}
