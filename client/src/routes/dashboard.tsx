import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/route-guard";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { WelcomeCard } from "@/features/dashboard/welcome-card";
import { ProgressCards } from "@/features/dashboard/progress-cards";
import { RecentActivity } from "@/features/dashboard/recent-activity";
import { StreakWidget } from "@/features/dashboard/streak-widget";
import { UpcomingInterview } from "@/features/dashboard/upcoming-interview";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ location }) => requireAuth(location),
  head: () => ({
    meta: [
      { title: "Dashboard · AlgoForge" },
      { name: "description", content: "Your DSA progress, streaks, and upcoming interviews." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <WelcomeCard />
        <ProgressCards />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div className="space-y-6">
            <StreakWidget />
            <UpcomingInterview />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
