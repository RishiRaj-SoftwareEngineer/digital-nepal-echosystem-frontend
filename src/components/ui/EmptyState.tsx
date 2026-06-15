interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({ message = 'No data found' }: EmptyStateProps) {
  return (
    <div className="px-4 py-8 text-center text-gray-500">
      {message}
    </div>
  );
}
