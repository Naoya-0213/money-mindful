// ===== メール変更失敗ページ =====
// 📍メールアドレス変更時に送信されたリンク先でエラーが発生した場合に表示
// Supabaseのエラー内容に応じた案内を表示する
import SessionErrorPage from "@/app/(money-mindful)/session-error/page";

const CallbackErrorPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SessionErrorPage />
      </div>
    </div>
  );
};

export default CallbackErrorPage;
