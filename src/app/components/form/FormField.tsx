// フォーム用

import Image from "next/image";
import React from "react";

type FormFieldProps = {
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "date";
  isTextarea?: boolean;
  icon?: string;
  value?: string;

  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

const FormField = ({
  label,
  placeholder,
  type = "text",
  isTextarea = false,
  icon,
  value,
  onChange,
}: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-3">
      {/* タイトル */}
      <div className="flex gap-3 items-center">
        <div>
          {icon && <Image src={icon} alt={label} width={20} height={20} />}
        </div>
        <label className="text-lg font-bold text-[#795549]">{label}</label>
      </div>

      {/* inputエリア（textarea） */}
      {isTextarea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="min-h-24 w-full resize-none rounded-2xl border border-[#E0E0E0] bg-white px-6 py-2 text-[#795549] placeholder:text-[#9CA3AF] focus:border-[#795549] focus:ring-0 focus:outline-none"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="h-14 w-full rounded-2xl border border-[#E0E0E0] bg-white px-6 py-2 text-[#795549] placeholder:text-[#9CA3AF] focus:border-[#795549] focus:ring-0 focus:outline-none"
        />
      )}
    </div>
  );
};

export default FormField;
