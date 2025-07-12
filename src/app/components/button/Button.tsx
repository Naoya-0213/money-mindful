// 共通ボタン

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const Button = ({
  children,
  type = "button",
  onClick,
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`h-14 w-full max-w-[280px] min-w-[200px] rounded-2xl bg-[#795549] px-6 py-2 text-center text-lg font-bold text-[#F3F0EB] ${className ?? ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
