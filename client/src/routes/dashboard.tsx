/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/route-guard";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { WelcomeCard } from "@/features/dashboard/welcome-card";
import { ProgressCards } from "@/features/dashboard/progress-cards";
import { RecentActivity } from "@/features/dashboard/recent-activity";
import { StreakWidget } from "@/features/dashboard/streak-widget";
import { UpcomingInterview } from "@/features/dashboard/upcoming-interview";
import { RevisionGate } from "@/features/dashboard/revision-gate";
import { requireRevisionCheck } from "@/lib/revision-guard";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
beforeLoad: async ({ location }) => {
  await requireAuth(location);
},
  head: () => ({
    meta: [
      { title: "Dashboard · AlgoForge" },
      { name: "description", content: "Your DSA progress, streaks, and upcoming interviews." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  // // const blocked = true;

  // const revisions = [
  //   {
  //     problem_id: "1",
  //     title: "Largest Rectangle in Histogram",
  //     topic: "Stack",
  //     priorityLabel: "Very High",
  //   },
  //   {
  //     problem_id: "2",
  //     title: "Sliding Window Maximum",
  //     topic: "Queue",
  //     priorityLabel: "High",
  //   },
  //   {
  //     problem_id: "3",
  //     title: "Rotten Oranges",
  //     topic: "Graph",
  //     priorityLabel: "Medium",
  //   },
  // ];
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

    // <DashboardShell>
    //   <RevisionGate
    //     // blocked={blocked}
    //     // revisions={revisions}
    //     onStartRevision={() => console.log("Start Revision")}
    //   />

    //   <div className="space-y-6">
    //     <WelcomeCard />
    //     <ProgressCards />
    //     <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
    //       <div className="lg:col-span-2">
    //         <RecentActivity />
    //       </div>
    //       <div className="space-y-6">
    //         <StreakWidget />
    //         <UpcomingInterview />
    //       </div>
    //     </div>
    //   </div>
    // </DashboardShell>
  );
}
