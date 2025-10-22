"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import { useDataReset } from "@/hooks/setting/useDataReset";

import { Button, SectionCard } from "@/app/components";

const DataResetConfirmPage = () => {
  const router = useRouter();
  const { dataReset } = useDataReset();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      const res = await dataReset();

      // 成功
      if (res.ok) {
        setMessage("");
        toast.success("全ての記録をリセットしました！");
        router.replace("/setting");
        console.log("✅ データリセット完了！");
        return;
      }

      // エラー
      if (res.reason === "no-user") {
        setMessage("ユーザー情報が取得できません。ログインし直してください。");
        toast.error("リセットできませんでした");
      } else {
        // エラー
        setMessage("リセットに失敗しました。再度お試しください。");
        toast.error("リセットできませんでした");
        console.error("❎ リセットエラー！", res.dbError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SectionCard
          icon="/icon/setting/account/enter.png"
          label="データリセット"
        >
          <div className="py-3 leading-relaxed font-semibold text-[#777777]">
            <p className="text-center">最後の確認です...!</p>
            <br />
            <p className="text-center">
              なお、リセットしても
              <br />
              アカウント情報は残ります。
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-5 py-3">
            {/* 画像アップロード時エラーメッセージ */}
            {message && <div className="text-red-500">{message}</div>}

            <Button onClick={handleClick}>
              {loading ? "リセット中..." : "データをリセットする"}
            </Button>

            <Button href="/setting">設定に戻る</Button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default DataResetConfirmPage;
