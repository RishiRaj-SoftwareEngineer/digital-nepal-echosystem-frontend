interface TierBadgeProps {
  tier: 'WARD' | 'MUNICIPALITY' | 'PROVINCE' | 'CENTRAL';
}

export function TierBadge({
  tier,
}: TierBadgeProps) {
  const colors = {
    WARD: 'bg-green-100 text-green-700',
    MUNICIPALITY: 'bg-orange-100 text-orange-700',
    PROVINCE: 'bg-blue-100 text-blue-700',
    CENTRAL: 'bg-red-100 text-red-700',
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${colors[tier]}`}
    >
      {tier}
    </span>
  );
}