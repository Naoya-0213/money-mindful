// フッターの部品用

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
    <div>
      <h2>{title}</h2>
      <div>{children}</div>
      <button onClick={onClick}>{buttonText}</button>
    </div>
  );
}
