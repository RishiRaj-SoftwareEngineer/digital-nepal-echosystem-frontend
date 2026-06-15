"use client";

import { useState } from "react";
import Link from "next/link";
import rulesData from "@/data/eligibility-rules.json";

/* types */
type Rule = {
  id: string;
  rule_name: string;
  benefit_type: string;
  condition_expression: Record<string, unknown>;
  benefit_value: Record<string, unknown>;
  priority: number;
  is_active: boolean;
};

/* badges*/
const badgeColors: Record<string, string> = {
  UNEMPLOYMENT_ID: "bg-amber-100 text-amber-800",
  DISABILITY_ID: "bg-blue-100 text-blue-800",
  SENIOR_CITIZEN: "bg-green-100 text-green-800",
  SINGLE_WOMAN: "bg-pink-100 text-pink-800",
  FOOD_SUBSIDY: "bg-orange-100 text-orange-800",
  HEALTH_INSURANCE: "bg-teal-100 text-teal-800",
};

export default function Page() {
  const [data, setData] = useState<Rule[]>(rulesData as Rule[]);

  const move = (index: number, direction: "up" | "down") => {
    const updated = [...data];
    const swap = direction === "up" ? index - 1 : index + 1;

    if (swap < 0 || swap >= updated.length) return;

    [updated[index], updated[swap]] = [updated[swap], updated[index]];

    updated.forEach((r, i) => (r.priority = i + 1));

    setData(updated);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-900">
      <h1 className="text-2xl font-bold mb-6">Eligibility Rules</h1>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Rule</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((rule, index) => (
              <tr key={rule.id} className="border-t">
                <td className="p-3 font-medium">{rule.rule_name}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded ${badgeColors[rule.benefit_type]}`}
                  >
                    {rule.benefit_type}
                  </span>
                </td>

                <td className="p-3">
                  <div className="flex items-center gap-2">
                    {rule.priority}
                    <div className="flex flex-col">
                      <button onClick={() => move(index, "up")}>▲</button>
                      <button onClick={() => move(index, "down")}>▼</button>
                    </div>
                  </div>
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-white ${
                      rule.is_active ? "bg-green-600" : "bg-gray-500"
                    }`}
                  >
                    {rule.is_active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="p-3">
                  <Link
                    href={`/central/eligibility-rules/${rule.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
