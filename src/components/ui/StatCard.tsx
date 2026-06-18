interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon?: React.ReactNode;
}

export default function StatCard({
  label,
  value,
  change,
  icon,
}: StatCardProps) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">
            {label}
          </p>

          <h2 className="text-2xl font-bold">
            {value}
          </h2>

          {change && (
            <p className="text-sm text-green-600">
              {change}
            </p>
          )}
        </div>

        {icon}
      </div>
    </div>
  );
}