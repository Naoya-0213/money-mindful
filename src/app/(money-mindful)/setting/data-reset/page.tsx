"use client";

import Image from "next/image";

import { Button, SectionCard, SectionInfoBox } from "@/app/components";
import ConfirmToast from "@/app/components/atoms/toast/ConfirmToast";

const dataResetPage = () => {
  const handleClick = () => {
    ConfirmToast({
      title: "データをリセットしますか？",
      message: (
        <>
          この操作は取り消せません。
          <br />
          本当に実行しますか？
          <br />
          <br />
          なお、アカウント情報は残ります。
        </>
      ),
      confirmText: "リセットする",
      cancelText: "やめる",
      onConfirm: async () => {
        // TODO動作実装予定(src/hooks/setting/useDataReset.ts)
        // await resetData();
      },
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard
          icon="/icon/setting/account/enter.png"
          label="アカウント管理"
        >
          <div className="py-3 leading-relaxed font-semibold text-[#777777]">
            <p className="text-center">本当にデータをリセットしますか？</p>
          </div>

          <SectionInfoBox>
            <div className="flex items-center gap-3">
              <Image
                src="/icon/setting/account/warning.png"
                alt="ナンバーアイコン"
                width={25}
                height={25}
              />
              <h2 className="text-lg font-bold">注意！</h2>
            </div>
            <div className="py-5">
              <p className="text-center leading-relaxed font-semibold text-[#777777]">
                この操作を行うと、
                <br />
                これまでの「がまん」記録が
                <br />
                すべて削除されます。
                <br />
                <br />
                なお、アカウント情報は
                <br />
                そのまま残ります。
                <br />
                <br />
                本当にリセットしてもよいか、
                <br />
                よくご確認の上
                <br />
                操作してください。
              </p>
            </div>
          </SectionInfoBox>

          <div className="flex w-full flex-col items-center gap-5 py-3 pt-5">
            <Button onClick={handleClick}>データをリセットする</Button>
            {/* <DeleteAccountButton /> */}
            {/* TODOトースト作成 */}
            <Button href="/setting">設定に戻る</Button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default dataResetPage;
