import React from "react";

// ===== 共通ボタンコンポーネント =====
// 📍全ページで使用される汎用ボタン（リンク or ボタン）
// href指定時はアンカータグ、未指定時はbuttonタグで描画

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const Button = ({
  children,
  onClick,
  className,
  type = "button",
  href,
}: ButtonProps) => {
  const baseClass =
    "h-14 w-full max-w-[280px] min-w-[200px] rounded-2xl bg-[#795549] px-6 py-2 text-center text-lg font-bold text-[#F3F0EB] flex justify-center items-center " +
    (className ?? "");

  if (href) {
    return (
      <a href={href} className={baseClass}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClass}>
      {children}
    </button>
  );
};

export default Button;
