// 共通ボタン

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`h-[60px] w-full max-w-[325px] min-w-[200px] rounded-xl bg-[#795549] px-6 py-2 text-center text-xl text-[#F3F0EB] ${className ?? ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
