// 入力input（textarea）用
import React, { forwardRef } from "react";

import Image from "next/image";

type FormFieldProps = {
  label: string;
  placeholder?: string;

  // タイプの選択
  type?: "text" | "number" | "date" | "email";

  // テキストエリアの場合に指定
  isTextarea?: boolean;

  // アイコンがある場合に指定
  icon?: string;

  value?: string;

  // 内容が更新される度に発火
  onChange?: (e: React.ChangeEvent<any>) => void;

  // 対象がフォーカスから外れた時に発火
  onBlur?: (e: React.FocusEvent<any>) => void;
};

const FormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>(
  (
    { label, placeholder, type = "text", isTextarea = false, icon, ...rest },
    ref,
  ) => {
    return (
      <div className="flex flex-col gap-3">
        {/* タイトル */}
        <div className="flex items-center gap-3">
          <div>
            {icon && <Image src={icon} alt="アイコン" width={20} height={20} />}
          </div>
          <label className="text-lg font-bold text-[#795549]">{label}</label>
        </div>

        {/* inputエリア（textarea） */}
        {isTextarea ? (
          <textarea
            placeholder={placeholder}
            {...rest}
            className="min-h-26 w-full font-bold resize-none rounded-2xl border border-[#E0E0E0] bg-white px-4 py-4 text-[#795549] placeholder:text-[#9CA3AF] focus:border-[#795549] focus:ring-0 focus:outline-none"
            ref={ref as React.Ref<HTMLTextAreaElement>}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            {...rest}
            style={{ height: "var(--input-height)" }}
            className="w-full rounded-2xl border font-bold border-[#E0E0E0] bg-white px-4 py-2 text-[#795549] placeholder:text-[#9CA3AF] focus:border-[#795549] focus:ring-0 focus:outline-none"
            ref={ref as React.Ref<HTMLInputElement>}
          />
        )}
      </div>
    );
  },
);

export default FormField;
