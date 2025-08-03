import React from "react";

import Image from "next/image";

// ===== セクションカードUIコンポーネント（見出し＋中身） =====
// 📍使用場所：ホーム画面や設定画面など複数ページで共通利用
// 備考：numberIconはステップ番号など任意で表示切替可能

type SectionCardProps = {
  icon: string;
  children: React.ReactNode;
  label: string;
  numberIcon?: string;
};

const SectionCard = ({
  numberIcon,
  icon,
  label,
  children,
}: SectionCardProps) => {
  return (
    <div className="w-full rounded-2xl bg-[#EAE3D8] pb-3">
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center justify-start gap-5">
          {/* number-icon */}
          {numberIcon && (
            <Image
              src={numberIcon}
              alt="ナンバーアイコン"
              width={30}
              height={30}
            />
          )}

          <div className="flex items-center justify-start gap-3">
            {/* icon */}
            <Image src={icon} alt="アイコン" width={25} height={25} />
            {/* タイトル */}
            <h2 className="text-xl font-bold">{label}</h2>
          </div>
        </div>

        {/* 他要素 */}
        {children}
      </div>
    </div>
  );
};

export default SectionCard;
