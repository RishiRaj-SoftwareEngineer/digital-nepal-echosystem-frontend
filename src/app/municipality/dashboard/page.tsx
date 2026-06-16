import citizens from "../../../../data/citizens.json";
import editApprovals from "../../../../data/edit-approvals.json";
import grievances from "../../../../data/grievances.json";
import syncBatches from "../../../../data/sync-batches.json";
import wards from "../../../../data/wards.json";

export default function MunicipalityDashboardPage() {
  const totalCitizens = citizens.length;

  const pendingApprovals = editApprovals.filter(
    (approval) =>
      approval.status === "PENDING_APPROVAL" ||
      approval.status === "CAO_REVIEW",
  ).length;

  const syncConflicts = syncBatches.reduce(
    (total, batch) => total + batch.conflict_count,
    0,
  );

  const activeGrievances = grievances.filter(
    (grievance) =>
      grievance.status !== "CLOSED" && grievance.status !== "RESOLVED_WARD",
  ).length;

  const recentApprovalActions = [...editApprovals]
    .sort(
      (a, b) =>
        new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime(),
    )
    .slice(0, 5)
    .map((approval) => {
      const citizen = citizens.find(
        (citizen) => citizen.id === approval.citizen_id,
      );
      const changedFields = Object.keys(approval.new_value_json);
      return {
        id: approval.id,
        citizenName: citizen?.name_en ?? "Unknown Citizen",
        changedFields,
        status: approval.status,
        submittedAt: approval.submitted_at,
      };
    });

  const recentSyncBatches = [...syncBatches]
    .sort(
      (a, b) =>
        new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime(),
    )
    .slice(0, 5)
    .map((batch) => {
      const ward = wards.find((ward) => ward.id === batch.ward_id);

      return {
        id: batch.batch_id,
        wardName: ward?.name_en ?? "Unknown Ward",
        status: batch.status,
        recordCount: batch.record_count,
        conflictCount: batch.conflict_count,
        submittedAt: batch.submitted_at,
      };
    });

  const stats = [
    {
      title: "Total Citizens",
      value: totalCitizens,
    },
    {
      title: "Pending Approvals",
      value: pendingApprovals,
    },
    {
      title: "Sync Conflicts",
      value: syncConflicts,
    },
    {
      title: "Active Grievances",
      value: activeGrievances,
    },
  ];

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold text-white">
        Municipality Dashboard
      </h1>
      <p className="mt-1 text-sm text-white">
        Overview of citizens, approvals, sync conflicts and grievances.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-lg border border-gray-200 bg-white p-5"
          >
            <p className="text-sm text-gray-500">{stat.title}</p>

            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      <section className="mt-8 rounded-lg border border-gray-200 bg-white p-5">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Approval Activity
          </h2>
          <p className="text-sm text-gray-600">
            Latest citizen data edit requests from ward offices.
          </p>
        </div>
        <div className="space-y-3">
          {recentApprovalActions.map((approval) => (
            <div
              key={approval.id}
              className="flex items-center justify-between rounded-md border border-gray-100 p-3"
            >
              <div>
                <p className="font-medium text-gray-900">
                  {approval.citizenName}
                </p>
                <p className="text-sm text-gray-600">
                  Changed field: {approval.changedFields.join(", ")}
                </p>
              </div>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                {approval.status}
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Sync Batches
          </h2>

          <p className="text-sm text-gray-600">
            Latest offline sync activity submitted from ward offices.
          </p>
        </div>

        <div className="space-y-3">
          {recentSyncBatches.map((batch) => (
            <div
              key={batch.id}
              className="flex items-center justify-between rounded-md border border-gray-100 p-3"
            >
              <div>
                <p className="font-medium text-gray-900">{batch.wardName}</p>

                <p className="text-sm text-gray-600">
                  {batch.recordCount} records · {batch.conflictCount} conflicts
                </p>
              </div>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                {batch.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
