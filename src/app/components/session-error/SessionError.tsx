import Button from "../button/Button";
import SectionCard from "../section-card/SectionCard";

const SessionError = () => {
  return (
    <SectionCard icon="/icon/error/warning.png" label="セッションエラー">
      <div className="flex flex-col gap-5">
        {/* 注意文 */}
        <div className="flex flex-col items-center gap-5 font-semibold text-[#777777]">
          <div className="flex flex-col items-center">
            <p>セッションが切れております。</p>
          </div>
          <div className="flex flex-col items-center">
            <p>ログインの有効期限が切れているか、</p>
            <p>無効なリンクです。</p>
          </div>
          <div className="flex flex-col items-center">
            <p>お手数ですが、</p>
            <p>再度ログインしてください。</p>
          </div>
        </div>
      </div>

      {/* ログインボタン */}
      <div className="flex justify-center">
        <Button href="/auth/signin">ログインはこちら</Button>
      </div>
    </SectionCard>
  );
};

export default SessionError;
