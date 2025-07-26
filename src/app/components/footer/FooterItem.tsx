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
    <Link href={href!} className="flex flex-col items-center justify-center">
      <Image src={icon} alt={label} width={28} height={28} />
      <p className="mt-[1px] text-sm font-semibold">{label}</p>
    </Link>
  );
}
