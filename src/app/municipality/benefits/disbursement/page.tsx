"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Disbursement = {
  id: number;
  citizenId: string;
  benefitType: string;
  amount: string;
  method: string;
  startDate: string;
  endDate: string;
  notes: string;
  createdAt: string;
  disbursedBy: string;
};

type FormState = {
  citizenId: string;
  benefitType: string;
  amount: string;
  method: string;
  startDate: string;
  endDate: string;
  notes: string;
};

 function DisbursementContent() {
  const searchParams = useSearchParams();

  const citizenId = searchParams.get("citizen") || "";
  const [form, setForm] = useState<FormState>({
    citizenId: citizenId,
    benefitType: "",
    amount: "",
    method: "CASH",
    startDate: "",
    endDate: "",
    notes: "",
  });

  const [data, setData] = useState<Disbursement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("disbursements");
      if (stored) {
        setData(JSON.parse(stored) as Disbursement[]);
      }
    } finally {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleSave = () => {
    const existing: Disbursement[] = JSON.parse(
      localStorage.getItem("disbursements") || "[]",
    );

    const isDuplicate = existing.some(
      (item) =>
        item.citizenId === form.citizenId &&
        item.startDate === form.startDate &&
        item.endDate === form.endDate,
    );

    if (isDuplicate) {
      alert("⚠️ This citizen already has a disbursement for this period");
      return;
    }

    const newRecord: Disbursement = {
      ...form,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      disbursedBy: "Admin",
    };

    const updated = [...existing, newRecord];

    localStorage.setItem("disbursements", JSON.stringify(updated));

    setData(updated); // yesla chai ui update garxa immediately without reload

    alert("Saved successfully");
  };

  type Summary = Record<
    string,
    {
      totalAmount: number;
      beneficiaries: Set<string>;
    }
  >;

  const summary = data.reduce<Summary>((acc, item) => {
    if (!acc[item.benefitType]) {
      acc[item.benefitType] = {
        totalAmount: 0,
        beneficiaries: new Set<string>(),
      };
    }

    acc[item.benefitType].totalAmount += Number(item.amount);
    acc[item.benefitType].beneficiaries.add(item.citizenId);

    return acc;
  }, {});
  // const citizenData = data.filter(
  //     (item) =>
  //         item.citizenId === form.citizenId
  // );

  // const summary = citizenData.reduce(
  //     (acc, item) => {

  //         if (!acc[item.benefitType]) {

  //             acc[item.benefitType] = {
  //                 totalAmount: 0,
  //                 beneficiaries: new Set<string>(),
  //             };

  //         }

  //         acc[item.benefitType]
  //             .totalAmount += Number(item.amount);

  //         acc[item.benefitType]
  //             .beneficiaries
  //             .add(item.citizenId);

  //         return acc;

  //     },
  //     {} as Summary
  // );

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Benefit Disbursement</h1>

      <div className="space-y-3">
        <input
          placeholder="Citizen ID"
          className="border p-2 w-full"
          value={form.citizenId}
          onChange={(e) => setForm({ ...form, citizenId: e.target.value })}
        />

        <input
          placeholder="Benefit Type"
          className="border p-2 w-full"
          value={form.benefitType}
          onChange={(e) => setForm({ ...form, benefitType: e.target.value })}
        />

        <input
          placeholder="Amount (NPR)"
          className="border p-2 w-full"
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <select
          className="border p-2 w-full"
          value={form.method}
          onChange={(e) => setForm({ ...form, method: e.target.value })}
        >
          <option value="CASH">Cash</option>
          <option value="BANK_TRANSFER">Bank Transfer</option>
          <option value="CHEQUE">Cheque</option>
          <option value="MOBILE_WALLET">Mobile Wallet</option>
        </select>

        <input
          type="date"
          className="border p-2 w-full"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        />

        <input
          type="date"
          className="border p-2 w-full"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
        />

        <textarea
          placeholder="Notes"
          className="border p-2 w-full"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-4 py-2 mt-4"
      >
        Save Disbursement
      </button>

      <table className="w-full mt-8 border">
        <thead>
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Method</th>
            <th className="border p-2">Disbursed By</th>
            <th className="border p-2">Period</th>
          </tr>
        </thead>

        <tbody>
          {data
            .filter((item) => item.citizenId === form.citizenId)
            .map((d) => (
              <tr key={d.id}>
                <td className="border p-2">
                  {new Date(d.createdAt).toLocaleDateString()}
                </td>

                <td className="border p-2">NPR {d.amount}</td>

                <td className="border p-2">{d.method}</td>

                <td className="border p-2">{d.disbursedBy}</td>

                <td className="border p-2">
                  {d.startDate}
                  {" → "}
                  {d.endDate}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Monthly Disbursement Summary</h2>

        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">Benefit Type</th>
              <th className="border p-2">Total Amount (NPR)</th>
              <th className="border p-2">Total Beneficiaries</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(summary).map(([type, value]) => (
              <tr key={type}>
                <td className="border p-2">{type}</td>
                <td className="border p-2">{value.totalAmount}</td>
                <td className="border p-2">{value.beneficiaries.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default function DisbursementPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DisbursementContent />
    </Suspense>
  );
}