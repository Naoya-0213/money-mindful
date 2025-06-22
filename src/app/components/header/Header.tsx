"use client";

import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="min-w-[320px] max-w-[480px] w-full bg-[#D7CDBE] h-[70px] flex items-center px-5">
      <Image src="/icon/profit.png" alt="Profit Icon" width={32} height={32} />
    </div>
  );
};

export default Header;
