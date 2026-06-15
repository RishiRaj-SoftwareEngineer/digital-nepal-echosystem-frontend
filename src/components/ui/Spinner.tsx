interface SpinnerProps {
  className?: string;
}

export default function Spinner({ className = '' }: SpinnerProps) {
  return (
    <div
      className={`inline-block w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin ${className}`}
    />
  );
}
