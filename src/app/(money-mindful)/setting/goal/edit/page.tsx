import GoalSettingEdit from "@/app/components/goal/GoalSettingEditForm";

// ===== 目標の編集用 ======

const GoalSettingEditPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[480px] min-w-[320px] flex-col gap-5 bg-[#F3F0EB]">
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <GoalSettingEdit />
      </div>
    </div>
  );
};

export default GoalSettingEditPage;
