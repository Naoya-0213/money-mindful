import Image from "next/image";
import Link from "next/link";

// ===== フッターナビゲーションアイテム =====
// 📍Footer.tsx で使用。各ナビゲーションのアイコンとラベルを表示
// アイコン画像とラベル名を縦並びで配置し、リンクとして機能する

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
