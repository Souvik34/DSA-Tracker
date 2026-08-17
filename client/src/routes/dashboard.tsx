/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/route-guard";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { WelcomeCard } from "@/features/dashboard/welcome-card";
import { ProgressCards } from "@/features/dashboard/progress-cards";
import { RecentActivity } from "@/features/dashboard/recent-activity";
import { History } from "lucide-react";
import { RevisionGate } from "@/features/dashboard/revision-gate";
import { requireRevisionCheck } from "@/lib/revision-guard";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import InterviewReadinessCard from "@/features/dashboard/InterviewReadinessCard";
import { useDashboard } from "@/hooks/useDashboard";
import  AIMentorCard  from "../features/dashboard/aiMentorCard";
import { dashboardService } from "@/services/dashboardService";

import { DashboardData } from "@/types/dashboard";

import { useAuthStore } from "@/store/auth-store";
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

    const {
        data,
        isLoading,
        error,
    } = useDashboard();
    console.log(data);
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

  const user = useAuthStore(
    s => s.user
);

const [dashboard, setDashboard] =
useState<DashboardData | null>(null);

const [loading, setLoading] =
useState(true);

useEffect(() => {

    if (!user?.id) return;

    loadDashboard();

}, [user]);

const loadDashboard = async () => {
    try {
        console.log("Fetching dashboard...");

        const data = await dashboardService.getDashboard(user!.id);

        console.log("Dashboard API Response:", data);

        setDashboard(data);
    } catch (err) {
        console.log(err);
    } finally {
        setLoading(false);
    }
};

if (isLoading) {
    return (
        <DashboardShell>
            <div className="flex h-[70vh] items-center justify-center">
                <div className="text-zinc-400 text-lg">
                    Loading Dashboard...
                </div>
            </div>
        </DashboardShell>
    );
}

if (error) {
    return (
        <DashboardShell>
            <div className="flex h-[70vh] items-center justify-center">
                <div className="text-red-400 text-lg">
                    Failed to load dashboard.
                </div>
            </div>
        </DashboardShell>
    );
}
  return (
    <DashboardShell>
      <div className="space-y-6">
       {dashboard && (
    <WelcomeCard dashboard={dashboard} />
)}
<InterviewReadinessCard dashboard={dashboard} />
<AIMentorCard dashboard={dashboard} />
        <ProgressCards
    dashboard={data}
/>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
           <RecentActivity dashboard={dashboard} />
          </div>
          <div className="space-y-6">
           
            {/* <UpcomingInterview /> */}
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
