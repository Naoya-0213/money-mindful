// ===== ローディングスピナー表示用 =====
// 📍App Router の loading.tsx で使用（ルートの遅延時に自動表示）
// 軽量なスピナーを中央に表示し、ユーザーに待機中であることを伝える

const LoadingSpinner = () => {
  return (
    <div className="mt-20 flex justify-center">
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#795549] border-t-transparent" />
    </div>
  );
};

export default LoadingSpinner;
