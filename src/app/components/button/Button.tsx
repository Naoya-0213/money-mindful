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
      className={`bg-[#795549] text-[#F3F0EB] px-6 py-2 rounded-full text-center text-xl min-w-[200px] max-w-[325px] w-full
 ${className ?? ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
