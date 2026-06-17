interface EmptyStateProps {
  icon?: React.ReactNode;
  message?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export default function EmptyState({
  icon,
  message = "No data found",
  ctaText,
  onCtaClick,
}: EmptyStateProps) {
  return (
    <div className="px-4 py-8 text-center text-gray-500">
      {icon}
      <p>{message}</p>

      {ctaText && (
        <button onClick={onCtaClick}>
          {ctaText}
        </button>
      )}
    </div>
  );
}
