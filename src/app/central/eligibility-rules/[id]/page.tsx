"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import rulesData from "@/data/eligibility-rules.json";

/* ================= TYPES ================= */
type Rule = {
  id: string;
  rule_name: string;
  benefit_type: string;
  condition_expression: Record<string, unknown>;
  benefit_value: Record<string, unknown>;
  priority: number;
  is_active: boolean;
};

/* ================= BADGES ================= */
const badgeColors: Record<string, string> = {
  UNEMPLOYMENT_ID: "bg-amber-100 text-amber-800",
  DISABILITY_ID: "bg-blue-100 text-blue-800",
  SENIOR_CITIZEN: "bg-green-100 text-green-800",
  SINGLE_WOMAN: "bg-pink-100 text-pink-800",
  FOOD_SUBSIDY: "bg-orange-100 text-orange-800",
  HEALTH_INSURANCE: "bg-teal-100 text-teal-800",
};

/* ================= STABLE HASH (NO RANDOM) ================= */
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % 100000;
  }
  return hash;
};

export default function Page() {
  const params = useParams();
  const id = params?.id as string;

  const rule = (rulesData as Rule[]).find((r) => r.id === id);

  if (!rule) {
    return (
      <div className="p-6">
        <p>Rule not found</p>
        <Link href="/central/eligibility-rules" className="text-blue-600">
          ← Back
        </Link>
      </div>
    );
  }

  const affectedCitizens = hashString(rule.id);

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-900">
      {/* BACK */}
      <Link
        href="/central/eligibility-rules"
        className="text-blue-600 hover:underline"
      >
        ← Back
      </Link>

      {/* TITLE */}
      <h1 className="text-2xl font-bold mt-4">{rule.rule_name}</h1>

      {/* INFO GRID */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Benefit Type</p>
          <span
            className={`px-2 py-1 rounded ${badgeColors[rule.benefit_type]}`}
          >
            {rule.benefit_type}
          </span>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Status</p>
          <span
            className={`px-2 py-1 rounded text-white ${
              rule.is_active ? "bg-green-600" : "bg-gray-500"
            }`}
          >
            {rule.is_active ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Priority</p>
          <p>{rule.priority}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Rule ID</p>
          <p>{rule.id}</p>
        </div>
      </div>

      {/* CONDITION */}
      <div className="bg-white p-4 rounded shadow mt-6">
        <h2 className="font-bold mb-2">Condition</h2>
        <pre className="bg-gray-100 p-3 rounded text-sm">
          {JSON.stringify(rule.condition_expression, null, 2)}
        </pre>
      </div>

      {/* BENEFIT */}
      <div className="bg-white p-4 rounded shadow mt-6">
        <h2 className="font-bold mb-2">Benefit</h2>
        <pre className="bg-gray-100 p-3 rounded text-sm">
          {JSON.stringify(rule.benefit_value, null, 2)}
        </pre>
      </div>

      {/* IMPACT */}
      <div className="bg-white p-4 rounded shadow mt-6">
        <h2 className="font-bold mb-2">Impact</h2>
        <p>
          Estimated affected citizens:{" "}
          <span className="font-bold">{affectedCitizens}</span>
        </p>
      </div>
    </div>
  );
}
