import { SessionError } from "@/app/components";

const SessionErrorPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <SessionError />
      </div>
    </div>
  );
};

export default SessionErrorPage;
