"use client";

import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <div
      style={{ height: "var(--header-height)" }}
      className="fixed top-0 z-50 flex w-full max-w-[480px] min-w-[320px] items-center bg-[#D7CDBE] px-5"
    >
      <Image src="/icon/profit.png" alt="Profit Icon" width={32} height={32} />
    </div>
  );
};

export default Header;
