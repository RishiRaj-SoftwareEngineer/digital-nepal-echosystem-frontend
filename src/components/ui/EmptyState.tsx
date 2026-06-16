type EmptyStateProps = {
  icon?: React.ReactNode;
  message: string;
  ctaText?: string;
  onCtaClick?: () => void;
};

export function EmptyState({
  icon,
  message,
  ctaText,
  onCtaClick,
}: EmptyStateProps) {
  return (
    <div className="text-center p-6">
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