// ローディング画面用（自動で表示）

const LoadingSpinner = () => {
  return (
    <div className="mt-20 flex justify-center">
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#795549] border-t-transparent" />
    </div>
  );
};

export default LoadingSpinner;
