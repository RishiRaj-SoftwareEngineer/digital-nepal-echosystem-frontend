type BadgeProps = {
  status: "SYNCED" | "PENDING" | "CONFLICT" | "VERIFIED" | "ARCHIVED";
};

export function Badge({ status }: BadgeProps) {
  return <span>{status}</span>;
}
