type CardProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  accentColor?: string;
};

export function Card({
  header,
  children,
  footer,
  accentColor = "border-blue-500",
}: CardProps) {
  return (
    <div className={`border-l-4 ${accentColor} border rounded p-4`}>
      {header && <div className="mb-3 font-semibold">{header}</div>}

      <div>{children}</div>

      {footer && <div className="mt-3">{footer}</div>}
    </div>
  );
}