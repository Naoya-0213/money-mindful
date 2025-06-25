// フッターの部品用

import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  icon: string;
  label: string;
  href: string;
};

export default function FooterItem({ icon, label, href }: Props) {
  return (
    <Link href={href!} className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Image src={icon} alt={label} width={30} height={30} />
        <p className="mt-[1px] text-sm font-semibold">{label}</p>
      </div>
    </Link>
  );
}
