import type { ReactNode } from "react";

type FormRowProps = {
  children: ReactNode;
};

export function FormRow({ children }: FormRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {children}
    </div>
  );
}
