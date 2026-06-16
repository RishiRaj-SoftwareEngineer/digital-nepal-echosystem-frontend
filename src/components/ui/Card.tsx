import type { ReactNode } from "react";

type CardProps = {
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  accentColor?: string;
  className?: string;
};

export default function Card({
  header,
  children,
  footer,
  accentColor = "border-blue-500",
  className = "",
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 border-l-4 ${accentColor} p-4 ${className}`}
    >
      {header && (
        <div className="mb-3 font-semibold">
          {header}
        </div>
      )}

      <div>{children}</div>

      {footer && (
        <div className="mt-3">
          {footer}
        </div>
      )}
    </div>
  );
}