import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/route-guard";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ProblemsTable } from "@/features/problems/problems-table";
import { requireRevisionCheck } from "@/lib/revision-guard";

export const Route = createFileRoute("/problems")({
  beforeLoad: async ({ location }) => {
    await requireAuth(location);
    await requireRevisionCheck(location);
  },
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
