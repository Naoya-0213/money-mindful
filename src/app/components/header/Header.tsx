"use client";

import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <div
      style={{ height: "var(--header-height)" }}
      className="fixed top-0 z-50 flex w-full max-w-[480px] min-w-[320px] items-center bg-[#D7CDBE] px-5"
    >
      <div className="flex items-center gap-4">
        <Image
          src="/icon/logo/money-mindful_icon.png"
          alt="logo"
          width={40}
          height={40}
        />
        <Image
          src="/icon/logo/money-mindful-title_icon.png"
          alt="logo"
          width={180}
          height={30}
        />
        <Image
          src="/icon/logo/piggy-bank.png"
          alt="logo"
          width={30}
          height={30}
        />
      </div>
    </div>
  );
};

export default Header;
