"use client";

import { useMemo, useState } from "react";

import citizens from "../../../../data/citizens.json";
import editApprovals from "../../../../data/edit-approvals.json";
import users from "../../../../data/users.json";
import wards from "../../../../data/wards.json";

function getDaysPending(submittedAt: string) {
  const submittedDate = new Date(submittedAt);
  const today = new Date();

  const differenceInMs = today.getTime() - submittedDate.getTime();
  const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

  return Math.max(days, 0);
}

function getBusinessDaysPending(submittedAt: string) {
  const submittedDate = new Date(submittedAt);
  const today = new Date();

  let businessDays = 0;
  const currentDate = new Date(submittedDate);

  while (currentDate < today) {
    const day = currentDate.getDay();

    const isSaturday = day === 6;
    const isSunday = day === 0;

    if (!isSaturday && !isSunday) {
      businessDays++;
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return businessDays;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatStatus(status: string) {
  if (status === "PENDING_APPROVAL") return "PENDING";
  if (status === "CAO_REVIEW") return "CAO REVIEW";

  return status.replaceAll("_", " ");
}

function getStatusBadgeClass(status: string) {
  if (status === "PENDING_APPROVAL") {
    return "bg-amber-100 text-amber-700";
  }

  if (status === "CAO_REVIEW") {
    return "bg-orange-100 text-orange-700";
  }

  if (status === "APPROVED") {
    return "bg-green-100 text-green-700";
  }

  if (status === "REJECTED") {
    return "bg-red-100 text-red-700";
  }

  return "bg-gray-100 text-gray-700";
}

export default function MunicipalityApprovalsPage() {
  const [selectedWard, setSelectedWard] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedField, setSelectedField] = useState("ALL");

  const approvalRows = useMemo(() => {
    return editApprovals.map((approval) => {
      const citizen = citizens.find(
        (citizen) => citizen.id === approval.citizen_id,
      );

      const submitter = users.find((user) => user.id === approval.submitter_id);

      const ward = wards.find((ward) => ward.id === citizen?.ward_id);

      const changedFields = [
        ...new Set([
          ...Object.keys(approval.old_value_json),
          ...Object.keys(approval.new_value_json),
        ]),
      ];

      const daysPending = getDaysPending(approval.submitted_at);
      const businessDaysPending = getBusinessDaysPending(approval.submitted_at);

      const isFinalStatus =
        approval.status === "APPROVED" || approval.status === "REJECTED";

      return {
        id: approval.id,
        citizenName: citizen?.name_en ?? "Unknown Citizen",
        citizenId: approval.citizen_id,
        wardId: citizen?.ward_id ?? "UNKNOWN",
        wardName: ward?.name_en ?? "Unknown Ward",
        wardNo: ward?.ward_no ?? null,
        changedFields,
        submittedBy: submitter?.full_name ?? "Unknown User",
        submittedAt: approval.submitted_at,
        daysPending,
        businessDaysPending,
        status: approval.status,
        isCaoReviewDue: !isFinalStatus && businessDaysPending > 5,
      };
    });
  }, []);

  const fieldOptions = useMemo(() => {
    const fields = approvalRows.flatMap((approval) => approval.changedFields);
    return Array.from(new Set(fields));
  }, [approvalRows]);

  const filteredApprovals = approvalRows.filter((approval) => {
    const matchesWard =
      selectedWard === "ALL" || approval.wardId === selectedWard;

    const matchesStatus =
      selectedStatus === "ALL" || approval.status === selectedStatus;

    const matchesField =
      selectedField === "ALL" || approval.changedFields.includes(selectedField);

    return matchesWard && matchesStatus && matchesField;
  });

  return (
    <main className="p-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Approval Queue</h1>

        <p className="mt-1 text-sm text-white">
          Review citizen data edit requests submitted from ward offices.
        </p>
      </div>

      <section className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Filter by Ward
            </label>

            <select
              value={selectedWard}
              onChange={(event) => setSelectedWard(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-500"
            >
              <option value="ALL">All Wards</option>

              {wards.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {ward.name_en}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Filter by Status
            </label>

            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING_APPROVAL">Pending</option>
              <option value="CAO_REVIEW">CAO Review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Filter by Changed Field
            </label>

            <select
              value={selectedField}
              onChange={(event) => setSelectedField(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-500"
            >
              <option value="ALL">All Fields</option>

              {fieldOptions.map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Citizen Edit Requests
          </h2>

          <p className="text-sm text-gray-600">
            Showing {filteredApprovals.length} of {approvalRows.length} approval
            requests.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Citizen Name</th>
                <th className="px-4 py-3">Ward</th>
                <th className="px-4 py-3">Changed Field(s)</th>
                <th className="px-4 py-3">Submitted By</th>
                <th className="px-4 py-3">Submitted At</th>
                <th className="px-4 py-3">Days Pending</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredApprovals.map((approval) => (
                <tr
                  key={approval.id}
                  className={
                    approval.isCaoReviewDue ? "bg-amber-50" : "hover:bg-gray-50"
                  }
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {approval.citizenName}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {approval.wardName}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {approval.changedFields.join(", ")}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {approval.submittedBy}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {formatDate(approval.submittedAt)}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {approval.daysPending} days
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeClass(
                          approval.status,
                        )}`}
                      >
                        {formatStatus(approval.status)}
                      </span>

                      {approval.isCaoReviewDue && (
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                          CAO REVIEW DUE
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredApprovals.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-sm text-gray-500"
                  >
                    No approval requests match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
