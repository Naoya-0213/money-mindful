"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteAccountButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">本当に削除しますか？</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="rounded bg-gray-200 px-3 py-1 text-xs"
              disabled={loading}
            >
              キャンセル
            </button>
            <button
              onClick={async () => {
                try {
                  setLoading(true);
                  toast.loading("削除中...", { id: t.id });
                  const res = await fetch("/api/account/delete", { method: "POST" });
                  if (!res.ok) {
                    const j = await res.json().catch(() => ({}));
                    throw new Error(j.message ?? "削除に失敗しました");
                  }
                  toast.success("アカウントを削除しました", { id: t.id });
                  router.replace("/"); // or "/goodbye"
                } catch (e: unknown) {
                  const errorMessage =
                    typeof e === "object" && e !== null && "message" in e && typeof (e as { message?: string }).message === "string"
                      ? (e as { message: string }).message
                      : "エラーが発生しました";
                  toast.error(errorMessage, { id: t.id });
                } finally {
                  setLoading(false);
                }
              }}
              className="rounded bg-red-600 px-3 py-1 text-xs text-white disabled:opacity-50"
              disabled={loading}
            >
              削除する
            </button>
          </div>
        </div>
      ),
      { duration: 4000 } // 自動で閉じたくないなら Infinity
    );
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
    >
      アカウントを削除する
    </button>
  );
}