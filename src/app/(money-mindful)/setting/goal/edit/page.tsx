// ===== 目標の編集用 ======
import { GoalSettingEditForm } from "@/app/components";

const GoalSettingEditPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <GoalSettingEditForm />
      </div>
    </div>
  );
};

export default GoalSettingEditPage;
