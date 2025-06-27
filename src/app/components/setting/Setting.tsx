import React from "react";
import SettingItem from "./SettingItme";

const Setting = () => {
  return (
    <div className="flex flex-col gap-5">
      {/* プロフィール */}
      <div className="p-5">
        <SettingItem
          title="現在の目標"
          buttonText="目標を編集"
          onClick={() => alert("目標を編集へ遷移！")}
        >
          <p>仮</p>
        </SettingItem>
      </div>
    </div>
  );
};

export default Setting;
