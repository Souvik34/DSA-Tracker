import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/route-guard";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ProblemsTable } from "@/features/problems/problems-table";

export const Route = createFileRoute("/problems")({
  beforeLoad: ({ location }) => requireAuth(location),
  head: () => ({
    meta: [
      { title: "Problems · AlgoForge" },
      {
        name: "description",
        content: "Curated DSA problems with progress tracking, notes, and LeetCode links.",
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
