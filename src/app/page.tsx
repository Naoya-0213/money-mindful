import Home from "./components/home/Home";

export default function PagaTop() {
  // login機能は後ほど

  return (
    <div className="w-full mx-auto flex flex-col gap-5 bg-[#F3F0EB] min-w-[320px] max-w-[480px]">
      <Home />
    </div>
  );
}
