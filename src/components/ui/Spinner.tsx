type SpinnerProps = {
  size?: "sm" | "md" | "lg";
};

export function Spinner({ size = "md" }: SpinnerProps) {
  return <div>Loading ({size})</div>;
}
