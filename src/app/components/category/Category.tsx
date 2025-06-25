// 共通ボタン

import React from "react";

type CategoryProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Category = ({ children, onClick, className }: CategoryProps) => {
  return (
    <button
      onClick={onClick}
      className={`h-[40px] min-w-[60px] rounded-lg px-6 py-2 text-center text-base text-[#795549] ${className ?? ""}`}
    >
      {children}
    </button>
  );
};

export default Category;
