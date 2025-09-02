import { type ReactNode } from "react";

export default function ErrorText({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return <p className="mt-1 px-4 text-sm text-red-500">{children}</p>;
}

    