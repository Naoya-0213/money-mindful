import Image from "next/image";

import Button from "../Atoms/button/Button";

// ===== 初回ログイン前の紹介ページ =====
// 📍未ログイン時に表示されるアプリ紹介画面
// アプリの概要説明とログイン・新規登録への導線を表示

const BeforeSignin = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <div className="w-full rounded-2xl bg-[#EAE3D8]">
          <div className="flex flex-col items-center gap-5 p-5">
            <div className="flex items-center justify-center gap-5">
              {/* アイコン */}
              <div>
                <Image
                  src="/icon/signin/before-signin/light-bulb.png"
                  alt="アイコン"
                  width={35}
                  height={35}
                />
              </div>

              {/* ロゴ */}
              <div>
                <Image
                  src="/icon/signin/before-signin/money-mindful-title_icon.png"
                  alt="アイコン"
                  width={150}
                  height={25}
                />
              </div>

              {/* タイトル */}
              <h2 className="text-xl font-bold">とは？</h2>
            </div>

            {/* 説明文 */}
            <div className="flex flex-col items-center gap-5 py-3 font-semibold text-[#777777]">
              <div className="flex flex-col items-center">
                <p>本当は買いたかったけど</p>
                <p>今日は我慢した。</p>
              </div>

              <div className="flex flex-col items-center">
                <p>そんな日常の小さな節約を記録して</p>
                <p>まるで“貯金”のように</p>
                <p>積み重ねるアプリです。</p>
              </div>

              <div className="flex flex-col items-center">
                <p>小さな我慢が</p>
                <p>大きな達成感に変わります。</p>
              </div>

              <div className="flex flex-col items-center">
                <div>さぁ、あなたも今日からはじめよう。</div>
              </div>
            </div>

            <div className="flex w-full flex-col items-center gap-5 pb-5">
              {/* ログインボタン */}
              <div className="flex w-full justify-center">
                <Button href="/signin/form">ログイン</Button>
              </div>
              {/* 新規登録ボタン */}
              <div className="flex w-full justify-center">
                <Button href="/signup/form">アカウント作成</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeSignin;
