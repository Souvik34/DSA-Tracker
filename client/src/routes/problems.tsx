/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/route-guard";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ProblemsTable } from "@/features/problems/problems-table";
import { requireRevisionCheck } from "@/lib/revision-guard";

export const Route = createFileRoute("/problems")({
 validateSearch: (search) => ({
  source:
    typeof search.source === "string"
      ? search.source
      : undefined,

  ids:
    typeof search.ids === "string"
      ? search.ids
      : undefined,

  problemId:
    typeof search.problemId === "string"
      ? search.problemId
      : undefined,
}),

  beforeLoad: async ({ location }) => {
    await requireAuth(location);
  },

  head: () => ({
    meta: [
      {
        title: "Problems · Dykstra",
      },
      {
        name: "description",
        content:
          "Curated DSA problems with progress tracking, notes, and LeetCode links.",
      },
    ],
  }),

  component: ProblemsPage,
});
function ProblemsPage() {
  return (
    <DashboardShell>
      <ProblemsTable />
    </DashboardShell>
  );
}
