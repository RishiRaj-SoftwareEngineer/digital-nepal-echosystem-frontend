"use client";

import { useWardDashboard } from "@/hooks/useWardDashboard";
import { WARD_ID } from "@/constants";
import People from "@mui/icons-material/People";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import SyncProblem from "@mui/icons-material/SyncProblem";
import CreditCard from "@mui/icons-material/CreditCard";

const ICON_MAP: Record<string, React.ElementType> = {
  People,
  VerifiedUser,
  SyncProblem,
  CreditCard,
};

export default function WardDashboardPage() {
  const cards = useWardDashboard(WARD_ID);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Ward 004 Overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => {
          const Icon = ICON_MAP[card.icon];

          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <div className="text-blue-500">{Icon && <Icon />}</div>
                </div>
              </div>

              <p className="text-sm font-medium text-gray-600">{card.title}</p>

              <p className="text-3xl font-bold text-gray-900 mt-1">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
