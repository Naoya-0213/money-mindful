import React, { forwardRef } from "react";

import Image from "next/image";

// ===== 入力フィールド共通コンポーネント =====
// 📍フォーム入力欄（input・textarea）の共通UI。ラベル・アイコン付き
// フォーム構成に応じてテキストエリア or インプットを自動切り替え

type FormFieldProps = {
  label: string;
  placeholder?: string;

  // 追加のstyle css用
  InputStyle?: React.CSSProperties;

  type?: "text" | "number" | "date" | "email";
  isTextarea?: boolean;
  icon?: string;
  value?: string;

  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;

  children?: React.ReactNode;
};

const FormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>(
  (
    {
      label,
      placeholder,
      type = "text",
      isTextarea = false,
      InputStyle,
      icon,
      children,
      ...rest
    },
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

        {/* 入力エリアをラップ */}
        <div className="relative w-full">
          {isTextarea ? (
            <>
              {children}
              <textarea
                placeholder={placeholder}
                {...rest}
                className="min-h-26 w-full resize-none rounded-2xl border border-[#E0E0E0] bg-white px-4 py-4 font-bold text-[#795549] placeholder:text-[#9CA3AF] focus:border-[#795549] focus:ring-0 focus:outline-none"
                ref={ref as React.Ref<HTMLTextAreaElement>}
                style={InputStyle}
              />
            </>
          ) : (
            <>
              {children}
              <input
                type={type}
                placeholder={placeholder}
                {...rest}
                style={{ height: "var(--input-height)", ...InputStyle }}
                className="w-full rounded-2xl border border-[#E0E0E0] bg-white px-4 py-2 font-bold text-[#795549] placeholder:text-[#9CA3AF] focus:border-[#795549] focus:ring-0 focus:outline-none"
                ref={ref as React.Ref<HTMLInputElement>}
              />
            </>
          )}
        </div>
      </div>
    );
  },
);

FormField.displayName = "FormField";
export default FormField;
