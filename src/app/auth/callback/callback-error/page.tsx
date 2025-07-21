import React from "react";

const CallbackErrorPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <p>セッションが切れております。再度ログインしてください。</p>
        <p>ログインの有効期限が切れているか、無効なリンクです。</p>
        <p>お手数ですが、再度ログインし、もう一度同じ操作を行ってください。</p>
      </div>
    </div>
  );
};

export default CallbackErrorPage;
