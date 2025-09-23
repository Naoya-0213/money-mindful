"use client";

import { useState } from "react";
import toast from "react-hot-toast";

type ConfirmOptions = {
  title?: string;
  message?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => Promise<void> | void;
};

export default function ConfirmToast({
  title = "確認",
  message = "この操作は取り消せません。本当に実行しますか？",
  confirmText = "実行する",
  cancelText = "キャンセル",
  onConfirm,
}: ConfirmOptions) {
  const ToastBody = () => {
    const [isRunning, setIsRunning] = useState(false);

    const handleConfirm = async () => {
      setIsRunning(true);

      try {
        await onConfirm();
        toast.dismiss(id);
        toast.success("完了しました");

        // TODO成功後どこに飛ばす？
      } catch {
        toast.dismiss(id);
        toast.error("失敗しました。もう一度お試しください。");
      }
    };

    return (
      <div
        role="alertdialog"
        aria-labelledby="confirm-title"
        className="flex w-[280px] flex-col gap-3 rounded-lg shadow-sm"
        style={{
          fontFamily: "var(--font-geist-sans)",
          background: "#F3F0EB",
          color: "#795549",
          fontSize: "14px",
          padding: "12px 16px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p id="confirm-title" className="text-sm font-semibold">
          {title}
        </p>

        {/* コンテナのfontSize=14pxを活かすため text-xsは外す */}
        <div className="leading-relaxed text-[#795549]/80">{message}</div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(id)}
            className="rounded border border-[#795549]/10 bg-white/70 px-3 py-1 text-[12px] text-[#795549] hover:bg-white focus:ring-2 focus:ring-[#795549]/30 focus:outline-none disabled:opacity-60"
            disabled={isRunning}
          >
            {cancelText}
          </button>

          <button
            onClick={handleConfirm}
            className="rounded bg-[#795549] px-3 py-1 text-[12px] text-white hover:opacity-90 focus:ring-2 focus:ring-[#795549]/30 focus:outline-none disabled:opacity-60"
            disabled={isRunning}
          >
            {isRunning ? "処理中..." : confirmText}
          </button>
        </div>
      </div>
    );
  };

  const id = toast.custom(<ToastBody />, {
    duration: Infinity, // 確定/キャンセルまで出しっぱなし
    position: "top-center",
  });

  return id;
}
